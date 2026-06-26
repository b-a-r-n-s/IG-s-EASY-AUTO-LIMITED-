import type { Metadata } from 'next'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import WhatsAppButton from '@/components/global/WhatsAppButton'
import { COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'IG Easy Auto Limited Terms of Service - terms and conditions governing use of our website and services.',
}

export default function TermsPage() {
  const lastUpdated = 'June 2026'

  return (
    <>
      <Header />
      <WhatsAppButton />
      <main id="main-content" className="bg-black min-h-screen pt-8">
        <section className="section-padding bg-black">
          <div className="container-max max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">
              Terms of Service
            </h1>
            <p className="text-primary-silver text-sm mb-10">Last updated: {lastUpdated}</p>

            <div className="space-y-8 text-primary-silver leading-relaxed">
              <div>
                <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the {COMPANY.name} website ({COMPANY.website}) or any of our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website or services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">2. Our Services</h2>
                <p>
                  {COMPANY.name} provides vehicle sales, vehicle procurement, and vehicle resale facilitation services. All vehicle listings, prices, and availability are subject to change without notice. Final transaction terms are confirmed directly between {COMPANY.name} and the client.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">3. Vehicle Listings and Pricing</h2>
                <p>
                  While we make every effort to ensure vehicle listings are accurate, we do not guarantee that all information (including pricing, specifications, and availability) is free of errors at all times. Prices displayed are subject to confirmation at the point of transaction.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">4. Procurement Service</h2>
                <p>
                  Our procurement service operates on a best-effort basis. While we maintain a strong success rate, we cannot guarantee that every procurement request will be fulfilled within the stated timeline, as sourcing is subject to market availability.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">5. Sell Your Car Submissions</h2>
                <p>
                  When you submit a vehicle for sale through our platform, you confirm that all information provided is accurate and that you are the legal owner or authorized representative of the vehicle. {COMPANY.name} reserves the right to accept, reject, or request additional information for any listing submitted.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">6. Payments and Transactions</h2>
                <p>
                  All payment terms, deposit requirements, and transaction conditions will be communicated directly during the transaction process. {COMPANY.name} does not process payments through this website; all financial arrangements are handled directly between the parties involved.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">7. Limitation of Liability</h2>
                <p>
                  {COMPANY.name} shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our website or services, including but not limited to delays in procurement, inaccuracies in third-party vehicle information, or disputes arising from private transactions facilitated through our platform.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">8. Intellectual Property</h2>
                <p>
                  All content on this website, including text, graphics, logos, and images, is the property of {COMPANY.name} unless otherwise stated, and may not be reproduced without prior written consent.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">9. Third-Party Communication</h2>
                <p>
                  Our WhatsApp and other communication channels are provided for convenience. {COMPANY.name} is not responsible for the security or availability of third-party messaging platforms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">10. Changes to These Terms</h2>
                <p>
                  We reserve the right to update these Terms of Service at any time. Continued use of our website after changes are posted constitutes acceptance of the revised terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">11. Governing Law</h2>
                <p>
                  These Terms of Service shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">12. Contact Us</h2>
                <p>
                  For questions regarding these Terms of Service, please contact us at{' '}
                  <a href={`mailto:${COMPANY.email}`} className="text-primary-gold hover:underline">
                    {COMPANY.email}
                  </a>{' '}
                  or call{' '}
                  <a href={`tel:${COMPANY.phone1}`} className="text-primary-gold hover:underline">
                    {COMPANY.phone1}
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
        }
