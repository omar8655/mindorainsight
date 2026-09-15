import { useEffect, useState } from 'react'
import { getLatestReviews, getReviewStats } from '@/application/reviews'
import type { Review, ReviewStats } from '@/domain/review'
import { useCurrency } from '@/features/currency/CurrencyProvider'
import { flagUrl } from '@/i18n/dictionaries'
import { useI18n } from '@/i18n/I18nProvider'

const PER_SLIDE = 6
const AUTO_MS = 6500

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5 text-mi-green" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? 'opacity-100' : 'opacity-25'}>
          ★
        </span>
      ))}
    </span>
  )
}

function formatRelative(iso: string) {
  const minutes = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60_000))
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours === 1) return '1 hour ago'
  if (hours < 24) return `${hours} hours ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return '1 day ago'
  if (days === 2) return '2 days ago'
  if (days < 14) return `${days} days ago`
  try {
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(new Date(iso))
  } catch {
    return iso.slice(0, 10)
  }
}

function ReviewCard({ review }: { review: Review }) {
  const { t } = useI18n()
  const { localize } = useCurrency()

  return (
    <article className="flex h-full min-h-0 flex-col rounded-2xl border border-mi-border bg-white p-4 shadow-[var(--mi-card-shadow)] sm:p-5">
      <div className="mb-2 flex items-start justify-between gap-2 sm:mb-3 sm:gap-3">
        <div className="min-w-0">
          <p className="truncate font-semibold text-mi-text">Someone from {review.country}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-mi-muted">
            <img
              src={flagUrl(review.countryCode, 40)}
              alt=""
              width={18}
              height={12}
              className="h-3 w-[18px] shrink-0 rounded-[2px] object-cover"
            />
            <span className="truncate">{review.city}</span>
          </p>
        </div>
        <Stars rating={review.rating} />
      </div>
      <p className="line-clamp-5 flex-1 text-[13px] leading-5 text-mi-muted sm:text-[14px] sm:leading-6">
        {localize(review.body)}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-mi-muted">
        {review.assessmentHint && (
          <span className="rounded-full bg-mi-green-soft px-2.5 py-1 font-medium text-mi-green">
            {review.assessmentHint}
          </span>
        )}
        <time dateTime={review.createdAt}>{formatRelative(review.createdAt)}</time>
        {review.source === 'sample' && (
          <span className="rounded-full bg-mi-sky px-2 py-1">{t.reviews.sampleBadge}</span>
        )}
      </div>
    </article>
  )
}

export function LatestReviews() {
  const { t } = useI18n()
  const { localize } = useCurrency()
  const [items, setItems] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [slide, setSlide] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        // Load a window for the slideshow; catalog total still shows 2,000 in stats.
        const [latest, s] = await Promise.all([getLatestReviews(180, 0), getReviewStats()])
        if (!alive) return
        setItems(latest)
        setStats(s)
        setSlide(0)
      } catch {
        if (alive) setError(t.reviews.error)
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [t.reviews.error])

  const slideCount = Math.max(1, Math.ceil(items.length / PER_SLIDE))

  useEffect(() => {
    if (paused || slideCount <= 1 || loading) return
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % slideCount)
    }, AUTO_MS)
    return () => window.clearInterval(id)
  }, [paused, slideCount, loading])

  const visible = items.slice(slide * PER_SLIDE, slide * PER_SLIDE + PER_SLIDE)

  function go(delta: number) {
    setSlide((s) => (s + delta + slideCount) % slideCount)
  }

  return (
    <section className="bg-mi-canvas py-14 md:py-16" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="mx-auto mb-8 max-w-[720px] text-center md:mb-10">
          <h2 id="reviews-heading" className="text-[28px] font-semibold text-mi-text md:text-[40px]">
            {t.reviews.title}
          </h2>
          <p className="mt-3 text-[15px] leading-6 text-mi-muted">{localize(t.reviews.subtitle)}</p>
          {stats && (
            <p className="mt-4 text-sm font-semibold text-mi-text">
              {stats.average.toFixed(1)} ★ · {stats.total.toLocaleString()} {t.reviews.countLabel}
            </p>
          )}
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center text-mi-muted">{t.reviews.loading}</p>
        ) : (
          <div
            className="mx-auto max-w-6xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false)
            }}
          >
            <div
              className="min-h-[34rem] sm:min-h-[30rem] md:min-h-[28rem]"
              aria-live="polite"
              aria-atomic="false"
            >
              <ul className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
                {visible.map((review) => (
                  <li key={review.id} className="min-h-[10.5rem]">
                    <ReviewCard review={review} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-8">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-mi-border bg-white text-lg font-semibold text-mi-text transition hover:bg-mi-green-soft"
                aria-label={t.reviews.prevSlide}
                onClick={() => go(-1)}
              >
                ‹
              </button>

              <div className="flex max-w-[min(100%,16rem)] flex-wrap items-center justify-center gap-1.5 px-1">
                {(() => {
                  const maxDots = 12
                  const start =
                    slideCount <= maxDots
                      ? 0
                      : Math.min(Math.max(0, slide - Math.floor(maxDots / 2)), slideCount - maxDots)
                  const count = Math.min(slideCount, maxDots)
                  return Array.from({ length: count }, (_, i) => {
                    const page = start + i
                    const active = page === slide
                    return (
                      <button
                        key={page}
                        type="button"
                        aria-label={`${t.reviews.slideLabel} ${page + 1}`}
                        aria-current={active ? 'true' : undefined}
                        className={`h-2 rounded-full transition-all ${
                          active ? 'w-6 bg-mi-green' : 'w-2 bg-mi-border hover:bg-mi-muted/40'
                        }`}
                        onClick={() => setSlide(page)}
                      />
                    )
                  })
                })()}
              </div>

              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-mi-border bg-white text-lg font-semibold text-mi-text transition hover:bg-mi-green-soft"
                aria-label={t.reviews.nextSlide}
                onClick={() => go(1)}
              >
                ›
              </button>

              <p className="w-full text-center text-xs font-medium text-mi-muted sm:w-auto sm:ms-2">
                {t.reviews.slideLabel} {slide + 1} / {slideCount}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
