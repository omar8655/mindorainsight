import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { NhsMark } from '@/components/brand/NhsMark'
import { SalePriceBadge } from '@/components/marketing/SalePriceBadge'
import { ADHD_SCREENING_SLUG } from '@/data/adhdScreening'
import { testsForLibrary } from '@/data/tests'
import { useCurrency } from '@/features/currency/CurrencyProvider'
import { SaleCtaLink } from '@/features/sale/SaleCtaLink'
import { ScarcityMeter } from '@/features/sale/ScarcityMeter'
import { ACTIVE_SALE_TACTIC, saleTacticUsesScarcity } from '@/features/sale/saleTactic'
import { useLocalizedTest } from '@/hooks/useLocalizedCatalog'
import { useI18n } from '@/i18n/I18nProvider'

const FREE_ADHD_HREF = `/test/${ADHD_SCREENING_SLUG}`

function SlideBody({
  slug,
  index,
  total,
}: {
  slug: string
  index: number
  total: number
}) {
  const { t } = useI18n()
  const test = testsForLibrary().find((item) => item.slug === slug)!
  const localized = useLocalizedTest(test)
  const free = (test.priceUsd ?? 49) === 0

  return (
    <div key={slug} className="animate-fade-up">
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 md:mb-2">
        <p className="text-[11px] font-bold uppercase tracking-wide text-mi-green md:text-xs">
          {index + 1} / {total}
          {index === 0 && free ? ' · Start here' : ''}
        </p>
        {free && <SalePriceBadge priceUsd={0} size="sm" />}
      </div>
      <h2 className="mb-2 text-lg font-semibold leading-snug md:mb-3 md:text-2xl">
        {localized.title}
      </h2>
      <p className="mb-4 line-clamp-3 text-sm leading-6 text-mi-muted md:mb-5 md:line-clamp-none md:text-[15px]">
        {localized.description}
      </p>
      <div className="mb-4 flex flex-wrap items-center gap-2 md:mb-5">
        <span className="badge badge-level">{localized.levelLabel}</span>
        <span className="badge badge-meta">
          {test.questions} {t.common.questions}
        </span>
        <span className="badge badge-meta">
          {test.minutes} {t.common.minutes}
        </span>
        <SalePriceBadge priceUsd={test.priceUsd ?? 49} />
        <NhsMark size="sm" />
      </div>
      {free ? (
        <SaleCtaLink to={`/test/${test.slug}`} className="w-full !text-sm md:w-auto md:!text-base">
          Start free ADHD
        </SaleCtaLink>
      ) : (
        <Link
          to={`/test/${test.slug}`}
          className="btn-primary w-full justify-center !text-sm md:w-auto md:!text-base"
        >
          {t.common.tryNow}
        </Link>
      )}
    </div>
  )
}

