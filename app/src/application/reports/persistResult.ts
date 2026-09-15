import { familyForSlug } from '@/data/reports/familyMap'
import { getPack } from '@/data/reports/packs'
import { traitIdFromName } from '@/application/reports/buildReportDocument'
import { createSessionId, saveReportSession } from '@/application/reports/sessionStore'
import type { ReportSession, TraitScore } from '@/domain/reports/types'

export type CreateSessionInput = {
  slug: string
  assessmentTitle: string
  traits: { name: string; score: number; id?: string }[]
  overall: number
  summary: string
  blurb?: string
  primaryName?: string
  primaryId?: string
  gender?: 'female' | 'male'
  meta?: Record<string, string>
}

export function persistAssessmentResult(input: CreateSessionInput): ReportSession {
  const family = familyForSlug(input.slug)
  const pack = getPack(family)
  const traits: TraitScore[] = input.traits.map((t) => ({
    id: t.id ?? traitIdFromName(t.name),
    name: t.name,
    score: t.score,
  }))
  const sorted = [...traits].sort((a, b) => b.score - a.score)
  const top = sorted[0]
  const primaryId =
    input.primaryId && pack.primaries[input.primaryId]
      ? input.primaryId
      : top
        ? pack.primaries[top.id]
          ? top.id
          : pack.fallbackPrimaryId
        : pack.fallbackPrimaryId
  const primaryPack = pack.primaries[primaryId] ?? pack.primaries[pack.fallbackPrimaryId]!

  const session: ReportSession = {
    id: createSessionId(),
    slug: input.slug,
    assessmentTitle: input.assessmentTitle,
    completedAt: new Date().toISOString(),
    traits,
    overall: input.overall,
    summary: input.summary,
    primaryId,
    primaryName: input.primaryName ?? primaryPack.name,
    blurb: input.blurb ?? primaryPack.blurb,
    unlocked: false,
    family,
    gender: input.gender,
    meta: input.meta,
  }

  return saveReportSession(session)
}
