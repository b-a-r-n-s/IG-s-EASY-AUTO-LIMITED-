'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { COMPANY, NAVIGATION, WHATSAPP } from '@/lib/constants'
import Button from '@/components/ui/Button'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-black border-b-2 border-primary-gold shadow-lg">
      <div className="container-max">
        {/* Header content */}
        <div className="flex items-center justify-between py-4 sm:py-5">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={closeMobileMenu}
          >
            {/* Logo text as placeholder - replace with actual logo later */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-gold rounded-lg flex items-center justify-center">
                <span className="text-black font-heading font-bold text-sm">IG</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-primary-gold font-heading font-bold text-sm leading-tight">
                  IG EASY
                </p>
                <p className="text-primary-silver font-body text-xs leading-tight">
                  AUTO LIMITED
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAVIGATION.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-white hover:text-primary-gold transition-colors font-body text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = WHATSAPP.url}
            >
              WhatsApp
            </Button>
            <Link href="/contact" className="hidden md:block">
              <Button variant="primary" size="sm">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center hover:opacity-75 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`w-6 h-0.5 bg-primary-gold transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-primary-gold transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-primary-gold transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden border-t border-primary-gold py-4 pb-4">
            <div className="flex flex-col gap-2">
              {NAVIGATION.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="px-4 py-3 text-white hover:bg-primary-dark-gray hover:text-primary-gold transition-colors font-body text-sm font-medium rounded"
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="flex gap-2 pt-2 border-t border-primary-gold mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    window.location.href = WHATSAPP.url
                    closeMobileMenu()
                  }}
                >
                  WhatsApp
                </Button>
                <Link href="/contact" className="flex-1" onClick={closeMobileMenu}>
                  <Button variant="primary" size="sm" fullWidth>
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
                            }
