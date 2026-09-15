import { Link } from 'react-router-dom'
import '@/features/reports/reportPrint.css'
import type { ReportDocument } from '@/domain/reports/types'
import { getTestBySlug } from '@/data/tests'
import { AdhdTrustSupport } from '@/features/assessments/AdhdTrustSupport'
import { RelatedTryCarousel } from '@/features/assessments/RelatedTryCarousel'
import { ResultEmblem } from '@/features/reports/ResultEmblem'
import { ShareCompletionBar } from '@/features/reports/ShareCompletionBar'

type ComprehensiveReportViewProps = {
  doc: ReportDocument
  sharePath: string
  basicHref: string
}

export function ComprehensiveReportView({ doc, sharePath, basicHref }: ComprehensiveReportViewProps) {
  function downloadPdf() {
    window.print()
  }

  const prepared = new Date(doc.completedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const secondary = doc.traits[1]
  const isAdhd = doc.family === 'adhd'
  const categories = getTestBySlug(doc.slug)?.categoryIds ?? []

  return (
    <>
    <div className="report-doc mx-auto max-w-[42rem] pb-8">
      <div className="report-no-print mb-4 flex flex-col gap-3 rounded-xl border border-mi-border bg-white px-3 py-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-mi-green">Full report</p>
          <p className="truncate text-sm text-mi-muted">{doc.assessmentTitle}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <button type="button" onClick={downloadPdf} className="btn-primary !px-3 !py-2.5 !text-sm">
            Download PDF
          </button>
          <Link to={basicHref} className="btn-outline !px-3 !py-2.5 !text-sm">
            Short summary
          </Link>
        </div>
      </div>

      {isAdhd && (
        <div className="report-no-print mb-6">
          <AdhdTrustSupport variant="full" />
        </div>
      )}

      {/* Cover */}
      <header className="report-cover overflow-hidden rounded-2xl border border-mi-border bg-white shadow-[var(--mi-card-shadow)]">
        <div
          className="report-cover-band h-1.5 w-full"
          style={{ background: `linear-gradient(90deg, ${doc.emblemHue}, #31B070, #4880D9)` }}
        />
        <div className="px-5 py-8 text-center sm:px-10 sm:py-11">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-mi-green">MindoraInsight</p>
          <ResultEmblem
            label={doc.primary.name}
            hue={doc.emblemHue}
            family={doc.family}
            withWordmark
            size="lg"
            traits={doc.traits}
            overall={doc.overall}
            gender={doc.gender}
          />

          <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.28em] text-mi-muted">
            Your main result
          </p>
          <h1 className="font-display mt-2 text-[1.75rem] font-semibold tracking-tight text-mi-text sm:text-[2.35rem]">
            {doc.primary.name}
          </h1>
          <p className="mx-auto mt-3 max-w-[42ch] text-[15px] leading-7 text-mi-muted">{doc.blurb}</p>

          {isAdhd && (
            <p className="report-plain-banner mx-auto mt-5 max-w-[40ch] rounded-xl border border-mi-green/25 bg-mi-green-soft/50 px-4 py-3 text-left text-[13px] leading-5 text-mi-forest">
              <span className="font-bold">In plain English: </span>
              This is an educational screen, not a medical diagnosis. Higher scores mean that area showed
              up more in your answers. Use this to talk with a licensed professional if life feels hard.
            </p>
          )}

          <p className="mt-5 text-sm text-mi-muted">
            {doc.assessmentTitle}
            <span className="mx-1.5 text-mi-border">·</span>
            {prepared}
            {secondary ? (
              <>
                <span className="mx-1.5 text-mi-border">·</span>
                Next: {secondary.name}
              </>
            ) : null}
          </p>
        </div>
      </header>

      {/* Scores */}
      <section className="report-section report-snapshot mt-5 rounded-2xl border border-mi-border bg-white p-5 sm:mt-6 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mi-muted">Your scores</p>
        <h2 className="font-display mt-2 text-xl font-semibold text-mi-text sm:text-2xl">
          Highest first
        </h2>
        <p className="mt-2 text-sm leading-6 text-mi-muted">
          {isAdhd
            ? 'Higher % = that area showed up more in your answers. Read the top ones first.'
            : 'Your highest scores are your strongest patterns on this assessment.'}
        </p>
        <p className="mt-4 rounded-xl bg-[#F7FBF9] px-4 py-3.5 text-[14px] leading-6 text-mi-text">
          {doc.summary}
        </p>

        <ul className="report-score-list mt-7 space-y-4">
          {doc.traits.map((t) => (
            <li key={t.id} className="report-score-row">
              <div className="mb-1.5 flex items-end justify-between gap-3">
                <span className="text-sm font-semibold text-mi-forest">{t.name}</span>
                <span
                  className="font-display text-xl font-semibold tabular-nums sm:text-2xl"
                  style={{ color: doc.emblemHue }}
                >
                  {t.score}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${t.score}%`, backgroundColor: doc.emblemHue }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* TOC */}
      <section className="report-section report-toc mt-5 rounded-2xl border border-mi-border bg-white p-5 sm:mt-6 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mi-muted">Contents</p>
        <h2 className="font-display mt-2 text-xl font-semibold text-mi-text sm:text-2xl">
          How this report is organised
        </h2>
        <div className="mt-6 space-y-6">
          {doc.themes.map((theme) => (
            <div key={theme.id} className="report-toc-block">
              <h3 className="text-sm font-bold text-mi-green">{theme.title}</h3>
              <ol className="mt-2 space-y-2">
                {theme.chapters.map((ch, i) => (
                  <li key={ch.id} className="text-sm leading-6 text-mi-text">
                    <span className="font-semibold">
                      {i + 1}. {ch.title}
                    </span>
                    <span className="text-mi-muted"> — {ch.teaser}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Chapters */}
      <div className="report-chapters mt-2">
        <div className="report-section-divider my-7 flex items-center gap-3 sm:my-8">
          <div className="h-px flex-1 bg-mi-border" />
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-mi-muted">Chapters</p>
          <div className="h-px flex-1 bg-mi-border" />
        </div>

        <div className="space-y-4 sm:space-y-5">
          {doc.chapters.map((ch) => (
            <article
              key={ch.id}
              className="report-chapter rounded-2xl border border-mi-border bg-white p-5 sm:p-8"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-mi-muted">
                Chapter {String(ch.number).padStart(2, '0')}
                <span className="mx-2 text-mi-border">·</span>
                <span style={{ color: doc.emblemHue }}>{ch.theme}</span>
              </p>
              <h2 className="font-display mt-2 text-xl font-semibold text-mi-text sm:text-2xl">{ch.title}</h2>
              <div
                className="mt-3 h-0.5 w-12 rounded-full"
                style={{ backgroundColor: doc.emblemHue }}
                aria-hidden
              />
              <p className="mt-4 text-[15px] leading-7 text-mi-text whitespace-pre-wrap">{ch.body}</p>
            </article>
          ))}
        </div>
      </div>

      <section className="report-section report-experiment mt-5 overflow-hidden rounded-2xl border border-mi-green/35 bg-gradient-to-br from-white to-mi-green-soft/60 sm:mt-6">
        <div className="border-b border-mi-green/20 px-5 py-4 sm:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-mi-green">Try this</p>
          <h2 className="font-display mt-1 text-xl font-semibold text-mi-forest sm:text-2xl">
            {doc.experiment.title}
          </h2>
        </div>
        <div className="px-5 py-5 sm:px-8 sm:py-7">
          <p className="text-[15px] leading-7 text-mi-text">{doc.experiment.body}</p>
        </div>
      </section>

      <div className="report-no-print mt-6">
        <ShareCompletionBar doc={doc} sharePath={sharePath} />
      </div>
    </div>

    <div className="report-no-print mx-auto mt-2 w-full max-w-4xl px-0 sm:mt-3">
      <RelatedTryCarousel currentSlug={doc.slug} categoryIds={categories} />
    </div>

    <footer className="report-footer mx-auto mt-8 max-w-[42rem] rounded-xl border border-mi-border bg-white px-5 py-5 text-center text-[11px] leading-5 text-mi-muted sm:mt-10">
        <p className="font-semibold uppercase tracking-[0.14em] text-mi-forest/70">MindoraInsight</p>
        <p className="mt-2">{doc.disclaimer}</p>
        <p className="mt-2">© {new Date().getFullYear()} MindoraInsight</p>
      </footer>
    </>
  )
}
