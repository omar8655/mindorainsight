import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SalePriceBadge } from '@/components/marketing/SalePriceBadge'
import { ADHD_SCREENING_SLUG } from '@/data/adhdScreening'
import { UI_PREVIEW_SLUG, tests, type TestItem } from '@/data/tests'
import { useLocalizedTest } from '@/hooks/useLocalizedCatalog'
import { useI18n } from '@/i18n/I18nProvider'

type RelatedTryCarouselProps = {
  currentSlug: string
  categoryIds?: string[]
  limit?: number
}

function goToTestTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

function TrySlideCard({ test }: { test: TestItem }) {
  const { t } = useI18n()
  const localized = useLocalizedTest(test)
  const price = test.priceUsd ?? 0
  const free = price === 0

  return (
    <article
      data-slide-card
      className="flex h-full min-h-[20rem] w-[min(calc(100vw-2.5rem),19rem)] shrink-0 snap-center flex-col rounded-2xl border border-mi-border bg-white p-4 shadow-sm sm:min-h-[23.5rem] sm:w-[17.5rem] sm:p-5"
    >
      <h3 className="line-clamp-2 text-base font-semibold leading-snug text-mi-text sm:min-h-[2.75rem] sm:text-[17px]">
        {localized.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-mi-muted sm:min-h-[3.9rem] sm:text-[13px] sm:leading-5">
        {localized.description}
      </p>
      <div className="mt-3 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-mi-muted">
        {free ? (
          <SalePriceBadge priceUsd={0} size="sm" className="shrink-0" />
        ) : (
          <SalePriceBadge priceUsd={price} size="sm" className="shrink-0" />
        )}
        <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5">
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
        </span>
      </div>
      <Link
        to={`/test/${test.slug}`}
        replace={false}
        onClick={goToTestTop}
        className="btn-outline mt-auto inline-flex min-h-11 w-full items-center justify-center !py-2.5 !text-sm font-bold sm:min-h-[2.75rem] sm:!text-[13px]"
      >
        Start test →
      </Link>
    </article>
  )
}

/**
 * Wide webview-friendly slideshow of similar open assessments (Try now).
 * Matches the soft green carousel used on marketing / next-step surfaces.
 */
export function RelatedTryCarousel({
  currentSlug,
  categoryIds = [],
  limit = 8,
}: RelatedTryCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  const related = useMemo(() => {
    const pool = tests.filter((item) => item.slug !== currentSlug && item.slug !== UI_PREVIEW_SLUG)
    const scored = pool
      .map((item) => {
        const overlap = item.categoryIds.filter((c) => categoryIds.includes(c)).length
        const freeBoost = (item.priceUsd ?? 0) === 0 ? 2 : 0
        const adhdBoost = item.slug === ADHD_SCREENING_SLUG ? 10 : 0
        return { item, score: overlap + freeBoost + adhdBoost }
      })
      .sort((a, b) => b.score - a.score || a.item.minutes - b.item.minutes)
    const list = scored.map((x) => x.item)
    // Always surface free ADHD first in the slideshow when present
    const adhd = list.find((t) => t.slug === ADHD_SCREENING_SLUG)
    if (!adhd) return list.slice(0, limit)
    return [adhd, ...list.filter((t) => t.slug !== ADHD_SCREENING_SLUG)].slice(0, limit)
  }, [currentSlug, categoryIds, limit])

  function scrollByCard(dir: -1 | 1) {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-slide-card]')
    const step = card ? card.offsetWidth + 12 : 280
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
    setIndex((i) => Math.min(Math.max(i + dir, 0), related.length - 1))
  }

  function onScroll() {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-slide-card]')
    const step = card ? card.offsetWidth + 12 : 280
    const next = Math.round(el.scrollLeft / step)
    setIndex(Math.min(Math.max(next, 0), related.length - 1))
  }

  if (related.length === 0) return null

  return (
    <section className="mt-6 w-full min-w-0 max-w-full sm:mt-8">
      <div className="overflow-hidden rounded-2xl border border-mi-border bg-gradient-to-br from-[#F7FBF9] via-white to-mi-green-soft/50 py-4 sm:py-5">
        <div className="px-4 text-center sm:px-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mi-green">Explore</p>
          <h2 className="font-display mt-1 text-base font-semibold text-mi-forest sm:text-lg">
            Similar assessments
          </h2>
          <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-mi-muted sm:text-sm">
            All 20 assessments are free — 100 questions, ~15 minutes, printable dossier.
          </p>
        </div>

        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="mt-4 flex items-stretch gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [touch-action:pan-x] snap-x snap-mandatory scroll-px-4 sm:gap-3.5 sm:px-5 sm:scroll-px-5 [&::-webkit-scrollbar]:hidden"
        >
          {related.map((test) => (
            <TrySlideCard key={test.slug} test={test} />
          ))}
        </div>

        <div className="mt-3 flex items-center justify-center gap-3 px-4">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollByCard(-1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-mi-border bg-white text-lg font-bold text-mi-forest shadow-sm active:bg-mi-green-soft sm:h-9 sm:w-9 sm:text-base"
          >
            ‹
          </button>
          <div className="flex max-w-[12rem] items-center justify-center gap-1 overflow-hidden">
            {related.map((item, i) => (
              <span
                key={item.slug}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-mi-green' : 'w-1.5 bg-mi-border'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollByCard(1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-mi-border bg-white text-lg font-bold text-mi-forest shadow-sm active:bg-mi-green-soft sm:h-9 sm:w-9 sm:text-base"
          >
            ›
          </button>
        </div>

        <p className="mt-2 px-4 text-center text-xs text-mi-muted sm:hidden">Swipe sideways for more</p>
      </div>
    </section>
  )
}
