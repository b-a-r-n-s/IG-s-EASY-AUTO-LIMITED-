import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { supabaseAdmin } from '@/lib/supabase'
import TestimonialActions from '@/components/admin/TestimonialActions'

export const revalidate = 0

async function getTestimonials() {
  if (!supabaseAdmin) return []

  const { data, error } = await supabaseAdmin
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data
}

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white mb-1">Testimonials</h1>
          <p className="text-primary-silver text-sm">{testimonials.length} total testimonials</p>
        </div>
        <Link href="/admin/dashboard/testimonials/add">
          <Button variant="primary" size="md">+ Add Testimonial</Button>
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <Card variant="outlined" padding="lg" className="text-center py-16">
          <p className="text-4xl mb-4">⭐</p>
          <p className="text-white font-bold mb-2">No testimonials yet</p>
          <Link href="/admin/dashboard/testimonials/add">
            <Button variant="primary">+ Add Testimonial</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t: any) => (
            <Card key={t.id} variant="default" padding="md">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <p className="text-white font-bold">{t.customer_name}</p>
                    <span className="text-primary-silver text-xs">{t.customer_role}</span>
                    {t.featured && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-gold text-black">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-primary-gold text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-primary-silver text-sm italic">"{t.quote}"</p>
                </div>

                <TestimonialActions testimonialId={t.id} isFeatured={t.featured} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
    }
