import { Link } from 'react-router-dom'
import { Seo } from '@/components/layout/Seo'
import { SalePriceBadge } from '@/components/marketing/SalePriceBadge'
import { TEST_META } from '@/data/newmindora/tests-core.js'
import { getTestBySlug } from '@/data/tests'
import { useCurrency } from '@/features/currency/CurrencyProvider'
import { useLocalizedTest } from '@/hooks/useLocalizedCatalog'
import { getAccessCopy } from '@/i18n/accessCopy'
import { useI18n } from '@/i18n/I18nProvider'
import { absoluteUrl, DEFAULT_SEO } from '@/lib/seo'
import { freeTestsItemListJsonLd, organizationJsonLd } from '@/lib/structuredData'

function FreeTestRow({ slug, title }: { slug: string; title: string }) {
  const { t } = useI18n()
  const test = getTestBySlug(slug)
  const localized = useLocalizedTest(
    test ?? { slug, categoryIds: ['personality'], level: 'intermediate', questions: 100, minutes: 15 },
  )
  const minutes = test?.minutes ?? 15
  const questions = test?.questions ?? 100

  return (
    <li className="min-w-0">
      <Link
        to={`/test/${slug}`}
        className="test-card flex h-full min-w-0 flex-col rounded-2xl border border-mi-border bg-white p-4 shadow-[var(--mi-card-shadow)] transition hover:border-mi-green/40 active:scale-[0.99]"
      >
        <h2 className="line-clamp-2 text-base font-semibold leading-snug text-mi-forest sm:text-lg">{title}</h2>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-mi-muted">{localized.description}</p>
        <div className="mt-3 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-mi-muted sm:text-[13px]">
          <SalePriceBadge priceUsd={0} size="sm" className="shrink-0" />
          <span className="inline-flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5">
            <span aria-hidden className="text-mi-border/80">
              ·
            </span>
            <span className="whitespace-nowrap">
              {minutes} {t.common.minutes}
            </span>
            <span aria-hidden className="text-mi-border/80">
              ·
            </span>
            <span className="whitespace-nowrap">
              {questions} {t.common.questions}
            </span>
          </span>
        </div>
        <p className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-mi-green sm:min-h-0">
          {t.common.tryNow} →
        </p>
      </Link>
    </li>
  )
}

/** Crawlable free-tests hub — all 20 NewMindora topics. */
export function FreeTestsPage() {
  const { t, code } = useI18n()
  const access = getAccessCopy(code)
  const { saleFreeLabel } = useCurrency()

  return (
    <>
      <Seo
        title="20 Free Tests — Personality, ADHD, EQ & More (100 Questions)"
        description="Take any of 20 free MindoraInsight assessments — Personality, Big 5, ADHD, Enneagram, Attachment, Career, DISC, EQ, and more. 100 questions each · instant scores · printable Mindora Dossier PDF. No PIN, no card."
        path="/free-tests"
        keywords={DEFAULT_SEO.keywords}
        jsonLd={[
          organizationJsonLd(),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: '20 Free MindoraInsight Assessments',
            url: absoluteUrl('/free-tests'),
            description:
              'Free psychometric assessments with 100 questions each and printable Mindora Dossier PDFs.',
            numberOfItems: 20,
            isPartOf: { '@type': 'WebSite', name: 'MindoraInsight', url: absoluteUrl('/') },
          },
          freeTestsItemListJsonLd(
            TEST_META.map((t) => ({ title: t.title, slug: t.id, description: t.blurb })),
          ),
        ]}
      />
      <section className="border-b border-mi-border bg-[#0c1f17] text-white">
        <div className="container py-10 text-center sm:py-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9fd9b8]">
            {access.moreFreeTests}
          </p>
          <h1 className="font-display mx-auto mt-2 max-w-2xl break-words text-[1.625rem] font-semibold leading-tight sm:text-4xl">
            {access.exploreAssessments}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            <span className="font-semibold text-[#7ddea8]">{saleFreeLabel}</span>
            <span className="mx-1.5 text-white/40" aria-hidden>
              ·
            </span>
            20 topics
            <span className="mx-1.5 text-white/40" aria-hidden>
              ·
            </span>
            100 questions
            <span className="mx-1.5 text-white/40" aria-hidden>
              ·
            </span>
            printable PDF report
          </p>
          <a href="#all-free-tests" className="btn-primary mt-6 inline-flex !bg-mi-green">
            {access.allFreeTests}
          </a>
        </div>
      </section>

      <section id="all-free-tests" className="bg-mi-canvas py-8 md:py-12">
        <div className="container min-w-0">
          <h2 className="font-display text-xl font-semibold text-mi-forest sm:text-2xl">
            All 20 free assessments
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mi-muted">{access.moreFreeTestsHint}</p>
          <p className="mt-1 text-xs text-mi-muted">{access.freeTestsDisclaimer}</p>
          <ul className="mt-5 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TEST_META.map((item) => (
              <FreeTestRow key={item.id} slug={item.id} title={item.title} />
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
