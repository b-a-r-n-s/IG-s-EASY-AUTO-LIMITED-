'use client'

import React from 'react'
import Link from 'next/link'
import { COMPANY, FOOTER_LINKS, BUSINESS_HOURS, WHATSAPP } from '@/lib/constants'
import Button from '@/components/ui/Button'
import SiteLogo from '@/components/global/SiteLogo'

export default function Footer() {
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
  const todayHours = BUSINESS_HOURS[currentDay as keyof typeof BUSINESS_HOURS]

  return (
    <footer className="bg-black border-t-2 border-primary-gold">
      {/* Main footer content */}
      <div className="container-max py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            {/* Logo */}
            <SiteLogo small />

            {/* Tagline */}
            <p className="text-primary-silver text-sm leading-relaxed">
              {COMPANY.tagline}
            </p>

            {/* Description */}
            <p className="text-primary-silver text-sm leading-relaxed">
              Premium vehicle sales and procurement services you can trust.
            </p>

            {/* WhatsApp CTA */}
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={() => window.location.href = WHATSAPP.url}
              className="mt-2"
            >
              Chat on WhatsApp
            </Button>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-primary-gold text-sm uppercase tracking-wide">
              Company
            </h4>
            <nav className="flex flex-col gap-2">
              {FOOTER_LINKS.company.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-primary-silver hover:text-primary-gold transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-primary-gold text-sm uppercase tracking-wide">
              Services
            </h4>
            <nav className="flex flex-col gap-2">
              {FOOTER_LINKS.services.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-primary-silver hover:text-primary-gold transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-primary-gold text-sm uppercase tracking-wide">
              Contact Us
            </h4>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <p className="text-primary-silver text-xs uppercase tracking-wide font-semibold">Phone</p>
              <a
                href={`tel:${COMPANY.phone1}`}
                className="text-white hover:text-primary-gold transition-colors text-sm"
              >
                {COMPANY.phone1}
              </a>
              <a
                href={`tel:${COMPANY.phone2}`}
                className="text-white hover:text-primary-gold transition-colors text-sm"
              >
                {COMPANY.phone2}
              </a>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 pt-2 border-t border-primary-dark-gray">
              <p className="text-primary-silver text-xs uppercase tracking-wide font-semibold">Email</p>
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-white hover:text-primary-gold transition-colors text-sm break-all"
              >
                {COMPANY.email}
              </a>
            </div>

            {/* Hours */}
            <div className="flex flex-col gap-2 pt-2 border-t border-primary-dark-gray">
              <p className="text-primary-silver text-xs uppercase tracking-wide font-semibold">Hours Today</p>
              <p className="text-white text-sm">
                {todayHours.open} - {todayHours.close}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-primary-gold via-transparent to-primary-gold my-8 lg:my-12" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Copyright */}
          <p className="text-primary-silver text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center justify-center sm:justify-end gap-4">
            <Link
              href="/privacy-policy"
              className="text-primary-silver hover:text-primary-gold transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <span className="text-primary-silver">•</span>
            <Link
              href="/terms"
              className="text-primary-silver hover:text-primary-gold transition-colors text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* SEO Schema - Business Hours */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: COMPANY.name,
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
          }),
        }}
      />
    </footer>
  )
              }
