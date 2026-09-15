import type { AssessmentAttempt, PortalPort, PortalStats } from '@/ports/portal'

const KEY = 'mindorainsight.portal.attempts'

function read(): AssessmentAttempt[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw) as AssessmentAttempt[]
  } catch {
    return []
  }
}

function write(items: AssessmentAttempt[]) {
  localStorage.setItem(KEY, JSON.stringify(items))
}

/** Local stand-in until Clerk session + Supabase RLS are live. */
export function createMemoryPortalAdapter(): PortalPort {
  return {
    async getStats(): Promise<PortalStats> {
      const items = read()
      return {
        completedCount: items.filter((i) => i.status === 'completed').length,
        inProgressCount: items.filter((i) => i.status === 'in_progress').length,
        recent: items
          .filter((i) => i.status === 'completed')
          .sort((a, b) => (a.completedAt! < b.completedAt! ? 1 : -1))
          .slice(0, 20),
      }
    },
    async recordCompletion({ assessmentSlug, scoreSummary }) {
      const items = read()
      items.push({
        id: crypto.randomUUID(),
        assessmentSlug,
        status: 'completed',
        completedAt: new Date().toISOString(),
        scoreSummary,
      })
      write(items)
    },
  }
}
