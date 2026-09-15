import { ClerkProvider } from '@clerk/clerk-react'
import type { ReactNode } from 'react'
import { env, isClerkConfigured } from '@/config/env'

export function AuthProvider({ children }: { children: ReactNode }) {
  if (!isClerkConfigured) return <>{children}</>

  return (
    <ClerkProvider publishableKey={env.clerkPublishableKey!} afterSignOutUrl="/">
      {children}
    </ClerkProvider>
  )
}
