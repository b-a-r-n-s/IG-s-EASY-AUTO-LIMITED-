import Link from 'next/link'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'
import { supabaseAdmin } from '@/lib/supabase'

export const revalidate = 0

async function getAllVehiclesAdmin() {
  if (!supabaseAdmin) return []

  const { data, error } = await supabaseAdmin
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data
}

export default async function AdminVehiclesPage() {
  const vehicles = await getAllVehiclesAdmin()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white mb-1">Vehicles</h1>
          <p className="text-primary-silver text-sm">{vehicles.length} total vehicles</p>
        </div>
        <Link href="/admin/dashboard/vehicles/add">
          <Button variant="primary" size="md">+ Add Vehicle</Button>
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <Card variant="outlined" padding="lg" className="text-center py-16">
          <p className="text-4xl mb-4">🚗</p>
          <p className="text-white font-bold mb-2">No vehicles yet</p>
          <p className="text-primary-silver text-sm mb-6">Add your first vehicle to get started</p>
          <Link href="/admin/dashboard/vehicles/add">
            <Button variant="primary">+ Add Vehicle</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} variant="default" padding="md">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-bold">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        vehicle.status === 'available'
                          ? 'bg-green-500 text-white'
                          : vehicle.status === 'reserved'
                          ? 'bg-yellow-500 text-black'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {vehicle.status}
                    </span>
                    {vehicle.featured && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-gold text-black">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-primary-silver text-sm">
                    {formatCurrency(vehicle.price)} • {vehicle.transmission} • {vehicle.mileage.toLocaleString()} km
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link href={`/admin/dashboard/vehicles/${vehicle.id}`}>
                    <Button variant="outline" size="sm">Edit</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
    }
