import { useState, useCallback, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { NhsMark } from '@/components/brand/NhsMark'
import { Seo } from '@/components/layout/Seo'
import { SalePriceBadge } from '@/components/marketing/SalePriceBadge'
import { GenderSelect } from '@/features/assessments/GenderSelect'
import { ParticipantDetailsScreen } from '@/features/assessments/ParticipantDetailsScreen'
import {
  loadParticipantDetails,
  participantDisplayName,
  saveParticipantDetails,
  type ParticipantDetails,
} from '@/features/assessments/participantDetails'
import { PreparingTestScreen } from '@/features/assessments/PreparingTestScreen'
import { HowToUseScreen } from '@/features/assessments/HowToUseScreen'
import { RelatedTryCarousel } from '@/features/assessments/RelatedTryCarousel'
import { TestRunner } from '@/features/assessments/TestRunner'
import { ADHD_SCREENING_SLUG } from '@/data/adhdScreening'
import { getTestBySlug } from '@/data/tests'
import { useLocalizedTest } from '@/hooks/useLocalizedCatalog'
import { getAccessCopy } from '@/i18n/accessCopy'
import { useI18n } from '@/i18n/I18nProvider'
import type { ReportGender } from '@/features/reports/emblemAssets'
import { assessmentJsonLd, breadcrumbJsonLd, freeAdhdJsonLd, organizationJsonLd } from '@/lib/structuredData'
import { BOOK_SOURCES } from '@/data/newmindora'
import { topicSeoKeywords } from '@/lib/seoKeywords'

type Phase = 'details' | 'gender' | 'preparing' | 'howto' | 'running'

function topicKeywords(slug: string, title: string): string {
  const book = BOOK_SOURCES[slug]
  const parts = [topicSeoKeywords(slug, title)]
  if (book?.theory) parts.push(book.theory)
  if (book?.authors) parts.push(book.authors)
  if (book?.bookTitle) parts.push(book.bookTitle)
  return parts.join(', ')
}

export function TestPage() {
  const { slug = '' } = useParams()
  const { t } = useI18n()
  const test = getTestBySlug(slug)

  if (!test) {
    return (
      <section className="bg-mi-canvas py-16 text-center">
        <h1 className="text-2xl font-semibold text-mi-text">{t.library.notFound}</h1>
        <Link to="/library" className="btn-primary mt-6 inline-flex">
          ← Free tests
        </Link>
      </section>
    )
  }

  return <TestPageReady key={test.slug} test={test} />
}

function TestPageReady({ test }: { test: NonNullable<ReturnType<typeof getTestBySlug>> }) {
  const { t, code } = useI18n()
  const access = getAccessCopy(code)
  const localized = useLocalizedTest(test)
  const price = test.priceUsd ?? 0
  const [participant, setParticipant] = useState<ParticipantDetails | null>(() =>
    loadParticipantDetails(),
  )
  const [gender, setGender] = useState<ReportGender | null>(null)
  const [phase, setPhase] = useState<Phase>('details')

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [test.slug])

  const onDetails = useCallback((details: ParticipantDetails) => {
    saveParticipantDetails(details)
    setParticipant(details)
    setPhase('gender')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const onGender = useCallback((g: ReportGender) => {
    setGender(g)
    setPhase('preparing')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const onPrepReady = useCallback(() => {
    setPhase('howto')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const onHowToStart = useCallback(() => {
    setPhase('running')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const portalPhase = phase === 'preparing' || phase === 'howto' || phase === 'running'

  return (
    <>
      <Seo
        title={`Free ${localized.title} Test (100 Questions)`}
        description={`${localized.description} Free · ~${test.minutes} min · 100 questions · instant scores · printable Mindora Dossier PDF. Educational only — not a medical diagnosis.`}
        path={`/test/${test.slug}`}
        keywords={topicKeywords(test.slug, localized.title)}
        jsonLd={[
          organizationJsonLd(),
          assessmentJsonLd({
            title: localized.title,
            description: localized.description,
            slug: test.slug,
            free: true,
          }),
          breadcrumbJsonLd({ title: localized.title, slug: test.slug }),
          ...(test.slug === ADHD_SCREENING_SLUG ? [freeAdhdJsonLd()] : []),
        ]}
      />
      <section
        className={`min-h-[100dvh] px-2 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-4 ${
          portalPhase ? 'bg-mi-canvas py-4 sm:py-8' : 'bg-mi-canvas py-3 sm:py-8 md:py-10'
        }`}
      >
        <div
          className={`container mx-auto !max-w-4xl sm:!px-4 ${
            phase === 'gender' || phase === 'details' ? '!px-3' : '!px-2 min-[400px]:!px-3'
          }`}
        >
          {phase !== 'running' && (
            <div className="mb-3 flex items-center pt-[max(0.25rem,env(safe-area-inset-top))] sm:mb-4">
              <Link
                to="/library"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 py-2.5 text-sm font-semibold text-mi-forest transition hover:bg-mi-green-soft/70 active:bg-mi-green-soft/90"
              >
                <span aria-hidden>←</span>
                Free tests
              </Link>
            </div>
          )}

          {phase === 'details' && (
            <div className="mx-auto w-full min-w-0 max-w-3xl overflow-x-hidden">
              <header className="mb-4 min-w-0 text-center sm:mb-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-mi-blue">
                  {access.limitedFree}
                </p>
                <h1 className="font-display mx-auto mt-1.5 max-w-[22ch] text-[1.2rem] font-semibold leading-snug text-mi-forest min-[360px]:text-[1.35rem] sm:max-w-none sm:text-2xl md:text-[1.75rem]">
                  {localized.title}
                </h1>
                <p className="mx-auto mt-2 max-w-xl text-[13px] leading-5 text-mi-muted sm:text-sm sm:leading-6">
                  {localized.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 min-[360px]:gap-2">
                  <span className="badge badge-level">{localized.levelLabel}</span>
                  <span className="badge badge-meta">
                    {test.questions} {t.common.questions}
                  </span>
                  <span className="badge badge-meta">
                    {test.minutes} {t.common.minutes}
                  </span>
                  <SalePriceBadge priceUsd={price} />
                  <NhsMark size="sm" />
                </div>
              </header>
              <ParticipantDetailsScreen
                assessmentTitle={localized.title}
                onContinue={onDetails}
              />
            </div>
          )}

          {phase === 'gender' && (
            <div className="mx-auto w-full min-w-0 max-w-3xl overflow-x-hidden">
              <header className="mb-4 min-w-0 text-center sm:mb-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-mi-green">
                  Welcome, {participantDisplayName(participant)}
                </p>
                <h1 className="font-display mx-auto mt-1.5 max-w-[22ch] text-[1.2rem] font-semibold leading-snug text-mi-forest min-[360px]:text-[1.35rem] sm:max-w-none sm:text-2xl md:text-[1.75rem]">
                  Choose how we address you
                </h1>
                <p className="mx-auto mt-2 max-w-xl px-0.5 text-[13px] leading-5 text-mi-muted sm:px-0 sm:text-sm sm:leading-6">
                  This personalizes your emblem and the voice of your report for {localized.title}.
                </p>
              </header>

              <div className="mx-auto w-full min-w-0 max-w-md">
                <GenderSelect onSelect={onGender} />
              </div>

              <RelatedTryCarousel currentSlug={test.slug} categoryIds={test.categoryIds} />
            </div>
          )}

          {phase === 'preparing' && (
            <PreparingTestScreen
              title={localized.title}
              questionCount={test.questions}
              minutes={test.minutes}
              onReady={onPrepReady}
            />
          )}

          {phase === 'howto' && (
            <HowToUseScreen
              title={localized.title}
              clinical={!!test.clinical}
              crisis={!!test.crisis}
              onStart={onHowToStart}
            />
          )}

          {phase === 'running' && gender && participant && (
            <TestRunner test={test} gender={gender} participant={participant} />
          )}
        </div>
      </section>
    </>
  )
}
