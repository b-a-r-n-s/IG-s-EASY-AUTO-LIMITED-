'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Input, { Textarea, Select } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { VEHICLE_FILTERS } from '@/lib/constants'
import { supabase } from '@/lib/supabase'

export default function EditVehiclePage() {
  const router = useRouter()
  const params = useParams()
  const vehicleId = params.id as string

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    transmission: '',
    fuelType: '',
    bodyType: '',
    mileage: '',
    condition: '',
    description: '',
    status: 'available',
    featured: false,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const transmissionOptions = VEHICLE_FILTERS.transmissions.map((t) => ({ value: t, label: t }))
  const fuelOptions = VEHICLE_FILTERS.fuelTypes.map((f) => ({ value: f, label: f }))
  const bodyOptions = VEHICLE_FILTERS.bodyTypes.map((b) => ({ value: b, label: b }))
  const conditionOptions = VEHICLE_FILTERS.conditions.map((c) => ({ value: c, label: c }))
  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'reserved', label: 'Reserved' },
    { value: 'sold', label: 'Sold' },
  ]

  useEffect(() => {
    async function loadVehicle() {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', vehicleId)
        .single()

      if (error || !data) {
        setError('Vehicle not found')
        setIsLoading(false)
        return
      }

      setFormData({
        make: data.make,
        model: data.model,
        year: String(data.year),
        price: String(data.price),
        transmission: data.transmission,
        fuelType: data.fuel_type,
        bodyType: data.body_type,
        mileage: String(data.mileage),
        condition: data.condition,
        description: data.description || '',
        status: data.status,
        featured: data.featured,
      })
      setIsLoading(false)
    }

    loadVehicle()
  }, [vehicleId])

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    const response = await fetch('/api/admin/vehicles', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: vehicleId, ...formData }),
    })

    const result = await response.json()
    setIsSubmitting(false)

    if (!result.success) {
      setError(result.message || 'Failed to update vehicle')
      return
    }

    setSuccess('Vehicle updated successfully')
  }

  const handleDelete = async () => {
    setIsDeleting(true)

    const response = await fetch(`/api/admin/vehicles?id=${vehicleId}`, {
      method: 'DELETE',
    })

    const result = await response.json()

    if (!result.success) {
      setError(result.message || 'Failed to delete vehicle')
      setIsDeleting(false)
      return
    }

    router.push('/admin/dashboard/vehicles')
  }

  if (isLoading) {
    return <p className="text-primary-silver">Loading vehicle...</p>
  }

  if (error && !formData.make) {
    return (
      <Card variant="outlined" padding="lg" className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button variant="outline" onClick={() => router.push('/admin/dashboard/vehicles')}>
          Back to Vehicles
        </Button>
      </Card>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-white">
          Edit {formData.make} {formData.model}
        </h1>
        <Button variant="danger" size="sm" onClick={() => setShowDeleteConfirm(true)}>
          Delete Vehicle
        </Button>
      </div>

      {/* Delete confirmation */}
      {showDeleteConfirm && (
        <Card variant="outlined" padding="lg" className="mb-6 border-red-500">
          <p className="text-white font-semibold mb-2">Are you sure you want to delete this vehicle?</p>
          <p className="text-primary-silver text-sm mb-4">This action cannot be undone.</p>
          <div className="flex gap-3">
            <Button variant="danger" size="sm" onClick={handleDelete} isLoading={isDeleting}>
              Yes, Delete
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <Card variant="elevated" padding="lg" className="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Make"
              required
              value={formData.make}
              onChange={(e) => handleChange('make', e.target.value)}
            />
            <Input
              label="Model"
              required
              value={formData.model}
              onChange={(e) => handleChange('model', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              type="number"
              label="Year"
              required
              value={formData.year}
              onChange={(e) => handleChange('year', e.target.value)}
            />
            <Input
              label="Price (₦)"
              required
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Select
              label="Transmission"
              options={transmissionOptions}
              required
              value={formData.transmission}
              onChange={(e) => handleChange('transmission', e.target.value)}
            />
            <Select
              label="Fuel Type"
              options={fuelOptions}
              required
              value={formData.fuelType}
              onChange={(e) => handleChange('fuelType', e.target.value)}
            />
            <Select
              label="Body Type"
              options={bodyOptions}
              required
              value={formData.bodyType}
              onChange={(e) => handleChange('bodyType', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              type="number"
              label="Mileage (km)"
              required
              value={formData.mileage}
              onChange={(e) => handleChange('mileage', e.target.value)}
            />
            <Select
              label="Condition"
              options={conditionOptions}
              required
              value={formData.condition}
              onChange={(e) => handleChange('condition', e.target.value)}
            />
          </div>

          <Textarea
            label="Description"
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              label="Status"
              options={statusOptions}
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
            />
            <div className="flex items-center gap-3 pt-7">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleChange('featured', e.target.checked)}
                className="w-5 h-5 accent-primary-gold"
              />
              <label htmlFor="featured" className="text-white text-sm font-medium">
                Mark as Featured (shows on home page)
              </label>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <div className="flex gap-3">
            <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => router.push('/admin/dashboard/vehicles')}
            >
              Back
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
    }
