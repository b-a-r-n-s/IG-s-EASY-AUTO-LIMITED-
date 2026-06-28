import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const form = await request.formData()
    const file = form.get('file') as File | null

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 })
    }

    if (file.size > 4.5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'File too large. Please compress to under 4.5MB.' },
        { status: 400 }
      )
    }

    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
    })

    return NextResponse.json({ success: true, url: blob.url })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 })
  }
  }
