import type { ReportFamily } from '@/domain/reports/types'

/** Map every catalog slug to a content family. */
export const SLUG_FAMILY: Record<string, ReportFamily> = {
  personality: 'ocean',
  big5: 'ocean',
  sixteen: 'types16',
  enneagram: 'enneagram',
  autism: 'wellbeing',
  adhd: 'adhd',
  'adhd-adult-screening': 'adhd',
  depression: 'wellbeing',
  love: 'wellbeing',
  attachment: 'wellbeing',
  strengths: 'workGeneric',
  career: 'workGeneric',
  archetype: 'spirit',
  political: 'workGeneric',
  disc: 'workGeneric',
  eq: 'workGeneric',
  character: 'workGeneric',
  bpd: 'wellbeing',
  bipolar: 'wellbeing',
  narcissism: 'workGeneric',
  trauma: 'wellbeing',
  'ui-preview-5': 'workGeneric',
}

export function familyForSlug(slug: string): ReportFamily {
  return SLUG_FAMILY[slug] ?? 'workGeneric'
}
