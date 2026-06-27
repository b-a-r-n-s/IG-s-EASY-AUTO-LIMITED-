'use client'

import React, { useState } from 'react'
import Input, { Textarea } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'

interface VehicleInquiryFormProps {
  vehicleId: string
}

export default function VehicleInquiryForm({ vehicleId }: VehicleInquiryFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    const { error } = await supabase.from('contact_inquiries').insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      vehicle_id: vehicleId,
      status: 'new',
    })

    setIsSubmitting(false)

    if (error) {
      console.error('Inquiry submission error:', error)
      setSubmitError('Something went wrong. Please try again or contact us via WhatsApp.')
      return
    }

    setSubmitSuccess(true)
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  if (submitSuccess) {
    return (
      <div className="text-center py-6">
        <p className="text-3xl mb-2">✓</p>
        <p className="text-white font-semibold">Inquiry sent!</p>
        <p className="text-primary-silver text-sm mt-1">We'll contact you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        placeholder="Your name"
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
        type="tel"
        label="Phone"
        placeholder="+234..."
        required
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <Textarea
        label="Message"
        placeholder="I'm interested in this vehicle..."
        rows={3}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />

      {submitError && (
        <p className="text-red-500 text-sm">{submitError}</p>
      )}

      <Button type="submit" variant="secondary" size="md" fullWidth isLoading={isSubmitting}>
        Send Inquiry
      </Button>
    </form>
  )
}
