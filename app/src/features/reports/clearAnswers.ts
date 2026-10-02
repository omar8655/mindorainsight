/** Plain-English band labels for score clarity on screen + PDF. */

import { doctorClearSentence } from '@/features/reports/clinicalVoice'

export function scoreBand(score: number): 'High' | 'Elevated' | 'Moderate' | 'Lower' {
  if (score >= 75) return 'High'
  if (score >= 60) return 'Elevated'
  if (score >= 40) return 'Moderate'
  return 'Lower'
}

export function scoreBandColor(score: number): string {
  if (score >= 75) return '#0f4a36'
  if (score >= 60) return '#31b070'
  if (score >= 40) return '#4880d9'
  return '#6b7280'
}

export function scoreBandHint(score: number): string {
  if (score >= 75) return 'Strong match in your answers today'
  if (score >= 60) return 'Clearly present — worth deliberate practice'
  if (score >= 40) return 'Moderately present — situational'
  return 'Quieter pattern in this assessment'
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

/** Doctor-level plain summary for the result hero. */
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
