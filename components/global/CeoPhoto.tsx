'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { COMPANY } from '@/lib/constants'

type Props = {
  size?: number // pixel size of square
  alt?: string
}

export default function CeoPhoto({ size = 256, alt }: Props) {
  const [url, setUrl] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/site-settings')
        const json = await res.json()
        if (!mounted) return
        if (json?.success && json?.settings?.ceo_photo_url) {
          setUrl(json.settings.ceo_photo_url)
        }
      } catch (err) {
        // ignore
      } finally {
        if (mounted) setLoaded(true)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div
      className="rounded-lg flex items-center justify-center border-2 border-primary-gold overflow-hidden"
      style={{ width: size, height: size, background: 'linear-gradient(135deg,#D4AF37,#B8860B)' }}
    >
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={alt || COMPANY.ceo}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <div className="text-center p-4">
          <p className="text-6xl mb-4">👤</p>
          <p className="text-black text-sm font-bold">CEO Photo</p>
        </div>
      )}
    </div>
  )
}
