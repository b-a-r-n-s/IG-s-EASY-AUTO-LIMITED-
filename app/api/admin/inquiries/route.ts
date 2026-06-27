import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function PATCH(request: Request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 })
    }

    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'ID and status are required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('contact_inquiries')
      .update({ status })
      .eq('id', id)

    if (error) {
      console.error('Update inquiry error:', error)
      return NextResponse.json({ success: false, message: 'Failed to update inquiry' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Inquiry API error:', err)
    return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 })
  }
        }
