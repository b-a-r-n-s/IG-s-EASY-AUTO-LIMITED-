'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input, { Textarea, Select } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { VEHICLE_FILTERS } from '@/lib/constants'
import { supabase } from '@/lib/supabase'

export default function AddVehiclePage() {
  const router = useRouter()
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
  const [featuresText, setFeaturesText] = useState('')
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [error, setError] = useState('')

  const transmissionOptions = VEHICLE_FILTERS.transmissions.map((t) => ({ value: t, label: t }))
  const fuelOptions = VEHICLE_FILTERS.fuelTypes.map((f) => ({ value: f, label: f }))
  const bodyOptions = VEHICLE_FILTERS.bodyTypes.map((b) => ({ value: b, label: b }))
  const conditionOptions = VEHICLE_FILTERS.conditions.map((c) => ({ value: c, label: c }))
  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'reserved', label: 'Reserved' },
    { value: 'sold', label: 'Sold' },
  ]

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files))
    }
  }

  const uploadImages = async (): Promise<string[]> => {
    const urls: string[] = []

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i]
      setUploadProgress(`Uploading image ${i + 1} of ${imageFiles.length}...`)

      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${i}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('vehicle-images')
        .upload(fileName, file)

      if (uploadError) {
        console.error('Upload error:', uploadError)
        continue
      }

      const { data } = supabase.storage.from('vehicle-images').getPublicUrl(fileName)
      urls.push(data.publicUrl)
    }

    return urls
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.make || !formData.model || !formData.year || !formData.price) {
      setError('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    let imageUrls: string[] = []
    if (imageFiles.length > 0) {
      imageUrls = await uploadImages()
    }

    setUploadProgress('Saving vehicle...')

    const features = featuresText.split('\n').map((f) => f.trim()).filter(Boolean)

    const response = await fetch('/api/admin/vehicles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, features, imageUrls }),
    })

    const result = await response.json()

    setIsSubmitting(false)
    setUploadProgress('')

    if (!result.success) {
      setError(result.message || 'Failed to create vehicle')
      return
    }

    router.push('/admin/dashboard/vehicles')
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white mb-6">Add Vehicle</h1>

      <Card variant="elevated" padding="lg" className="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Make"
              placeholder="e.g. Toyota"
              required
              value={formData.make}
              onChange={(e) => handleChange('make', e.target.value)}
            />
            <Input
              label="Model"
              placeholder="e.g. Camry"
              required
              value={formData.model}
              onChange={(e) => handleChange('model', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              type="number"
              label="Year"
              placeholder="e.g. 2023"
              required
              value={formData.year}
              onChange={(e) => handleChange('year', e.target.value)}
            />
            <Input
              label="Price (₦)"
              placeholder="e.g. 15000000"
              required
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Select
              label="Transmission"
              placeholder="Select"
              options={transmissionOptions}
              required
              value={formData.transmission}
              onChange={(e) => handleChange('transmission', e.target.value)}
            />
            <Select
              label="Fuel Type"
              placeholder="Select"
              options={fuelOptions}
              required
              value={formData.fuelType}
              onChange={(e) => handleChange('fuelType', e.target.value)}
            />
            <Select
              label="Body Type"
              placeholder="Select"
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
              placeholder="e.g. 5000"
              required
              value={formData.mileage}
              onChange={(e) => handleChange('mileage', e.target.value)}
            />
            <Select
              label="Condition"
              placeholder="Select"
              options={conditionOptions}
              required
              value={formData.condition}
              onChange={(e) => handleChange('condition', e.target.value)}
            />
          </div>

          <Textarea
            label="Description"
            placeholder="Describe the vehicle..."
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />

          <Textarea
            label="Features (one per line)"
            placeholder={'Leather Seats\nSunroof\nNavigation System'}
            rows={5}
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            hint="Enter each feature on its own line"
          />

          <div>
            <label className="mb-2 text-sm font-semibold text-white block">
              Vehicle Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full bg-primary-dark-gray text-white border-2 border-primary-gold rounded-lg px-4 py-2.5 file:bg-primary-gold file:text-black file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 file:font-semibold"
            />
            <p className="text-primary-silver text-xs mt-1">
              First image will be the primary/cover photo. {imageFiles.length > 0 && `${imageFiles.length} file(s) selected.`}
            </p>
          </div>

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
          {uploadProgress && <p className="text-primary-gold text-sm">{uploadProgress}</p>}

          <div className="flex gap-3">
            <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
              Save Vehicle
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => router.push('/admin/dashboard/vehicles')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
      }
