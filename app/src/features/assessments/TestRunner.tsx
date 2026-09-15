import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { recordAssessmentCompletion } from '@/application/portal'
import { buildReportDocument } from '@/application/reports/buildReportDocument'
import { persistAssessmentResult } from '@/application/reports/persistResult'
import { scoreForReport } from '@/application/reports/scoreForReport'
import { ADHD_SCREENING_SLUG } from '@/data/adhdScreening'
import { questionsForSlug } from '@/data/questions'
import type { TestItem } from '@/data/tests'
import { AdhdScreeningRunner } from '@/features/assessments/AdhdScreeningRunner'
import { AssessmentProgressHeader } from '@/features/assessments/AssessmentProgressHeader'
import { CircleLikert } from '@/features/assessments/CircleLikert'
import { BasicResultView } from '@/features/reports/BasicResultView'
import { useLocalizedTest } from '@/hooks/useLocalizedCatalog'
import type { ReportSession } from '@/domain/reports/types'
import type { ReportGender } from '@/features/reports/emblemAssets'

const PAGE_SIZE = 5

export function TestRunner({ test, gender }: { test: TestItem; gender: ReportGender }) {
  if (test.slug === ADHD_SCREENING_SLUG) {
    return <AdhdScreeningRunner gender={gender} />
  }

  return <GenericTestRunner test={test} gender={gender} />
}

