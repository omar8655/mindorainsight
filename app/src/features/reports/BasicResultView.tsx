import { Link } from 'react-router-dom'
import type { ReportDocument } from '@/domain/reports/types'
import { getTestBySlug } from '@/data/tests'
import { AssessmentLegalBanner } from '@/features/assessments/AssessmentLegalBanner'
import { RelatedTryCarousel } from '@/features/assessments/RelatedTryCarousel'
import { ResultEmblem } from '@/features/reports/ResultEmblem'
import { ShareCompletionBar } from '@/features/reports/ShareCompletionBar'
import {
  buildClearAnswers,
  clearResultSentence,
  scoreBandColor,
} from '@/features/reports/clearAnswers'
import { doctorOnScreenClose, doctorWatchBody, isActionableWatch } from '@/features/reports/clinicalVoice'
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
  /** Full name for clinician-style address */
  participantName?: string
  /** First name for short clinician voice */
  participantFirstName?: string
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
  participantName,
  participantFirstName,
  hideLegacyFullUpsell = false,
  onOpenBasicPdf,
  onOpenExtendedPdf,
}: BasicResultViewProps) {
  const categories = getTestBySlug(doc.slug)?.categoryIds ?? []
  const testMeta = getTestBySlug(doc.slug)
  const answers = buildClearAnswers(doc.traits)
  const lead = answers[0]
  const second = answers[1]
  const you = participantFirstName || participantName?.split(' ')[0] || 'You'
  const plain = clearResultSentence({
    you,
    leadName: lead?.name || doc.primary.name,
    leadScore: lead?.score ?? doc.primary.score,
    secondName: second?.name,
    secondScore: second?.score,
    shapeTitle: clearShape,
  })
  // Type / shape first — user must see the clear answer immediately
  const displayHeadline =
    clearShape || lead?.name || clearHeadline || doc.primary.name
  const displayBlurb = plain
  const leadScore = lead?.score ?? doc.primary.score
  const clinicalClose = doctorOnScreenClose({
    title: doc.assessmentTitle,
    topName: lead?.name || doc.primary.name,
    leadScore,
    clinical: !!testMeta?.clinical,
    crisis: !!testMeta?.crisis,
    brief: { headline: displayHeadline, body: '', watch: clearWatch || '' },
    you,
  })

  return (
    <>
      <div className="mx-auto max-w-xl pb-4 sm:pb-6">
        <div className="report-no-print mb-4 rounded-2xl border border-mi-green/25 bg-gradient-to-br from-mi-green-soft/80 to-white px-4 py-3 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mi-green">
            Assessment complete
          </p>
          <p className="mt-1 text-sm font-semibold text-mi-forest">
            {you !== 'You' ? `${you}, your clear answer is ready.` : `Your clear answer for ${doc.assessmentTitle} is ready.`}
          </p>
        </div>

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
            {participantName && participantName !== 'You'
              ? `Clear answer for ${participantName}`
              : 'Your clear answer'}
          </p>
          <h1 className="font-display mt-2 text-2xl font-semibold leading-snug text-mi-text sm:text-3xl">
            {displayHeadline}
          </h1>
          {participantName && participantName !== 'You' ? (
            <p className="mx-auto mt-3 max-w-[44ch] text-[13px] leading-6 text-mi-muted">
              {you}, here is what your answers show — spoken plainly, the way a careful clinician
              would open a results conversation.
            </p>
          ) : null}
          <p className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full bg-mi-green-soft px-3 py-1.5 text-sm font-bold text-mi-forest">
            Lead trait · {lead?.name || doc.primary.name} · {leadScore}/100
          </p>
          <p className="mx-auto mt-4 max-w-[44ch] text-[15px] font-medium leading-7 text-mi-forest">
            {displayBlurb}
          </p>
          {clearHeadline && clearHeadline !== displayHeadline ? (
            <p className="mx-auto mt-3 max-w-[42ch] text-[13px] leading-6 text-mi-muted">
              {clearHeadline}
            </p>
          ) : null}
          <p className="mt-4 text-sm font-semibold text-mi-forest">
            Composite overall {doc.overall}/100 · completed{' '}
            {new Date(doc.completedAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </article>

        {(onOpenBasicPdf || onOpenExtendedPdf) && (
          <div className="report-no-print mt-5 rounded-2xl border border-mi-green/30 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-mi-green">
              Download your report (PDF)
            </p>
            <p className="mt-1 text-sm text-mi-muted">
              Saves a unique Mindora Dossier file to this device.
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

        <div className="report-no-print mt-4">
          <AssessmentLegalBanner clinical={!!testMeta?.clinical} crisis={!!testMeta?.crisis} compact />
        </div>

        <section className="mt-5 rounded-2xl border border-mi-border bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-display text-lg font-semibold text-mi-text">
            Ranked scores — what stands out
          </h2>
          <p className="mt-1 text-sm text-mi-muted">
            Highest first. Dominant and Strong scores are your real answer; Quiet scores are not the story.
          </p>
          <div className="mt-5 space-y-4">
            {answers.map((t, i) => (
              <div key={`${t.name}-${i}`}>
                <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                  <div className="min-w-0 text-start">
                    <p className="text-sm font-semibold text-mi-text">
                      {i === 0 ? '★ Top answer · ' : `${i + 1}. `}
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

          {isActionableWatch(clearWatch) ? (
            <p className="mt-5 rounded-xl border border-amber-200/80 bg-amber-50 px-3 py-2.5 text-[13px] leading-5 text-amber-950">
              <span className="font-semibold">Watch-out: </span>
              {doctorWatchBody(clearWatch!)}
            </p>
          ) : null}

          <div className="mt-5 rounded-xl border border-[#032514]/20 bg-gradient-to-br from-[#032514] to-[#0f4a36] px-4 py-3.5 text-start text-[13px] leading-6 text-[#e8f5ee]">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9ae6b4]">
              Closing
            </p>
            <p className="mt-2">{clinicalClose}</p>
          </div>

          <p className="mt-4 text-center text-[11px] leading-5 text-mi-muted">
            {ASSESSMENT_LEGAL.resultsFooter}
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
              Deeper PDF with a closing summary, score bars, and a 14-day plan.
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
        <div className="report-no-print mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
          <Link
            to="/library"
            className="btn-primary flex w-full justify-center sm:inline-flex sm:w-auto"
          >
            More free tests
          </Link>
        </div>
      </div>
    </>
  )
}
