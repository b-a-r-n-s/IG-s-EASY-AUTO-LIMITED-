import type { Metadata } from 'next'
import { COMPANY, PROCUREMENT_SERVICE, SELL_SERVICE, WHY_CHOOSE_US, SEO_DEFAULTS } from '@/lib/constants'
import { getFeaturedVehicles, getFeaturedTestimonials } from '@/lib/queries'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import WhatsAppButton from '@/components/global/WhatsAppButton'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Carousel from '@/components/ui/Carousel'
import VehicleCard from '@/components/inventory/VehicleCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Home',
  description: SEO_DEFAULTS.description,
  keywords: SEO_DEFAULTS.keywords,
  openGraph: {
    title: `${COMPANY.name} - ${COMPANY.tagline}`,
    description: SEO_DEFAULTS.description,
    type: 'website',
  },
}

export const revalidate = 60

export default async function HomePage() {
  const featuredVehicles = await getFeaturedVehicles(4)
  const testimonials = await getFeaturedTestimonials(5)

  return (
    <>
      <Header />
      <WhatsAppButton />
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative min-h-screen bg-gradient-to-b from-black via-primary-dark-gray to-black flex items-center justify-center overflow-hidden pt-16 sm:pt-20 md:pt-24">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-10 w-72 h-72 bg-primary-gold rounded-full mix-blend-screen filter blur-3xl" />
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary-gold rounded-full mix-blend-screen filter blur-3xl" />
          </div>

          <div className="container-max relative z-10 text-center py-16 sm:py-24 md:py-32">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 sm:mb-6 animate-slide-down">
              Premium Vehicle Sales & <span className="text-primary-gold">Procurement</span>
            </h1>

            <p className="text-lg sm:text-xl text-primary-silver max-w-3xl mx-auto mb-8 sm:mb-12 animate-slide-up">
              Experience luxury, reliability, and trust in every transaction. Find your dream car or let us source the perfect vehicle for you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-slide-up">
              <Link href="/inventory">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Browse Vehicles
                </Button>
              </Link>
              <Link href="/procurement">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Request Procurement
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Vehicles Section */}
        <section className="section-padding bg-black">
          <div className="container-max">
            <div className="section-heading">
              <h2>Featured Vehicles</h2>
              <p>Handpicked luxury and premium vehicles available now</p>
            </div>

            {featuredVehicles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {featuredVehicles.map((vehicle) => (
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
                <div className="text-center">
                  <Link href="/inventory">
                    <Button variant="outline" size="lg">
                      View All Vehicles
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-primary-dark-gray rounded-lg border border-primary-gold">
                <p className="text-4xl mb-4">🚗</p>
                <p className="text-white font-bold text-lg mb-2">New vehicles coming soon</p>
                <p className="text-primary-silver text-sm">Check back shortly for our latest inventory</p>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="section-padding bg-primary-dark-gray border-t-2 border-b-2 border-primary-gold">
          <div className="container-max">
            <div className="section-heading">
              <h2>Why Choose IG Easy Auto</h2>
              <p>We deliver excellence in every aspect of our service</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_CHOOSE_US.map((item, index) => (
                <Card key={index} variant="default" padding="lg">
                  <div className="text-4xl mb-4 text-primary-gold">✓</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-primary-silver">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Procurement Service Section */}
        <section className="section-padding bg-black">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
                  {PROCUREMENT_SERVICE.title}
                </h2>
                <p className="text-lg text-primary-silver mb-6">
                  {PROCUREMENT_SERVICE.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Card variant="outlined" padding="md">
                    <p className="text-3xl font-bold text-primary-gold">
                      {PROCUREMENT_SERVICE.successRate}
                    </p>
                    <p className="text-sm text-primary-silver mt-2">Success Rate</p>
                  </Card>
                  <Card variant="outlined" padding="md">
                    <p className="text-lg font-bold text-primary-gold">
                      {PROCUREMENT_SERVICE.timeline}
                    </p>
                    <p className="text-sm text-primary-silver mt-2">Delivery Timeline</p>
                  </Card>
                </div>

                <ul className="space-y-3 mb-8">
                  {PROCUREMENT_SERVICE.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary-gold font-bold mt-1">✓</span>
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/procurement">
                  <Button variant="primary" size="lg">
                    Start Procurement Request
                  </Button>
                </Link>
              </div>

              <div className="bg-primary-dark-gray rounded-lg border-2 border-primary-gold h-96 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-5xl mb-4">🔍</p>
                  <p className="text-primary-gold text-lg font-bold">Professional Vehicle Sourcing</p>
                  <p className="text-primary-silver text-sm mt-2">We find exactly what you're looking for</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sell Your Car Section */}
        <section className="section-padding bg-primary-dark-gray border-t-2 border-primary-gold">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-black rounded-lg border-2 border-primary-gold h-96 flex items-center justify-center order-2 lg:order-1">
                <div className="text-center">
                  <p className="text-5xl mb-4">💰</p>
                  <p className="text-primary-gold text-lg font-bold">Fair Valuation</p>
                  <p className="text-primary-silver text-sm mt-2">Get the best price for your vehicle</p>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
                  {SELL_SERVICE.title}
                </h2>
                <p className="text-lg text-primary-silver mb-6">
                  {SELL_SERVICE.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {SELL_SERVICE.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary-gold font-bold mt-1">✓</span>
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/sell-your-car">
                  <Button variant="primary" size="lg">
                    Sell Your Car Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding bg-black">
          <div className="container-max">
            <div className="section-heading">
              <h2>What Our Clients Say</h2>
              <p>Real experiences from satisfied customers</p>
            </div>

            {testimonials.length > 0 ? (
              <div className="max-w-4xl mx-auto">
                <Carousel autoplay autoplayDelay={5000} showDots showArrows>
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="px-2">
                      <Card variant="elevated" padding="lg">
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <span key={i} className="text-primary-gold text-lg">
                              ★
                            </span>
                          ))}
                        </div>

                        <p className="text-lg text-white italic mb-6">
                          "{testimonial.quote}"
                        </p>

                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center text-black font-bold">
                            {testimonial.customer_name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-white">{testimonial.customer_name}</p>
                            <p className="text-sm text-primary-silver">{testimonial.customer_role}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </Carousel>
              </div>
            ) : null}
          </div>
        </section>

        {/* Meet the CEO Section */}
        <section className="section-padding bg-primary-dark-gray border-t-2 border-primary-gold">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-primary-gold to-primary-dark-gold rounded-lg flex items-center justify-center border-2 border-primary-gold">
                  <div className="text-center">
                    <p className="text-6xl mb-4">👤</p>
                    <p className="text-black text-sm font-bold">CEO Photo</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">
                  {COMPANY.ceo}
                </h2>
                <p className="text-primary-gold font-semibold mb-6">{COMPANY.ceoTitle}</p>

                <p className="text-lg text-primary-silver mb-6 leading-relaxed">
                  Emmanuel leads IG Easy Auto Limited with a vision to transform the automotive sales and procurement industry in Nigeria. With years of experience and a passion for excellence, he ensures every customer receives the highest level of service.
                </p>

                <p className="text-lg text-primary-silver mb-6 leading-relaxed">
                  His commitment to quality, reliability, and customer satisfaction has earned IG Easy Auto Limited a reputation as a trusted leader in premium vehicle sales and procurement.
                </p>

                <Link href="/about">
                  <Button variant="outline" size="lg">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="section-padding bg-black">
          <div className="container-max text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              Ready to Find Your Dream Vehicle?
            </h2>

            <p className="text-xl text-primary-silver max-w-2xl mx-auto mb-8">
              Whether you're looking to buy, procure, or sell, we're here to help. Get in touch with us today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link href="/inventory">
                <Button variant="primary" size="lg">
                  Explore Inventory
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
