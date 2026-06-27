import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 })
    }

    const { customerName, customerRole, quote, rating, featured } = await request.json()

    const { error } = await supabaseAdmin.from('testimonials').insert({
      customer_name: customerName,
      customer_role: customerRole || null,
      quote,
      rating: parseInt(rating) || 5,
      featured: featured || false,
    })

    if (error) {
      console.error('Create testimonial error:', error)
      return NextResponse.json({ success: false, message: 'Failed to create testimonial' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 })
    }

    const { id, featured } = await request.json()

    const { error } = await supabaseAdmin
      .from('testimonials')
      .update({ featured })
      .eq('id', id)

    if (error) {
      return NextResponse.json({ success: false, message: 'Failed to update testimonial' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin.from('testimonials').delete().eq('id', id)

    if (error) {
      return NextResponse.json({ success: false, message: 'Failed to delete testimonial' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 })
  }
      }
