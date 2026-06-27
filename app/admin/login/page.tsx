'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { adminLogin } from '@/lib/auth'
import { COMPANY } from '@/lib/constants'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password')
      return
    }

    setIsSubmitting(true)

    const result = await adminLogin(email, password)

    setIsSubmitting(false)

    if (!result.success) {
      setError(result.message)
      return
    }

    router.push('/admin/dashboard')
  }

  return (
    <main className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-primary-gold rounded-lg flex items-center justify-center">
              <span className="text-black font-heading font-bold text-lg">IG</span>
            </div>
          </Link>
          <h1 className="text-2xl font-heading font-bold text-white mt-4">
            Admin Login
          </h1>
          <p className="text-primary-silver text-sm mt-1">
            {COMPANY.name}
          </p>
        </div>

        <Card variant="elevated" padding="lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="email"
              label="Email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting}>
              Log In
            </Button>

            <p className="text-center text-primary-silver text-sm">
              <Link href="/admin/forgot-password" className="text-primary-gold hover:underline">
                Forgot password?
              </Link>
            </p>
          </form>
        </Card>

        <p className="text-center text-primary-silver text-xs mt-6">
          <Link href="/" className="hover:text-primary-gold">
            ← Back to website
          </Link>
        </p>
      </div>
    </main>
  )
      }
