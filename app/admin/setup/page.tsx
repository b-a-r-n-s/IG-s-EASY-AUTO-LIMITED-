'use client'

import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { createAdminAccount } from '@/lib/auth'

export default function AdminSetupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (!formData.name || !formData.email || !formData.password) {
      setMessage('All fields are required')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters')
      return
    }

    setIsSubmitting(true)

    const result = await createAdminAccount(formData.email, formData.password, formData.name)

    setIsSubmitting(false)
    setMessage(result.message)
    setSuccess(result.success)
  }

  return (
    <main className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-heading font-bold text-white">
            Admin Account Setup
          </h1>
          <p className="text-primary-silver text-sm mt-1">
            One-time setup — create the first admin account
          </p>
        </div>

        <Card variant="elevated" padding="lg">
          {success ? (
            <div className="text-center py-6">
              <p className="text-4xl mb-3">✓</p>
              <p className="text-white font-bold mb-2">Account Created!</p>
              <p className="text-primary-silver text-sm mb-4">
                You can now log in at /admin/login
              </p>
              <p className="text-red-400 text-xs">
                ⚠️ Delete this setup page (app/admin/setup/page.tsx) from GitHub now for security.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Full Name"
                placeholder="Emmanuel Okoh"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                type="email"
                label="Email"
                placeholder="your@email.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input
                type="password"
                label="Password"
                placeholder="At least 6 characters"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Re-enter password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />

              {message && !success && (
                <p className="text-red-500 text-sm">{message}</p>
              )}

              <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting}>
                Create Admin Account
              </Button>
            </form>
          )}
        </Card>
      </div>
    </main>
  )
}
