export type { AuthPort, AppUser, Permission } from '@/ports/auth'
export type { DatabasePort, Contact, Lead, Deal } from '@/ports/database'
export type { PaymentsPort } from '@/ports/payments'

export type EmailMessage = {
  to: string
  subject: string
  html: string
  text?: string
}

export interface EmailPort {
  send(message: EmailMessage): Promise<{ id: string }>
}
