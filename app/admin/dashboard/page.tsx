import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

async function getDashboardStats() {
  const [vehicles, inquiries, procurement, sellRequests] = await Promise.all([
    supabase.from('vehicles').select('id', { count: 'exact', head: true }),
    supabase.from('contact_inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('procurement_requests').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('sell_car_requests').select('id', { count: 'exact', head: true }).eq('status', 'new'),
  ])

  return {
    totalVehicles: vehicles.count || 0,
    newInquiries: inquiries.count || 0,
    newProcurement: procurement.count || 0,
    newSellRequests: sellRequests.count || 0,
  }
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white mb-2">Dashboard</h1>
      <p className="text-primary-silver mb-8">Welcome back. Here's what's happening today.</p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <Card variant="outlined" padding="md">
          <p className="text-3xl font-bold text-primary-gold">{stats.totalVehicles}</p>
          <p className="text-sm text-primary-silver mt-1">Total Vehicles</p>
        </Card>
        <Card variant="outlined" padding="md">
          <p className="text-3xl font-bold text-primary-gold">{stats.newInquiries}</p>
          <p className="text-sm text-primary-silver mt-1">New Inquiries</p>
        </Card>
        <Card variant="outlined" padding="md">
          <p className="text-3xl font-bold text-primary-gold">{stats.newProcurement}</p>
          <p className="text-sm text-primary-silver mt-1">Procurement Requests</p>
        </Card>
        <Card variant="outlined" padding="md">
          <p className="text-3xl font-bold text-primary-gold">{stats.newSellRequests}</p>
          <p className="text-sm text-primary-silver mt-1">Sell Requests</p>
        </Card>
      </div>

      {/* Quick actions */}
      <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/admin/dashboard/vehicles/add">
          <Card variant="default" padding="lg" hover clickable>
            <p className="text-3xl mb-2">➕</p>
            <p className="text-white font-semibold">Add Vehicle</p>
          </Card>
        </Link>
        <Link href="/admin/dashboard/vehicles">
          <Card variant="default" padding="lg" hover clickable>
            <p className="text-3xl mb-2">🚗</p>
            <p className="text-white font-semibold">Manage Vehicles</p>
          </Card>
        </Link>
        <Link href="/admin/dashboard/inquiries">
          <Card variant="default" padding="lg" hover clickable>
            <p className="text-3xl mb-2">📩</p>
            <p className="text-white font-semibold">View Inquiries</p>
          </Card>
        </Link>
        <Link href="/admin/dashboard/testimonials">
          <Card variant="default" padding="lg" hover clickable>
            <p className="text-3xl mb-2">⭐</p>
            <p className="text-white font-semibold">Testimonials</p>
          </Card>
        </Link>
      </div>
    </div>
  )
                                                        }
