import { useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { NhsMark } from '@/components/brand/NhsMark'
import { Seo } from '@/components/layout/Seo'
import { SalePriceBadge } from '@/components/marketing/SalePriceBadge'
import { HealthcareReferralGate } from '@/features/access/HealthcareReferralGate'
import { isReferralUnlocked } from '@/features/access/referralPin'
import { FreeAdhdSaleBanner } from '@/features/assessments/FreeAdhdSaleBanner'
import { GenderSelect } from '@/features/assessments/GenderSelect'
import { PreparingTestScreen } from '@/features/assessments/PreparingTestScreen'
import { HowToUseScreen } from '@/features/assessments/HowToUseScreen'
import { RelatedTryCarousel } from '@/features/assessments/RelatedTryCarousel'
import { TestRunner } from '@/features/assessments/TestRunner'
import { FreeAccessGate } from '@/features/sale/FreeAccessGate'
import { ADHD_SCREENING_SLUG } from '@/data/adhdScreening'
import { UI_PREVIEW_SLUG, getTestBySlug } from '@/data/tests'
import { useLocalizedTest } from '@/hooks/useLocalizedCatalog'
import { getAccessCopy } from '@/i18n/accessCopy'
import { useI18n } from '@/i18n/I18nProvider'
import type { ReportGender } from '@/features/reports/emblemAssets'
import { assessmentJsonLd, freeAdhdJsonLd, organizationJsonLd } from '@/lib/structuredData'

type Phase = 'referral' | 'gender' | 'preparing' | 'howto' | 'running'

export function TestPage() {
  const { slug = '' } = useParams()
  const { t } = useI18n()
  const test = getTestBySlug(slug)

  if (!test) {
    return (
      <section className="bg-mi-canvas py-16 text-center">
        <h1 className="text-2xl font-semibold text-mi-text">{t.library.notFound}</h1>
        <Link to="/library" className="btn-primary mt-6 inline-flex">
          {t.library.backToLibrary}
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
  const price = test.priceUsd ?? 49
  const free = price === 0
  const needsReferral = !free
  const [unlocked, setUnlocked] = useState(() => !needsReferral || isReferralUnlocked(test.slug))
  const [gender, setGender] = useState<ReportGender | null>(null)
  const [phase, setPhase] = useState<Phase>(() =>
    needsReferral && !isReferralUnlocked(test.slug) ? 'referral' : 'gender',
  )

  const onReferralUnlocked = useCallback(() => {
    setUnlocked(true)
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

  const freeLabel =
    test.slug === ADHD_SCREENING_SLUG
      ? access.limitedFree
      : test.slug === UI_PREVIEW_SLUG
        ? access.freeUiPreview
        : access.limitedFree

  const intro = (
    <div className="mx-auto w-full max-w-3xl">
      {needsReferral && <FreeAdhdSaleBanner />}

      <header className="mb-4 text-center sm:mb-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mi-blue">
          {free ? freeLabel : access.healthcareReferralCourse}
        </p>
        <h1 className="font-display mx-auto mt-1.5 max-w-[22ch] text-[1.35rem] font-semibold leading-snug text-mi-forest sm:max-w-none sm:text-2xl md:text-[1.75rem]">
          {localized.title}
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-[13px] leading-5 text-mi-muted sm:text-sm sm:leading-6">
          {localized.description}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="badge badge-level">{localized.levelLabel}</span>
          <span className="badge badge-meta">
            {test.questions} {t.common.questions}
          </span>
          <span className="badge badge-meta">
            {test.minutes} {t.common.minutes}
          </span>
          <SalePriceBadge priceUsd={price} />
          <NhsMark size="sm" />
          {needsReferral && (
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-900">
              {access.referralPin}
            </span>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-md">
        <GenderSelect onSelect={onGender} />
      </div>

      <RelatedTryCarousel currentSlug={test.slug} categoryIds={test.categoryIds} />
    </div>
  )

  const portalPhase = phase === 'preparing' || phase === 'howto' || phase === 'running'

  return (
    <>
      <Seo
        title={localized.title}
        description={localized.description}
        path={`/test/${test.slug}`}
        keywords={
          test.slug === ADHD_SCREENING_SLUG
            ? 'free ADHD test, adult ADHD screening, ADHD pattern screen, MindoraInsight'
            : undefined
        }
        jsonLd={[
          organizationJsonLd(),
          assessmentJsonLd({
            title: localized.title,
            description: localized.description,
            slug: test.slug,
            free,
          }),
          ...(test.slug === ADHD_SCREENING_SLUG ? [freeAdhdJsonLd()] : []),
        ]}
      />
      <section
        className={`min-h-[100dvh] px-2 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-4 ${
          portalPhase ? 'bg-mi-canvas py-4 sm:py-8' : 'bg-mi-canvas py-3 sm:py-8 md:py-10'
        }`}
      >
        <div className="container mx-auto !max-w-4xl !px-1 sm:!px-4">
          {phase !== 'running' && (
            <div className="mb-3 flex items-center pt-[max(0.25rem,env(safe-area-inset-top))] sm:mb-4">
              <Link
                to="/library"
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-semibold text-mi-forest transition hover:bg-mi-green-soft/70"
              >
                <span aria-hidden>←</span>
                {t.library.backToLibrary}
              </Link>
            </div>
          )}

          {phase === 'referral' && !unlocked && (
            <div className="mx-auto max-w-2xl py-2 sm:py-4">
              <FreeAdhdSaleBanner />

              <div className="mx-auto max-w-lg">
                <header className="mb-5 text-center">
                  <h1 className="font-display mt-1 text-xl font-semibold text-mi-forest sm:text-2xl">
                    {localized.title}
                  </h1>
                  <p className="mx-auto mt-2 max-w-[40ch] text-sm text-mi-muted">
                    {access.needsEmailPin}
                  </p>
                </header>
                <HealthcareReferralGate
                  courseTitle={localized.title}
                  slug={test.slug}
                  onUnlocked={onReferralUnlocked}
                />
              </div>
            </div>
          )}

          {phase === 'gender' &&
            (test.slug === ADHD_SCREENING_SLUG ? (
              <FreeAccessGate courseTitle={localized.title}>{intro}</FreeAccessGate>
            ) : (
              intro
            ))}

          {phase === 'preparing' && (
            <PreparingTestScreen
              title={localized.title}
              questionCount={test.questions}
              minutes={test.minutes}
              onReady={onPrepReady}
            />
          )}

          {phase === 'howto' && <HowToUseScreen title={localized.title} onStart={onHowToStart} />}

          {phase === 'running' && gender && <TestRunner test={test} gender={gender} />}
        </div>
      </section>
    </>
  )
}
