import { Link } from 'react-router-dom'
import type { ReportDocument } from '@/domain/reports/types'
import { getTestBySlug } from '@/data/tests'
import { AdhdTrustSupport } from '@/features/assessments/AdhdTrustSupport'
import { RelatedTryCarousel } from '@/features/assessments/RelatedTryCarousel'
import { ResultEmblem } from '@/features/reports/ResultEmblem'
import { ShareCompletionBar } from '@/features/reports/ShareCompletionBar'
import '@/features/reports/reportPrint.css'

type BasicResultViewProps = {
  doc: ReportDocument
  unlocked: boolean
  saved?: boolean
  checkoutHref: string
  fullReportHref: string
  sharePath: string
}

export function BasicResultView({
  doc,
  unlocked,
  saved,
  checkoutHref,
  fullReportHref,
  sharePath,
}: BasicResultViewProps) {
  const categories = getTestBySlug(doc.slug)?.categoryIds ?? []

  return (
    <>
    <div className="mx-auto max-w-xl pb-4 sm:pb-6">
      {doc.family === 'adhd' && (
        <div className="report-no-print mb-4">
          <AdhdTrustSupport variant="full" />
        </div>
      )}

      <div className="report-no-print mb-4 rounded-2xl border border-mi-green/25 bg-gradient-to-br from-mi-green-soft/80 to-white px-4 py-3 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mi-green">Assessment complete</p>
        <p className="mt-1 text-sm text-mi-forest">
          You finished {doc.assessmentTitle}. Your pattern is ready to read — and share.
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
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-mi-green">Your result</p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-mi-text sm:text-4xl">{doc.primary.name}</h1>
        <p className="mx-auto mt-3 max-w-[36ch] text-[15px] leading-7 text-mi-muted">{doc.blurb}</p>
        <p className="mt-4 text-sm font-semibold text-mi-forest">
          {doc.primary.score}% · completed{' '}
          {new Date(doc.completedAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </article>

      <section className="mt-5 rounded-2xl border border-mi-border bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-display text-lg font-semibold text-mi-text">Your scores</h2>
        <p className="mt-1 text-sm text-mi-muted">
          {doc.family === 'adhd'
            ? 'Highest first. Higher % means that area showed up more in your answers.'
            : 'Ranked by intensity. Highest scores are your strongest patterns on this assessment.'}
        </p>
        <div className="mt-5 space-y-4">
          {doc.traits.map((t) => (
            <div key={t.id}>
              <div className="mb-1 flex justify-between gap-2 text-sm font-semibold">
                <span className="text-mi-text">{t.name}</span>
                <span className="tabular-nums text-mi-muted">{t.score}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-mi-green transition-all"
                  style={{ width: `${t.score}%`, backgroundColor: doc.emblemHue }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-6 text-mi-muted">{doc.summary}</p>
        {doc.family === 'adhd' && (
          <p className="mt-3 rounded-xl border border-mi-green/20 bg-mi-green-soft/40 px-3 py-2.5 text-[13px] leading-5 text-mi-forest">
            Plain English: this is not a diagnosis. It is a calm map of your answers so you can
            talk with a professional if you want to.
          </p>
        )}
      </section>

      <div className="report-no-print mt-5">
        <ShareCompletionBar doc={doc} sharePath={sharePath} />
      </div>

      <aside className="report-no-print mt-5 rounded-2xl border border-mi-green/30 bg-gradient-to-br from-white to-mi-green-soft/50 p-5 shadow-sm sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mi-blue">
          {unlocked ? 'Full report unlocked' : 'Optional add-on'}
        </p>
        <h2 className="mt-2 font-display text-lg font-semibold text-mi-forest sm:text-xl">
          Comprehensive MindoraInsight report
        </h2>
        <p className="mt-2 text-sm leading-6 text-mi-muted">
          Multi-chapter PDF-ready report with table of contents, individualized essays, and a 30-day
          experiment.
        </p>
        {unlocked ? (
          <Link to={fullReportHref} className="btn-primary mt-4 inline-flex w-full justify-center sm:w-auto">
            Open full report · PDF
          </Link>
        ) : (
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link to={checkoutHref} className="btn-primary inline-flex justify-center">
              Unlock comprehensive report
            </Link>
            <Link
              to={checkoutHref}
              className="btn-outline inline-flex justify-center text-sm"
              title="Demo checkout — no real charge"
            >
              Test unlock (no payment)
            </Link>
          </div>
        )}
      </aside>

      {saved && (
        <p className="mt-3 text-center text-xs text-mi-muted">Progress saved on this device.</p>
      )}
    </div>

      <div className="report-no-print mx-auto mt-2 w-full max-w-4xl">
        <RelatedTryCarousel currentSlug={doc.slug} categoryIds={categories} />
      </div>

      <div className="mx-auto max-w-xl pb-8 sm:pb-10">
      <p className="mt-4 text-center text-[11px] leading-5 text-mi-muted">{doc.disclaimer}</p>

      <div className="report-no-print mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
        <Link to="/library" className="btn-outline w-full justify-center sm:w-auto">
          Back to library
        </Link>
        <Link to="/pricing" className="btn-primary w-full justify-center sm:w-auto">
          View plans
        </Link>
      </div>
    </div>
    </>
  )
}
