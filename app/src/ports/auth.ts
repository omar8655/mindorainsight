/** Application-level user identity — provider-agnostic */
export type AppUser = {
  id: string
  email: string | null
  fullName: string | null
  imageUrl: string | null
  role: 'customer' | 'staff' | 'admin'
}

export type Permission =
  | 'crm:read'
  | 'crm:write'
  | 'crm:admin'
  | 'assessments:take'
  | 'billing:manage'
  | 'admin:access'

export interface AuthPort {
  getCurrentUser(): Promise<AppUser | null>
  requireUser(): Promise<AppUser>
  getSessionToken(): Promise<string | null>
  hasPermission(permission: Permission): Promise<boolean>
  signOut(): Promise<void>
}
