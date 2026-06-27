'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { COMPANY } from '@/lib/constants'

type Props = {
  small?: boolean
  alt?: string
}

export default function SiteLogo({ small = false, alt }: Props) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/site-settings')
        const json = await res.json()
        if (!mounted) return
        if (json?.success && json?.settings?.logo_url) {
          setLogoUrl(json.settings.logo_url)
        }
      } catch (err) {
        // ignore - fallback to COMPANY
      } finally {
        if (mounted) setLoaded(true)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  // small square used in footer/header tight areas
  if (small) {
    return (
      <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={alt || COMPANY.name}
            className="w-10 h-10 rounded-lg object-cover"
            onLoad={() => setLoaded(true)}
          />
        ) : (
          <div className="w-10 h-10 bg-primary-gold rounded-lg flex items-center justify-center">
            <span className="text-black font-heading font-bold text-sm">IG</span>
          </div>
        )}
      </Link>
    )
  }

  // default (header) — logo + text
  return (
    <Link href="/" className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity">
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt={alt || COMPANY.name}
          className="w-12 h-12 rounded-lg object-contain"
          onLoad={() => setLoaded(true)}
        />
      ) : (
        <div className="w-12 h-12 bg-primary-gold rounded-lg flex items-center justify-center">
          <span className="text-black font-heading font-bold text-lg">IG</span>
        </div>
      )}
      <div className="hidden sm:block">
        <p className="text-primary-gold font-heading font-bold text-sm leading-tight">
          IG EASY
        </p>
        <p className="text-primary-silver font-body text-xs leading-tight">
          AUTO LIMITED
        </p>
      </div>
    </Link>
  )
}
