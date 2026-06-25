import type { Metadata } from 'next'
import { SEO_DEFAULTS, COMPANY, GA4_ID } from '@/lib/constants'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.igeasyauto.com'),
  title: {
    default: `${COMPANY.name} - ${COMPANY.tagline}`,
    template: `%s | ${COMPANY.name}`,
  },
  description: SEO_DEFAULTS.description,
  keywords: SEO_DEFAULTS.keywords,
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://www.igeasyauto.com',
    siteName: COMPANY.name,
    title: `${COMPANY.name} - ${COMPANY.tagline}`,
    description: SEO_DEFAULTS.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: COMPANY.name,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY.name} - ${COMPANY.tagline}`,
    description: SEO_DEFAULTS.description,
    images: ['/twitter-image.png'],
  },
  appLinks: {
    ios: {
      app_store_id: 'id123456789',
      app_name: COMPANY.name,
    },
    android: {
      package: 'com.igeasyauto.app',
      app_name: COMPANY.name,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
}

export const viewport = {
  themeColor: '#D4AF37',
  colorScheme: 'dark',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@700&display=swap"
          rel="stylesheet"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Google Analytics */}
        {GA4_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA4_ID}');
                `,
              }}
            />
          </>
        )}

        {/* Schema Markup - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: COMPANY.name,
              image: '/logo.png',
              description: SEO_DEFAULTS.description,
              url: COMPANY.website,
              telephone: COMPANY.phone1,
              email: COMPANY.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: COMPANY.address,
                addressLocality: 'Karu',
                addressRegion: 'Nasarawa State',
                postalCode: '',
                addressCountry: 'NG',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                  ],
                  opens: '08:00',
                  closes: '18:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Sunday',
                  opens: '10:00',
                  closes: '18:00',
                },
              ],
              priceRange: '₦2,000,000 - ₦50,000,000',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '150',
              },
            }),
          }}
        />

        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/space-grotesk.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/ibm-plex-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>

      <body className="bg-black text-white">
        {/* Skip to main content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-gold focus:text-black"
        >
          Skip to main content
        </a>

        {/* Main content */}
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
    }