function GenericTestRunner({ test, gender }: { test: TestItem; gender: ReportGender }) {
  const localized = useLocalizedTest(test)
  const questions = useMemo(
    () => questionsForSlug(test.slug, Math.min(test.questions, 12)),
    [test.slug, test.questions],
  )
  const pages = useMemo(() => {
    const chunks: (typeof questions)[] = []
    for (let i = 0; i < questions.length; i += PAGE_SIZE) {
      chunks.push(questions.slice(i, i + PAGE_SIZE))
    }
    return chunks
  }, [questions])

  const [page, setPage] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [session, setSession] = useState<ReportSession | null>(null)
  const [saved, setSaved] = useState(false)
  const advanceTimer = useRef<number | null>(null)
  const cardRefs = useRef<Record<number, HTMLElement | null>>({})

  const current = pages[page] ?? []
  const answeredCount = Object.keys(answers).length
  const progress = Math.round((answeredCount / questions.length) * 100)
  const pageComplete = current.every((_, i) => {
    const globalIndex = page * PAGE_SIZE + i
    return typeof answers[globalIndex] === 'number'
  })

  useEffect(() => {
    return () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
    }
  }, [])

  useEffect(() => {
    const firstOpenIdx = current.findIndex((_, i) => {
      const globalIndex = page * PAGE_SIZE + i
      return typeof answers[globalIndex] !== 'number'
    })
    const target = firstOpenIdx >= 0 ? page * PAGE_SIZE + firstOpenIdx : page * PAGE_SIZE
    window.setTimeout(() => {
      cardRefs.current[target]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 80)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  async function finishWith(nextAnswers: Record<number, number>) {
    const ordered = questions.map((_, i) => nextAnswers[i] ?? 3)
    const scored = scoreForReport(test.slug, ordered)
    const persisted = persistAssessmentResult({
      slug: test.slug,
      assessmentTitle: localized.title,
      traits: scored.traits,
      overall: scored.overall,
      summary: scored.summary,
      primaryName: scored.topName,
      gender,
    })
    setSession(persisted)
    try {
      await recordAssessmentCompletion(test.slug, {
        top: scored.topName,
        traits: scored.traits,
        overall: scored.overall,
        sessionId: persisted.id,
      })
      setSaved(true)
    } catch {
      setSaved(false)
    }
  }

  function clearAdvance() {
    if (advanceTimer.current) {
      window.clearTimeout(advanceTimer.current)
      advanceTimer.current = null
    }
  }

  const scrollToNextOpen = useCallback(
    (nextAnswers: Record<number, number>, justAnsweredGlobal: number) => {
      const nextLocal = current.findIndex((_, i) => {
        const g = page * PAGE_SIZE + i
        return g !== justAnsweredGlobal && typeof nextAnswers[g] !== 'number'
      })
      if (nextLocal >= 0) {
        const g = page * PAGE_SIZE + nextLocal
        window.setTimeout(() => {
          cardRefs.current[g]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 120)
      }
    },
    [current, page],
  )

  function setAnswer(globalIndex: number, value: number) {
    const nextAnswers = { ...answers, [globalIndex]: value }
    setAnswers(nextAnswers)
    clearAdvance()

    const done = current.every((_, i) => typeof nextAnswers[page * PAGE_SIZE + i] === 'number')
    if (!done) {
      scrollToNextOpen(nextAnswers, globalIndex)
      return
    }

    advanceTimer.current = window.setTimeout(() => {
      if (page + 1 >= pages.length) {
        void finishWith(nextAnswers)
      } else {
        setPage(page + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 550)
  }

  if (session) {
    const doc = buildReportDocument(session)
    const sharePath = `/report/${session.slug}?session=${session.id}`
    return (
      <BasicResultView
        doc={doc}
        unlocked={session.unlocked}
        saved={saved}
        checkoutHref={`/checkout?product=0&addon=comprehensive-report&test=${session.slug}&session=${session.id}`}
        fullReportHref={`/report/${session.slug}?session=${session.id}&full=1`}
        sharePath={sharePath}
      />
    )
  }

  if (current.length === 0) return null

  const pageStart = page * PAGE_SIZE + 1
  const pageEnd = Math.min((page + 1) * PAGE_SIZE, questions.length)

  return (
    <div className="mx-auto flex w-full max-w-4xl min-w-0 flex-col px-0 pb-6">
      <AssessmentProgressHeader
        title={localized.title}
        page={page + 1}
        totalPages={pages.length}
        progressPercent={progress}
        rangeLabel={`Questions ${pageStart}–${pageEnd} of ${questions.length}`}
        hint="5 per screen · tap a circle to answer"
      />

      <div className="space-y-3 sm:space-y-4">
        {current.map((q, i) => {
          const globalIndex = page * PAGE_SIZE + i
          return (
            <article
              key={`${q.text}-${globalIndex}`}
              ref={(el) => {
                cardRefs.current[globalIndex] = el
              }}
              className="flex min-h-[22rem] w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E8EEF0] bg-white px-2.5 py-4 shadow-[0_4px_18px_rgba(31,42,51,0.06)] sm:min-h-[24rem] sm:px-8 sm:py-7"
            >
              <p className="text-center text-[11px] font-bold uppercase tracking-wide text-mi-muted">
                Question {globalIndex + 1}
                <span className="mx-1.5 text-mi-border">·</span>
                {i + 1} of {current.length} on this screen
              </p>
              <h2 className="font-display mx-auto mt-2 min-h-[3.2rem] max-w-[42ch] text-center text-[1.05rem] font-semibold leading-snug text-mi-text sm:min-h-[3.5rem] sm:text-xl">
                {q.text}
              </h2>
              <p className="mt-2 text-center text-xs text-mi-muted sm:text-sm">
                How well does this apply to you?
              </p>
              <div className="mt-auto">
                <CircleLikert
                  name={`${test.slug}-q-${globalIndex}`}
                  value={answers[globalIndex]}
                  onChange={(v) => setAnswer(globalIndex, v)}
                />
              </div>
            </article>
          )
        })}
      </div>

      <div className="mt-4 flex gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => {
            clearAdvance()
            if (page > 0) {
              setPage(page - 1)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          disabled={page === 0}
          className="inline-flex h-12 flex-1 items-center justify-center rounded-xl border border-mi-border bg-white text-sm font-bold text-mi-text disabled:opacity-40 sm:flex-none sm:px-6"
        >
          ← Back
        </button>
        <button
          type="button"
          disabled={!pageComplete}
          onClick={() => {
            clearAdvance()
            if (page + 1 >= pages.length) void finishWith(answers)
            else {
              setPage(page + 1)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          className="btn-primary h-12 flex-[1.4] !rounded-xl disabled:opacity-50 sm:flex-1"
        >
          {page + 1 >= pages.length ? 'See results' : 'Next 5 →'}
        </button>
      </div>
    </div>
  )
}
