import type { AppUser, AuthPort, Permission } from '@/ports/auth'

/**
 * Local/dev auth adapter — replace with Clerk adapter in production.
 * UI and application services must depend on AuthPort only.
 */
export class LocalAuthAdapter implements AuthPort {
  async getCurrentUser(): Promise<AppUser | null> {
    return null
  }

  async requireUser(): Promise<AppUser> {
    const user = await this.getCurrentUser()
    if (!user) {
      throw new Error('UNAUTHENTICATED')
    }
    return user
  }

  async getSessionToken(): Promise<string | null> {
    return null
  }

  async hasPermission(_permission: Permission): Promise<boolean> {
    return false
  }

  async signOut(): Promise<void> {
    // no-op until Clerk is wired
  }
}

export const authAdapter: AuthPort = new LocalAuthAdapter()
