import Card from '@/components/ui/Card'
import { formatDateTime } from '@/lib/utils'
import { supabaseAdmin } from '@/lib/supabase'
import InquiryStatusButtons from '@/components/admin/InquiryStatusButtons'

export const revalidate = 0

async function getInquiries() {
  if (!supabaseAdmin) return []

  const { data, error } = await supabaseAdmin
    .from('contact_inquiries')
    .select('*, vehicles(make, model, year)')
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data
}

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries()

  const statusStyles: Record<string, string> = {
    new: 'bg-primary-gold text-black',
    contacted: 'bg-blue-500 text-white',
    closed: 'bg-gray-500 text-white',
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white mb-1">Inquiries</h1>
      <p className="text-primary-silver text-sm mb-8">{inquiries.length} total inquiries</p>

      {inquiries.length === 0 ? (
        <Card variant="outlined" padding="lg" className="text-center py-16">
          <p className="text-4xl mb-4">📩</p>
          <p className="text-white font-bold mb-2">No inquiries yet</p>
          <p className="text-primary-silver text-sm">Customer inquiries will appear here</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inquiry: any) => (
            <Card key={inquiry.id} variant="default" padding="md">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <p className="text-white font-bold">{inquiry.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyles[inquiry.status]}`}>
                      {inquiry.status}
                    </span>
                    {inquiry.vehicles && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-primary-dark-gray border border-primary-gold text-primary-gold">
                        {inquiry.vehicles.year} {inquiry.vehicles.make} {inquiry.vehicles.model}
                      </span>
                    )}
                  </div>
                  <p className="text-primary-silver text-sm mb-2">{inquiry.message}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-primary-silver">
                    <a href={`tel:${inquiry.phone}`} className="hover:text-primary-gold">
                      📞 {inquiry.phone}
                    </a>
                    <a href={`mailto:${inquiry.email}`} className="hover:text-primary-gold">
                      ✉️ {inquiry.email}
                    </a>
                    <span>{formatDateTime(inquiry.created_at)}</span>
                  </div>
                </div>

                <InquiryStatusButtons inquiryId={inquiry.id} currentStatus={inquiry.status} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
      }
