'use client'

import React, { useState } from 'react'
import { upload } from '@vercel/blob/client'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

/*import React, { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'*/

export default function AdminMediaPage() {
  const [videoUrl, setVideoUrl] = useState('')
  const [posterUrl, setPosterUrl] = useState('')
  const [isUploadingVideo, setIsUploadingVideo] = useState(false)
  const [isUploadingPoster, setIsUploadingPoster] = useState(false)
  const [message, setMessage] = useState('')

  /*const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/admin/upload-media', {
      method: 'POST',
      body: formData,
    })
    const result = await res.json()

    if (!result.success) {
      setMessage(result.message || 'Upload failed')
      return null
    }
    return result.url
  }*/

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/admin/upload-media',
      })
      return blob.url
    } catch (err: any) {
      console.error('Upload error:', err)
      setMessage(err?.message || 'Upload failed — check your connection and try again')
      return null
    }
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingVideo(true)
    setMessage('')
    const url = await uploadFile(file)
    setIsUploadingVideo(false)

    if (url) {
      setVideoUrl(url)
      setMessage('Video uploaded — now save below')
    }
  }

  const handlePosterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingPoster(true)
    setMessage('')
    const url = await uploadFile(file)
    setIsUploadingPoster(false)

    if (url) {
      setPosterUrl(url)
      setMessage('Poster image uploaded — now save below')
    }
  }

  const handleSave = async () => {
    setMessage('')
    const res = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        settings: {
          hero_video_url: videoUrl,
          hero_poster_url: posterUrl,
        },
      }),
    })
    const result = await res.json()
    setMessage(result.success ? 'Saved! Hero video is now live.' : 'Failed to save settings')
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white mb-6">Hero Media</h1>

      <Card variant="elevated" padding="lg" className="max-w-2xl space-y-6">
        <div>
          <label className="mb-2 text-sm font-semibold text-white block">
            Hero Video (5 seconds, under 4.5MB, MP4)
          </label>
          <input
            type="file"
            accept="video/mp4"
            onChange={handleVideoUpload}
            className="w-full bg-primary-dark-gray text-white border-2 border-primary-gold rounded-lg px-4 py-2.5 file:bg-primary-gold file:text-black file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 file:font-semibold"
          />
          {isUploadingVideo && <p className="text-primary-gold text-sm mt-2">Uploading video...</p>}
          {videoUrl && !isUploadingVideo && (
            <video src={videoUrl} className="w-full mt-3 rounded-lg border border-primary-gold" autoPlay loop muted playsInline />
          )}
        </div>

        <div>
          <label className="mb-2 text-sm font-semibold text-white block">
            Poster Image (shown instantly while video loads)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePosterUpload}
            className="w-full bg-primary-dark-gray text-white border-2 border-primary-gold rounded-lg px-4 py-2.5 file:bg-primary-gold file:text-black file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 file:font-semibold"
          />
          {isUploadingPoster && <p className="text-primary-gold text-sm mt-2">Uploading image...</p>}
          {posterUrl && !isUploadingPoster && (
            <img src={posterUrl} alt="Poster preview" className="w-full mt-3 rounded-lg border border-primary-gold" />
          )}
        </div>

        {message && <p className="text-primary-gold text-sm">{message}</p>}

        <Button variant="primary" size="lg" onClick={handleSave} disabled={!videoUrl && !posterUrl}>
          Save & Activate
        </Button>
      </Card>
    </div>
  )
    }
