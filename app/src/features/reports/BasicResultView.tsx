import { Link } from 'react-router-dom'
import type { ReportDocument } from '@/domain/reports/types'
import { getTestBySlug } from '@/data/tests'
import { AdhdTrustSupport } from '@/features/assessments/AdhdTrustSupport'
import { AssessmentLegalBanner } from '@/features/assessments/AssessmentLegalBanner'
import { RelatedTryCarousel } from '@/features/assessments/RelatedTryCarousel'
import { ResultEmblem } from '@/features/reports/ResultEmblem'
import { ShareCompletionBar } from '@/features/reports/ShareCompletionBar'
import {
  buildClearAnswers,
  clearResultSentence,
  scoreBandColor,
} from '@/features/reports/clearAnswers'
import { doctorOnScreenClose, doctorWatchBody } from '@/features/reports/clinicalVoice'
import { ASSESSMENT_LEGAL } from '@/data/legal/assessmentProtection'
import '@/features/reports/reportPrint.css'

type BasicResultViewProps = {
  doc: ReportDocument
  unlocked: boolean
  saved?: boolean
  checkoutHref: string
  fullReportHref: string
  sharePath: string
  /** Short plain-English headline (preferred over dense blurb) */
  clearHeadline?: string
  /** Profile shape title for plain summary */
  clearShape?: string
  /** Watch / caution line in plain English */
  clearWatch?: string
  /** Hide legacy pack “full report” upsell when NM dossier PDFs are the product */
  hideLegacyFullUpsell?: boolean
  onOpenBasicPdf?: () => void | Promise<void>
  onOpenExtendedPdf?: () => void | Promise<void>
}

