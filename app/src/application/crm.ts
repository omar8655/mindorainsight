import { authAdapter } from '@/adapters/clerk/local-auth'
import { memoryDb } from '@/adapters/supabase/memory-db'
import type { AuthPort } from '@/ports/auth'
import type { DatabasePort } from '@/ports/database'

/**
 * Composition root — swap adapters here when wiring Clerk / Supabase.
 */
export const services = {
  auth: authAdapter as AuthPort,
  db: memoryDb as DatabasePort,
}

export async function getCrmDashboardStats() {
  const [contacts, leads, deals] = await Promise.all([
    services.db.contacts.list({ pageSize: 1 }),
    services.db.leads.list({ pageSize: 100 }),
    services.db.deals.list({ pageSize: 100 }),
  ])
  const pipeline = deals.items.reduce((sum, d) => sum + d.amount, 0)
  return {
    contacts: contacts.total,
    leads: leads.total,
    openDeals: deals.total,
    pipelineValue: pipeline,
  }
}
