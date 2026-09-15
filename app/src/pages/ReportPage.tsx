import { useMemo } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { buildReportDocument } from '@/application/reports/buildReportDocument'
import { getReportSession } from '@/application/reports/sessionStore'
import { Seo } from '@/components/layout/Seo'
import { BasicResultView } from '@/features/reports/BasicResultView'
import { ComprehensiveReportView } from '@/features/reports/ComprehensiveReportView'

export function ReportPage() {
  const { slug = '' } = useParams()
  const [params] = useSearchParams()
  const sessionId = params.get('session')
  const wantFull = params.get('full') === '1'

  // Read once per URL change — do NOT use useSyncExternalStore with JSON.parse
  // snapshots (new object every call → infinite re-render / blank page).
  const session = useMemo(() => {
    if (sessionId) {
      const byId = getReportSession(sessionId)
      if (byId && (!slug || byId.slug === slug)) return byId
    }
    const latest = getReportSession(slug)
    if (latest && latest.slug === slug) return latest
    return null
  }, [sessionId, slug, wantFull])

  if (!session) {
    return (
      <section className="bg-mi-canvas py-16">
        <div className="container max-w-lg text-center">
          <h1 className="font-display text-2xl font-semibold text-mi-text">Report not found</h1>
          <p className="mt-3 text-mi-muted">
            Complete the assessment again to generate your individual result and report.
          </p>
          <Link to={slug ? `/test/${slug}` : '/library'} className="btn-primary mt-6 inline-flex">
            {slug ? 'Retake assessment' : 'Back to library'}
          </Link>
        </div>
      </section>
    )
  }

  let doc
  try {
    doc = buildReportDocument(session)
  } catch {
    return (
      <section className="bg-mi-canvas py-16">
        <div className="container max-w-lg text-center">
          <h1 className="font-display text-2xl font-semibold text-mi-text">Could not build report</h1>
          <p className="mt-3 text-mi-muted">Try completing the assessment again.</p>
          <Link to={`/test/${session.slug}`} className="btn-primary mt-6 inline-flex">
            Retake assessment
          </Link>
        </div>
      </section>
    )
  }

  const sharePath = `/report/${session.slug}?session=${session.id}`
  const basicHref = `/report/${session.slug}?session=${session.id}`
  const fullHref = `/report/${session.slug}?session=${session.id}&full=1`
  const checkoutHref = `/checkout?product=0&addon=comprehensive-report&test=${session.slug}&session=${session.id}`
  const showFull = wantFull && session.unlocked

  return (
    <>
      <Seo title={`${doc.primary.name} · ${doc.assessmentTitle}`} description={doc.blurb} noindex />
      <section className="bg-[#F7FBF9] px-0 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:py-8 md:py-10">
        <div className="container !px-3 sm:!px-5">
          {showFull ? (
            <ComprehensiveReportView doc={doc} sharePath={sharePath} basicHref={basicHref} />
          ) : (
            <BasicResultView
              doc={doc}
              unlocked={session.unlocked}
              checkoutHref={checkoutHref}
              fullReportHref={fullHref}
              sharePath={sharePath}
            />
          )}
          {wantFull && !session.unlocked && (
            <p className="mx-auto mt-4 max-w-xl px-1 text-center text-sm text-mi-muted">
              Full report is locked.{' '}
              <Link to={checkoutHref} className="font-semibold text-mi-green">
                Unlock it
              </Link>{' '}
              to read every chapter and download the PDF.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
