import type { RunAssessmentResult } from '@/data/newmindora'
import type { ParticipantDetails } from '@/features/assessments/participantDetails'
import { participantDisplayName } from '@/features/assessments/participantDetails'

const META_KEY = 'nmResultJson'

/** Persist NewMindora run payload + participant on the report session for /report reopen. */
export function serializeNmResult(
  result: RunAssessmentResult,
  participant?: ParticipantDetails | null,
): Record<string, string> {
  const meta: Record<string, string> = { [META_KEY]: JSON.stringify(result) }
  if (participant) {
    meta.firstName = participant.firstName
    meta.lastName = participant.lastName
    meta.phone = participant.phone
    meta.displayName = participantDisplayName(participant)
  }
  return meta
}

export function parseNmResult(meta?: Record<string, string> | null): RunAssessmentResult | null {
  const raw = meta?.[META_KEY]
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as RunAssessmentResult
    if (!parsed?.testId || !parsed?.brief || !Array.isArray(parsed.scores)) return null
    // Incomplete payloads used to crash ReportPage when reading shape/traits
    if (!parsed.shape || typeof parsed.shape !== 'object') return null
    if (!Array.isArray(parsed.traits)) parsed.traits = []
    if (!parsed.brief.headline) parsed.brief.headline = ''
    return parsed
  } catch {
    return null
  }
}

export function parseParticipantFromMeta(
  meta?: Record<string, string> | null,
): ParticipantDetails | null {
  if (!meta?.firstName?.trim() || !meta?.lastName?.trim()) return null
  return {
    firstName: meta.firstName.trim(),
    lastName: meta.lastName.trim(),
    phone: (meta.phone || '').trim(),
  }
}
