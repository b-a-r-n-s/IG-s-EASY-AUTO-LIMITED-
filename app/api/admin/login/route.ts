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
    const { email, password } = await request.json()

    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 })
    }

    const { data: admin, error } = await supabaseAdmin
      .from('admins')
      .select('id, email, password_hash, name')
      .eq('email', email)
      .single()

    if (error || !admin) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' })
    }

    const hashedInput = await hashPassword(password)

    if (hashedInput !== admin.password_hash) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' })
    }

    await supabaseAdmin
      .from('admins')
      .update({ last_login: new Date().toISOString() })
      .eq('id', admin.id)

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      admin: { id: admin.id, email: admin.email, name: admin.name },
    })
  } catch (err) {
    console.error('Login API error:', err)
    return NextResponse.json({ success: false, message: 'An error occurred during login' }, { status: 500 })
  }
}
