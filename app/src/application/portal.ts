import { createMemoryPortalAdapter } from '@/adapters/portal/memory-portal'
import type { PortalPort } from '@/ports/portal'

/** Swap for Supabase adapter when Clerk session token is available. */
export const portalService: PortalPort = createMemoryPortalAdapter()

export async function getPortalStats() {
  return portalService.getStats()
}

export async function recordAssessmentCompletion(
  assessmentSlug: string,
  scoreSummary: Record<string, unknown>,
) {
  return portalService.recordCompletion({ assessmentSlug, scoreSummary })
}
