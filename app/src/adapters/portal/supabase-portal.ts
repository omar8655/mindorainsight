import type { SupabaseClient } from '@supabase/supabase-js'
import type { PortalPort, PortalStats } from '@/ports/portal'

export function createSupabasePortalAdapter(client: SupabaseClient): PortalPort {
  return {
    async getStats(): Promise<PortalStats> {
      const { data, error } = await client
        .from('assessment_attempts')
        .select('id, assessment_slug, status, completed_at, score_summary')
        .order('completed_at', { ascending: false })
        .limit(50)

      if (error) throw error

      const rows = data ?? []
      return {
        completedCount: rows.filter((r) => r.status === 'completed').length,
        inProgressCount: rows.filter((r) => r.status === 'in_progress').length,
        recent: rows
          .filter((r) => r.status === 'completed')
          .map((r) => ({
            id: r.id as string,
            assessmentSlug: r.assessment_slug as string,
            status: r.status as 'completed',
            completedAt: (r.completed_at as string | null) ?? null,
            scoreSummary: (r.score_summary as Record<string, unknown>) ?? {},
          })),
      }
    },
    async recordCompletion({ assessmentSlug, scoreSummary }) {
      const { data: profile, error: profileError } = await client
        .from('profiles')
        .select('id')
        .limit(1)
        .maybeSingle()

      if (profileError) throw profileError
      if (!profile?.id) {
        throw new Error('Profile not synced yet. Complete Clerk webhook → profiles sync.')
      }

      const { error } = await client.from('assessment_attempts').insert({
        profile_id: profile.id,
        assessment_slug: assessmentSlug,
        status: 'completed',
        completed_at: new Date().toISOString(),
        score_summary: scoreSummary,
      })
      if (error) throw error
    },
  }
}
