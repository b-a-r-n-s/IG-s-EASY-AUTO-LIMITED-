'use client'

import React, { useState } from 'react'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import WhatsAppButton from '@/components/global/WhatsAppButton'
import Button from '@/components/ui/Button'
import Input, { Textarea, Select } from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { SELL_SERVICE, WHATSAPP, VEHICLE_FILTERS } from '@/lib/constants'
import { supabase } from '@/lib/supabase'

export default function SellYourCarPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    mileage: '',
    priceExpectation: '',
    condition: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const conditionOptions = VEHICLE_FILTERS.conditions.map((c) => ({ value: c, label: c }))

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
    if (!formData.vehicleMake.trim()) newErrors.vehicleMake = 'Vehicle make is required'
    if (!formData.vehicleModel.trim()) newErrors.vehicleModel = 'Vehicle model is required'
    if (!formData.vehicleYear.trim()) newErrors.vehicleYear = 'Vehicle year is required'
    if (!formData.mileage.trim()) newErrors.mileage = 'Mileage is required'
    if (!formData.priceExpectation.trim()) newErrors.priceExpectation = 'Price expectation is required'
    if (!formData.condition.trim()) newErrors.condition = 'Condition is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    if (!validateForm()) return

    setIsSubmitting(true)

    const { error } = await supabase.from('sell_car_requests').insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      vehicle_make: formData.vehicleMake,
      vehicle_model: formData.vehicleModel,
      vehicle_year: parseInt(formData.vehicleYear),
      mileage: parseInt(formData.mileage),
      price_expectation: parseFloat(formData.priceExpectation),
      condition: formData.condition,
      notes: formData.notes || null,
      status: 'new',
    })

    setIsSubmitting(false)

    if (error) {
      console.error('Sell car submission error:', error)
      setSubmitError('Something went wrong submitting your listing. Please try again or contact us via WhatsApp.')
      return
    }

    setSubmitSuccess(true)
    setFormData({
      name: '',
      email: '',
      phone: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      mileage: '',
      priceExpectation: '',
      condition: '',
      notes: '',
    })
  }

  return (
    <>
      <Header />
      <WhatsAppButton />
      <main id="main-content" className="bg-black min-h-screen pt-8">
        <section className="section-padding-small bg-gradient-to-b from-black via-primary-dark-gray to-black">
          <div className="container-max text-center">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
              {SELL_SERVICE.title}
            </h1>
            <p className="text-lg text-primary-silver max-w-2xl mx-auto">
              {SELL_SERVICE.description}
            </p>
          </div>
        </section>

        <section className="section-padding-small bg-black">
          <div className="container-max">
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl font-bold text-white text-center mb-8">How It Works</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-3 text-black font-bold text-lg">
                    1
                  </div>
                  <h3 className="text-white font-semibold mb-2">List Your Car</h3>
                  <p className="text-primary-silver text-sm">
                    Fill out the form below with your vehicle details
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-3 text-black font-bold text-lg">
                    2
                  </div>
                  <h3 className="text-white font-semibold mb-2">We Review</h3>
                  <p className="text-primary-silver text-sm">
                    Our team evaluates and confirms or responds to your listing
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-3 text-black font-bold text-lg">
                    3
                  </div>
                  <h3 className="text-white font-semibold mb-2">Get Paid</h3>
                  <p className="text-primary-silver text-sm">
                    Once approved, we handle the rest and you get paid
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto mb-12">
              <Card variant="default" padding="lg">
                <h3 className="text-lg font-bold text-white mb-4">Why Sell With Us</h3>
                <ul className="space-y-3">
                  {SELL_SERVICE.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary-gold font-bold mt-1">✓</span>
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card variant="elevated" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-2">List Your Car</h2>
                <p className="text-primary-silver mb-6">
                  Provide accurate details for the fastest review
                </p>

                {submitSuccess ? (
                  <div className="text-center py-12">
                    <p className="text-5xl mb-4">✓</p>
                    <p className="text-white font-bold text-xl mb-2">Listing Submitted!</p>
                    <p className="text-primary-silver">
                      We will review your listing and contact you soon.
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

                    <div className="h-px bg-primary-gold my-2" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Vehicle Make"
                        placeholder="e.g. Toyota"
                        required
                        value={formData.vehicleMake}
                        onChange={(e) => handleChange('vehicleMake', e.target.value)}
                        error={errors.vehicleMake}
                      />
                      <Input
                        label="Vehicle Model"
                        placeholder="e.g. Camry"
                        required
                        value={formData.vehicleModel}
                        onChange={(e) => handleChange('vehicleModel', e.target.value)}
                        error={errors.vehicleModel}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        type="number"
                        label="Year"
                        placeholder="e.g. 2020"
                        required
                        value={formData.vehicleYear}
                        onChange={(e) => handleChange('vehicleYear', e.target.value)}
                        error={errors.vehicleYear}
                      />
                      <Input
                        type="number"
                        label="Mileage (km)"
                        placeholder="e.g. 45000"
                        required
                        value={formData.mileage}
                        onChange={(e) => handleChange('mileage', e.target.value)}
                        error={errors.mileage}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Expected Price (₦)"
                        placeholder="e.g. 8000000"
                        required
                        value={formData.priceExpectation}
                        onChange={(e) => handleChange('priceExpectation', e.target.value)}
                        error={errors.priceExpectation}
                      />
                      <Select
                        label="Condition"
                        placeholder="Select condition"
                        options={conditionOptions}
                        required
                        value={formData.condition}
                        onChange={(e) => handleChange('condition', e.target.value)}
                        error={errors.condition}
                      />
                    </div>

                    <Textarea
                      label="Additional Notes"
                      placeholder="Any additional details about your vehicle..."
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      hint="Photos can be sent via WhatsApp after submitting this form"
                    />

                    {submitError && (
                      <p className="text-red-500 text-sm">{submitError}</p>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      isLoading={isSubmitting}
                    >
                      Submit Listing
                    </Button>

                    <p className="text-center text-primary-silver text-sm">
                      Or{' '}
                      <a href={WHATSAPP.url} target="_blank" rel="noopener noreferrer" className="text-primary-gold hover:underline">
                        chat with us on WhatsApp
                      </a>
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
