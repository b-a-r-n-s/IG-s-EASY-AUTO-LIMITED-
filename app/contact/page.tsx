'use client'

import React, { useState } from 'react'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import WhatsAppButton from '@/components/global/WhatsAppButton'
import Button from '@/components/ui/Button'
import Input, { Textarea } from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { COMPANY, WHATSAPP, BUSINESS_HOURS } from '@/lib/constants'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // TODO: Connect to Supabase contact_inquiries table
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 1000)
  }

  const dayLabels: Record<string, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  }

  return (
    <>
      <Header />
      <WhatsAppButton />
      <main id="main-content" className="bg-black min-h-screen pt-8">
        {/* Hero */}
        <section className="section-padding-small bg-gradient-to-b from-black via-primary-dark-gray to-black">
          <div className="container-max text-center">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-primary-silver max-w-2xl mx-auto">
              We're here to help. Reach out anytime.
            </p>
          </div>
        </section>

        <section className="section-padding bg-black">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left: Contact info */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>

                <div className="space-y-4 mb-8">
                  <Card variant="outlined" padding="md">
                    <p className="text-xs text-primary-silver uppercase tracking-wide font-semibold mb-2">Phone</p>
                    <a href={`tel:${COMPANY.phone1}`} className="block text-white hover:text-primary-gold mb-1">
                      {COMPANY.phone1}
                    </a>
                    <a href={`tel:${COMPANY.phone2}`} className="block text-white hover:text-primary-gold">
                      {COMPANY.phone2}
                    </a>
                  </Card>

                  <Card variant="outlined" padding="md">
                    <p className="text-xs text-primary-silver uppercase tracking-wide font-semibold mb-2">Email</p>
                    <a href={`mailto:${COMPANY.email}`} className="block text-white hover:text-primary-gold break-all">
                      {COMPANY.email}
                    </a>
                  </Card>

                  <Card variant="outlined" padding="md">
                    <p className="text-xs text-primary-silver uppercase tracking-wide font-semibold mb-2">Address</p>
                    <p className="text-white">{COMPANY.address}</p>
                  </Card>

                  <Card variant="outlined" padding="md">
                    <p className="text-xs text-primary-silver uppercase tracking-wide font-semibold mb-3">Business Hours</p>
                    <div className="space-y-1">
                      {Object.entries(BUSINESS_HOURS).map(([day, hours]) => (
                        <div key={day} className="flex justify-between text-sm">
                          <span className="text-primary-silver">{dayLabels[day]}</span>
                          <span className="text-white">{hours.open} - {hours.close}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => window.open(WHATSAPP.url, '_blank')}
                >
                  Chat on WhatsApp
                </Button>

                {/* Google Maps embed */}
                <div className="mt-8 rounded-lg overflow-hidden border-2 border-primary-gold h-64">
                  <iframe
                    title="IG Easy Auto Limited Location"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(COMPANY.address)}&output=embed`}
                  />
                </div>
              </div>

              {/* Right: Contact form */}
              <div>
                <Card variant="elevated" padding="lg">
                  <h2 className="text-2xl font-bold text-white mb-2">Send Us a Message</h2>
                  <p className="text-primary-silver mb-6">
                    We'll respond as soon as possible
                  </p>

                  {submitSuccess ? (
                    <div className="text-center py-12">
                      <p className="text-5xl mb-4">✓</p>
                      <p className="text-white font-bold text-xl mb-2">Message Sent!</p>
                      <p className="text-primary-silver">We will get back to you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <Input
                        label="Full Name"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        error={errors.name}
                      />
                      <Input
                        type="email"
                        label="Email"
                        placeholder="your@email.com"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        error={errors.email}
                      />
                      <Input
                        type="tel"
                        label="Phone"
                        placeholder="+234..."
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        error={errors.phone}
                      />
                      <Textarea
                        label="Message"
                        placeholder="How can we help you?"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        error={errors.message}
                      />
                      <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting}>
                        Send Message
                      </Button>
                    </form>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
    }
