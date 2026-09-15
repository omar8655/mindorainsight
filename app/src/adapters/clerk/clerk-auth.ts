import { useAuth, useUser } from '@clerk/clerk-react'
import type { AppUser, AuthPort, Permission } from '@/ports/auth'

function mapRole(meta: Record<string, unknown> | undefined): AppUser['role'] {
  const role = meta?.role
  if (role === 'admin' || role === 'staff' || role === 'customer') return role
  return 'customer'
}

/**
 * Clerk adapter — UI must depend on AuthPort, not Clerk hooks directly in features.
 * Elevated roles should live in Clerk app_metadata (never trust public metadata for authz).
 */
export function createClerkAuthPort(deps: {
  userId: string | null | undefined
  isLoaded: boolean
  getToken: () => Promise<string | null>
  signOut: () => Promise<void>
  email: string | null
  fullName: string | null
  imageUrl: string | null
  appMetadata: Record<string, unknown> | undefined
}): AuthPort {
  return {
    async getCurrentUser() {
      if (!deps.isLoaded || !deps.userId) return null
      return {
        id: deps.userId,
        email: deps.email,
        fullName: deps.fullName,
        imageUrl: deps.imageUrl,
        role: mapRole(deps.appMetadata),
      }
    },
    async requireUser() {
      const user = await this.getCurrentUser()
      if (!user) throw new Error('Authentication required')
      return user
    },
    async getSessionToken() {
      return deps.getToken()
    },
    async hasPermission(permission: Permission) {
      const user = await this.getCurrentUser()
      if (!user) return false
      if (user.role === 'admin') return true
      if (user.role === 'staff') {
        return permission.startsWith('crm:') || permission === 'admin:access'
      }
      return permission === 'assessments:take' || permission === 'billing:manage'
    },
    async signOut() {
      await deps.signOut()
    },
  }
}

export function useClerkAuthPort(): AuthPort {
  const { userId, isLoaded, getToken, signOut } = useAuth()
  const { user } = useUser()
  return createClerkAuthPort({
    userId,
    isLoaded,
    getToken: async () => (await getToken()) ?? null,
    signOut: async () => {
      await signOut()
    },
    email: user?.primaryEmailAddress?.emailAddress ?? null,
    fullName: user?.fullName ?? null,
    imageUrl: user?.imageUrl ?? null,
    appMetadata: user?.publicMetadata as Record<string, unknown> | undefined,
  })
}
