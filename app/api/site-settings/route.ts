import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value')

    if (error) {
      console.error('Error fetching site settings:', error)
      return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 })
    }

    const settings: Record<string, string> = {}
    data?.forEach((row: any) => {
      settings[row.key] = row.value
    })

    return NextResponse.json({ success: true, settings })
  } catch (err) {
    console.error('Site settings GET error:', err)
    return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 })
  }
}
