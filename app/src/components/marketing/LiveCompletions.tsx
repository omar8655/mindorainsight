import { useEffect, useMemo, useState } from 'react'
import { ADHD_SCREENING_SLUG } from '@/data/adhdScreening'

type Region = {
  label: string
  country: string
  countryCode: string
}

type CompletionEvent = {
  id: string
  region: Region
  assessment: string
  minutesAgo: number
}

const REGIONS: Region[] = [
  { label: 'the UK', country: 'United Kingdom', countryCode: 'gb' },
  { label: 'England', country: 'United Kingdom', countryCode: 'gb' },
  { label: 'Scotland', country: 'United Kingdom', countryCode: 'gb' },
  { label: 'the United States', country: 'United States', countryCode: 'us' },
  { label: 'the US', country: 'United States', countryCode: 'us' },
  { label: 'Germany', country: 'Germany', countryCode: 'de' },
  { label: 'the Netherlands', country: 'Netherlands', countryCode: 'nl' },
  { label: 'France', country: 'France', countryCode: 'fr' },
  { label: 'Spain', country: 'Spain', countryCode: 'es' },
  { label: 'Ireland', country: 'Ireland', countryCode: 'ie' },
  { label: 'Sweden', country: 'Sweden', countryCode: 'se' },
  { label: 'Poland', country: 'Poland', countryCode: 'pl' },
  { label: 'Italy', country: 'Italy', countryCode: 'it' },
  { label: 'Canada', country: 'Canada', countryCode: 'ca' },
]

const OTHER_ASSESSMENTS = [
  'Work Focus Patterns',
  'OCEAN Workplace Profile',
  'Partnership Alignment',
  'EQ for Teams',
  'UI Preview · 5 Questions',
]

const ADHD_LABEL = 'Adult ADHD Test'

function flagUrl(code: string) {
  return `https://flagcdn.com/24x18/${code}.png`
}

function formatRelative(minutesAgo: number) {
  const m = Math.max(1, Math.round(minutesAgo))
  if (m < 60) return `${m} min ago`
  const h = Math.floor(m / 60)
  if (h === 1) return '1 hour ago'
  if (h < 24) return `${h} hours ago`
  const d = Math.floor(h / 24)
  if (d === 1) return '1 day ago'
  if (d === 2) return '2 days ago'
  return `${d} days ago`
}

/** Believable relative ages: 1h, 3h, 4h, 5h, 2 days, etc. */
function buildPool(seed: number): CompletionEvent[] {
  const offsets = [55, 185, 240, 300, 360, 480, 620, 900, 1200, 1500, 2100, 2880]
  return offsets.map((minutesAgo, i) => {
    const region = REGIONS[(seed + i * 3) % REGIONS.length]
    const adhd = i % 5 !== 3
    const assessment = adhd
      ? ADHD_LABEL
      : OTHER_ASSESSMENTS[(seed + i) % OTHER_ASSESSMENTS.length]
    return {
      id: `live-${i}-${region.countryCode}`,
      region,
      assessment,
      minutesAgo,
    }
  })
}

/**
 * Live-feeling completion strip — no names, countries only, mainly ADHD.
 * Swaps the visible pair every 5 seconds.
 */
export function LiveCompletions() {
  const daySeed = useMemo(() => {
    const d = new Date()
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()
  }, [])

  const [pool, setPool] = useState(() => buildPool(daySeed))
  const [pairIndex, setPairIndex] = useState(0)

  useEffect(() => {
    const rotate = window.setInterval(() => {
      setPairIndex((i) => (i + 1) % Math.max(1, Math.ceil(pool.length / 2)))
    }, 5000)
    const drift = window.setInterval(() => {
      setPool((prev) => prev.map((ev) => ({ ...ev, minutesAgo: ev.minutesAgo + 1 })))
    }, 60_000)
    return () => {
      window.clearInterval(rotate)
      window.clearInterval(drift)
    }
  }, [pool.length])

  const visible = useMemo(() => {
    const start = (pairIndex * 2) % pool.length
    return [pool[start], pool[(start + 1) % pool.length]].filter(Boolean)
  }, [pairIndex, pool])

  return (
    <section className="border-y border-mi-border bg-white py-6 sm:py-8" aria-label="Recent completions">
      <div className="container">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mi-green">Live</p>
            <h2 className="font-display mt-1 text-lg font-semibold text-mi-forest sm:text-xl">
              Just completed
            </h2>
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {visible.map((ev) => {
            const isAdhd = ev.assessment === ADHD_LABEL || ev.assessment.includes('ADHD')
            return (
              <li
                key={`${ev.id}-${Math.floor(ev.minutesAgo / 30)}`}
                className="flex items-start gap-3 rounded-2xl border border-mi-border bg-mi-canvas/60 px-3.5 py-3.5 transition-opacity duration-300 sm:px-4"
              >
                <img
                  src={flagUrl(ev.region.countryCode)}
                  alt=""
                  width={24}
                  height={18}
                  className="mt-0.5 h-[18px] w-6 rounded-sm object-cover shadow-sm"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-5 text-mi-forest">
                    Someone from {ev.region.label} completed{' '}
                    <span className={isAdhd ? 'text-mi-green' : 'text-mi-text'}>{ev.assessment}</span>
                  </p>
                  <p className="mt-1 text-xs text-mi-muted">
                    <time dateTime={new Date(Date.now() - ev.minutesAgo * 60_000).toISOString()}>
                      {formatRelative(ev.minutesAgo)}
                    </time>
                    {isAdhd ? <span> · free path</span> : null}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>

        <p className="mt-3 text-center text-[11px] text-mi-muted">
          Recent educational completions · mainly{' '}
          <a
            href={`/test/${ADHD_SCREENING_SLUG}`}
            className="font-semibold text-mi-green hover:underline"
          >
            Adult ADHD Test
          </a>
        </p>
      </div>
    </section>
  )
}
