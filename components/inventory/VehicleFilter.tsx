'use client'

import React, { useState } from 'react'
import { VEHICLE_FILTERS } from '@/lib/constants'
import Button from '@/components/ui/Button'
import { Select } from '@/components/ui/Input'

export interface VehicleFilterValues {
  make: string
  transmission: string
  fuelType: string
  bodyType: string
  condition: string
  priceRange: string
  search: string
}

interface VehicleFilterProps {
  onFilterChange: (filters: VehicleFilterValues) => void
  onReset: () => void
}

const DEFAULT_FILTERS: VehicleFilterValues = {
  make: '',
  transmission: '',
  fuelType: '',
  bodyType: '',
  condition: '',
  priceRange: '',
  search: '',
}

export default function VehicleFilter({ onFilterChange, onReset }: VehicleFilterProps) {
  const [filters, setFilters] = useState<VehicleFilterValues>(DEFAULT_FILTERS)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleChange = (key: keyof VehicleFilterValues, value: string) => {
    const updated = { ...filters, [key]: value }
    setFilters(updated)
    onFilterChange(updated)
  }

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS)
    onReset()
  }

  const makeOptions = VEHICLE_FILTERS.makes.map((m) => ({ value: m, label: m }))
  const transmissionOptions = VEHICLE_FILTERS.transmissions.map((t) => ({ value: t, label: t }))
  const fuelOptions = VEHICLE_FILTERS.fuelTypes.map((f) => ({ value: f, label: f }))
  const bodyOptions = VEHICLE_FILTERS.bodyTypes.map((b) => ({ value: b, label: b }))
  const conditionOptions = VEHICLE_FILTERS.conditions.map((c) => ({ value: c, label: c }))
  const priceOptions = VEHICLE_FILTERS.priceRanges.map((p) => ({ value: p.label, label: p.label }))

  return (
    <div className="bg-primary-dark-gray rounded-lg border-2 border-primary-gold p-4 sm:p-6">
      {/* Mobile toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden w-full flex items-center justify-between text-white font-bold mb-2"
      >
        <span>Filter Vehicles</span>
        <span className={`transition-transform ${isMobileOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {/* Filter content */}
      <div className={`${isMobileOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="hidden lg:block mb-4">
          <h3 className="text-lg font-bold text-white">Filter Vehicles</h3>
        </div>

        {/* Search */}
        <div className="mb-4">
          <label className="mb-2 text-sm font-semibold text-white block">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by make or model..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="w-full bg-black text-white placeholder-primary-silver rounded-lg px-4 py-2.5 border-2 border-primary-gold focus:outline-none focus:ring-2 focus:ring-primary-gold"
          />
        </div>

        {/* Make */}
        <div className="mb-4">
          <Select
            label="Make"
            placeholder="All Makes"
            options={makeOptions}
            value={filters.make}
            onChange={(e) => handleChange('make', e.target.value)}
          />
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <Select
            label="Price Range"
            placeholder="All Prices"
            options={priceOptions}
            value={filters.priceRange}
            onChange={(e) => handleChange('priceRange', e.target.value)}
          />
        </div>

        {/* Transmission */}
        <div className="mb-4">
          <Select
            label="Transmission"
            placeholder="All Transmissions"
            options={transmissionOptions}
            value={filters.transmission}
            onChange={(e) => handleChange('transmission', e.target.value)}
          />
        </div>

        {/* Fuel Type */}
        <div className="mb-4">
          <Select
            label="Fuel Type"
            placeholder="All Fuel Types"
            options={fuelOptions}
            value={filters.fuelType}
            onChange={(e) => handleChange('fuelType', e.target.value)}
          />
        </div>

        {/* Body Type */}
        <div className="mb-4">
          <Select
            label="Body Type"
            placeholder="All Body Types"
            options={bodyOptions}
            value={filters.bodyType}
            onChange={(e) => handleChange('bodyType', e.target.value)}
          />
        </div>

        {/* Condition */}
        <div className="mb-6">
          <Select
            label="Condition"
            placeholder="All Conditions"
            options={conditionOptions}
            value={filters.condition}
            onChange={(e) => handleChange('condition', e.target.value)}
          />
        </div>

        {/* Reset button */}
        <Button variant="outline" size="sm" fullWidth onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
