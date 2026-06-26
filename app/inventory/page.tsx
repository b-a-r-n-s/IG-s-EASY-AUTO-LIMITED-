'use client'

import React, { useState, useMemo } from 'react'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import WhatsAppButton from '@/components/global/WhatsAppButton'
import VehicleCard from '@/components/inventory/VehicleCard'
import VehicleFilter, { VehicleFilterValues } from '@/components/inventory/VehicleFilter'
import Button from '@/components/ui/Button'
import { PAGINATION, VEHICLE_FILTERS } from '@/lib/constants'

// Mock data - will be replaced with real Supabase query later
const ALL_VEHICLES = [
  { id: '1', make: 'BMW', model: 'M340i', year: 2023, price: 15500000, transmission: 'Automatic', fuel: 'Petrol', mileage: 5000, status: 'available' as const, bodyType: 'Sedan', condition: 'Excellent' },
  { id: '2', make: 'Mercedes-Benz', model: 'C300', year: 2023, price: 16800000, transmission: 'Automatic', fuel: 'Petrol', mileage: 3000, status: 'available' as const, bodyType: 'Sedan', condition: 'Excellent' },
  { id: '3', make: 'Lexus', model: 'RX 350', year: 2022, price: 22500000, transmission: 'Automatic', fuel: 'Petrol', mileage: 12000, status: 'available' as const, bodyType: 'SUV', condition: 'Excellent' },
  { id: '4', make: 'Audi', model: 'A6', year: 2023, price: 18500000, transmission: 'Automatic', fuel: 'Petrol', mileage: 4500, status: 'reserved' as const, bodyType: 'Sedan', condition: 'Excellent' },
  { id: '5', make: 'Toyota', model: 'Camry', year: 2022, price: 9500000, transmission: 'Automatic', fuel: 'Petrol', mileage: 18000, status: 'available' as const, bodyType: 'Sedan', condition: 'Good' },
  { id: '6', make: 'Honda', model: 'Accord', year: 2021, price: 8200000, transmission: 'Automatic', fuel: 'Petrol', mileage: 25000, status: 'available' as const, bodyType: 'Sedan', condition: 'Good' },
  { id: '7', make: 'Lexus', model: 'GX 460', year: 2022, price: 28000000, transmission: 'Automatic', fuel: 'Petrol', mileage: 15000, status: 'sold' as const, bodyType: 'SUV', condition: 'Excellent' },
  { id: '8', make: 'BMW', model: 'X5', year: 2023, price: 32000000, transmission: 'Automatic', fuel: 'Petrol', mileage: 6000, status: 'available' as const, bodyType: 'SUV', condition: 'Excellent' },
]

export default function InventoryPage() {
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

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    let result = [...ALL_VEHICLES]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (v) =>
          v.make.toLowerCase().includes(searchLower) ||
          v.model.toLowerCase().includes(searchLower)
      )
    }

    // Make filter
    if (filters.make) {
      result = result.filter((v) => v.make === filters.make)
    }

    // Transmission filter
    if (filters.transmission) {
      result = result.filter((v) => v.transmission === filters.transmission)
    }

    // Fuel type filter
    if (filters.fuelType) {
      result = result.filter((v) => v.fuel === filters.fuelType)
    }

    // Body type filter
    if (filters.bodyType) {
      result = result.filter((v) => v.bodyType === filters.bodyType)
    }

    // Condition filter
    if (filters.condition) {
      result = result.filter((v) => v.condition === filters.condition)
    }

    // Price range filter
    if (filters.priceRange) {
      const range = VEHICLE_FILTERS.priceRanges.find((p) => p.label === filters.priceRange)
      if (range) {
        result = result.filter((v) => v.price >= range.min && v.price <= range.max)
      }
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.year - a.year)
    }

    return result
  }, [filters, sortBy])

  // Pagination
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
    <>
      <Header />
      <WhatsAppButton />
      <main id="main-content" className="bg-black min-h-screen pt-8">
        <div className="container-max section-padding-small">
          {/* Page heading */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">
              Vehicle Inventory
            </h1>
            <p className="text-primary-silver">
              Browse our collection of {ALL_VEHICLES.length} premium vehicles
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter sidebar */}
            <div className="lg:col-span-1">
              <VehicleFilter onFilterChange={handleFilterChange} onReset={handleReset} />
            </div>

            {/* Vehicle grid */}
            <div className="lg:col-span-3">
              {/* Sort & results count */}
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

              {/* Vehicle grid */}
              {paginatedVehicles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {paginatedVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} {...vehicle} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-primary-dark-gray rounded-lg border border-primary-gold">
                  <p className="text-4xl mb-4">🔍</p>
                  <p className="text-white font-bold text-lg mb-2">No vehicles found</p>
                  <p className="text-primary-silver text-sm">
                    Try adjusting your filters to see more results
                  </p>
                </div>
              )}

              {/* Pagination */}
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
        </div>
      </main>
      <Footer />
    </>
  )
   }
