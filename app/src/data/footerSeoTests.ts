import type { SeoLabelKey } from '@/i18n/seoTestLabels'
import { TEST_META } from '@/data/newmindora/tests-core.js'

export type FooterSeoTestLink = {
  labelKey: SeoLabelKey
  slug: string
  free?: boolean
  /** Prefer catalog title when set */
  title?: string
}

/** One SEO link per NewMindora topic — all free, production catalog. */
const LABEL_FOR: Record<string, SeoLabelKey> = {
  personality: 'personality',
  big5: 'bigFive',
  sixteen: 'sixteenPersonalities',
  enneagram: 'enneagram',
  autism: 'autism',
  adhd: 'freeAdhd',
  depression: 'mood',
  love: 'loveLanguages',
  attachment: 'attachment',
  strengths: 'strengthsFinder',
  career: 'careerAptitude',
  archetype: 'jungian',
  political: 'politicalCompass',
  disc: 'disc',
  eq: 'eq',
  character: 'peoplePleaser',
  bpd: 'resilience',
  bipolar: 'burnout',
  narcissism: 'narcissism',
  trauma: 'neurodivergent',
}

export const FOOTER_SEO_TESTS: FooterSeoTestLink[] = TEST_META.map((t) => ({
  labelKey: LABEL_FOR[t.id] ?? 'personality',
  slug: t.id,
  free: true,
  title: t.title,
}))
