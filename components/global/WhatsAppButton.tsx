'use client'

import React from 'react'
import { WHATSAPP } from '@/lib/constants'

export default function WhatsAppButton() {
  const openWhatsApp = () => {
    if (typeof window !== 'undefined') {
      window.location.href = WHATSAPP.url
    }
  }

  return (
    <button
      aria-label="Chat on WhatsApp"
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary-gold text-black px-4 py-2 rounded-full shadow-lg hover:opacity-90 transition-opacity"
      title="Chat on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.52 3.48A11.89 11.89 0 0012.02 0C5.46 0 .34 5.12.34 11.68c0 2.06.54 4.07 1.56 5.86L0 24l6.88-1.77a11.63 11.63 0 005.14 1.2h.02c6.57 0 11.69-5.12 11.69-11.68a11.9 11.9 0 00-3.21-8.77zM12 21.3c-1.67 0-3.31-.45-4.74-1.3l-.34-.2-4.09 1.05 1.1-3.98-.22-.36A9.07 9.07 0 012.7 11.68c0-5 4.07-9.07 9.1-9.07 2.43 0 4.71.95 6.42 2.68a9.03 9.03 0 012.68 6.39c0 5.03-4.07 9.1-9.1 9.1z" />
        <path d="M17.06 14.02c-.21-.10-1.23-.61-1.42-.68-.19-.07-.33-.10-.47.10-.13.21-.50.68-.61.82-.11.14-.22.16-.43.05-.21-.11-.89-.33-1.69-1.05-.63-.56-1.05-1.25-1.17-1.46-.12-.21-.01-.32.09-.42.09-.09.21-.22.32-.33.11-.11.15-.19.23-.32.08-.13.04-.24-.03-.34-.07-.11-.47-1.12-.64-1.53-.17-.41-.34-.35-.47-.36-.12 0-.26-.01-.40-.01-.14 0-.36.05-.55.24-.19.19-.73.71-.73 1.73 0 1.02.75 2 0 2.83.75.83.98 1.13 2.04 1.94 1.06.80 1.88 1.02 2.32 1.13.44.11.70.09.96-.06.26-.15 1.23-.45 1.40-.89.17-.44.17-.82.12-.90-.06-.08-.22-.13-.43-.23z" />
      </svg>
      <span className="font-medium text-sm">WhatsApp</span>
    </button>
  )
}
