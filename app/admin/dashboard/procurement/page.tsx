import Card from '@/components/ui/Card'
import { formatDateTime, formatCurrency } from '@/lib/utils'
import { supabaseAdmin } from '@/lib/supabase'
import ProcurementStatusButtons from '@/components/admin/ProcurementStatusButtons'

export const revalidate = 0

async function getProcurementRequests() {
  if (!supabaseAdmin) return []

  const { data, error } = await supabaseAdmin
    .from('procurement_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data
}

export default async function AdminProcurementPage() {
  const requests = await getProcurementRequests()

  const statusStyles: Record<string, string> = {
    new: 'bg-primary-gold text-black',
    'in-progress': 'bg-blue-500 text-white',
    completed: 'bg-green-500 text-white',
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white mb-1">Procurement Requests</h1>
      <p className="text-primary-silver text-sm mb-8">{requests.length} total requests</p>

      {requests.length === 0 ? (
        <Card variant="outlined" padding="lg" className="text-center py-16">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-white font-bold mb-2">No procurement requests yet</p>
          <p className="text-primary-silver text-sm">Customer procurement requests will appear here</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {requests.map((req: any) => (
            <Card key={req.id} variant="default" padding="md">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <p className="text-white font-bold">{req.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyles[req.status]}`}>
                      {req.status}
                    </span>
                  </div>
                  <p className="text-white text-sm mb-1">
                    <span className="text-primary-silver">Wants:</span> {req.desired_vehicle}
                  </p>
                  <p className="text-white text-sm mb-2">
                    <span className="text-primary-silver">Budget:</span> {formatCurrency(req.budget)}
                  </p>
                  {req.requirements && (
                    <p className="text-primary-silver text-sm mb-2">{req.requirements}</p>
                  )}
                  <div className="flex flex-wrap gap-3 text-xs text-primary-silver">
                    <a href={`tel:${req.phone}`} className="hover:text-primary-gold">
                      📞 {req.phone}
                    </a>
                    <a href={`mailto:${req.email}`} className="hover:text-primary-gold">
                      ✉️ {req.email}
                    </a>
                    <span>{formatDateTime(req.created_at)}</span>
                  </div>
                </div>

                <ProcurementStatusButtons requestId={req.id} currentStatus={req.status} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
           }
