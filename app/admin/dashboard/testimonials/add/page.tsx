'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input, { Textarea } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function AddTestimonialPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    customerName: '',
    customerRole: '',
    quote: '',
    rating: '5',
    featured: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.customerName.trim() || !formData.quote.trim()) {
      setError('Name and quote are required')
      return
    }

    setIsSubmitting(true)

    const response = await fetch('/api/admin/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const result = await response.json()
    setIsSubmitting(false)

    if (!result.success) {
      setError(result.message || 'Failed to create testimonial')
      return
    }

    router.push('/admin/dashboard/testimonials')
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white mb-6">Add Testimonial</h1>

      <Card variant="elevated" padding="lg" className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Customer Name"
            placeholder="e.g. Chioma Okafor"
            required
            value={formData.customerName}
            onChange={(e) => handleChange('customerName', e.target.value)}
          />

          <Input
            label="Customer Role"
            placeholder="e.g. Business Owner"
            value={formData.customerRole}
            onChange={(e) => handleChange('customerRole', e.target.value)}
          />

          <Textarea
            label="Quote"
            placeholder="What did the customer say?"
            rows={4}
            required
            value={formData.quote}
            onChange={(e) => handleChange('quote', e.target.value)}
          />

          <div>
            <label className="mb-2 text-sm font-semibold text-white block">Rating</label>
            <select
              value={formData.rating}
              onChange={(e) => handleChange('rating', e.target.value)}
              className="w-full bg-primary-dark-gray text-white border-2 border-primary-gold rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-gold"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{'★'.repeat(n)} ({n})</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => handleChange('featured', e.target.checked)}
              className="w-5 h-5 accent-primary-gold"
            />
            <label htmlFor="featured" className="text-white text-sm font-medium">
              Show on home page (Featured)
            </label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3">
            <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
              Save Testimonial
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => router.push('/admin/dashboard/testimonials')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
    }
