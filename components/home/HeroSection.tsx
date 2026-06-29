'use client'

import React from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

interface HeroSectionProps {
  videoUrl?: string
  posterUrl?: string
}

export default function HeroSection({ videoUrl, posterUrl }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 md:pt-24">
      <div className="absolute inset-0 z-0">
        {videoUrl ? (
          <video autoPlay loop muted playsInline poster={posterUrl} className="w-full h-full object-cover">
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : posterUrl ? (
          <img src={posterUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-black via-primary-dark-gray to-black" />
        )}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="absolute inset-0 opacity-20 z-[1]">
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary-gold rounded-full mix-blend-screen filter blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary-gold rounded-full mix-blend-screen filter blur-3xl" />
      </div>

      <div className="container-max relative z-10 text-center py-16 sm:py-24 md:py-32 animate-slide-up">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 sm:mb-6">
          Premium Vehicle Sales & <span className="text-primary-gold">Procurement</span>
        </h1>

        <p className="text-lg sm:text-xl text-primary-silver max-w-3xl mx-auto mb-8 sm:mb-12">
          Experience luxury, reliability, and trust in every transaction. Find your dream car or let us source the perfect vehicle for you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link href="/inventory">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">Browse Vehicles</Button>
          </Link>
          <Link href="/procurement">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">Request Procurement</Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">Contact Us</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
