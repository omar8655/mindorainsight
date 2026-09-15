import type {
  Contact,
  ContactsRepository,
  DatabasePort,
  Deal,
  DealsRepository,
  Lead,
  LeadsRepository,
  ListParams,
  Paginated,
} from '@/ports/database'

/**
 * In-memory Supabase stand-in for local UI development.
 * Swap for a real Supabase adapter without changing CRM UI.
 */
function paginate<T>(items: T[], params?: ListParams): Paginated<T> {
  const page = params?.page ?? 1
  const pageSize = params?.pageSize ?? 20
  const start = (page - 1) * pageSize
  return {
    items: items.slice(start, start + pageSize),
    total: items.length,
    page,
    pageSize,
  }
}

const contactsStore: Contact[] = [
  {
    id: 'c1',
    fullName: 'Alex Rivera',
    email: 'alex@acme.io',
    phone: null,
    companyId: null,
    ownerId: 'staff1',
    tags: ['trial'],
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
    deletedAt: null,
  },
  {
    id: 'c2',
    fullName: 'Sam Chen',
    email: 'sam@build.co',
    phone: null,
    companyId: null,
    ownerId: 'staff1',
    tags: ['qualified'],
    createdAt: '2026-08-12T00:00:00Z',
    updatedAt: '2026-08-12T00:00:00Z',
    deletedAt: null,
  },
]

const leadsStore: Lead[] = [
  {
    id: 'l1',
    contactId: 'c1',
    title: 'Acme — library access',
    status: 'new',
    source: 'pricing',
    ownerId: 'staff1',
    score: 62,
    createdAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'l2',
    contactId: 'c2',
    title: 'BuildCo — team seats',
    status: 'qualified',
    source: 'library',
    ownerId: 'staff1',
    score: 81,
    createdAt: '2026-08-12T00:00:00Z',
  },
]

const dealsStore: Deal[] = [
  {
    id: 'd1',
    name: 'BuildCo annual',
    stage: 'proposal',
    amount: 4200,
    currency: 'USD',
    contactId: 'c2',
    companyId: null,
    ownerId: 'staff1',
    expectedCloseAt: '2026-10-01',
    createdAt: '2026-08-20T00:00:00Z',
  },
]

const contactsRepo: ContactsRepository = {
  async list(params) {
    return paginate(
      contactsStore.filter((c) => !c.deletedAt),
      params,
    )
  },
  async getById(id) {
    return contactsStore.find((c) => c.id === id && !c.deletedAt) ?? null
  },
  async create(input) {
    const row: Contact = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    }
    contactsStore.push(row)
    return row
  },
  async update(id, patch) {
    const idx = contactsStore.findIndex((c) => c.id === id)
    if (idx < 0) throw new Error('NOT_FOUND')
    contactsStore[idx] = {
      ...contactsStore[idx],
      ...patch,
      updatedAt: new Date().toISOString(),
    }
    return contactsStore[idx]
  },
  async softDelete(id) {
    const row = contactsStore.find((c) => c.id === id)
    if (row) row.deletedAt = new Date().toISOString()
  },
}

const leadsRepo: LeadsRepository = {
  async list(params) {
    return paginate(leadsStore, params)
  },
  async getById(id) {
    return leadsStore.find((l) => l.id === id) ?? null
  },
  async create(input) {
    const row: Lead = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
    leadsStore.push(row)
    return row
  },
  async update(id, patch) {
    const idx = leadsStore.findIndex((l) => l.id === id)
    if (idx < 0) throw new Error('NOT_FOUND')
    leadsStore[idx] = { ...leadsStore[idx], ...patch }
    return leadsStore[idx]
  },
}

const dealsRepo: DealsRepository = {
  async list(params) {
    return paginate(dealsStore, params)
  },
  async getById(id) {
    return dealsStore.find((d) => d.id === id) ?? null
  },
  async create(input) {
    const row: Deal = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
    dealsStore.push(row)
    return row
  },
  async update(id, patch) {
    const idx = dealsStore.findIndex((d) => d.id === id)
    if (idx < 0) throw new Error('NOT_FOUND')
    dealsStore[idx] = { ...dealsStore[idx], ...patch }
    return dealsStore[idx]
  },
}

export const memoryDb: DatabasePort = {
  contacts: contactsRepo,
  leads: leadsRepo,
  deals: dealsRepo,
}