export function HeroSlideshow() {
  const { t } = useI18n()
  const { localize, wasNowFreeLine } = useCurrency()
  // Free ADHD first, then other featured paths
  const slides = useMemo(() => testsForLibrary().slice(0, 6), [])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 5200)
    return () => window.clearInterval(id)
  }, [slides.length])

  const current = slides[index]

  return (
    <section className="relative overflow-hidden bg-[#0c1f17] text-white">
      <div
        className="hero-glow pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-mi-green/25 blur-3xl md:left-[8%] md:top-[15%]"
        aria-hidden
      />
      <div
        className="hero-glow hero-glow-delay pointer-events-none absolute -right-16 bottom-8 h-48 w-48 rounded-full bg-mi-blue/20 blur-3xl md:right-[10%] md:top-[8%] md:bottom-auto"
        aria-hidden
      />

      <div className="container relative grid items-center gap-8 py-10 sm:py-12 md:grid-cols-2 md:gap-12 md:py-20">
        <div className="animate-fade-up text-center md:text-start">
          {/* No duplicate logo/wordmark — site header already brands the page */}

          <div className="mb-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <SalePriceBadge priceUsd={0} />
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9fd9b8] sm:text-[11px]">
              {t.hero.eyebrow.replace(/^Free to start · /i, '')}
            </p>
          </div>

          <h1 className="font-display mx-auto mb-3 max-w-[18ch] text-[1.85rem] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[2.15rem] md:mx-0 md:mb-4 md:max-w-xl md:text-[48px] md:leading-[1.12]">
            {t.hero.title}{' '}
            <span className="text-[#7eb6ff]">{t.hero.titleAccent}</span>
          </h1>

          <p className="mx-auto mb-4 max-w-md text-[15px] leading-6 text-white/70 sm:leading-7 md:mx-0 md:mb-5 md:max-w-lg md:text-lg">
            {t.hero.subtitle}
          </p>

          <Link
            to={FREE_ADHD_HREF}
            className="mx-auto mb-6 flex max-w-md items-start gap-3 rounded-2xl border-2 border-mi-green/60 bg-gradient-to-br from-mi-green/25 to-mi-green/10 px-4 py-3.5 text-start shadow-[0_0_0_1px_rgba(49,176,112,0.25)] transition hover:from-mi-green/35 hover:to-mi-green/15 md:mx-0 md:mb-7 md:max-w-lg"
          >
            <span
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mi-green text-sm font-bold text-white"
              aria-hidden
            >
              →
            </span>
            <span className="min-w-0">
              <span className="mb-1 inline-flex">
                <SalePriceBadge priceUsd={0} size="sm" />
              </span>
              <span className="mt-1.5 block text-sm font-bold leading-5 text-white">
                {localize(t.hero.freeNudge)}
              </span>
              <span className="mt-1 block text-xs text-[#9fd9b8]">
                {localize(t.hero.priceLine) || wasNowFreeLine}
              </span>
            </span>
          </Link>

          {saleTacticUsesScarcity(ACTIVE_SALE_TACTIC) && (
            <div className="mx-auto mb-5 max-w-md md:mx-0 md:max-w-lg">
              <ScarcityMeter />
            </div>
          )}

          <div className="mx-auto flex w-full max-w-sm flex-col gap-2.5 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center md:mx-0 md:justify-start md:gap-3">
            <SaleCtaLink
              to={FREE_ADHD_HREF}
              variant="hero"
              className="w-full !px-5 !text-[15px] sm:w-auto"
            >
              Start free ADHD test
            </SaleCtaLink>
            <Link
              to="/library"
              className="hero-cta inline-flex w-full items-center justify-center rounded-lg border border-white/30 px-5 py-3.5 text-[15px] font-bold text-white transition hover:bg-white/10 sm:w-auto"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="animate-fade-up animate-delay-1 md:pt-0">
          <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-wider text-white/45 md:mb-3 md:text-start md:text-xs">
            {t.hero.slideLabel}
          </p>
          <div
            className={`relative overflow-hidden rounded-2xl border bg-white p-4 text-mi-text shadow-[0_16px_40px_rgba(0,0,0,0.3)] sm:p-5 md:bg-white/95 md:p-6 md:shadow-[0_20px_60px_rgba(0,0,0,0.35)] ${
              index === 0 ? 'border-mi-green/50 ring-2 ring-mi-green/30' : 'border-white/10'
            }`}
          >
            <SlideBody slug={current.slug} index={index} total={slides.length} />

            <div className="mt-5 flex items-center justify-between gap-3 md:mt-6">
              <div className="flex gap-1.5">
                {slides.map((s, i) => (
                  <button
                    key={s.slug}
                    type="button"
                    aria-label={`Slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? 'w-6 bg-mi-green' : 'w-2 bg-mi-border'
                    }`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-mi-border text-base font-semibold hover:bg-mi-canvas"
                  onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-mi-border text-base font-semibold hover:bg-mi-canvas"
                  onClick={() => setIndex((i) => (i + 1) % slides.length)}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
