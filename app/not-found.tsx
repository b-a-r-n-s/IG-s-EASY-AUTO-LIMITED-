import Link from 'next/link'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import WhatsAppButton from '@/components/global/WhatsAppButton'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Header />
      <WhatsAppButton />
      <main id="main-content" className="bg-black min-h-screen flex items-center justify-center pt-20 pb-20">
        <div className="container-max text-center max-w-2xl">
          <p className="text-7xl sm:text-8xl font-heading font-bold text-primary-gold mb-4">
            404
          </p>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-primary-silver mb-8">
            The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button variant="primary" size="lg">
                Back to Home
              </Button>
            </Link>
            <Link href="/inventory">
              <Button variant="outline" size="lg">
                Browse Vehicles
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
            }
