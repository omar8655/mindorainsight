import { getPack } from '@/data/reports/packs'
import { familyForSlug } from '@/data/reports/familyMap'
import { ADHD_DOMAIN_LABELS, type AdhdDomain } from '@/data/adhdScreening'
import { buildIndividualNarrative } from '@/data/adhdIndividualReport'
import type {
  ReportChapter,
  ReportDocument,
  ReportFamily,
  ReportSession,
  ReportTheme,
  TraitScore,
} from '@/domain/reports/types'

function slugifyTrait(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Map scored trait names → pack primary ids. */
function resolvePrimaryId(family: ReportFamily, trait: TraitScore, packFallback: string): string {
  const id = trait.id || slugifyTrait(trait.name)
  const pack = getPack(family)
  if (pack.primaries[id]) return id

  const aliases: Record<string, string> = {
    openness: 'openness',
    neuroticism: 'neuroticism',
    'emotional-sensitivity': 'neuroticism',
    extraversion: 'extraversion',
    agreeableness: 'agreeableness',
    conscientiousness: 'conscientiousness',
    'emotional-stability': 'emotional-stability',
    'learning-agility': 'learning-agility',
    'execution-discipline': 'execution-discipline',
    'team-presence': 'team-presence',
    'collaborative-trust': 'collaborative-trust',
    'pressure-reactivity': 'pressure-reactivity',
    inattention: 'inattention',
    'inattention-sustained-focus': 'inattention',
    hyperactivity: 'hyperactivity',
    'hyperactivity-restlessness': 'hyperactivity',
    impulsivity: 'impulsivity',
    'impulse-control': 'impulsivity',
    executive: 'executive',
    'executive-self-regulation': 'executive',
    emotion: 'emotion',
    'emotional-self-regulation': 'emotion',
    time_motivation: 'time_motivation',
    'time-motivation-follow-through': 'time_motivation',
  }

  const aliased = aliases[id]
  if (aliased && pack.primaries[aliased]) return aliased

  // Fuzzy: match by name containment
  const lower = trait.name.toLowerCase()
  for (const [pid, p] of Object.entries(pack.primaries)) {
    if (lower.includes(p.name.toLowerCase().split(' ')[0]!) || p.name.toLowerCase().includes(lower.split(' ')[0]!)) {
      return pid
    }
  }

  return packFallback
}

function fillTemplate(
  body: string,
  ctx: {
    primary: string
    score: number
    secondary: string
    secondaryScore: number
  },
) {
  return body
    .replaceAll('{{primary}}', ctx.primary)
    .replaceAll('{{score}}', String(ctx.score))
    .replaceAll('{{secondary}}', ctx.secondary)
    .replaceAll('{{secondaryScore}}', String(ctx.secondaryScore))
}

export function buildReportDocument(session: ReportSession): ReportDocument {
  const family = session.family || familyForSlug(session.slug)
  const pack = getPack(family)
  const sorted = [...session.traits]
    .map((t) => {
      if (family !== 'adhd') return t
      const domain = (t.id || '') as AdhdDomain
      const plain = ADHD_DOMAIN_LABELS[domain]
      return plain ? { ...t, name: plain } : t
    })
    .sort((a, b) => b.score - a.score)
  const primaryTrait = sorted[0] ?? {
    id: pack.fallbackPrimaryId,
    name: pack.primaries[pack.fallbackPrimaryId]?.name ?? 'Result',
    score: session.overall,
  }
  const secondaryTrait = sorted[1] ?? primaryTrait

  const primaryId =
    session.primaryId && pack.primaries[session.primaryId]
      ? session.primaryId
      : resolvePrimaryId(family, primaryTrait, pack.fallbackPrimaryId)

  const primaryPack = pack.primaries[primaryId] ?? pack.primaries[pack.fallbackPrimaryId]!

  const ctx = {
    primary: primaryPack.name,
    score: primaryTrait.score,
    secondary: secondaryTrait.name,
    secondaryScore: secondaryTrait.score,
  }

  const themes: ReportTheme[] = primaryPack.themes.map((t) => ({
    id: t.id,
    title: t.title,
    chapters: primaryPack.chapters
      .filter((c) => c.themeId === t.id)
      .filter((c) => !c.requireSecondaryMin || secondaryTrait.score >= c.requireSecondaryMin)
      .map((c) => ({ id: c.id, title: c.title, teaser: c.teaser })),
  }))

  let number = 0
  const chapters: ReportChapter[] = []
  for (const theme of primaryPack.themes) {
    for (const c of primaryPack.chapters.filter((ch) => ch.themeId === theme.id)) {
      if (c.requireSecondaryMin && secondaryTrait.score < c.requireSecondaryMin) continue
      number += 1
      chapters.push({
        id: c.id,
        number,
        theme: theme.title,
        title: c.title,
        body: fillTemplate(c.body, ctx),
      })
    }
  }

  const blurb = session.blurb || primaryPack.blurb
  let summary =
    session.summary ||
    `${primaryPack.name} leads your ${session.assessmentTitle} profile at ${primaryTrait.score}%, with ${secondaryTrait.name} as a meaningful secondary pattern (${secondaryTrait.score}%).`

  // Always refresh ADHD copy into plain English (even for older saved sessions)
  if (family === 'adhd') {
    const narrative = buildIndividualNarrative(
      sorted.map((t) => ({
        domain: (t.id || 'inattention') as AdhdDomain,
        name: t.name,
        score: t.score,
      })),
      session.overall,
    )
    summary = narrative.summary
  }

  return {
    sessionId: session.id,
    slug: session.slug,
    assessmentTitle: session.assessmentTitle,
    family,
    completedAt: session.completedAt,
    primary: {
      id: primaryId,
      name: primaryPack.name,
      score: primaryTrait.score,
    },
    blurb: family === 'adhd' ? primaryPack.blurb : blurb,
    summary,
    traits: sorted,
    overall: session.overall,
    themes,
    chapters,
    experiment: {
      title: primaryPack.experiment.title,
      body: fillTemplate(primaryPack.experiment.body, ctx),
    },
    disclaimer: pack.disclaimer,
    emblemHue: primaryPack.emblemHue,
    gender: session.gender,
  }
}

export function traitIdFromName(name: string) {
  return slugifyTrait(name)
}
