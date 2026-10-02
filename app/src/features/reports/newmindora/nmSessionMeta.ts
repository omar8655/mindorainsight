import type { RunAssessmentResult } from '@/data/newmindora'

const META_KEY = 'nmResultJson'

/** Persist NewMindora run payload on the report session for /report reopen. */
export function serializeNmResult(result: RunAssessmentResult): Record<string, string> {
  return { [META_KEY]: JSON.stringify(result) }
}

export function parseNmResult(meta?: Record<string, string> | null): RunAssessmentResult | null {
  const raw = meta?.[META_KEY]
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as RunAssessmentResult
    if (!parsed?.testId || !parsed?.brief || !Array.isArray(parsed.scores)) return null
    return parsed
  } catch {
    return null
  }
}
