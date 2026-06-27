import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import WhatsAppButton from '@/components/global/WhatsAppButton'
import VehicleCard from '@/components/inventory/VehicleCard'
import VehicleInquiryForm from '@/components/inventory/VehicleInquiryForm'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatCurrency, formatMileage } from '@/lib/utils'
import { getVehicleById, getRelatedVehicles } from '@/lib/queries'
import { WHATSAPP } from '@/lib/constants'

export const revalidate = 60

interface PageProps {
  params: { id: string }
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const vehicle = await getVehicleById(params.id)

  if (!vehicle) {
    notFound()
  }

  const relatedVehicles = await getRelatedVehicles(vehicle.id, vehicle.body_type, 3)

  const statusStyles = {
    available: 'bg-green-500 text-white',
    reserved: 'bg-yellow-500 text-black',
    sold: 'bg-red-500 text-white',
  }

  const primaryImage = vehicle.images?.find((img: any) => img.is_primary)?.image_url
    || vehicle.images?.[0]?.image_url

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
              <div className="bg-primary-dark-gray rounded-lg border-2 border-primary-gold h-96 flex items-center justify-center mb-6 relative overflow-hidden">
                {primaryImage ? (
                  <img
                    src={primaryImage}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-5xl mb-4">🚗</p>
                    <p className="text-primary-silver text-sm">No Image Available</p>
                  </div>
                )}
                <span className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold ${statusStyles[vehicle.status as keyof typeof statusStyles]}`}>
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
                  <p className="text-white font-semibold">{vehicle.fuel_type}</p>
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
              {vehicle.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-white mb-3">Description</h2>
                  <p className="text-primary-silver leading-relaxed">{vehicle.description}</p>
                </div>
              )}

              {/* Features */}
              {vehicle.features && vehicle.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-white mb-3">Features</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {vehicle.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-primary-gold">✓</span>
                        <span className="text-white text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Inquiry form + WhatsApp CTA */}
            <div className="lg:col-span-1">
              <Card variant="elevated" padding="lg" className="sticky top-24">
                <h3 className="text-xl font-bold text-white mb-4">Interested in this vehicle?</h3>

                <a href={WHATSAPP.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="md" fullWidth className="mb-4">
                    Chat on WhatsApp
                  </Button>
                </a>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 h-px bg-primary-gold" />
                  <span className="text-primary-silver text-xs">OR</span>
                  <div className="flex-1 h-px bg-primary-gold" />
                </div>

                <VehicleInquiryForm vehicleId={vehicle.id} />
              </Card>
            </div>
          </div>

          {/* Related vehicles */}
          {relatedVehicles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-6">Related Vehicles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedVehicles.map((v) => (
                  <VehicleCard
                    key={v.id}
                    id={v.id}
                    make={v.make}
                    model={v.model}
                    year={v.year}
                    price={v.price}
                    transmission={v.transmission}
                    fuel={v.fuel_type}
                    mileage={v.mileage}
                    status={v.status}
                    imageUrl={v.imageUrl}
                  />
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
