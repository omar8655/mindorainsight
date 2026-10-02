import { QUESTIONS } from '@/data/newmindora/questions-bank.js'
import { SCORERS, TEST_META, type DomainScore, type TestMeta } from '@/data/newmindora/tests-core.js'
import { classifyProfile } from '@/data/newmindora/profile-engine.js'
import {
  BRIEFS,
  BOOK_SOURCES,
  personaliseReport,
  referenceNote,
} from '@/data/newmindora/reports.js'
import { compileExtended, extendedHtml } from '@/data/newmindora/report-engine.js'

export type NewMindoraId = (typeof TEST_META)[number]['id']

export type RunAssessmentResult = {
  testId: string
  title: string
  clinical: boolean
  crisis: boolean
  scores: DomainScore[]
  traits: { id: string; name: string; score: number }[]
  overall: number
  shape: { shapeId: string; title: string; blurb: string }
  brief: {
    headline: string
    body: string
    watch: string
    longform?: string
    fingerprint?: string
  }
  /** Sitting id when persisted — keeps PDF document IDs unique per completion */
  sessionId?: string
  topName: string
  summary: string
}

export {
  QUESTIONS,
  SCORERS,
  TEST_META,
  BRIEFS,
  BOOK_SOURCES,
  classifyProfile,
  referenceNote,
  compileExtended,
  extendedHtml,
  personaliseReport,
}
export type { DomainScore, TestMeta }

export function isNewMindoraId(slug: string): boolean {
  return TEST_META.some((t) => t.id === slug)
}

export function getNewMindoraMeta(slug: string): TestMeta | undefined {
  return TEST_META.find((t) => t.id === slug)
}

export function questionsForNewMindora(slug: string): string[] {
  const list = QUESTIONS[slug] || QUESTIONS[slug === 'personality' ? 'big5' : '']
  if (!list?.length) return []
  return list
}

/** Score 100 Likert answers (1–5) and build brief + profile shape. */
export function runNewMindoraAssessment(
  slug: string,
  answers: number[],
  name = 'You',
): RunAssessmentResult {
  const meta = getNewMindoraMeta(slug) || ({ id: slug, title: slug, blurb: '', mins: 15 } as TestMeta)
  const scorer = SCORERS[slug] || SCORERS.big5
  const briefFn = BRIEFS[slug] || BRIEFS.big5
  const scores = scorer(answers)
  const shape = classifyProfile(slug, scores)
  let brief = briefFn(scores, name, slug === 'personality' ? 'personality' : undefined)
  // Stamp a unique fingerprint + personalised longform from this exact answer stack
  brief = personaliseReport(brief, scores, name, meta.title, answers) as typeof brief
  const ranked = [...scores].filter((s) => s.score != null).sort((a, b) => b.score - a.score)
  const overall = ranked.length
    ? Math.round(ranked.reduce((a, s) => a + s.score, 0) / ranked.length)
    : 50
  const top = ranked[0]
  return {
    testId: meta.id,
    title: meta.title,
    clinical: !!meta.clinical,
    crisis: !!meta.crisis,
    scores,
    traits: ranked.map((s, i) => ({
      id: `${slug}-${i}-${s.key}`.toLowerCase().replace(/\s+/g, '-'),
      name: s.key,
      score: s.score,
    })),
    overall,
    shape,
    brief,
    topName: shape.title || top?.key || meta.title,
    summary: brief.body,
  }
}
