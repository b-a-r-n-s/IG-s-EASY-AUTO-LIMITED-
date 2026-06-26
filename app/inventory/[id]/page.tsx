'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import WhatsAppButton from '@/components/global/WhatsAppButton'
import Button from '@/components/ui/Button'
import Input, { Textarea } from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import VehicleCard from '@/components/inventory/VehicleCard'
import { formatCurrency, formatMileage } from '@/lib/utils'
import { WHATSAPP } from '@/lib/constants'

// Mock data - will be replaced with Supabase query later
const ALL_VEHICLES = [
  { id: '1', make: 'BMW', model: 'M340i', year: 2023, price: 15500000, transmission: 'Automatic', fuel: 'Petrol', mileage: 5000, status: 'available' as const, bodyType: 'Sedan', condition: 'Excellent', description: 'This stunning BMW M340i combines luxury and performance seamlessly. Featuring a powerful engine, premium leather interior, and the latest technology, this vehicle is perfect for those who demand excellence.', features: ['Leather Seats', 'Sunroof', 'Navigation System', 'Bluetooth Connectivity', 'Backup Camera', 'Heated Seats', 'Premium Sound System', 'Keyless Entry'] },
  { id: '2', make: 'Mercedes-Benz', model: 'C300', year: 2023, price: 16800000, transmission: 'Automatic', fuel: 'Petrol', mileage: 3000, status: 'available' as const, bodyType: 'Sedan', condition: 'Excellent', description: 'Experience German engineering at its finest with this Mercedes-Benz C300. Low mileage and immaculate condition make this an exceptional choice for the discerning buyer.', features: ['Leather Seats', 'Panoramic Sunroof', 'MBUX Infotainment', 'Wireless Charging', '360 Camera', 'Heated & Ventilated Seats', 'Burmester Sound System', 'Adaptive Cruise Control'] },
  { id: '3', make: 'Lexus', model: 'RX 350', year: 2022, price: 22500000, transmission: 'Automatic', fuel: 'Petrol', mileage: 12000, status: 'available' as const, bodyType: 'SUV', condition: 'Excellent', description: 'The Lexus RX 350 offers unmatched comfort and reliability. Spacious interior, smooth ride, and Lexus build quality make this SUV a top choice.', features: ['Leather Seats', 'Third Row Seating', 'Lexus Safety System+', 'Mark Levinson Audio', 'Power Liftgate', 'Heated Steering Wheel', 'Wireless Charging', 'Apple CarPlay'] },
  { id: '4', make: 'Audi', model: 'A6', year: 2023, price: 18500000, transmission: 'Automatic', fuel: 'Petrol', mileage: 4500, status: 'reserved' as const, bodyType: 'Sedan', condition: 'Excellent', description: 'Sophisticated design meets cutting-edge technology in this Audi A6. Virtual cockpit, quattro all-wheel drive, and premium finishes throughout.', features: ['Virtual Cockpit', 'Quattro AWD', 'Bang & Olufsen Audio', 'Matrix LED Headlights', 'Leather Seats', 'Navigation', 'Parking Assist', 'Adaptive Suspension'] },
  { id: '5', make: 'Toyota', model: 'Camry', year: 2022, price: 9500000, transmission: 'Automatic', fuel: 'Petrol', mileage: 18000, status: 'available' as const, bodyType: 'Sedan', condition: 'Good', description: 'Reliable and fuel-efficient, the Toyota Camry remains a top choice for families and professionals alike. Well-maintained with full service history.', features: ['Bluetooth', 'Backup Camera', 'Cruise Control', 'Alloy Wheels', 'Power Windows', 'AC', 'USB Ports', 'Keyless Entry'] },
  { id: '6', make: 'Honda', model: 'Accord', year: 2021, price: 8200000, transmission: 'Automatic', fuel: 'Petrol', mileage: 25000, status: 'available' as const, bodyType: 'Sedan', condition: 'Good', description: 'The Honda Accord delivers exceptional value with its blend of comfort, efficiency, and Honda reliability. A great choice for daily driving.', features: ['Honda Sensing', 'Apple CarPlay', 'Sunroof', 'Heated Seats', 'Push Button Start', 'Alloy Wheels', 'Multi-Angle Camera', 'Lane Watch'] },
  { id: '7', make: 'Lexus', model: 'GX 460', year: 2022, price: 28000000, transmission: 'Automatic', fuel: 'Petrol', mileage: 15000, status: 'sold' as const, bodyType: 'SUV', condition: 'Excellent', description: 'Rugged capability meets luxury in the Lexus GX 460. Perfect for those who need both off-road capability and on-road comfort.', features: ['4WD', 'Leather Seats', 'Third Row Seating', 'Navigation', 'Premium Audio', 'Sunroof', 'Heated Seats', 'Running Boards'] },
  { id: '8', make: 'BMW', model: 'X5', year: 2023, price: 32000000, transmission: 'Automatic', fuel: 'Petrol', mileage: 6000, status: 'available' as const, bodyType: 'SUV', condition: 'Excellent', description: 'The BMW X5 combines athletic performance with luxury SUV practicality. A perfect blend of power, technology, and comfort.', features: ['xDrive AWD', 'Panoramic Sunroof', 'Harman Kardon Audio', 'Leather Seats', 'Heated Seats', 'Navigation', 'Parking Assistant', 'Gesture Control'] },
]

