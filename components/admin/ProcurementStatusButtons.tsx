'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

interface ProcurementStatusButtonsProps {
  requestId: string
  currentStatus: string
}

export default function ProcurementStatusButtons({ requestId, currentStatus }: ProcurementStatusButtonsProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const updateStatus = async (newStatus: string) => {
    setIsUpdating(true)

    await fetch('/api/admin/procurement', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: requestId, status: newStatus }),
    })

    setIsUpdating(false)
    router.refresh()
  }

  return (
    <div className="flex gap-2 flex-shrink-0 flex-wrap">
      {currentStatus !== 'in-progress' && currentStatus !== 'completed' && (
        <Button variant="outline" size="sm" onClick={() => updateStatus('in-progress')} isLoading={isUpdating}>
          In Progress
        </Button>
      )}
      {currentStatus !== 'completed' && (
        <Button variant="primary" size="sm" onClick={() => updateStatus('completed')} isLoading={isUpdating}>
          Mark Complete
        </Button>
      )}
    </div>
  )
                            }
