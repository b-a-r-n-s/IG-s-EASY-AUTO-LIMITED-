import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 })
    }

    const body = await request.json()
    const {
      make,
      model,
      year,
      price,
      transmission,
      fuelType,
      bodyType,
      mileage,
      condition,
      description,
      status,
      featured,
      features,
      imageUrls,
    } = body

    // Insert vehicle
    const { data: vehicle, error: vehicleError } = await supabaseAdmin
      .from('vehicles')
      .insert({
        make,
        model,
        year: parseInt(year),
        price: parseFloat(price),
        transmission,
        fuel_type: fuelType,
        body_type: bodyType,
        mileage: parseInt(mileage),
        condition,
        description: description || null,
        status: status || 'available',
        featured: featured || false,
      })
      .select()
      .single()

    if (vehicleError || !vehicle) {
      console.error('Vehicle insert error:', vehicleError)
      return NextResponse.json({ success: false, message: 'Failed to create vehicle' }, { status: 500 })
    }

    // Insert features
    if (features && features.length > 0) {
      const featureRows = features
        .filter((f: string) => f.trim())
        .map((feature: string) => ({
          vehicle_id: vehicle.id,
          feature_name: feature.trim(),
        }))

      if (featureRows.length > 0) {
        await supabaseAdmin.from('vehicle_features').insert(featureRows)
      }
    }

    // Insert images
    if (imageUrls && imageUrls.length > 0) {
      const imageRows = imageUrls.map((url: string, index: number) => ({
        vehicle_id: vehicle.id,
        image_url: url,
        is_primary: index === 0,
      }))

      await supabaseAdmin.from('vehicle_images').insert(imageRows)
    }

    return NextResponse.json({ success: true, vehicle })
  } catch (err) {
    console.error('Create vehicle API error:', err)
    return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 })
    }

    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ success: false, message: 'Vehicle ID is required' }, { status: 400 })
    }

    const dbUpdates: any = { updated_at: new Date().toISOString() }

    if (updates.make !== undefined) dbUpdates.make = updates.make
    if (updates.model !== undefined) dbUpdates.model = updates.model
    if (updates.year !== undefined) dbUpdates.year = parseInt(updates.year)
    if (updates.price !== undefined) dbUpdates.price = parseFloat(updates.price)
    if (updates.transmission !== undefined) dbUpdates.transmission = updates.transmission
    if (updates.fuelType !== undefined) dbUpdates.fuel_type = updates.fuelType
    if (updates.bodyType !== undefined) dbUpdates.body_type = updates.bodyType
    if (updates.mileage !== undefined) dbUpdates.mileage = parseInt(updates.mileage)
    if (updates.condition !== undefined) dbUpdates.condition = updates.condition
    if (updates.description !== undefined) dbUpdates.description = updates.description
    if (updates.status !== undefined) dbUpdates.status = updates.status
    if (updates.featured !== undefined) dbUpdates.featured = updates.featured

    const { error } = await supabaseAdmin.from('vehicles').update(dbUpdates).eq('id', id)

    if (error) {
      console.error('Vehicle update error:', error)
      return NextResponse.json({ success: false, message: 'Failed to update vehicle' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Update vehicle API error:', err)
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
      return NextResponse.json({ success: false, message: 'Vehicle ID is required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin.from('vehicles').delete().eq('id', id)

    if (error) {
      console.error('Vehicle delete error:', error)
      return NextResponse.json({ success: false, message: 'Failed to delete vehicle' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Delete vehicle API error:', err)
    return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 })
  }
  }
