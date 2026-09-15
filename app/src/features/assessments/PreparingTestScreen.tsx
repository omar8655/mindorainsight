import { useEffect, useState } from 'react'
import { UniversityLogos } from '@/components/marketing/UniversityLogos'
import { AssessmentPortalShell } from '@/features/assessments/AssessmentPortalShell'

type PreparingTestScreenProps = {
  title: string
  questionCount: number
  minutes: number
  onReady: () => void
  durationMs?: number
}

/**
 * Portal prepare page — solid canvas, centered brand, progress, universities.
 */
export function PreparingTestScreen({
  title,
  questionCount,
  minutes,
  onReady,
  durationMs = 2200,
}: PreparingTestScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const started = performance.now()
    let raf = 0
    let done = false

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / durationMs)
      const eased = 1 - (1 - t) ** 2.2
      setProgress(Math.round(eased * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else if (!done) {
        done = true
        window.setTimeout(onReady, 220)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [durationMs, onReady])

  const circumference = 2 * Math.PI * 44
  const offset = circumference * (1 - progress / 100)

  return (
    <AssessmentPortalShell eyebrow="Preparing your assessment">
      <div className="w-full overflow-hidden rounded-2xl border border-mi-border bg-white px-5 py-7 text-center shadow-[var(--mi-card-shadow)] sm:px-8 sm:py-9">
        <h1 className="font-display mx-auto max-w-[22ch] text-xl font-semibold leading-snug text-mi-forest sm:text-2xl">
          {title}
        </h1>
        <p className="mt-1.5 text-xs text-mi-muted tabular-nums">
          {questionCount} Q · ~{minutes} min
        </p>

        <div className="relative mx-auto mt-6 h-[7rem] w-[7rem] sm:mt-7 sm:h-32 sm:w-32" aria-hidden>
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#E8EEF0" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#31B070"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-[stroke-dashoffset] duration-100 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-2xl font-bold tabular-nums text-mi-forest sm:text-3xl">
              {progress}%
            </span>
          </div>
        </div>

        <div className="mx-auto mt-5 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-mi-green via-[#5bc48a] to-mi-green bg-[length:200%_100%] transition-[width] duration-100"
            style={{
              width: `${Math.max(progress, 4)}%`,
              animation: 'mi-prep-shimmer 1s linear infinite',
            }}
          />
        </div>
        <p className="mt-3 text-sm font-semibold text-mi-forest">Getting ready…</p>
      </div>

      <div className="mt-5 w-full sm:mt-6">
        <UniversityLogos />
      </div>

      <style>{`
        @keyframes mi-prep-shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </AssessmentPortalShell>
  )
}
