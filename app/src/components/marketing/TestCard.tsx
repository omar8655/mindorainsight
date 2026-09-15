import { Link } from 'react-router-dom'
import type { TestItem } from '@/data/tests'
import { UI_PREVIEW_SLUG } from '@/data/tests'
import { ADHD_SCREENING_SLUG } from '@/data/adhdScreening'
import { SalePriceBadge } from '@/components/marketing/SalePriceBadge'
import { SaleCtaLink } from '@/features/sale/SaleCtaLink'
import { useLocalizedTest } from '@/hooks/useLocalizedCatalog'
import { getAccessCopy } from '@/i18n/accessCopy'
import { useI18n } from '@/i18n/I18nProvider'

export function TestCard({ test }: { test: TestItem }) {
  const { t, code } = useI18n()
  const access = getAccessCopy(code)
  const localized = useLocalizedTest(test)
  const price = test.priceUsd ?? 49
  const free = price === 0
  const isAdhd = test.slug === ADHD_SCREENING_SLUG
  const isPreview = test.slug === UI_PREVIEW_SLUG
  const referral = !free

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-white p-4 shadow-[var(--mi-card-shadow)] transition active:scale-[0.99] sm:p-6 sm:hover:-translate-y-0.5 ${
        free
          ? 'border-mi-green/40 ring-1 ring-mi-green/20 sm:hover:border-mi-green/50'
          : 'border-amber-200/80 sm:hover:border-amber-300'
      }`}
    >
      {free ? (
        <div className="mb-2 flex min-h-[1.5rem] flex-wrap items-center gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-mi-green">
            {isPreview ? access.freeUiPreview : access.limitedFree}
          </p>
          <SalePriceBadge priceUsd={0} size="sm" />
        </div>
      ) : (
        <div className="mb-2 flex min-h-[1.5rem] flex-wrap items-center gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#005EB8]/90">
            {access.healthcareReferral}
          </p>
        </div>
      )}
      <Link to={`/test/${test.slug}`} className="min-w-0">
        <h3 className="mb-2 min-h-[3.5rem] line-clamp-2 text-lg font-semibold leading-snug text-mi-text sm:mb-3 sm:min-h-[3.75rem] sm:text-xl sm:leading-7">
          {localized.title}
        </h3>
      </Link>
      <p className="mb-4 line-clamp-3 min-h-[4.5rem] flex-1 text-sm leading-6 text-mi-muted sm:mb-5 sm:min-h-[4.75rem] sm:text-[15px]">
        {localized.description}
      </p>
      <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5">
        <span className="badge badge-level">{localized.levelLabel}</span>
        <span className="badge badge-meta">
          {test.questions} {t.common.questions}
        </span>
        <span className="badge badge-meta">
          {test.minutes} {t.common.minutes}
        </span>
        <SalePriceBadge priceUsd={price} />
        {referral && (
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-900">
            {access.emailPlusPin}
          </span>
        )}
      </div>
      {isAdhd ? (
        <SaleCtaLink to={`/test/${test.slug}`} className="mt-auto w-full !text-[15px] sm:!text-base">
          {access.startFreeAdhd}
        </SaleCtaLink>
      ) : isPreview ? (
        <Link
          to={`/test/${test.slug}`}
          className="btn-primary mt-auto w-full !px-4 !py-3.5 !text-[15px] sm:!text-base"
        >
          {access.tryUiPreview}
        </Link>
      ) : (
        <Link
          to={`/test/${test.slug}`}
          className="btn-outline mt-auto w-full !px-4 !py-3.5 !text-[15px] sm:!text-base"
        >
          {access.unlockWithReferral}
        </Link>
      )}
    </article>
  )
}
