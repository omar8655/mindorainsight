/** Clinician-style educational copy for results + PDF — talks to the person by name. */

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
  const typeLine = opts.shapeTitle
    ? `${you}, on this sitting you land as "${opts.shapeTitle}". `
    : `${you}, here is what your answers show. `
  const lead = `Your lead is ${opts.leadName} at ${opts.leadScore}/100 (${opts.band}).`
  const second =
    opts.secondName && opts.secondScore != null
      ? ` Close behind: ${opts.secondName} at ${opts.secondScore}/100.`
      : ''
  return typeLine + lead + second
}

/** Practical close for PDF — decisive next step, one soft legal line only via crisis. */
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
    `${you}, I am speaking to you directly: on ${opts.title}, "${opts.leadName}" leads at ${opts.leadScore}/100. ` +
    `For the next seven days, run one morning intention and one evening review around that lead — that is how this sitting becomes useful. ` +
    `This dossier is REF ${opts.serial}, written from your scores for this sitting · themes from ${opts.bookTitle} (${opts.authors}).` +
    crisis
  )
}

export function doctorFourteenDayPlan(leadName: string, you = 'You'): string {
  return (
    `${you}, here is a 14-day plan built around "${leadName}":\n` +
    `Days 1–3: Each morning, one sentence — “Today "${leadName}" will help me by ___.” Keep it small.\n` +
    `Days 4–7: One work conversation and one relationship check-in named in plain language.\n` +
    `Days 8–11: Evening review — where the lead helped, where it overplayed.\n` +
    `Days 12–14: Lock one habit small enough to keep next month.`
  )
}

export function doctorWatchLine(watch: string, you = 'You'): string {
  const w = String(watch || '').trim()
  if (!w) {
    return `${you}: no sharp watch-out — keep sleep steady and re-check in two weeks if this week was unusual.`
  }
  return `${you}: ${w}`
}

/** Short watch text for UI that already shows its own label. */
export function doctorWatchBody(watch: string): string {
  const w = String(watch || '').trim()
  if (!w) {
    return 'No sharp watch-out — keep sleep steady and re-check in two weeks if this week was unusual.'
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
    you?: string
  },
): string {
  const you = result.you || 'You'
  const lead = result.topName || 'your top score'
  const score = result.leadScore != null ? ` at ${result.leadScore}/100` : ''
  const crisis = result.crisis
    ? ' If you feel unsafe, contact emergency services, 988, or Samaritans 116 123.'
    : ''
  return (
    `${you}, I want to speak with you the way a careful clinician would after reviewing your answers on ${result.title}. ` +
    `Lead with "${lead}"${score}. For the next seven days, give it one morning intention and one evening review — that is how this sitting becomes useful.` +
    crisis
  )
}
