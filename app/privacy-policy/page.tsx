import type { Metadata } from 'next'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import WhatsAppButton from '@/components/global/WhatsAppButton'
import { COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'IG Easy Auto Limited Privacy Policy - how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  const lastUpdated = 'June 2026'

  return (
    <>
      <Header />
      <WhatsAppButton />
      <main id="main-content" className="bg-black min-h-screen pt-8">
        <section className="section-padding bg-black">
          <div className="container-max max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">
              Privacy Policy
            </h1>
            <p className="text-primary-silver text-sm mb-10">Last updated: {lastUpdated}</p>

            <div className="space-y-8 text-primary-silver leading-relaxed">
              <div>
                <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
                <p>
                  {COMPANY.name} ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website {COMPANY.website} or use our services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
                <p className="mb-3">We may collect the following types of information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Personal identification information (name, email address, phone number)</li>
                  <li>Vehicle preferences and procurement requirements</li>
                  <li>Information about vehicles you wish to sell, including photos and condition details</li>
                  <li>Communication records when you contact us via WhatsApp, email, or our contact forms</li>
                  <li>Technical data such as IP address, browser type, and usage patterns when you visit our website</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
                <p className="mb-3">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process vehicle inquiries, procurement requests, and sell-car listings</li>
                  <li>Communicate with you regarding your requests and transactions</li>
                  <li>Improve our website and services</li>
                  <li>Send relevant updates about vehicles or services you've expressed interest in</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">4. How We Share Your Information</h2>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share information with trusted partners strictly for the purpose of completing a transaction (such as documentation or delivery), and only with your knowledge of the transaction in question.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">5. Data Security</h2>
                <p>
                  We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">6. Data Retention</h2>
                <p>
                  We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">7. Your Rights</h2>
                <p className="mb-3">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Request access to the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information, subject to legal requirements</li>
                  <li>Opt out of marketing communications at any time</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">8. Third-Party Links</h2>
                <p>
                  Our website may contain links to third-party services (such as WhatsApp). We are not responsible for the privacy practices of these external services and encourage you to review their respective privacy policies.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">9. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">10. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy or how we handle your information, please contact us at{' '}
                  <a href={`mailto:${COMPANY.email}`} className="text-primary-gold hover:underline">
                    {COMPANY.email}
                  </a>{' '}
                  or call us at{' '}
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
