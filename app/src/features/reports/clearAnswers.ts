/** Plain-English band labels for score clarity on screen + PDF. */

import { doctorClearSentence } from '@/features/reports/clinicalVoice'

export function scoreBand(score: number): 'Dominant' | 'Strong' | 'Present' | 'Quiet' {
  if (score >= 75) return 'Dominant'
  if (score >= 60) return 'Strong'
  if (score >= 40) return 'Present'
  return 'Quiet'
}

export function scoreBandColor(score: number): string {
  if (score >= 75) return '#0f4a36'
  if (score >= 60) return '#31b070'
  if (score >= 40) return '#4880d9'
  return '#6b7280'
}

export function scoreBandHint(score: number): string {
  if (score >= 75) return 'This is a core driver in your answers — treat it as primary.'
  if (score >= 60) return 'Clearly elevated — this is part of how you operate.'
  if (score >= 40) return 'Visible, but not the main story.'
  return 'Low in this sitting — not where your friction lives.'
}

export type ClearAnswerLine = {
  name: string
  score: number
  band: ReturnType<typeof scoreBand>
  hint: string
}

/** Build ranked clear-answer lines from trait scores. */
export function buildClearAnswers(
  traits: { name: string; score: number }[],
): ClearAnswerLine[] {
  return [...traits]
    .filter((t) => typeof t.score === 'number')
    .sort((a, b) => b.score - a.score)
    .map((t) => ({
      name: t.name,
      score: t.score,
      band: scoreBand(t.score),
      hint: scoreBandHint(t.score),
    }))
}

/** Strong plain summary for the result hero — type + scores, no soft hedging. */
export function clearResultSentence(opts: {
  title?: string
  leadName: string
  leadScore: number
  secondName?: string
  secondScore?: number
  shapeTitle?: string
}): string {
  return doctorClearSentence({
    leadName: opts.leadName,
    leadScore: opts.leadScore,
    secondName: opts.secondName,
    secondScore: opts.secondScore,
    shapeTitle: opts.shapeTitle,
    band: scoreBand(opts.leadScore).toLowerCase(),
  })
}
