import { useMemo, useRef, useState } from 'react'
import { NhsMark } from '@/components/brand/NhsMark'
import { SalePriceBadge } from '@/components/marketing/SalePriceBadge'
import { tests, type TestItem } from '@/data/tests'
import { useLocalizedTest } from '@/hooks/useLocalizedCatalog'
import { useI18n } from '@/i18n/I18nProvider'

type RelatedLockedTestsProps = {
  currentSlug: string
  categoryIds?: string[]
  limit?: number
}

function LockedSlideCard({ test }: { test: TestItem }) {
  const { t } = useI18n()
  const localized = useLocalizedTest(test)
  const price = test.priceUsd ?? 49

  return (
    <div
      data-slide-card
      className="relative flex h-full min-h-[19.5rem] w-[min(78vw,17.5rem)] shrink-0 snap-center flex-col rounded-xl border border-mi-border bg-white p-3.5 shadow-sm sm:min-h-[20.5rem] sm:w-[16.5rem]"
      aria-disabled="true"
    >
      <div className="flex min-h-[1.35rem] flex-wrap items-center gap-1.5">
        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-mi-blue">Similar</p>
        <SalePriceBadge priceUsd={price} size="sm" />
      </div>
      <h3 className="mt-1 min-h-[2.4rem] line-clamp-2 text-[13px] font-semibold leading-snug text-mi-forest">
        {localized.title}
      </h3>
      <p className="mt-1.5 min-h-[2.25rem] line-clamp-2 text-[11px] leading-4 text-mi-muted">
        {localized.description}
      </p>
      <div className="mt-2 flex min-h-[1.5rem] flex-wrap items-center gap-1">
        <span className="rounded-md bg-mi-green-soft px-1.5 py-0.5 text-[9px] font-semibold text-mi-forest">
          {localized.levelLabel}
        </span>
        <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-mi-muted">
          {test.questions} {t.common.questions}
        </span>
        <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-mi-muted">
          {test.minutes} {t.common.minutes}
        </span>
        <NhsMark size="xs" />
      </div>
      <div className="mt-auto rounded-lg border border-amber-200/80 bg-amber-50 px-2 py-1.5">
        <p className="text-[9px] font-bold uppercase tracking-wide text-amber-900/80">Locked</p>
        <p className="mt-0.5 text-[10px] leading-3.5 text-amber-950/85">
          Referral from your healthcare provider required.
        </p>
      </div>
      <span className="mt-2 inline-flex w-full cursor-not-allowed items-center justify-center rounded-lg border border-mi-border bg-slate-50 px-2 py-2 text-[11px] font-semibold text-mi-muted">
        Referral required
      </span>
    </div>
  )
}

/**
 * Amazon/eBay-style horizontal slideshow of similar locked assessments.
 */
export function RelatedLockedTests({
  currentSlug,
  categoryIds = [],
  limit = 8,
}: RelatedLockedTestsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  const related = useMemo(() => {
    const pool = tests.filter((t) => t.slug !== currentSlug)
    const scored = pool
      .map((t) => {
        const overlap = t.categoryIds.filter((c) => categoryIds.includes(c)).length
        return { t, overlap }
      })
      .sort((a, b) => b.overlap - a.overlap || a.t.minutes - b.t.minutes)
    const preferred = scored.filter((x) => x.overlap > 0).map((x) => x.t)
    const fill = scored.filter((x) => x.overlap === 0).map((x) => x.t)
    return [...preferred, ...fill].slice(0, limit)
  }, [currentSlug, categoryIds, limit])

  function scrollByCard(dir: -1 | 1) {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-slide-card]')
    const step = card ? card.offsetWidth + 12 : 220
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
    setIndex((i) => Math.min(Math.max(i + dir, 0), related.length - 1))
  }

  function onScroll() {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-slide-card]')
    const step = card ? card.offsetWidth + 12 : 220
    const next = Math.round(el.scrollLeft / step)
    setIndex(Math.min(Math.max(next, 0), related.length - 1))
  }

  if (related.length === 0) return null

  return (
    <section className="report-related report-no-print mt-5 w-full sm:mt-7">
      <div className="overflow-hidden rounded-2xl border border-mi-border bg-gradient-to-br from-white via-[#F7FBF9] to-mi-green-soft/40 py-4 sm:py-5">
        <div className="px-4 sm:px-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mi-green">Next steps</p>
          <h2 className="font-display mt-1 text-base font-semibold text-mi-forest sm:text-lg">
            Other similar assessments
          </h2>
          <p className="mt-1 text-xs leading-5 text-mi-muted sm:text-sm">
            Swipe to preview. Locked until your GP / healthcare provider refers you.
          </p>
        </div>

        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="mt-3 flex items-stretch gap-3 overflow-x-auto scroll-smooth px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory sm:px-5 [&::-webkit-scrollbar]:hidden"
        >
          {related.map((test) => (
            <div key={test.slug} data-slide-card>
              <LockedSlideCard test={test} />
            </div>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-center gap-3 px-4">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollByCard(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-mi-border bg-white text-sm font-bold text-mi-forest shadow-sm active:bg-mi-green-soft"
          >
            ‹
          </button>
          <div className="flex max-w-[10rem] items-center gap-1 overflow-hidden">
            {related.map((t, i) => (
              <span
                key={t.slug}
                className={`h-1 rounded-full transition-all ${
                  i === index ? 'w-5 bg-mi-green' : 'w-1.5 bg-mi-border'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollByCard(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-mi-border bg-white text-sm font-bold text-mi-forest shadow-sm active:bg-mi-green-soft"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
