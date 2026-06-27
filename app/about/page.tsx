import type { Metadata } from 'next'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import WhatsAppButton from '@/components/global/WhatsAppButton'
import Card from '@/components/ui/Card'
import CeoPhoto from '@/components/global/CeoPhoto'
import { COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about IG Easy Auto Limited, our mission, vision, and commitment to premium vehicle sales and procurement.',
}

const CORE_VALUES = [
  {
    title: 'Integrity',
    description: 'Every transaction is built on honesty and transparency. What we say is what you get.',
  },
  {
    title: 'Excellence',
    description: 'We hold ourselves to the highest standard in every vehicle we source and every client we serve.',
  },
  {
    title: 'Reliability',
    description: 'When we commit to a timeline or a promise, we deliver. Our track record speaks for itself.',
  },
  {
    title: 'Customer-First',
    description: 'Your satisfaction guides every decision we make, from first contact to final handshake.',
  },
  {
    title: 'Discretion',
    description: 'We handle every client relationship with the privacy and professionalism it deserves.',
  },
  {
    title: 'Continuous Growth',
    description: 'We constantly refine our processes to serve you faster and better than before.',
  },
]

const ACHIEVEMENTS = [
  { number: '91.56%', label: 'Procurement Success Rate' },
  { number: '30-50', label: 'Vehicles in Inventory' },
  { number: '1-2', label: 'Weeks Average Delivery' },
  { number: '100%', label: 'Commitment to Quality' },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <WhatsAppButton />
      <main id="main-content" className="bg-black min-h-screen pt-8">
        {/* Hero */}
        <section className="section-padding-small bg-gradient-to-b from-black via-primary-dark-gray to-black">
          <div className="container-max text-center">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
              About {COMPANY.name}
            </h1>
            <p className="text-lg text-primary-silver max-w-2xl mx-auto">
              {COMPANY.tagline}
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="section-padding bg-black">
          <div className="container-max max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-white mb-6 text-center">Our Story</h2>
            <p className="text-primary-silver leading-relaxed mb-4">
              IG Easy Auto Limited was founded on a simple but powerful idea: buying, selling, and sourcing vehicles in Nigeria should not be a stressful, uncertain experience. Too many people have been burned by unreliable dealers, hidden defects, or procurement promises that never materialize.
            </p>
            <p className="text-primary-silver leading-relaxed mb-4">
              We set out to change that. Operating from our base in Karu, Nasarawa State, we built a business around three things our clients consistently told us they wanted most: genuine vehicles, honest pricing, and people who actually follow through on their word.
            </p>
            <p className="text-primary-silver leading-relaxed">
              Today, IG Easy Auto Limited serves clients across vehicle sales, procurement, and vehicle resale, backed by a process refined through real transactions and real relationships. Every car that passes through our hands is treated as if we were buying it for our own family.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-primary-dark-gray border-t-2 border-b-2 border-primary-gold">
          <div className="container-max">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card variant="outlined" padding="lg">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
                <p className="text-primary-silver leading-relaxed">
                  To make vehicle ownership and resale a transparent, dependable experience for every client, by combining careful sourcing, honest dealings, and dedicated follow-through on every transaction.
                </p>
              </Card>
              <Card variant="outlined" padding="lg">
                <div className="text-3xl mb-4">🔭</div>
                <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
                <p className="text-primary-silver leading-relaxed">
                  To become Nigeria's most trusted name in premium vehicle sales and procurement, known not for the size of our inventory, but for the certainty our clients feel doing business with us.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section-padding bg-black">
          <div className="container-max">
            <div className="section-heading">
              <h2>Our Core Values</h2>
              <p>The principles that guide every decision we make</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CORE_VALUES.map((value, index) => (
                <Card key={index} variant="default" padding="lg">
                  <h3 className="text-lg font-bold text-primary-gold mb-2">{value.title}</h3>
                  <p className="text-primary-silver text-sm leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="section-padding-small bg-primary-dark-gray border-t-2 border-primary-gold">
          <div className="container-max">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {ACHIEVEMENTS.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-primary-gold mb-1">{stat.number}</p>
                  <p className="text-primary-silver text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CEO Profile */}
        <section className="section-padding bg-black">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
              <div className="flex justify-center order-2 lg:order-1">
               <CeoPhoto size={256} /> 
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-heading font-bold text-white mb-2">{COMPANY.ceo}</h2>
                <p className="text-primary-gold font-semibold mb-6">{COMPANY.ceoTitle}</p>
                <p className="text-primary-silver leading-relaxed mb-4">
                  Emmanuel founded IG Easy Auto Limited with a clear conviction: the vehicle market in Nigeria works best when trust is treated as the product, not just the marketing.
                </p>
                <p className="text-primary-silver leading-relaxed">
                  Under his leadership, the company has built a reputation for follow-through, fair pricing, and a procurement process that consistently delivers what it promises. He remains personally involved in major client relationships and every vehicle that carries the IG Easy Auto name.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Clients Trust Us */}
        <section className="section-padding bg-primary-dark-gray border-t-2 border-primary-gold">
          <div className="container-max max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold text-white mb-6">Why Clients Trust Us</h2>
            <p className="text-primary-silver leading-relaxed mb-4">
              Trust isn't claimed, it's earned through consistency. Our clients return to us and refer others because we do what we say we'll do, every time, without exception.
            </p>
            <p className="text-primary-silver leading-relaxed">
              From the first WhatsApp message to the final handshake, we treat every client relationship as one we intend to keep for the long term.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
  }
