/**
 * Individualized educational interpretation — plain English.
 * Not a diagnosis. Not a copy of any handbook.
 */

import type { AdhdDomain } from '@/data/adhdScreening'
import { ADHD_DOMAIN_LABELS } from '@/data/adhdScreening'

export type DomainScore = {
  domain: AdhdDomain
  name: string
  score: number
}

export type Band = 'low' | 'moderate' | 'elevated' | 'high'

export function bandFor(score: number): Band {
  if (score >= 75) return 'high'
  if (score >= 60) return 'elevated'
  if (score >= 40) return 'moderate'
  return 'low'
}

const BAND_LABEL: Record<Band, string> = {
  low: 'lower',
  moderate: 'medium',
  elevated: 'higher',
  high: 'much higher',
}

const DOMAIN_VOICE: Record<AdhdDomain, { high: string; low: string; tip: string }> = {
  inattention: {
    high: 'It can be hard to stay focused, catch small details, or stick with boring work — even when you care.',
    low: 'Focus and noticing details look steadier in your answers.',
    tip: 'Try short work blocks, a simple checklist, and a quieter place when you can.',
  },
  hyperactivity: {
    high: 'You may feel restless or need to move a lot. Sitting still for long can feel hard.',
    low: 'Restlessness looks less central in your answers.',
    tip: 'Walk while you think, stand at a desk, or take short movement breaks.',
  },
  impulsivity: {
    high: 'You may speak or act before you fully pause — then wish you had waited.',
    low: 'Waiting before you act looks easier in your answers.',
    tip: 'Count to ten before you send, buy, or reply when you feel rushed.',
  },
  executive: {
    high: 'Starting tasks, planning steps, and finishing what you start can feel especially hard.',
    low: 'Planning and finishing look relatively stronger here.',
    tip: 'Write one next step only. Ask someone to check in with you once.',
  },
  emotion: {
    high: 'Feelings can rise fast and take longer to settle. Stress or criticism may hit hard.',
    low: 'Settling after strong feelings looks steadier in this screen.',
    tip: 'Name the feeling, step away if you need to, then decide — not at the peak.',
  },
  time_motivation: {
    high: 'Time can slip by. Motivation may come late, or only when something feels interesting.',
    low: 'Time sense and steady follow-through look less strained here.',
    tip: 'Put deadlines where you can see them. Pair dull tasks with something you like.',
  },
}

export function detectProfileShape(traits: DomainScore[]): {
  id: string
  title: string
  blurb: string
} {
  const map = Object.fromEntries(traits.map((t) => [t.domain, t.score])) as Record<
    AdhdDomain,
    number
  >
  const hi = (d: AdhdDomain) => map[d] >= 60
  const lo = (d: AdhdDomain) => map[d] < 40

  if (hi('inattention') && hi('executive') && lo('hyperactivity')) {
    return {
      id: 'quiet-inattentive',
      title: 'Quiet focus & planning pattern',
      blurb:
        'Your higher scores are more about focus and getting organised than about looking restless. People with this pattern are sometimes missed because they seem calm, while starting and finishing still feel hard inside.',
    }
  }
  if (hi('hyperactivity') && hi('impulsivity') && !hi('inattention')) {
    return {
      id: 'restless-impulsive',
      title: 'Restless & quick-action pattern',
      blurb:
        'Energy and fast action stand out more than “zoning out.” The hard part may be interrupting, impatience, or deciding too soon — even when focus is fine for work you like.',
    }
  }
  if (hi('emotion') && (hi('impulsivity') || hi('executive'))) {
    return {
      id: 'emotion-regulation',
      title: 'Strong-feelings pattern',
      blurb:
        'Big feelings sit near the centre of your results, often with impulse or planning strain. That can look like a mood issue when the deeper theme is how hard it is to settle under stress.',
    }
  }
  if (hi('time_motivation') && hi('executive')) {
    return {
      id: 'time-blind-executive',
      title: 'Time & follow-through pattern',
      blurb:
        'Deadlines, last-minute urgency, and “I’ll start later” mix with planning friction. You may do well in a crisis and struggle in quiet weeks. That is a rhythm — not laziness.',
    }
  }
  if (hi('inattention') && hi('hyperactivity') && hi('impulsivity')) {
    return {
      id: 'combined-broad',
      title: 'Broader mixed elevation',
      blurb:
        'Several areas are higher together. Your story is still personal — which score is highest below is what to talk about first with a professional.',
    }
  }
  if (traits.every((t) => t.score < 45)) {
    return {
      id: 'lower-overall',
      title: 'Lower overall on this screen',
      blurb:
        'Most areas sit lower. That does not erase hard days. If life still feels hard, bring real examples to a clinician anyway. Screens miss context.',
    }
  }
  const top = [...traits].sort((a, b) => b.score - a.score)[0]!
  return {
    id: 'mixed-individual',
    title: `Mixed pattern — strongest: ${top.name}`,
    blurb: `Your pattern is mixed, not one simple type. Lead with your highest area (${top.name} at ${top.score}%) when you talk to a professional, then mention the next two so they see the whole picture.`,
  }
}

export function buildIndividualNarrative(traits: DomainScore[], overall: number) {
  const sorted = [...traits].sort((a, b) => b.score - a.score)
  const top3 = sorted.slice(0, 3)
  const strengths = sorted.filter((t) => t.score < 40).slice(-2)
  const shape = detectProfileShape(traits)

  const domainParagraphs = sorted.map((t) => {
    const band = bandFor(t.score)
    const voice = DOMAIN_VOICE[t.domain]
    const line = band === 'low' || band === 'moderate' ? voice.low : voice.high
    return {
      domain: t.domain,
      name: t.name,
      score: t.score,
      band,
      bandLabel: BAND_LABEL[band],
      line,
      tip: voice.tip,
    }
  })

  const opening = [
    `This summary is about your pattern — not a one-size ADHD label.`,
    `Overall score on this educational screen: ${overall}%.`,
    `Pattern type: ${shape.title}. ${shape.blurb}`,
  ].join(' ')

  const focusNow = `Start here: ${top3.map((t) => `${t.name} (${t.score}%)`).join(', ')}.`

  const strengthNote =
    strengths.length > 0
      ? `Steadier areas on this screen: ${strengths.map((t) => t.name).join(' and ')}. Protect what already works.`
      : `No area is clearly low here — support may need to cover more than one thing, still starting with your top scores.`

  const clinicianNote = [
    'For a licensed professional (educational handoff only):',
    `- Highest areas: ${top3.map((t) => `${ADHD_DOMAIN_LABELS[t.domain]} ${t.score}%`).join('; ')}.`,
    `- Shape tag: ${shape.id}.`,
    '- This is a self-report educational screen, not a diagnosis or clinical interview.',
    '- Please interpret only with history, real-life impact, and full clinical context.',
  ].join('\n')

  const summary = [opening, focusNow, strengthNote].join(' ')

  return {
    shape,
    opening,
    focusNow,
    strengthNote,
    summary,
    domainParagraphs,
    clinicianNote,
    top3,
  }
}
