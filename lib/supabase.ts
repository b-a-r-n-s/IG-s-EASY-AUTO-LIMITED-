import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (service role key)
import { createClient as createServiceClient } from '@supabase/supabase-js'

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabaseAdmin = supabaseServiceKey
  ? createServiceClient(supabaseUrl, supabaseServiceKey)
  : null

// Type definitions for database
export type Database = {
  public: {
    Tables: {
      vehicles: {
        Row: {
          id: string
          make: string
          model: string
          year: number
          price: number
          transmission: string
          fuel_type: string
          body_type: string
          mileage: number
          condition: string
          description: string
          status: 'available' | 'reserved' | 'sold'
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['vehicles']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['vehicles']['Insert']>
      }
      vehicle_images: {
        Row: {
          id: string
          vehicle_id: string
          image_url: string
          is_primary: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['vehicle_images']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['vehicle_images']['Insert']>
      }
      vehicle_categories: {
        Row: {
          id: string
          make: string
          model: string
        }
        Insert: Omit<Database['public']['Tables']['vehicle_categories']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['vehicle_categories']['Insert']>
      }
      testimonials: {
        Row: {
          id: string
          customer_name: string
          customer_role: string
          quote: string
          rating: number
          avatar_url: string | null
          featured: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>
      }
      contact_inquiries: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          message: string
          vehicle_id: string | null
          status: 'new' | 'contacted' | 'closed'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['contact_inquiries']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['contact_inquiries']['Insert']>
      }
      procurement_requests: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          desired_vehicle: string
          budget: number
          requirements: string
          status: 'new' | 'in-progress' | 'completed'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['procurement_requests']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['procurement_requests']['Insert']>
      }
      sell_car_requests: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          vehicle_make: string
          vehicle_model: string
          vehicle_year: number
          mileage: number
          price_expectation: number
          condition: string
          photos_urls: string[]
          notes: string
          status: 'new' | 'reviewed' | 'contacted'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['sell_car_requests']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['sell_car_requests']['Insert']>
      }
      admins: {
        Row: {
          id: string
          email: string
          password_hash: string
          name: string
          role: 'admin' | 'superadmin'
          last_login: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['admins']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['admins']['Insert']>
      }
      activity_logs: {
        Row: {
          id: string
          admin_id: string
          action: string
          entity_type: string
          entity_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['activity_logs']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['activity_logs']['Insert']>
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['site_settings']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['site_settings']['Insert']>
      }
    }
  }
}
