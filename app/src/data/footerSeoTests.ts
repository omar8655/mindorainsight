import { ADHD_SCREENING_SLUG } from '@/data/adhdScreening'
import type { SeoLabelKey } from '@/i18n/seoTestLabels'

/**
 * Footer / hub marketing links — labels are localized via seoTestLabels.
 * Listing is for discovery only; access still follows price + referral rules.
 */
export type FooterSeoTestLink = {
  labelKey: SeoLabelKey
  slug: string
  /** Truly free open path (Adult ADHD Pattern Screen) */
  free?: boolean
}

export const FOOTER_SEO_TESTS: FooterSeoTestLink[] = [
  { labelKey: 'freeAdhd', slug: ADHD_SCREENING_SLUG, free: true },
  { labelKey: 'adultAdhd', slug: ADHD_SCREENING_SLUG, free: true },
  { labelKey: 'personality', slug: 'core-work-personality' },
  { labelKey: 'mood', slug: 'emotional-range-at-work' },
  { labelKey: 'ocean', slug: 'ocean-workplace-profile' },
  { labelKey: 'attachment', slug: 'attachment-at-work' },
  { labelKey: 'strengthsFinder', slug: 'strengths-operating-system' },
  { labelKey: 'empathy', slug: 'empathy-in-leadership' },
  { labelKey: 'neurodivergent', slug: 'neurodiversity-at-work' },
  { labelKey: 'autism', slug: 'sensory-work-fit' },
  { labelKey: 'burnout', slug: 'energy-cycle-tracker' },
  { labelKey: 'narcissism', slug: 'drive-ego-balance' },
  { labelKey: 'politicalCompass', slug: 'decision-values-spectrum' },
  { labelKey: 'ocd', slug: 'systems-order-habits' },
  { labelKey: 'resilience', slug: 'resilience-under-load' },
  { labelKey: 'dopamine', slug: 'motivation-engine' },
  { labelKey: 'careerAptitude', slug: 'career-path-fit' },
  { labelKey: 'disc', slug: 'disc-collaboration-map' },
  { labelKey: 'myersBriggs', slug: '16-types-career-lens' },
  { labelKey: 'mentalAge', slug: 'professional-mindset-age' },
  { labelKey: 'jungian', slug: 'work-archetype' },
  { labelKey: 'audhd', slug: 'focus-impulse-profile' },
  { labelKey: 'bigFive', slug: 'big-five-career-map' },
  { labelKey: 'loveLanguages', slug: 'partnership-alignment' },
  { labelKey: 'enneagram', slug: 'enneagram-for-operators' },
  { labelKey: 'sixteenPersonalities', slug: '16-types-career-lens' },
  { labelKey: 'darkTriad', slug: 'influence-dynamics' },
  { labelKey: 'concentration', slug: 'work-focus-patterns' },
  { labelKey: 'eq', slug: 'eq-for-teams' },
  { labelKey: 'teamwork', slug: 'collaboration-style' },
  { labelKey: 'impulseControl', slug: 'focus-impulse-profile' },
  { labelKey: 'peoplePleaser', slug: 'recognition-style' },
]
