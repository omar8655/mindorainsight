/** Generic repository contracts — swap Supabase later without touching UI */

export type ListParams = {
  page?: number
  pageSize?: number
  search?: string
  sortBy?: string
  sortDir?: 'asc' | 'desc'
}

export type Paginated<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export type Contact = {
  id: string
  fullName: string
  email: string | null
  phone: string | null
  companyId: string | null
  ownerId: string | null
  tags: string[]
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type Lead = {
  id: string
  contactId: string | null
  title: string
  status: 'new' | 'qualified' | 'unqualified' | 'converted'
  source: string | null
  ownerId: string | null
  score: number
  createdAt: string
}

export type Deal = {
  id: string
  name: string
  stage: string
  amount: number
  currency: string
  contactId: string | null
  companyId: string | null
  ownerId: string | null
  expectedCloseAt: string | null
  createdAt: string
}

export interface ContactsRepository {
  list(params?: ListParams): Promise<Paginated<Contact>>
  getById(id: string): Promise<Contact | null>
  create(input: Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Contact>
  update(id: string, patch: Partial<Contact>): Promise<Contact>
  softDelete(id: string): Promise<void>
}

export interface LeadsRepository {
  list(params?: ListParams): Promise<Paginated<Lead>>
  getById(id: string): Promise<Lead | null>
  create(input: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead>
  update(id: string, patch: Partial<Lead>): Promise<Lead>
}

export interface DealsRepository {
  list(params?: ListParams): Promise<Paginated<Deal>>
  getById(id: string): Promise<Deal | null>
  create(input: Omit<Deal, 'id' | 'createdAt'>): Promise<Deal>
  update(id: string, patch: Partial<Deal>): Promise<Deal>
}

export interface DatabasePort {
  contacts: ContactsRepository
  leads: LeadsRepository
  deals: DealsRepository
}
