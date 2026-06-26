import React from 'react'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatCurrency, formatMileage } from '@/lib/utils'

interface VehicleCardProps {
  id: string
  make: string
  model: string
  year: number
  price: number
  transmission: string
  fuel: string
  mileage: number
  status: 'available' | 'reserved' | 'sold'
  imageUrl?: string
}

export default function VehicleCard({
  id,
  make,
  model,
  year,
  price,
  transmission,
  fuel,
  mileage,
  status,
  imageUrl,
}: VehicleCardProps) {
  const statusStyles = {
    available: 'bg-green-500 text-white',
    reserved: 'bg-yellow-500 text-black',
    sold: 'bg-red-500 text-white',
  }

  const statusLabels = {
    available: 'Available',
    reserved: 'Reserved',
    sold: 'Sold',
  }

  return (
    <Link href={`/inventory/${id}`}>
      <Card variant="elevated" hover padding="lg" clickable>
        {/* Image */}
        <div className="mb-4 bg-primary-dark-gray rounded-lg h-48 flex items-center justify-center border border-primary-gold overflow-hidden relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${year} ${make} ${model}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <p className="text-primary-gold text-3xl">🚗</p>
              <p className="text-primary-silver text-xs mt-2">No Image</p>
            </div>
          )}

          {/* Status badge - top right */}
          <span
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}
          >
            {statusLabels[status]}
          </span>
        </div>

        {/* Vehicle info */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white mb-1 truncate">
            {year} {make} {model}
          </h3>
          <p className="text-sm text-primary-silver mb-3">
            {transmission} • {fuel} • {formatMileage(mileage)}
          </p>

          {/* Price */}
          <p className="text-2xl font-bold text-primary-gold">
            {formatCurrency(price)}
          </p>
        </div>

        {/* CTA */}
        <Button variant="primary" size="sm" fullWidth>
          View Details
        </Button>
      </Card>
    </Link>
  )
  }
