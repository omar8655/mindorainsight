import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { recordAssessmentCompletion } from '@/application/portal'
import { persistAssessmentResult } from '@/application/reports/persistResult'
import { buildReportDocument } from '@/application/reports/buildReportDocument'
import { scoreForReport } from '@/application/reports/scoreForReport'
import { familyForSlug } from '@/data/reports/familyMap'
import { isNewMindoraId, questionsForNewMindora, runNewMindoraAssessment } from '@/data/newmindora'
import { questionsForSlug } from '@/data/questions'
import { UI_PREVIEW_SLUG, type TestItem } from '@/data/tests'
import { AssessmentProgressHeader } from '@/features/assessments/AssessmentProgressHeader'
import { AssessmentLegalBanner } from '@/features/assessments/AssessmentLegalBanner'
import { CircleLikert } from '@/features/assessments/CircleLikert'
import { openDesignedDossier } from '@/features/reports/newmindora/openDesignedDossier'
import { openExtendedDossier } from '@/features/reports/newmindora/openExtendedDossier'
import { serializeNmResult } from '@/features/reports/newmindora/nmSessionMeta'
import { BasicResultView } from '@/features/reports/BasicResultView'
import {
  participantDisplayName,
  participantFirstName,
  type ParticipantDetails,
} from '@/features/assessments/participantDetails'
import { useLocalizedTest } from '@/hooks/useLocalizedCatalog'
import type { ReportDocument, ReportSession } from '@/domain/reports/types'
import type { ReportGender } from '@/features/reports/emblemAssets'
import {
  createSessionId,
  saveReportSession,
  unlockReportSession,
} from '@/application/reports/sessionStore'

const PAGE_SIZE = 5

export function TestRunner({
  test,
  gender,
  participant,
}: {
  test: TestItem
  gender: ReportGender
  participant: ParticipantDetails
}) {
  return <GenericTestRunner test={test} gender={gender} participant={participant} />
}

