import { getPack } from '@/data/reports/packs'
import { familyForSlug } from '@/data/reports/familyMap'
import { scoreAnswers } from '@/data/questions'
import type { ReportFamily } from '@/domain/reports/types'

function clamp(n: number) {
  return Math.max(8, Math.min(97, Math.round(n)))
}

function seededOffsets(answers: number[], count: number) {
  const avg = answers.reduce((a, b) => a + b, 0) / Math.max(answers.length, 1)
  const variance =
    answers.reduce((a, b) => a + Math.abs(b - avg), 0) / Math.max(answers.length, 1)
  return Array.from({ length: count }, (_, i) => {
    const slice = answers[i % answers.length] ?? 3
    const wave = answers[(i * 3) % answers.length] ?? 3
    return clamp(40 + avg * 8 + slice * 4 + wave * 2 - variance * 3 - i * 3)
  })
}

function packTraits(family: ReportFamily, answers: number[]) {
  const pack = getPack(family)
  const ids = Object.keys(pack.primaries)
  const scores = seededOffsets(answers, ids.length)
  // Ensure a clear ranking with unique-ish scores
  const ranked = ids
    .map((id, i) => ({
      id,
      name: pack.primaries[id]!.name,
      score: scores[i]!,
    }))
    .sort((a, b) => b.score - a.score)
    .map((t, i) => ({ ...t, score: clamp(t.score - i * 2) }))

  return ranked
}

export function scoreForReport(slug: string, answers: number[]) {
  const family = familyForSlug(slug)
  if (family === 'workGeneric') {
    const base = scoreAnswers(answers)
    return {
      traits: base.traits.map((t) => ({
        id: t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: t.name,
        score: t.score,
      })),
      overall: base.overall,
      summary: base.summary,
      topName: base.top.name,
    }
  }

  const traits = packTraits(family, answers)
  const top = traits[0]!
  const second = traits[1]
  const overall = Math.round(traits.reduce((a, t) => a + t.score, 0) / traits.length)
  const summary = second
    ? `${top.name} leads your profile at ${top.score}%, with ${second.name} as a meaningful secondary pattern (${second.score}%).`
    : `${top.name} leads your profile at ${top.score}%.`

  return { traits, overall, summary, topName: top.name }
}
