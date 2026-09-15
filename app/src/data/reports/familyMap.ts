import type { ReportFamily } from '@/domain/reports/types'

/** Map every catalog slug to a content family. */
export const SLUG_FAMILY: Record<string, ReportFamily> = {
  'ocean-workplace-profile': 'ocean',
  'big-five-career-map': 'ocean',
  'adhd-adult-screening': 'adhd',
  '16-types-career-lens': 'types16',
  'enneagram-for-operators': 'enneagram',
  'core-work-personality': 'enneagram',
  'inner-drive-totem': 'spirit',
  'emotional-range-at-work': 'wellbeing',
  'resilience-under-load': 'wellbeing',
  'energy-cycle-tracker': 'wellbeing',
  'neurodiversity-at-work': 'wellbeing',
  'sensory-work-fit': 'wellbeing',
  'attachment-at-work': 'wellbeing',
  'focus-impulse-profile': 'wellbeing',
  'work-focus-patterns': 'workGeneric',
  'drive-ego-balance': 'workGeneric',
  'decision-values-spectrum': 'workGeneric',
  'eq-for-teams': 'workGeneric',
  'professional-mindset-age': 'workGeneric',
  'systems-order-habits': 'workGeneric',
  'collaboration-style': 'workGeneric',
  'empathy-in-leadership': 'workGeneric',
  'work-archetype': 'workGeneric',
  'influence-dynamics': 'workGeneric',
  'strengths-operating-system': 'workGeneric',
  'problem-solving-iq-sprint': 'workGeneric',
  'recognition-style': 'workGeneric',
  'motivation-engine': 'workGeneric',
  'career-path-fit': 'workGeneric',
  'disc-collaboration-map': 'workGeneric',
  'partnership-alignment': 'workGeneric',
  'ui-preview-5': 'workGeneric',
}

export function familyForSlug(slug: string): ReportFamily {
  return SLUG_FAMILY[slug] ?? 'workGeneric'
}
