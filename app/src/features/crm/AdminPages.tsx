import { useEffect, useState } from 'react'
import { Seo } from '@/components/layout/Seo'
import { getCrmDashboardStats, services } from '@/application/crm'

export function AdminOverviewPage() {
  const [stats, setStats] = useState({ contacts: 0, leads: 0, openDeals: 0, pipelineValue: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await getCrmDashboardStats()
        if (alive) setStats(data)
      } catch {
        if (alive) setError('Could not load CRM stats. Try again.')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  const cards = [
    { label: 'Contacts', value: String(stats.contacts) },
    { label: 'Leads', value: String(stats.leads) },
    { label: 'Open deals', value: String(stats.openDeals) },
    { label: 'Pipeline', value: `$${stats.pipelineValue.toLocaleString()}` },
  ]

  return (
    <>
      <Seo title="CRM Overview" noindex />
      <h1 className="mb-2 text-2xl font-semibold text-mi-text md:text-3xl">CRM overview</h1>
      <p className="mb-8 max-w-3xl text-mi-muted">
        Live workspace metrics from application services and repository ports. In-memory adapter is active until
        Supabase is wired.
      </p>
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {loading ? (
        <p className="text-mi-muted">Loading dashboard…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((s) => (
            <div key={s.label} className="rounded-2xl border border-mi-border bg-white p-5 shadow-sm">
              <p className="text-sm text-mi-muted">{s.label}</p>
              <p className="mt-2 text-3xl font-bold text-mi-text">{s.value}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export function AdminTablePage({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <>
      <Seo title={`CRM · ${title}`} noindex />
      <h1 className="mb-6 text-2xl font-semibold text-mi-text">{title}</h1>
      {rows.length <= 1 ? (
        <div className="rounded-2xl border border-dashed border-mi-border bg-white p-10 text-center text-mi-muted">
          No records yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-mi-border bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-mi-canvas text-mi-muted">
              <tr>
                {rows[0]?.map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row) => (
                <tr key={row.join('-')} className="border-t border-mi-border">
                  {row.map((cell) => (
                    <td key={cell} className="px-4 py-3 text-mi-text">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export function AdminContactsPage() {
  const [rows, setRows] = useState<string[][]>([['Name', 'Email', 'Tags', 'Owner']])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const result = await services.db.contacts.list({ pageSize: 50 })
      setRows([
        ['Name', 'Email', 'Tags', 'Owner'],
        ...result.items.map((c) => [
          c.fullName,
          c.email ?? '—',
          c.tags.join(', ') || '—',
          c.ownerId ?? '—',
        ]),
      ])
      setLoading(false)
    })()
  }, [])

  if (loading) return <p className="text-mi-muted">Loading contacts…</p>
  return <AdminTablePage title="Contacts" rows={rows} />
}

export function AdminLeadsPage() {
  const [rows, setRows] = useState<string[][]>([['Lead', 'Status', 'Source', 'Score']])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const result = await services.db.leads.list({ pageSize: 50 })
      setRows([
        ['Lead', 'Status', 'Source', 'Score'],
        ...result.items.map((l) => [l.title, l.status, l.source ?? '—', String(l.score)]),
      ])
      setLoading(false)
    })()
  }, [])

  if (loading) return <p className="text-mi-muted">Loading leads…</p>
  return <AdminTablePage title="Leads" rows={rows} />
}

export function AdminDealsPage() {
  const [rows, setRows] = useState<string[][]>([['Deal', 'Stage', 'Amount', 'Close']])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const result = await services.db.deals.list({ pageSize: 50 })
      setRows([
        ['Deal', 'Stage', 'Amount', 'Close'],
        ...result.items.map((d) => [
          d.name,
          d.stage,
          `$${d.amount.toLocaleString()}`,
          d.expectedCloseAt ?? '—',
        ]),
      ])
      setLoading(false)
    })()
  }, [])

  if (loading) return <p className="text-mi-muted">Loading pipeline…</p>
  return <AdminTablePage title="Pipeline" rows={rows} />
}
