'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

interface InquiryStatusButtonsProps {
  inquiryId: string
  currentStatus: string
}

export default function InquiryStatusButtons({ inquiryId, currentStatus }: InquiryStatusButtonsProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const updateStatus = async (newStatus: string) => {
    setIsUpdating(true)

    await fetch('/api/admin/inquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: inquiryId, status: newStatus }),
    })

    setIsUpdating(false)
    router.refresh()
  }

  return (
    <div className="flex gap-2 flex-shrink-0">
      {currentStatus !== 'contacted' && (
        <Button variant="outline" size="sm" onClick={() => updateStatus('contacted')} isLoading={isUpdating}>
          Mark Contacted
        </Button>
      )}
      {currentStatus !== 'closed' && (
        <Button variant="ghost" size="sm" onClick={() => updateStatus('closed')} isLoading={isUpdating}>
          Close
        </Button>
      )}
    </div>
  )
      }
