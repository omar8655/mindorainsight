import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { recordAssessmentCompletion } from '@/application/portal'
import { buildReportDocument } from '@/application/reports/buildReportDocument'
import { persistAssessmentResult } from '@/application/reports/persistResult'
import {
  ADHD_PAGE_SIZE,
  ADHD_SCREENING_SLUG,
  adhdQuestions,
  scoreAdhdAnswers,
} from '@/data/adhdScreening'
import { CircleLikert } from '@/features/assessments/CircleLikert'
import { AssessmentProgressHeader } from '@/features/assessments/AssessmentProgressHeader'
import { BasicResultView } from '@/features/reports/BasicResultView'
import type { ReportSession } from '@/domain/reports/types'
import type { ReportGender } from '@/features/reports/emblemAssets'

function encouragement(answered: number, total: number) {
  const left = total - answered
  if (answered === 0) return 'Answer each row — we’ll scroll to the next on your phone.'
  if (left === 0) return 'Last answers — you’re done.'
  if (left <= 10) return `Only ${left} left — keep going.`
  if (answered === Math.ceil(total / 2)) return 'Halfway there — nice pace.'
  return '5 questions per screen — tap a circle for each.'
}

export function AdhdScreeningRunner({ gender }: { gender: ReportGender }) {
  const pages = useMemo(() => {
    const chunks: (typeof adhdQuestions)[] = []
    for (let i = 0; i < adhdQuestions.length; i += ADHD_PAGE_SIZE) {
      chunks.push(adhdQuestions.slice(i, i + ADHD_PAGE_SIZE))
    }
    return chunks
  }, [])

  const [page, setPage] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [session, setSession] = useState<ReportSession | null>(null)
  const [saved, setSaved] = useState(false)
  const advanceTimer = useRef<number | null>(null)
  const cardRefs = useRef<Record<number, HTMLElement | null>>({})

  const current = pages[page] ?? []
  const answeredCount = Object.keys(answers).length
  const progress = Math.round((answeredCount / adhdQuestions.length) * 100)
  const pageComplete = current.every((q) => typeof answers[q.id] === 'number')

  useEffect(() => {
    return () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
    }
  }, [])

  useEffect(() => {
    // On new page, scroll to first unanswered (or top of first card)
    const firstOpen = current.find((q) => typeof answers[q.id] !== 'number') ?? current[0]
    if (!firstOpen) return
    window.setTimeout(() => {
      cardRefs.current[firstOpen.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 80)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when page changes
  }, [page])

  async function finishWith(nextAnswers: Record<number, number>) {
    const result = scoreAdhdAnswers(nextAnswers)
    const persisted = persistAssessmentResult({
      slug: ADHD_SCREENING_SLUG,
      assessmentTitle: 'Adult ADHD Test',
      traits: result.traits.map((t) => ({
        id: t.domain,
        name: t.name,
        score: t.score,
      })),
      overall: result.overall,
      summary: result.summary,
      primaryId: result.top.domain,
      primaryName: result.top.name,
      blurb: result.narrative.shape.blurb,
      gender,
      meta: { shape: result.narrative.shape.title, shapeId: result.narrative.shape.id },
    })
    setSession(persisted)
    try {
      await recordAssessmentCompletion(ADHD_SCREENING_SLUG, {
        top: result.top.name,
        traits: result.traits.map((t) => ({ name: t.name, score: t.score })),
        overall: result.overall,
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
    (nextAnswers: Record<number, number>, justAnsweredId: number) => {
      const nextOpen = current.find(
        (q) => q.id !== justAnsweredId && typeof nextAnswers[q.id] !== 'number',
      )
      if (nextOpen) {
        window.setTimeout(() => {
          cardRefs.current[nextOpen.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 120)
      }
    },
    [current],
  )

  function setAnswer(id: number, value: number) {
    const nextAnswers = { ...answers, [id]: value }
    setAnswers(nextAnswers)
    clearAdvance()

    const pageDone = current.every((q) => typeof nextAnswers[q.id] === 'number')
    if (!pageDone) {
      scrollToNextOpen(nextAnswers, id)
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

  function goBack() {
    clearAdvance()
    if (page > 0) {
      setPage(page - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function goNextManual() {
    if (!pageComplete) return
    clearAdvance()
    if (page + 1 >= pages.length) {
      void finishWith(answers)
    } else {
      setPage(page + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
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

  const pageStart = page * ADHD_PAGE_SIZE + 1
  const pageEnd = Math.min((page + 1) * ADHD_PAGE_SIZE, adhdQuestions.length)

  return (
    <div className="mx-auto flex w-full max-w-4xl min-w-0 flex-col px-0 pb-6">
      <AssessmentProgressHeader
        title="Adult ADHD Test"
        page={page + 1}
        totalPages={pages.length}
        progressPercent={progress}
        rangeLabel={`Questions ${pageStart}–${pageEnd} of ${adhdQuestions.length}`}
        hint={encouragement(answeredCount, adhdQuestions.length)}
      />

      <div className="space-y-3 sm:space-y-4">
        {current.map((q, i) => (
          <article
            key={q.id}
            ref={(el) => {
              cardRefs.current[q.id] = el
            }}
            className="flex min-h-[22rem] w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E8EEF0] bg-white px-2.5 py-4 shadow-[0_4px_18px_rgba(31,42,51,0.06)] sm:min-h-[24rem] sm:px-8 sm:py-7"
          >
            <p className="text-center text-[11px] font-bold uppercase tracking-wide text-mi-muted">
              Question {q.id}
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
                name={`adhd-q-${q.id}`}
                value={answers[q.id]}
                onChange={(v) => setAnswer(q.id, v)}
              />
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex gap-2 sm:gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={page === 0}
          className="inline-flex h-12 flex-1 items-center justify-center rounded-xl border border-mi-border bg-white text-sm font-bold text-mi-text disabled:opacity-40 sm:flex-none sm:px-6"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={goNextManual}
          disabled={!pageComplete}
          className="btn-primary h-12 flex-[1.4] !rounded-xl disabled:opacity-50 sm:flex-1"
        >
          {page + 1 >= pages.length ? 'See results' : 'Next 5 →'}
        </button>
      </div>
      <p className="mt-2 text-center text-[10px] text-mi-muted sm:text-xs">
        Tap a circle on each question — we’ll scroll for you. Educational screen · not a diagnosis.
      </p>
    </div>
  )
}
