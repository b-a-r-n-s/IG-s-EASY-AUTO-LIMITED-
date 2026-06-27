'use client'

import React, { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { supabase } from '@/lib/supabase'

const SETTINGS_KEYS = [
  { key: 'site_name', label: 'Site Name' },
  { key: 'site_tagline', label: 'Tagline' },
  { key: 'contact_email', label: 'Contact Email' },
  { key: 'contact_phone_1', label: 'Phone Number 1' },
  { key: 'contact_phone_2', label: 'Phone Number 2' },
  { key: 'whatsapp_number', label: 'WhatsApp Number' },
]

export default function AdminSettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase.from('site_settings').select('key, value')

      if (data) {
        const map: Record<string, string> = {}
        data.forEach((row) => {
          map[row.key] = row.value || ''
        })
        setValues(map)
      }

      setIsLoading(false)
    }

    loadSettings()
  }, [])

  const handleChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage('')

    const response = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings: values }),
    })

    const result = await response.json()
    setIsSaving(false)

    setMessage(result.success ? 'Settings saved successfully' : 'Failed to save settings')
  }

  if (isLoading) {
    return <p className="text-primary-silver">Loading settings...</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white mb-6">Site Settings</h1>

      <Card variant="elevated" padding="lg" className="max-w-2xl">
        <form onSubmit={handleSave} className="space-y-5">
          {SETTINGS_KEYS.map(({ key, label }) => (
            <Input
              key={key}
              label={label}
              value={values[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          ))}

          {message && (
            <p className={message.includes('success') ? 'text-green-500 text-sm' : 'text-red-500 text-sm'}>
              {message}
            </p>
          )}

          <Button type="submit" variant="primary" size="lg" isLoading={isSaving}>
            Save Settings
          </Button>
        </form>
      </Card>

      <p className="text-primary-silver text-xs mt-6">
        Note: These settings are stored for reference. Some values (like WhatsApp number) require a code update in lib/constants.ts to take effect on the live site.
      </p>
    </div>
  )
            }
