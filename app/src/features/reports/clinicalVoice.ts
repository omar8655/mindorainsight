/** Clear educational copy for results + PDF — keep legal light so users stay engaged. */

import type { RunAssessmentResult } from '@/data/newmindora'

export function doctorClearSentence(opts: {
  you?: string
  leadName: string
  leadScore: number
  secondName?: string
  secondScore?: number
  shapeTitle?: string
  band: string
}): string {
  const you = opts.you || 'You'
  const shape = opts.shapeTitle ? ` Overall profile: "${opts.shapeTitle}".` : ''
  const second =
    opts.secondName && opts.secondScore != null
      ? ` Next strongest: ${opts.secondName} (${opts.secondScore}/100).`
      : ''
  return (
    `${you}: your strongest pattern today is ${opts.leadName} at ${opts.leadScore}/100 (${opts.band}).` +
    second +
    shape
  )
}

/** Practical close for PDF — scores + next steps, one soft line only. */
export function doctorSessionClose(opts: {
  you?: string
  title: string
  leadName: string
  leadScore: number
  bookTitle: string
  authors: string
  serial: string
  clinical?: boolean
  crisis?: boolean
}): string {
  const you = opts.you || 'You'
  const crisis =
    opts.crisis
      ? ` If you feel unsafe, contact emergency services, 988 (US/Canada), or Samaritans 116 123 (UK).`
      : ''
  return (
    `${you}: you finished ${opts.title}. ` +
    `Your top score — "${opts.leadName}" at ${opts.leadScore}/100 — is worth practising for seven days: one morning intention, one evening review. ` +
    `Dossier REF ${opts.serial} · themes from ${opts.bookTitle} (${opts.authors}).` +
    crisis
  )
}

export function doctorFourteenDayPlan(leadName: string, you = 'You'): string {
  return (
    `${you}, optional 14-day plan:\n` +
    `Days 1–3: Each morning, one sentence — “Today "${leadName}" will help me by ___.” Keep it small.\n` +
    `Days 4–7: One work conversation and one relationship check-in in plain language.\n` +
    `Days 8–11: Evening review — where the top pattern helped, where it overplayed.\n` +
    `Days 12–14: Keep one habit small enough to repeat next month.`
  )
}

export function doctorWatchLine(watch: string, you = 'You'): string {
  const w = String(watch || '').trim()
  if (!w) {
    return `${you}: nothing sharp to flag — protect sleep, and retake in two weeks if this week was unusual.`
  }
  return `${you}: ${w}`
}

/** Short watch text for UI that already shows its own label. */
export function doctorWatchBody(watch: string): string {
  const w = String(watch || '').trim()
  if (!w) {
    return 'Nothing sharp to flag — protect sleep, and retake in two weeks if this week was unusual.'
  }
  return w
}

/** True when watch is a real caution — not a generic soft disclaimer. */
export function isActionableWatch(watch: string | undefined | null): boolean {
  const w = String(watch || '').trim()
  if (!w) return false
  const soft = [
    'scores can shift',
    'snapshot of today',
    'reading of your answers',
    'not a diagnosis',
    'not a permanent label',
    'educational only',
  ]
  const lower = w.toLowerCase()
  if (soft.some((s) => lower.includes(s)) && w.length < 160) return false
  return true
}

export function doctorOnScreenClose(
  result: Pick<RunAssessmentResult, 'title' | 'clinical' | 'crisis' | 'brief'> & {
    topName?: string
    leadScore?: number
  },
): string {
  const lead = result.topName || 'your top pattern'
  const score = result.leadScore != null ? ` (${result.leadScore}/100)` : ''
  const crisis = result.crisis
    ? ' If you feel unsafe, contact emergency services, 988, or Samaritans 116 123.'
    : ''
  return (
    `You completed ${result.title}. Carry "${lead}"${score} into the next seven days as one deliberate experiment.` +
    crisis
  )
}
