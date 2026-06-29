import { supabase } from './supabase'

export interface VehicleWithImage {
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
  description: string | null
  status: 'available' | 'reserved' | 'sold'
  featured: boolean
  created_at: string
  imageUrl?: string
}

/**
 * Fetch all vehicles, with their primary image
 */
export async function getAllVehicles(): Promise<VehicleWithImage[]> {
  const { data: vehicles, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !vehicles) {
    console.error('Error fetching vehicles:', error)
    return []
  }

  // Fetch primary images for all vehicles
  const { data: images } = await supabase
    .from('vehicle_images')
    .select('vehicle_id, image_url, is_primary')
    .eq('is_primary', true)

  const imageMap = new Map(images?.map((img) => [img.vehicle_id, img.image_url]) || [])

  return vehicles.map((v) => ({
    ...v,
    fuel: v.fuel_type,
    imageUrl: imageMap.get(v.id),
  }))
}

/**
 * Fetch featured vehicles only (for home page)
 */
export async function getFeaturedVehicles(limit = 4): Promise<VehicleWithImage[]> {
  const { data: vehicles, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('featured', true)
    .eq('status', 'available')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error || !vehicles) {
    console.error('Error fetching featured vehicles:', error)
    return []
  }

  const { data: images } = await supabase
    .from('vehicle_images')
    .select('vehicle_id, image_url, is_primary')
    .eq('is_primary', true)

  const imageMap = new Map(images?.map((img) => [img.vehicle_id, img.image_url]) || [])

  return vehicles.map((v) => ({
    ...v,
    fuel: v.fuel_type,
    imageUrl: imageMap.get(v.id),
  }))
}

/**
 * Fetch a single vehicle by ID, with all images and features
 */
export async function getVehicleById(id: string) {
  const { data: vehicle, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !vehicle) {
    return null
  }

  const { data: images } = await supabase
    .from('vehicle_images')
    .select('image_url, is_primary')
    .eq('vehicle_id', id)

  const { data: features } = await supabase
    .from('vehicle_features')
    .select('feature_name')
    .eq('vehicle_id', id)

  return {
    ...vehicle,
    fuel: vehicle.fuel_type,
    images: images || [],
    features: features?.map((f) => f.feature_name) || [],
  }
}

/**
 * Fetch related vehicles (same body type, excluding current vehicle)
 */
export async function getRelatedVehicles(currentId: string, bodyType: string, limit = 3) {
  const { data: vehicles, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('body_type', bodyType)
    .neq('id', currentId)
    .eq('status', 'available')
    .limit(limit)

  if (error || !vehicles) {
    return []
  }

  const { data: images } = await supabase
    .from('vehicle_images')
    .select('vehicle_id, image_url, is_primary')
    .eq('is_primary', true)

  const imageMap = new Map(images?.map((img) => [img.vehicle_id, img.image_url]) || [])

  return vehicles.map((v) => ({
    ...v,
    fuel: v.fuel_type,
    imageUrl: imageMap.get(v.id),
  }))
}

/**
 * Fetch featured testimonials
 */
export async function getFeaturedTestimonials(limit = 5) {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error || !data) {
    console.error('Error fetching testimonials:', error)
    return []
  }

  return data
  }

export async function getHeroMedia(): Promise<{ videoUrl?: string; posterUrl?: string }> {
  const { data } = await supabase
    .from('site_settings')
    .select('key, value')
    .in('key', ['hero_video_url', 'hero_poster_url'])

  const videoUrl = data?.find((s) => s.key === 'hero_video_url')?.value || undefined
  const posterUrl = data?.find((s) => s.key === 'hero_poster_url')?.value || undefined

  return { videoUrl, posterUrl }
}
