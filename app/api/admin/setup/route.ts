import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 })
    }

    const { data: existingAdmin } = await supabaseAdmin
      .from('admins')
      .select('id')
      .eq('email', email)
      .single()

    if (existingAdmin) {
      return NextResponse.json({ success: false, message: 'Admin account already exists' })
    }

    const passwordHash = await hashPassword(password)

    const { error } = await supabaseAdmin.from('admins').insert({
      email,
      password_hash: passwordHash,
      name,
      role: 'admin',
    })

    if (error) {
      console.error('Create admin error:', error)
      return NextResponse.json({ success: false, message: 'Failed to create admin account' })
    }

    return NextResponse.json({ success: true, message: 'Admin account created successfully' })
  } catch (err) {
    console.error('Setup API error:', err)
    return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 })
  }
                       }