export default function VehicleDetailPage() {
  const params = useParams()
  const vehicleId = params.id as string

  const vehicle = ALL_VEHICLES.find((v) => v.id === vehicleId)

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const relatedVehicles = ALL_VEHICLES.filter(
    (v) => v.id !== vehicleId && v.bodyType === vehicle?.bodyType
  ).slice(0, 3)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Connect to Supabase contact_inquiries table
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 1000)
  }

  const statusStyles = {
    available: 'bg-green-500 text-white',
    reserved: 'bg-yellow-500 text-black',
    sold: 'bg-red-500 text-white',
  }

  if (!vehicle) {
    return (
      <>
        <Header />
        <main className="bg-black min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <p className="text-4xl mb-4">🚫</p>
            <h1 className="text-2xl font-bold text-white mb-2">Vehicle Not Found</h1>
            <p className="text-primary-silver mb-6">This vehicle may have been sold or removed.</p>
            <Link href="/inventory">
              <Button variant="primary">Back to Inventory</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <WhatsAppButton />
      <main id="main-content" className="bg-black min-h-screen pt-8">
        <div className="container-max section-padding-small">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm">
            <Link href="/inventory" className="text-primary-silver hover:text-primary-gold">
              Inventory
            </Link>
            <span className="text-primary-silver mx-2">/</span>
            <span className="text-white">{vehicle.year} {vehicle.make} {vehicle.model}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Gallery + Details */}
            <div className="lg:col-span-2">
              {/* Image gallery */}
              <div className="bg-primary-dark-gray rounded-lg border-2 border-primary-gold h-96 flex items-center justify-center mb-6 relative">
                <div className="text-center">
                  <p className="text-5xl mb-4">🚗</p>
                  <p className="text-primary-silver text-sm">Vehicle Image</p>
                </div>
                <span className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold ${statusStyles[vehicle.status]}`}>
                  {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                </span>
              </div>

              {/* Title & price */}
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-3xl font-bold text-primary-gold mb-6">
                {formatCurrency(vehicle.price)}
              </p>

              {/* Specs grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <Card variant="outlined" padding="sm">
                  <p className="text-xs text-primary-silver mb-1">Transmission</p>
                  <p className="text-white font-semibold">{vehicle.transmission}</p>
                </Card>
                <Card variant="outlined" padding="sm">
                  <p className="text-xs text-primary-silver mb-1">Fuel Type</p>
                  <p className="text-white font-semibold">{vehicle.fuel}</p>
                </Card>
                <Card variant="outlined" padding="sm">
                  <p className="text-xs text-primary-silver mb-1">Mileage</p>
                  <p className="text-white font-semibold">{formatMileage(vehicle.mileage)}</p>
                </Card>
                <Card variant="outlined" padding="sm">
                  <p className="text-xs text-primary-silver mb-1">Condition</p>
                  <p className="text-white font-semibold">{vehicle.condition}</p>
                </Card>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-3">Description</h2>
                <p className="text-primary-silver leading-relaxed">{vehicle.description}</p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-3">Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-primary-gold">✓</span>
                      <span className="text-white text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Inquiry form + WhatsApp CTA */}
            <div className="lg:col-span-1">
              <Card variant="elevated" padding="lg" className="sticky top-24">
                <h3 className="text-xl font-bold text-white mb-4">Interested in this vehicle?</h3>

                {/* WhatsApp CTA */}
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  className="mb-4"
                  onClick={() => window.open(WHATSAPP.url, '_blank')}
                >
                  Chat on WhatsApp
                </Button>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 h-px bg-primary-gold" />
                  <span className="text-primary-silver text-xs">OR</span>
                  <div className="flex-1 h-px bg-primary-gold" />
                </div>

                {/* Inquiry form */}
                {submitSuccess ? (
                  <div className="text-center py-6">
                    <p className="text-3xl mb-2">✓</p>
                    <p className="text-white font-semibold">Inquiry sent!</p>
                    <p className="text-primary-silver text-sm mt-1">We'll contact you soon.</p>
                  </div>
                ) : (
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
                    <Button type="submit" variant="secondary" size="md" fullWidth isLoading={isSubmitting}>
                      Send Inquiry
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>

          {/* Related vehicles */}
          {relatedVehicles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-6">Related Vehicles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedVehicles.map((v) => (
                  <VehicleCard key={v.id} {...v} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
  }
