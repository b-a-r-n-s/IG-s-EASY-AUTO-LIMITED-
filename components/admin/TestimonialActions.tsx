'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

interface TestimonialActionsProps {
  testimonialId: string
  isFeatured: boolean
}

export default function TestimonialActions({ testimonialId, isFeatured }: TestimonialActionsProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const toggleFeatured = async () => {
    setIsUpdating(true)
    await fetch('/api/admin/testimonials', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: testimonialId, featured: !isFeatured }),
    })
    setIsUpdating(false)
    router.refresh()
  }

  const handleDelete = async () => {
    setIsUpdating(true)
    await fetch(`/api/admin/testimonials?id=${testimonialId}`, { method: 'DELETE' })
    setIsUpdating(false)
    router.refresh()
  }

  if (showConfirm) {
    return (
      <div className="flex gap-2 flex-shrink-0">
        <Button variant="danger" size="sm" onClick={handleDelete} isLoading={isUpdating}>
          Confirm Delete
        </Button>
        <Button variant="outline" size="sm" onClick={() => setShowConfirm(false)}>
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <div className="flex gap-2 flex-shrink-0">
      <Button variant="outline" size="sm" onClick={toggleFeatured} isLoading={isUpdating}>
        {isFeatured ? 'Unfeature' : 'Feature'}
      </Button>
      <Button variant="ghost" size="sm" onClick={() => setShowConfirm(true)}>
        Delete
      </Button>
    </div>
  )
      }
