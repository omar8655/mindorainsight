import { Link } from 'react-router-dom'
import { UI_PREVIEW_SLUG, type TestItem } from '@/data/tests'
import { SalePriceBadge } from '@/components/marketing/SalePriceBadge'
import { useLocalizedTest } from '@/hooks/useLocalizedCatalog'
import { getAccessCopy } from '@/i18n/accessCopy'
import { useI18n } from '@/i18n/I18nProvider'

/** Production library card — Free · 15 min · 100 Q · Start test → */
export function TestCard({ test }: { test: TestItem }) {
  const { t, code } = useI18n()
  const access = getAccessCopy(code)
  const localized = useLocalizedTest(test)
  const isPreview = test.slug === UI_PREVIEW_SLUG

  return (
    <article className="test-card flex h-full min-w-0 flex-col rounded-2xl border border-mi-border bg-white p-4 shadow-[var(--mi-card-shadow)] transition hover:border-mi-green/45 hover:shadow-md active:scale-[0.99] sm:p-5">
      <Link to={`/test/${test.slug}`} className="min-w-0">
        <h3 className="mb-1.5 line-clamp-2 text-base font-semibold leading-snug text-mi-forest sm:text-xl">
          {localized.title}
        </h3>
      </Link>
      <p className="mb-3 line-clamp-3 flex-1 text-sm leading-relaxed text-mi-muted sm:leading-6">
        {localized.description}
      </p>
      <div className="mb-3 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-mi-muted sm:text-[13px]">
        <SalePriceBadge priceUsd={0} size="sm" className="shrink-0" />
        <span className="inline-flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5">
          <span aria-hidden className="text-mi-border/80">
            ·
          </span>
          <span className="whitespace-nowrap">
            {test.minutes} {t.common.minutes}
          </span>
          <span aria-hidden className="text-mi-border/80">
            ·
          </span>
          <span className="whitespace-nowrap">
            {test.questions} {t.common.questions}
          </span>
          {!isPreview ? (
            <>
              <span aria-hidden className="text-mi-border/80">
                ·
              </span>
              <span className="whitespace-nowrap">PDF dossier</span>
            </>
          ) : null}
        </span>
      </div>
      <Link
        to={`/test/${test.slug}`}
        className="mt-auto inline-flex min-h-11 items-center text-sm font-bold text-mi-green hover:underline sm:min-h-0 sm:text-[15px]"
      >
        {isPreview ? access.tryUiPreview : `${t.common.tryNow} →`}
      </Link>
    </article>
  )
}
