import type { CategoryId } from '@/data/categories'
import { formatMoneyFixed, type CurrencyCode } from '@/lib/currency'

export type LevelKey = 'beginner' | 'intermediate' | 'advanced'

export type TestItem = {
  slug: string
  categoryIds: CategoryId[]
  level: LevelKey
  questions: number
  minutes: number
  /** Display price in USD. Use 0 for free assessments. */
  priceUsd?: number
}

/** Stable slugs — titles live in i18n so language switches never break URLs. */
export const tests: TestItem[] = [
  { slug: 'work-focus-patterns', categoryIds: ['memory', 'energy'], level: 'intermediate', questions: 40, minutes: 12 },
  { slug: 'emotional-range-at-work', categoryIds: ['wellbeing', 'eq'], level: 'intermediate', questions: 45, minutes: 14 },
  { slug: 'ocean-workplace-profile', categoryIds: ['personality'], level: 'intermediate', questions: 50, minutes: 15 },
  { slug: 'big-five-career-map', categoryIds: ['personality', 'career'], level: 'intermediate', questions: 50, minutes: 15 },
  { slug: 'drive-ego-balance', categoryIds: ['mindset'], level: 'intermediate', questions: 36, minutes: 12 },
  { slug: 'decision-values-spectrum', categoryIds: ['decisions'], level: 'intermediate', questions: 40, minutes: 12 },
  { slug: 'eq-for-teams', categoryIds: ['eq'], level: 'intermediate', questions: 42, minutes: 13 },
  { slug: 'professional-mindset-age', categoryIds: ['mindset', 'growth'], level: 'intermediate', questions: 30, minutes: 10 },
  { slug: 'systems-order-habits', categoryIds: ['decisions', 'memory'], level: 'intermediate', questions: 38, minutes: 12 },
  { slug: 'energy-cycle-tracker', categoryIds: ['energy', 'wellbeing'], level: 'intermediate', questions: 35, minutes: 11 },
  { slug: 'collaboration-style', categoryIds: ['eq'], level: 'intermediate', questions: 34, minutes: 11 },
  { slug: 'focus-impulse-profile', categoryIds: ['memory', 'neuro'], level: 'intermediate', questions: 40, minutes: 12 },
  { slug: 'empathy-in-leadership', categoryIds: ['eq', 'growth'], level: 'intermediate', questions: 32, minutes: 10 },
  { slug: 'resilience-under-load', categoryIds: ['wellbeing'], level: 'intermediate', questions: 36, minutes: 12 },
  { slug: 'work-archetype', categoryIds: ['personality', 'career'], level: 'intermediate', questions: 40, minutes: 12 },
  { slug: 'influence-dynamics', categoryIds: ['eq', 'decisions'], level: 'advanced', questions: 38, minutes: 13 },
  { slug: 'strengths-operating-system', categoryIds: ['mindset', 'growth'], level: 'intermediate', questions: 44, minutes: 14 },
  { slug: 'neurodiversity-at-work', categoryIds: ['neuro'], level: 'intermediate', questions: 40, minutes: 12 },
  { slug: 'problem-solving-iq-sprint', categoryIds: ['career', 'decisions'], level: 'intermediate', questions: 25, minutes: 15 },
  { slug: 'recognition-style', categoryIds: ['eq', 'energy'], level: 'beginner', questions: 28, minutes: 8 },
  { slug: 'attachment-at-work', categoryIds: ['eq', 'wellbeing'], level: 'intermediate', questions: 32, minutes: 10 },
  { slug: 'core-work-personality', categoryIds: ['personality'], level: 'intermediate', questions: 45, minutes: 14 },
  { slug: 'enneagram-for-operators', categoryIds: ['personality', 'mindset'], level: 'intermediate', questions: 48, minutes: 15 },
  { slug: '16-types-career-lens', categoryIds: ['personality', 'career'], level: 'intermediate', questions: 50, minutes: 16 },
  { slug: 'sensory-work-fit', categoryIds: ['neuro', 'wellbeing'], level: 'intermediate', questions: 36, minutes: 11 },
  { slug: 'motivation-engine', categoryIds: ['energy', 'mindset'], level: 'intermediate', questions: 34, minutes: 11 },
  { slug: 'career-path-fit', categoryIds: ['career', 'growth'], level: 'intermediate', questions: 42, minutes: 13 },
  { slug: 'disc-collaboration-map', categoryIds: ['eq', 'career'], level: 'intermediate', questions: 40, minutes: 12 },
  { slug: 'inner-drive-totem', categoryIds: ['mindset', 'energy'], level: 'beginner', questions: 24, minutes: 8 },
  { slug: 'partnership-alignment', categoryIds: ['eq'], level: 'beginner', questions: 16, minutes: 6 },
  {
    slug: 'adhd-adult-screening',
    categoryIds: ['neuro', 'wellbeing'],
    level: 'intermediate',
    questions: 100,
    minutes: 25,
    priceUsd: 0,
  },
  {
    slug: 'ui-preview-5',
    categoryIds: ['growth'],
    level: 'beginner',
    questions: 5,
    minutes: 2,
    priceUsd: 0,
  },
]

export const UI_PREVIEW_SLUG = 'ui-preview-5'

/** Library order: free ADHD, UI preview, then referral-gated catalog. */
export function testsForLibrary(): TestItem[] {
  const free = tests.filter((t) => (t.priceUsd ?? 49) === 0)
  const paid = tests.filter((t) => (t.priceUsd ?? 49) !== 0)
  const adhd = free.filter((t) => t.slug === 'adhd-adult-screening')
  const preview = free.filter((t) => t.slug === UI_PREVIEW_SLUG)
  const otherFree = free.filter(
    (t) => t.slug !== 'adhd-adult-screening' && t.slug !== UI_PREVIEW_SLUG,
  )
  return [...adhd, ...preview, ...otherFree, ...paid]
}

export function testPriceLabel(test: TestItem, currencyCode: CurrencyCode = 'USD'): string {
  const price = test.priceUsd ?? 49
  if (price === 0) return 'Free'
  return formatMoneyFixed(price, currencyCode)
}

export function getTestBySlug(slug: string) {
  return tests.find((t) => t.slug === slug)
}
