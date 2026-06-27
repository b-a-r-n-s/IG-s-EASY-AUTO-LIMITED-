'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

interface SellCarStatusButtonsProps {
  requestId: string
  currentStatus: string
}

export default function SellCarStatusButtons({ requestId, currentStatus }: SellCarStatusButtonsProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const updateStatus = async (newStatus: string) => {
    setIsUpdating(true)

    await fetch('/api/admin/sell-car', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: requestId, status: newStatus }),
    })

    setIsUpdating(false)
    router.refresh()
  }

  return (
    <div className="flex gap-2 flex-shrink-0 flex-wrap">
      {currentStatus === 'new' && (
        <Button variant="outline" size="sm" onClick={() => updateStatus('reviewed')} isLoading={isUpdating}>
          Mark Reviewed
        </Button>
      )}
      {currentStatus !== 'contacted' && (
        <Button variant="primary" size="sm" onClick={() => updateStatus('contacted')} isLoading={isUpdating}>
          Confirm & Contact
        </Button>
      )}
    </div>
  )
    }
