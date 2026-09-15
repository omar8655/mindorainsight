export type AssessmentAttempt = {
  id: string
  assessmentSlug: string
  status: 'in_progress' | 'completed' | 'abandoned'
  completedAt: string | null
  scoreSummary: Record<string, unknown>
}

export type PortalStats = {
  completedCount: number
  inProgressCount: number
  recent: AssessmentAttempt[]
}

export type PortalPort = {
  getStats(): Promise<PortalStats>
  recordCompletion(input: {
    assessmentSlug: string
    scoreSummary: Record<string, unknown>
  }): Promise<void>
}
