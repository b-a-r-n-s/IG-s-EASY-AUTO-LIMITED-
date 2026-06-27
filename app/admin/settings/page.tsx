import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { isAuthenticated } from '@/lib/auth'

export default function AdminSettingsPage() {
  const router = useRouter()
  const [logoUrl, setLogoUrl] = useState('')
  const [ceoUrl, setCeoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login')
      return
    }

    ;(async () => {
      try {
        const res = await fetch('/api/site-settings')
        const json = await res.json()
        if (json?.success && json?.settings) {
          setLogoUrl(json.settings.logo_url || '')
          setCeoUrl(json.settings.ceo_photo_url || '')
        }
      } catch (err) {
        console.error(err)
      }
    })()
  }, [router])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: { logo_url: logoUrl, ceo_photo_url: ceoUrl } }),
      })
      const json = await res.json()
      if (json?.success) {
        setMessage('Saved successfully')
      } else {
        setMessage(json?.message || 'Unable to save')
      }
    } catch (err) {
      console.error(err)
      setMessage('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-black min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-heading font-bold text-white mb-4">Site Settings</h1>

        <Card variant="elevated" padding="lg">
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Logo URL" placeholder="https://..." value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
            <Input label="CEO Photo URL" placeholder="https://..." value={ceoUrl} onChange={(e) => setCeoUrl(e.target.value)} />
            <div className="flex items-center gap-3">
              <Button type="submit" variant="primary" isLoading={loading}>Save</Button>
              <Button type="button" variant="outline" onClick={() => { setLogoUrl(''); setCeoUrl('') }}>Reset</Button>
            </div>
            {message && <p className="text-primary-gold">{message}</p>}
          </form>
        </Card>
      </div>
    </main>
  )
}
