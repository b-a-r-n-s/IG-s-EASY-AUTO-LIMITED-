import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function PATCH(request: Request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 })
    }

    const { settings } = await request.json()

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ success: false, message: 'Invalid settings data' }, { status: 400 })
    }

    const updates = Object.entries(settings).map(([key, value]) =>
      supabaseAdmin
        .from('site_settings')
        .upsert({ key, value: String(value), updated_at: new Date().toISOString() }, { onConflict: 'key' })
    )

    await Promise.all(updates)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Settings API error:', err)
    return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 })
  }
                                                                                      }
