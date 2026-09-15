import { Link } from 'react-router-dom'
import { Seo } from '@/components/layout/Seo'
import { SalePriceBadge } from '@/components/marketing/SalePriceBadge'
import { ADHD_SCREENING_SLUG } from '@/data/adhdScreening'
import { FOOTER_SEO_TESTS } from '@/data/footerSeoTests'
import { getTestBySlug } from '@/data/tests'
import { useCurrency } from '@/features/currency/CurrencyProvider'
import { useLocalizedTest } from '@/hooks/useLocalizedCatalog'
import { getAccessCopy } from '@/i18n/accessCopy'
import { useI18n } from '@/i18n/I18nProvider'
import { getSeoTestLabel, type SeoLabelKey } from '@/i18n/seoTestLabels'
import { absoluteUrl } from '@/lib/seo'
import { freeAdhdJsonLd, organizationJsonLd } from '@/lib/structuredData'

function FreeTestRow({
  slug,
  labelKey,
  highlight,
}: {
  slug: string
  labelKey: SeoLabelKey
  highlight?: boolean
}) {
  const { code, t } = useI18n()
  const access = getAccessCopy(code)
  const label = getSeoTestLabel(code, labelKey)
  const test = getTestBySlug(slug)
  const localized = useLocalizedTest(
    test ?? { slug, categoryIds: [], level: 'beginner', questions: 20, minutes: 8 },
  )
  const { listPrice } = useCurrency()

  return (
    <li>
      <Link
        to={`/test/${slug}`}
        className={`flex h-full flex-col rounded-2xl border bg-white p-4 shadow-[var(--mi-card-shadow)] transition hover:border-mi-green/40 ${
          highlight ? 'border-mi-green/35 ring-1 ring-mi-green/20' : 'border-mi-border'
        }`}
      >
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {highlight ? (
            <SalePriceBadge priceUsd={0} size="sm" />
          ) : (
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-900">
              {access.referralPin} · {listPrice}
            </span>
          )}
          <span className="text-[10px] font-bold uppercase tracking-wide text-mi-muted">
            {highlight ? access.freeTestBadge : access.freeTestSearchBadge}
          </span>
        </div>
        <h2 className="text-base font-semibold text-mi-forest sm:text-lg">{label}</h2>
        {test ? (
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-5 text-mi-muted">{localized.description}</p>
        ) : (
          <p className="mt-2 flex-1 text-sm text-mi-muted">{localized.description}</p>
        )}
        <p className="mt-3 text-sm font-semibold text-mi-green">
          {highlight ? `${access.startFreeAdhd} →` : `${t.common.tryNow} →`}
        </p>
      </Link>
    </li>
  )
}

/**
 * Crawlable free-tests hub — marketing labels for discovery (localized).
 * Only the Adult ADHD Test is open without a referral PIN.
 */
export function FreeTestsPage() {
  const { code, t } = useI18n()
  const access = getAccessCopy(code)
  const { saleFreeLabel } = useCurrency()
  const unique = FOOTER_SEO_TESTS.filter(
    (item, i, arr) => arr.findIndex((x) => x.labelKey === item.labelKey) === i,
  )
  const adhd = unique.filter((x) => x.slug === ADHD_SCREENING_SLUG)
  const others = unique.filter((x) => x.slug !== ADHD_SCREENING_SLUG)

  return (
    <>
      <Seo
        title={`${getSeoTestLabel(code, 'freeAdhd')} & ${getSeoTestLabel(code, 'personality')}`}
        description={access.libraryBanner}
        path="/free-tests"
        keywords="free ADHD test, free personality test, OCEAN test, Big Five test, free career assessment, MindoraInsight"
        jsonLd={[
          organizationJsonLd(),
          freeAdhdJsonLd(),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Free MindoraInsight Assessments',
            url: absoluteUrl('/free-tests'),
            description: access.libraryBanner,
            isPartOf: { '@type': 'WebSite', name: 'MindoraInsight', url: absoluteUrl('/') },
          },
        ]}
      />
      <section className="border-b border-mi-border bg-[#0c1f17] text-white">
        <div className="container py-10 text-center sm:py-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9fd9b8]">
            {access.moreFreeTests}
          </p>
          <h1 className="font-display mx-auto mt-2 max-w-2xl text-[1.75rem] font-semibold sm:text-4xl">
            {access.exploreAssessments}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
            <span className="font-semibold text-[#7ddea8]">{saleFreeLabel}</span> ·{' '}
            {getSeoTestLabel(code, 'adultAdhd')}
          </p>
          <Link
            to={`/test/${ADHD_SCREENING_SLUG}`}
            className="btn-primary mt-6 inline-flex !bg-mi-green"
          >
            {access.startFreeAdhd}
          </Link>
        </div>
      </section>

      <section className="bg-mi-canvas py-8 md:py-12">
        <div className="container">
          <h2 className="font-display text-xl font-semibold text-mi-forest sm:text-2xl">
            {access.featuredFreePath}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {adhd.map((item) => (
              <FreeTestRow key={item.labelKey} slug={item.slug} labelKey={item.labelKey} highlight />
            ))}
          </ul>

          <h2 className="font-display mt-10 text-xl font-semibold text-mi-forest sm:text-2xl">
            {access.moreFreeTests}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-mi-muted">{access.moreFreeTestsHint}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <FreeTestRow key={item.labelKey} slug={item.slug} labelKey={item.labelKey} />
            ))}
          </ul>
          <p className="mt-8 text-center text-sm text-mi-muted">
            <Link to="/library" className="font-semibold text-mi-green hover:underline">
              {t.nav.library}
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