function GenericTestRunner({
  test,
  gender,
  participant,
}: {
  test: TestItem
  gender: ReportGender
  participant: ParticipantDetails
}) {
  const localized = useLocalizedTest(test)
  const useNm = isNewMindoraId(test.slug)
  const displayName = participantDisplayName(participant)
  const firstName = participantFirstName(participant)

  const questionTexts = useMemo(() => {
    if (useNm) return questionsForNewMindora(test.slug)
    return questionsForSlug(test.slug, Math.min(test.questions, 12)).map((q) => q.text)
  }, [useNm, test.slug, test.questions])

  const questions = useMemo(
    () => questionTexts.map((text, i) => ({ id: i, text })),
    [questionTexts],
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
  const [resultDoc, setResultDoc] = useState<ReportDocument | null>(null)
  const [saved, setSaved] = useState(false)
  const [nmBrief, setNmBrief] = useState<ReturnType<typeof runNewMindoraAssessment> | null>(null)
  const advanceTimer = useRef<number | null>(null)
  const cardRefs = useRef<Record<number, HTMLElement | null>>({})

  const current = pages[page] ?? []
  const answeredCount = Object.keys(answers).length
  const progress = Math.round((answeredCount / Math.max(questions.length, 1)) * 100)
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
      const card = cardRefs.current[target]
      card?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      const focusable = card?.querySelector<HTMLElement>('button[role="radio"]')
      focusable?.focus({ preventScroll: true })
    }, 80)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  async function finishWith(nextAnswers: Record<number, number>) {
    const ordered = questions.map((_, i) => nextAnswers[i] ?? 3)

    if (useNm) {
      let result = runNewMindoraAssessment(test.slug, ordered, displayName)
      const traits = result.traits.map((t, i) => ({
        id: t.id || `t${i}`,
        name: t.name,
        score: t.score,
      }))
      const memorySession = (): ReportSession => ({
        id: createSessionId(),
        slug: test.slug,
        assessmentTitle: localized.title,
        completedAt: new Date().toISOString(),
        traits,
        overall: result.overall,
        summary: result.brief.headline + ' ' + result.brief.body,
        primaryId: traits[0]?.id || 'primary',
        primaryName: result.topName || traits[0]?.name || 'Result',
        blurb: result.shape.blurb || result.brief.headline,
        unlocked: true,
        family: familyForSlug(test.slug),
        gender,
        meta: serializeNmResult(result, participant),
      })
      let persisted: ReportSession
      try {
        persisted = persistAssessmentResult({
          slug: test.slug,
          assessmentTitle: localized.title,
          traits: result.traits,
          overall: result.overall,
          summary: result.brief.headline + ' ' + result.brief.body,
          primaryName: result.topName,
          blurb: result.shape.blurb,
          gender,
          meta: serializeNmResult(result, participant),
        })
      } catch {
        persisted = memorySession()
      }
      // Stamp sitting id into payload so PDF document IDs stay unique per device sitting
      result = { ...result, sessionId: persisted.id } as typeof result & { sessionId: string }
      const unlockedSession =
        unlockReportSession(persisted.id) ?? {
          ...persisted,
          unlocked: true,
          meta: serializeNmResult(result, participant),
        }
      unlockedSession.meta = serializeNmResult(result, participant)
      try {
        saveReportSession(unlockedSession)
      } catch {
        // in-memory result still shown; share link may be weak
      }
      setNmBrief(result)
      setSession(unlockedSession)
      try {
        const doc = buildReportDocument(unlockedSession)
        setResultDoc({
          ...doc,
          primary: {
            ...doc.primary,
            name: result.topName || result.shape.title || doc.primary.name,
            score: result.overall,
          },
          blurb: result.shape.blurb || result.brief.headline || doc.blurb,
          summary: result.brief.headline || doc.summary,
          traits: result.traits.length ? result.traits : doc.traits,
          overall: result.overall,
        })
      } catch {
        try {
          setResultDoc(buildReportDocument({ ...unlockedSession, unlocked: true }))
        } catch {
          setResultDoc(null)
        }
      }
      try {
        await recordAssessmentCompletion(test.slug, {
          top: result.topName,
          traits: result.traits,
          overall: result.overall,
          sessionId: persisted.id,
        })
        setSaved(true)
      } catch {
        setSaved(false)
      }
      return
    }

    const scored = scoreForReport(test.slug, ordered)
    let persisted: ReportSession
    try {
      persisted = persistAssessmentResult({
        slug: test.slug,
        assessmentTitle: localized.title,
        traits: scored.traits,
        overall: scored.overall,
        summary: scored.summary,
        primaryName: scored.topName,
        gender,
      })
    } catch {
      const traits = scored.traits.map((t, i) => ({
        id: t.id || `t${i}`,
        name: t.name,
        score: t.score,
      }))
      persisted = {
        id: createSessionId(),
        slug: test.slug,
        assessmentTitle: localized.title,
        completedAt: new Date().toISOString(),
        traits,
        overall: scored.overall,
        summary: scored.summary,
        primaryId: traits[0]?.id || 'primary',
        primaryName: scored.topName || traits[0]?.name || 'Result',
        blurb: scored.summary,
        unlocked: true,
        family: familyForSlug(test.slug),
        gender,
      }
    }
    setSession(persisted)
    try {
      setResultDoc(buildReportDocument(persisted))
    } catch {
      setResultDoc(null)
    }
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

  const onPick = useCallback(
    (localIndex: number, value: number) => {
      const globalIndex = page * PAGE_SIZE + localIndex
      const next = { ...answers, [globalIndex]: value }
      setAnswers(next)

      const nextOpen = current.findIndex((_, i) => {
        const gi = page * PAGE_SIZE + i
        return gi !== globalIndex && typeof next[gi] !== 'number'
      })
      if (nextOpen >= 0) {
        window.setTimeout(() => {
          cardRefs.current[page * PAGE_SIZE + nextOpen]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }, 120)
      }

      const pageDone = current.every((_, i) => {
        const gi = page * PAGE_SIZE + i
        return typeof next[gi] === 'number'
      })
      if (!pageDone) return

      clearAdvance()
      if (page < pages.length - 1) {
        advanceTimer.current = window.setTimeout(() => setPage((p) => p + 1), 350)
      } else {
        void finishWith(next)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [answers, current, page, pages.length],
  )

  if (session && resultDoc) {
    return (
      <div>
        <BasicResultView
          doc={resultDoc}
          unlocked
          saved={saved}
          checkoutHref="/pricing"
          fullReportHref={`/report/${session.slug}?session=${session.id}&full=1`}
          sharePath={`/report/${session.slug}?session=${session.id}`}
          clearHeadline={nmBrief?.brief.headline}
          clearShape={nmBrief?.shape.title}
          clearWatch={nmBrief?.brief.watch}
          participantName={displayName}
          participantFirstName={firstName}
          hideLegacyFullUpsell={!!nmBrief}
          onOpenBasicPdf={nmBrief ? () => openDesignedDossier(nmBrief, displayName) : undefined}
          onOpenExtendedPdf={nmBrief ? () => openExtendedDossier(nmBrief, displayName) : undefined}
        />
      </div>
    )
  }

  if (session && !resultDoc) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <p className="text-mi-muted">Could not build your result view. Try again from the library.</p>
      </div>
    )
  }

  const pageStart = page * PAGE_SIZE + 1
  const pageEnd = Math.min((page + 1) * PAGE_SIZE, questions.length)

  return (
    <div className="mx-auto w-full max-w-2xl">
      <AssessmentProgressHeader
        title={localized.title}
        page={page + 1}
        totalPages={pages.length}
        progressPercent={progress}
        rangeLabel={`Questions ${pageStart}–${pageEnd} of ${questions.length}`}
      />
      <div className="mb-4">
        <AssessmentLegalBanner clinical={!!test.clinical} crisis={!!test.crisis} compact />
      </div>
      <div className="space-y-5">
        {current.map((q, i) => {
          const globalIndex = page * PAGE_SIZE + i
          return (
            <div
              key={q.id}
              ref={(el) => {
                cardRefs.current[globalIndex] = el
              }}
              className="rounded-2xl border border-mi-border bg-white p-4 shadow-sm sm:p-5"
            >
              <p className="text-[11px] font-bold uppercase tracking-wide text-mi-muted">
                Question {globalIndex + 1}
                {test.slug === UI_PREVIEW_SLUG ? ' · preview' : ''}
              </p>
              <p
                id={`q-text-${globalIndex}`}
                className="mt-2 text-[15px] font-semibold leading-6 text-mi-forest sm:text-base"
              >
                {q.text}
              </p>
              <div className="mt-4">
                <CircleLikert
                  name={`q-${globalIndex}`}
                  groupLabel={q.text}
                  labelledBy={`q-text-${globalIndex}`}
                  value={answers[globalIndex]}
                  onChange={(v) => onPick(i, v)}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <button
          type="button"
          className="btn-outline w-full sm:w-auto"
          disabled={page === 0}
          onClick={() => {
            clearAdvance()
            setPage((p) => Math.max(0, p - 1))
          }}
        >
          Back
        </button>
        <button
          type="button"
          className="btn-primary w-full sm:w-auto"
          disabled={!pageComplete}
          onClick={() => {
            clearAdvance()
            if (page < pages.length - 1) setPage((p) => p + 1)
            else void finishWith(answers)
          }}
        >
          {page < pages.length - 1 ? 'Next' : 'See results'}
        </button>
      </div>
    </div>
  )
}
