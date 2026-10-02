/** Clear, decisive educational copy for results + PDF — strong answers users can act on. */

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
    ? `${you} land as "${opts.shapeTitle}". `
    : `${you} clear result: `
  const lead = `Lead score — ${opts.leadName} at ${opts.leadScore}/100 (${opts.band}).`
  const second =
    opts.secondName && opts.secondScore != null
      ? ` Backup — ${opts.secondName} at ${opts.secondScore}/100.`
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
    `${you}: your answer on ${opts.title} is clear — "${opts.leadName}" leads at ${opts.leadScore}/100. ` +
    `For the next seven days, run one morning intention and one evening review around that lead. ` +
    `Dossier REF ${opts.serial} · themes from ${opts.bookTitle} (${opts.authors}).` +
    crisis
  )
}

export function doctorFourteenDayPlan(leadName: string, you = 'You'): string {
  return (
    `${you}, 14-day plan for "${leadName}":\n` +
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
    `${you}, I want to be direct with you the way a careful clinician would: your answer on ${result.title} is clear. ` +
    `Lead with "${lead}"${score}. For the next seven days, give it one morning intention and one evening review — that is how this sitting becomes useful.` +
    crisis
  )
}
