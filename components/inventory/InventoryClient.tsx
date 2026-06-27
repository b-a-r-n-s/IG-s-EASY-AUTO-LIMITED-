'use client'

import React, { useState, useMemo } from 'react'
import VehicleCard from '@/components/inventory/VehicleCard'
import VehicleFilter, { VehicleFilterValues } from '@/components/inventory/VehicleFilter'
import Button from '@/components/ui/Button'
import { PAGINATION, VEHICLE_FILTERS } from '@/lib/constants'
import type { VehicleWithImage } from '@/lib/queries'

interface InventoryClientProps {
  initialVehicles: VehicleWithImage[]
}

export default function InventoryClient({ initialVehicles }: InventoryClientProps) {
  const [filters, setFilters] = useState<VehicleFilterValues>({
    make: '',
    transmission: '',
    fuelType: '',
    bodyType: '',
    condition: '',
    priceRange: '',
    search: '',
  })
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredVehicles = useMemo(() => {
    let result = [...initialVehicles]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (v) =>
          v.make.toLowerCase().includes(searchLower) ||
          v.model.toLowerCase().includes(searchLower)
      )
    }

    if (filters.make) {
      result = result.filter((v) => v.make === filters.make)
    }

    if (filters.transmission) {
      result = result.filter((v) => v.transmission === filters.transmission)
    }

    if (filters.fuelType) {
      result = result.filter((v) => v.fuel_type === filters.fuelType)
    }

    if (filters.bodyType) {
      result = result.filter((v) => v.body_type === filters.bodyType)
    }

    if (filters.condition) {
      result = result.filter((v) => v.condition === filters.condition)
    }

    if (filters.priceRange) {
      const range = VEHICLE_FILTERS.priceRanges.find((p) => p.label === filters.priceRange)
      if (range) {
        result = result.filter((v) => v.price >= range.min && v.price <= range.max)
      }
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.year - a.year)
    }

    return result
  }, [filters, sortBy, initialVehicles])

  const totalPages = Math.ceil(filteredVehicles.length / PAGINATION.vehiclesPerPage)
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * PAGINATION.vehiclesPerPage,
    currentPage * PAGINATION.vehiclesPerPage
  )

  const handleFilterChange = (newFilters: VehicleFilterValues) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleReset = () => {
    setFilters({
      make: '',
      transmission: '',
      fuelType: '',
      bodyType: '',
      condition: '',
      priceRange: '',
      search: '',
    })
    setCurrentPage(1)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filter sidebar */}
      <div className="lg:col-span-1">
        <VehicleFilter onFilterChange={handleFilterChange} onReset={handleReset} />
      </div>

      {/* Vehicle grid */}
      <div className="lg:col-span-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <p className="text-primary-silver text-sm">
            Showing {paginatedVehicles.length} of {filteredVehicles.length} vehicles
          </p>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-primary-dark-gray text-white border-2 border-primary-gold rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-gold"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {paginatedVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {paginatedVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                id={vehicle.id}
                make={vehicle.make}
                model={vehicle.model}
                year={vehicle.year}
                price={vehicle.price}
                transmission={vehicle.transmission}
                fuel={vehicle.fuel_type}
                mileage={vehicle.mileage}
                status={vehicle.status}
                imageUrl={vehicle.imageUrl}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-primary-dark-gray rounded-lg border border-primary-gold">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-white font-bold text-lg mb-2">
              {initialVehicles.length === 0 ? 'No vehicles in inventory yet' : 'No vehicles found'}
            </p>
            <p className="text-primary-silver text-sm">
              {initialVehicles.length === 0
                ? 'Check back soon — new vehicles are added regularly.'
                : 'Try adjusting your filters to see more results'}
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                  currentPage === i + 1
                    ? 'bg-primary-gold text-black'
                    : 'bg-primary-dark-gray text-white hover:bg-primary-gold hover:text-black'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
  }
