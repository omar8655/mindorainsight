import type { CategoryId } from '@/data/categories'
import { formatMoneyFixed, type CurrencyCode } from '@/lib/currency'
import { TEST_META } from '@/data/newmindora/tests-core.js'

export type LevelKey = 'beginner' | 'intermediate' | 'advanced'

export type TestItem = {
  slug: string
  categoryIds: CategoryId[]
  level: LevelKey
  questions: number
  minutes: number
  /** Display price in USD. Use 0 for free assessments. */
  priceUsd?: number
  clinical?: boolean
  crisis?: boolean
}

const CATEGORY_FOR: Record<string, CategoryId[]> = {
  personality: ['personality'],
  big5: ['personality'],
  sixteen: ['personality'],
  enneagram: ['personality', 'mindset'],
  autism: ['neuro', 'wellbeing'],
  adhd: ['neuro', 'wellbeing'],
  depression: ['wellbeing'],
  love: ['eq'],
  attachment: ['eq', 'wellbeing'],
  strengths: ['mindset', 'growth'],
  career: ['career', 'growth'],
  archetype: ['personality', 'career'],
  political: ['decisions'],
  disc: ['eq', 'career'],
  eq: ['eq'],
  character: ['mindset', 'growth'],
  bpd: ['wellbeing', 'eq'],
  bipolar: ['wellbeing'],
  narcissism: ['mindset', 'eq'],
  trauma: ['wellbeing'],
}

/** NewMindora 20-topic catalog — 100Q each, free, reference-backed. */
export const tests: TestItem[] = [
  ...TEST_META.map((t) => ({
    slug: t.id,
    categoryIds: CATEGORY_FOR[t.id] ?? (['personality'] as CategoryId[]),
    level: 'intermediate' as LevelKey,
    questions: 100,
    minutes: t.mins || 15,
    priceUsd: 0,
    clinical: !!t.clinical,
    crisis: !!t.crisis,
  })),
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

/** Library order: all assessments free — no PIN. */
export function testsForLibrary(): TestItem[] {
  return tests.filter((t) => t.slug !== UI_PREVIEW_SLUG)
}

export function testPriceLabel(test: TestItem, currencyCode: CurrencyCode = 'USD'): string {
  const price = test.priceUsd ?? 0
  if (price === 0) return 'Free'
  return formatMoneyFixed(price, currencyCode)
}

export function getTestBySlug(slug: string) {
  if (slug === 'adhd-adult-screening') return tests.find((t) => t.slug === 'adhd')
  return tests.find((t) => t.slug === slug)
}