export function BasicResultView({
  doc,
  unlocked,
  saved,
  checkoutHref,
  fullReportHref,
  sharePath,
  clearHeadline,
  clearShape,
  clearWatch,
  hideLegacyFullUpsell = false,
  onOpenBasicPdf,
  onOpenExtendedPdf,
}: BasicResultViewProps) {
  const categories = getTestBySlug(doc.slug)?.categoryIds ?? []
  const testMeta = getTestBySlug(doc.slug)
  const answers = buildClearAnswers(doc.traits)
  const lead = answers[0]
  const second = answers[1]
  const plain = clearResultSentence({
    leadName: lead?.name || doc.primary.name,
    leadScore: lead?.score ?? doc.primary.score,
    secondName: second?.name,
    secondScore: second?.score,
    shapeTitle: clearShape,
  })
  const displayHeadline = clearHeadline || doc.primary.name
  const displayBlurb = clearShape || lead ? plain : doc.blurb.length > 220
    ? `${doc.blurb.slice(0, 217).trimEnd()}…`
    : doc.blurb
  const clinicalClose = doctorOnScreenClose({
    title: doc.assessmentTitle,
    topName: lead?.name || doc.primary.name,
    leadScore: lead?.score ?? doc.primary.score,
    clinical: !!testMeta?.clinical,
    crisis: !!testMeta?.crisis,
    brief: { headline: displayHeadline, body: '', watch: clearWatch || '' },
  })

  return (
    <>
      <div className="mx-auto max-w-xl pb-4 sm:pb-6">
        {doc.family === 'adhd' && (
          <div className="report-no-print mb-4">
            <AdhdTrustSupport variant="full" />
          </div>
        )}

        <div className="report-no-print mb-4">
          <AssessmentLegalBanner clinical={!!testMeta?.clinical} crisis={!!testMeta?.crisis} />
        </div>

        <div className="report-no-print mb-4 rounded-2xl border border-mi-green/25 bg-gradient-to-br from-mi-green-soft/80 to-white px-4 py-3 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mi-green">
            Assessment complete
          </p>
          <p className="mt-1 text-sm text-mi-forest">
            You finished {doc.assessmentTitle}. Clear scores below — not a diagnosis.
          </p>
        </div>

        {(onOpenBasicPdf || onOpenExtendedPdf) && (
          <div className="report-no-print mb-4 rounded-2xl border border-mi-green/30 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-mi-green">
              Your printable report (PDF)
            </p>
            <p className="mt-1 text-sm text-mi-muted">
              Scores, patterns, and legal notice — downloads to this device. Not a medical record.
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {onOpenBasicPdf && (
                <button
                  type="button"
                  className="btn-primary flex w-full justify-center"
                  onClick={() => {
                    void Promise.resolve(onOpenBasicPdf()).catch(() => {
                      window.alert('Could not create the PDF. Please try again.')
                    })
                  }}
                >
                  Download summary PDF
                </button>
              )}
              {onOpenExtendedPdf && (
                <button
                  type="button"
                  className="btn-outline flex w-full justify-center"
                  onClick={() => {
                    void Promise.resolve(onOpenExtendedPdf()).catch(() => {
                      window.alert('Could not create the PDF. Please try again.')
                    })
                  }}
                >
                  Download extended PDF (full write-up)
                </button>
              )}
            </div>
          </div>
        )}

        <article className="rounded-2xl border border-mi-border bg-white px-4 py-7 text-center shadow-[var(--mi-card-shadow)] sm:px-10 sm:py-12">
          <ResultEmblem
            label={doc.primary.name}
            hue={doc.emblemHue}
            family={doc.family}
            traits={doc.traits}
            overall={doc.overall}
            gender={doc.gender}
          />
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-mi-green">
            Your results
          </p>
          <h1 className="font-display mt-2 text-2xl font-semibold leading-snug text-mi-text sm:text-3xl">
            {displayHeadline}
          </h1>
          <p className="mx-auto mt-3 max-w-[42ch] text-[15px] leading-7 text-mi-muted">
            {displayBlurb}
          </p>
          <p className="mt-4 text-sm font-semibold text-mi-forest">
            Overall {doc.overall}% · completed{' '}
            {new Date(doc.completedAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </article>

        <section className="mt-5 rounded-2xl border border-mi-border bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-display text-lg font-semibold text-mi-text">
            Your scores — plain English
          </h2>
          <p className="mt-1 text-sm text-mi-muted">
            Highest first. Each line says how strongly that pattern showed up in your answers today.
          </p>
          <div className="mt-5 space-y-4">
            {answers.map((t, i) => (
              <div key={`${t.name}-${i}`}>
                <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                  <div className="min-w-0 text-start">
                    <p className="text-sm font-semibold text-mi-text">
                      {i === 0 ? '1. Top · ' : `${i + 1}. `}
                      {t.name}
                    </p>
                    <p className="text-[12px] text-mi-muted">{t.hint}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                      style={{ backgroundColor: scoreBandColor(t.score) }}
                    >
                      {t.band}
                    </span>
                    <span className="tabular-nums text-sm font-bold text-mi-forest">
                      {t.score}/100
                    </span>
                  </div>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.max(2, Math.min(100, t.score))}%`,
                      backgroundColor: scoreBandColor(t.score),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {clearWatch ? (
            <p className="mt-5 rounded-xl border border-amber-200/80 bg-amber-50 px-3 py-2.5 text-[13px] leading-5 text-amber-950">
              <span className="font-semibold">Watch-out (not a clinical finding): </span>
              {doctorWatchBody(clearWatch)}
            </p>
          ) : null}

          <div className="mt-5 rounded-xl border border-[#032514]/20 bg-gradient-to-br from-[#032514] to-[#0f4a36] px-4 py-3.5 text-start text-[13px] leading-6 text-[#e8f5ee]">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9ae6b4]">
              Closing · educational only
            </p>
            <p className="mt-2">{clinicalClose}</p>
          </div>

          <p className="mt-4 rounded-xl border border-mi-green/20 bg-mi-green-soft/40 px-3 py-2.5 text-[13px] leading-5 text-mi-forest">
            {ASSESSMENT_LEGAL.shortBanner}
          </p>
        </section>

        <div className="report-no-print mt-5">
          <ShareCompletionBar doc={doc} sharePath={sharePath} />
        </div>

        {!hideLegacyFullUpsell ? (
          <aside className="report-no-print mt-5 rounded-2xl border border-mi-green/30 bg-gradient-to-br from-white to-mi-green-soft/50 p-5 shadow-sm sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mi-blue">
              {unlocked ? 'Full report unlocked' : 'Optional add-on'}
            </p>
            <h2 className="mt-2 font-display text-lg font-semibold text-mi-forest sm:text-xl">
              Comprehensive MindoraInsight report
            </h2>
            <p className="mt-2 text-sm leading-6 text-mi-muted">
              Deeper PDF with a closing summary, score bars, and a 14-day plan — still educational,
              not a diagnosis.
            </p>
            {unlocked ? (
              <Link
                to={fullReportHref}
                className="btn-primary mt-4 flex w-full justify-center sm:inline-flex sm:w-auto"
              >
                Open full report · PDF
              </Link>
            ) : (
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Link
                  to={checkoutHref}
                  className="btn-primary flex w-full justify-center sm:inline-flex sm:w-auto"
                >
                  Unlock comprehensive report
                </Link>
                <Link
                  to={checkoutHref}
                  className="btn-outline flex w-full justify-center text-sm sm:inline-flex sm:w-auto"
                  title="Demo checkout — no real charge"
                >
                  Test unlock (no payment)
                </Link>
              </div>
            )}
          </aside>
        ) : (
          <aside className="report-no-print mt-5 rounded-2xl border border-mi-green/20 bg-mi-green-soft/30 p-4 text-center text-sm text-mi-forest sm:p-5">
            Your Mindora Dossier PDFs are above — real downloads for this assessment.
          </aside>
        )}

        {saved ? (
          <p className="mt-3 text-center text-xs text-mi-muted">Progress saved on this device.</p>
        ) : null}
      </div>

      <div className="report-no-print mx-auto mt-2 w-full max-w-4xl">
        <RelatedTryCarousel currentSlug={doc.slug} categoryIds={categories} />
      </div>

      <div className="mx-auto max-w-xl pb-8 sm:pb-10">
        <p className="mt-4 text-center text-[11px] leading-5 text-mi-muted">{doc.disclaimer}</p>
        <div className="report-no-print mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
          <Link
            to="/free-tests"
            className="btn-outline flex w-full justify-center sm:inline-flex sm:w-auto"
          >
            More free tests
          </Link>
          <Link
            to="/library"
            className="btn-primary flex w-full justify-center sm:inline-flex sm:w-auto"
          >
            Browse library
          </Link>
        </div>
      </div>
    </>
  )
}
