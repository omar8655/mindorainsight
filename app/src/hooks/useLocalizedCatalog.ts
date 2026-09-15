import type { CategoryId } from '@/data/categories'
import type { LevelKey, TestItem } from '@/data/tests'
import { getAssessmentCopy } from '@/i18n/assessmentCopy'
import { useI18n } from '@/i18n/I18nProvider'

export type LocalizedTest = TestItem & {
  title: string
  description: string
  levelLabel: string
}

export function useLocalizedTest(test: TestItem): LocalizedTest {
  const { code, t } = useI18n()
  const copy = getAssessmentCopy(code, test.slug)
  return {
    ...test,
    title: copy.title,
    description: copy.description,
    levelLabel: t.levels[test.level as LevelKey],
  }
}

export function useCategoryLabel(id: CategoryId | string) {
  const { t } = useI18n()
  return t.categories[id as CategoryId] ?? id
}
