import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import WhatsAppButton from '@/components/global/WhatsAppButton'
import InventoryClient from '@/components/inventory/InventoryClient'
import { getAllVehicles } from '@/lib/queries'

export const revalidate = 60

export default async function InventoryPage() {
  const vehicles = await getAllVehicles()

  return (
    <>
      <Header />
      <WhatsAppButton />
      <main id="main-content" className="bg-black min-h-screen pt-8">
        <div className="container-max section-padding-small">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">
              Vehicle Inventory
            </h1>
            <p className="text-primary-silver">
              Browse our collection of {vehicles.length} premium vehicle{vehicles.length !== 1 ? 's' : ''}
            </p>
          </div>

          <InventoryClient initialVehicles={vehicles} />
        </div>
      </main>
      <Footer />
    </>
  )
}
