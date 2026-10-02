/** Clear educational copy — MindoraInsight is NOT a healthcare provider. */

import { ASSESSMENT_LEGAL } from '@/data/legal/assessmentProtection'
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
    shape +
    ` This is a summary of your answers — not a diagnosis, not medical advice, and not a doctor–patient relationship.`
  )
}

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
      ? ` ${you}, if despair or self-harm thoughts are present, do not stay alone — contact emergency services, 988 (US/Canada), or Samaritans 116 123 (UK).`
      : ''
  const clinical =
    opts.clinical
      ? ` If daily life feels impaired, bring these self-report scores to a licensed clinician and say: “These are my patterns — can we look at them together?”`
      : ` If daily life feels impaired, take this report to a licensed professional who can hear your full story.`
  return (
    `${you}: you finished all 100 questions on ${opts.title}. ` +
    `Your top score — "${opts.leadName}" at ${opts.leadScore}/100 — is a pattern to practise for seven days: one morning intention, one evening review. ` +
    `This Mindora Dossier (REF ${opts.serial}) draws on educational themes from ${opts.bookTitle} (${opts.authors}). ` +
    `It maps this assessment sitting, not a medical verdict. ${ASSESSMENT_LEGAL.noProvider}${clinical}${crisis}`
  )
}

export function doctorFourteenDayPlan(leadName: string, you = 'You'): string {
  return (
    `${you}, optional 14-day self-reflection plan (habit-building — not a prescription):\n` +
    `Days 1–3: Each morning, one sentence — “Today "${leadName}" will help me by ___.” Keep it specific and small.\n` +
    `Days 4–7: One work conversation and one relationship check-in in plain language.\n` +
    `Days 8–11: Evening review — where the top pattern helped, where it overplayed. No shame; only data.\n` +
    `Days 12–14: Keep one habit small enough to repeat next month.`
  )
}

export function doctorWatchLine(watch: string, you = 'You'): string {
  const w = String(watch || '').trim()
  if (!w) {
    return `${you}: no sharp watch-out from this assessment — still protect sleep, and retake in two weeks if this week was unusual.`
  }
  return `${you}, educational watch-out (not a clinical finding): ${w}`
}

/** Short watch text for UI that already shows its own label (avoids duplicate prefix). */
export function doctorWatchBody(watch: string): string {
  const w = String(watch || '').trim()
  if (!w) {
    return 'No sharp watch-out from this assessment — still protect sleep, and retake in two weeks if this week was unusual.'
  }
  return w
}

export function doctorOnScreenClose(
  result: Pick<RunAssessmentResult, 'title' | 'clinical' | 'crisis' | 'brief'> & {
    topName?: string
    leadScore?: number
  },
): string {
  const you = 'You'
  const lead = result.topName || 'your top pattern'
  const score = result.leadScore != null ? ` (${result.leadScore}/100)` : ''
  const crisis = result.crisis
    ? ' If you feel unsafe, contact emergency services, 988, or Samaritans 116 123 before trying to handle this alone.'
    : ''
  return (
    `${you}: you completed ${result.title}. ` +
    `Carry "${lead}"${score} into the next seven days as one deliberate experiment, not an identity.` +
    ' This remains educational, not a diagnosis.' +
    ` ${ASSESSMENT_LEGAL.noProvider}` +
    crisis
  )
}
