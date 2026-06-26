'use client'

import React, { useState } from 'react'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import WhatsAppButton from '@/components/global/WhatsAppButton'
import Button from '@/components/ui/Button'
import Input, { Textarea } from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { PROCUREMENT_SERVICE, WHATSAPP } from '@/lib/constants'

export default function ProcurementPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    desiredVehicle: '',
    budget: '',
    requirements: '',
  })
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
    if (!formData.desiredVehicle.trim()) newErrors.desiredVehicle = 'Please specify desired vehicle'
    if (!formData.budget.trim()) newErrors.budget = 'Budget is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // TODO: Connect to Supabase procurement_requests table
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        desiredVehicle: '',
        budget: '',
        requirements: '',
      })
    }, 1000)
  }

  return (
    <>
      <Header />
      <WhatsAppButton />
      <main id="main-content" className="bg-black min-h-screen pt-8">
        {/* Hero section */}
        <section className="section-padding-small bg-gradient-to-b from-black via-primary-dark-gray to-black">
          <div className="container-max text-center">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
              {PROCUREMENT_SERVICE.title}
            </h1>
            <p className="text-lg text-primary-silver max-w-2xl mx-auto">
              {PROCUREMENT_SERVICE.description}
            </p>
          </div>
        </section>

        {/* Trust indicators */}
        <section className="section-padding-small bg-black">
          <div className="container-max">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
              <Card variant="outlined" padding="lg" className="text-center">
                <p className="text-4xl font-bold text-primary-gold mb-2">
                  {PROCUREMENT_SERVICE.successRate}
                </p>
                <p className="text-primary-silver">Success Rate</p>
              </Card>
              <Card variant="outlined" padding="lg" className="text-center">
                <p className="text-2xl font-bold text-primary-gold mb-2">
                  {PROCUREMENT_SERVICE.timeline}
                </p>
                <p className="text-primary-silver">Delivery Timeline</p>
              </Card>
            </div>

            {/* Process explainer */}
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl font-bold text-white text-center mb-8">How It Works</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-3 text-black font-bold text-lg">
                    1
                  </div>
                  <h3 className="text-white font-semibold mb-2">Submit Request</h3>
                  <p className="text-primary-silver text-sm">
                    Tell us your desired vehicle, budget, and requirements
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-3 text-black font-bold text-lg">
                    2
                  </div>
                  <h3 className="text-white font-semibold mb-2">We Source</h3>
                  <p className="text-primary-silver text-sm">
                    Our team finds the perfect match within 1-2 weeks
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-3 text-black font-bold text-lg">
                    3
                  </div>
                  <h3 className="text-white font-semibold mb-2">Delivery</h3>
                  <p className="text-primary-silver text-sm">
                    Complete documentation and delivery to your location
                  </p>
                </div>
              </div>
            </div>

            {/* Features list */}
            <div className="max-w-2xl mx-auto mb-12">
              <Card variant="default" padding="lg">
                <h3 className="text-lg font-bold text-white mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {PROCUREMENT_SERVICE.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary-gold font-bold mt-1">✓</span>
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Request form */}
            <div className="max-w-2xl mx-auto">
              <Card variant="elevated" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-2">Request Procurement</h2>
                <p className="text-primary-silver mb-6">
                  Fill in your details and we'll get started right away
                </p>

                {submitSuccess ? (
                  <div className="text-center py-12">
                    <p className="text-5xl mb-4">✓</p>
                    <p className="text-white font-bold text-xl mb-2">Request Submitted!</p>
                    <p className="text-primary-silver">
                      We will contact you within 24 hours to discuss your requirements.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                    </div>

                    <Input
                      type="tel"
                      label="Phone Number"
                      placeholder="+234..."
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      error={errors.phone}
                    />

                    <Input
                      label="Desired Vehicle"
                      placeholder="e.g. 2023 Toyota Camry or any SUV under 20M"
                      required
                      value={formData.desiredVehicle}
                      onChange={(e) => handleChange('desiredVehicle', e.target.value)}
                      error={errors.desiredVehicle}
                    />

                    <Input
                      label="Budget (₦)"
                      placeholder="e.g. 15000000"
                      required
                      value={formData.budget}
                      onChange={(e) => handleChange('budget', e.target.value)}
                      error={errors.budget}
                    />

                    <Textarea
                      label="Additional Requirements"
                      placeholder="Any specific features, color preferences, or other details..."
                      rows={4}
                      value={formData.requirements}
                      onChange={(e) => handleChange('requirements', e.target.value)}
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      isLoading={isSubmitting}
                    >
                      Submit Request
                    </Button>

                    <p className="text-center text-primary-silver text-sm">
                      Or{' '}
                      <button
                        type="button"
                        onClick={() => window.open(WHATSAPP.url, '_blank')}
                        className="text-primary-gold hover:underline"
                      >
                        chat with us on WhatsApp
                      </button>
                    </p>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
      }
