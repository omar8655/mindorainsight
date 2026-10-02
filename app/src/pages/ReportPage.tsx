import { useMemo } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { buildReportDocument } from '@/application/reports/buildReportDocument'
import { getReportSession, getReportSessionById } from '@/application/reports/sessionStore'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { Seo } from '@/components/layout/Seo'
import { BasicResultView } from '@/features/reports/BasicResultView'
import { ComprehensiveReportView } from '@/features/reports/ComprehensiveReportView'
import { parseNmResult } from '@/features/reports/newmindora/nmSessionMeta'
import { openDesignedDossier } from '@/features/reports/newmindora/openDesignedDossier'
import { openExtendedDossier } from '@/features/reports/newmindora/openExtendedDossier'
import { isNewMindoraId } from '@/data/newmindora'

export function ReportPage() {
  const { slug = '' } = useParams()
  const [params] = useSearchParams()
  const sessionId = params.get('session')
  const wantFull = params.get('full') === '1'

  const session = useMemo(() => {
    // Strict: if ?session= is present, only that id — never fall back to another sitting
    if (sessionId) return getReportSessionById(sessionId)
    // Legacy /resume: /report/:slug or /report/:sessionId without query
    if (slug) return getReportSession(slug)
    return null
  }, [sessionId, slug])

  const nmBrief = useMemo(
    () => (session ? parseNmResult(session.meta) : null),
    [session],
  )

  const built = useMemo(() => {
    if (!session) return { ok: false as const, reason: 'missing' as const }
    if (slug && !slug.startsWith('rs_') && session.slug !== slug) {
      return { ok: false as const, reason: 'mismatch' as const }
    }
    try {
      let doc = buildReportDocument(session)
      if (nmBrief) {
        doc = {
          ...doc,
          primary: {
            ...doc.primary,
            name: nmBrief.topName || nmBrief.shape.title || session.primaryName,
            score: nmBrief.overall,
          },
          blurb: nmBrief.shape.blurb || nmBrief.brief.headline || doc.blurb,
          summary: nmBrief.brief.headline || doc.summary,
          traits: nmBrief.traits.length ? nmBrief.traits : doc.traits,
          overall: nmBrief.overall || doc.overall,
        }
      }
      return { ok: true as const, doc }
    } catch {
      return { ok: false as const, reason: 'build' as const }
    }
  }, [session, slug, nmBrief])

  const isNm = !!session && isNewMindoraId(session.slug)
  const nmMetaMissing = isNm && !nmBrief

  if (!session) {
    const retakeSlug = slug && !slug.startsWith('rs_') ? slug : undefined
    return (
      <section className="bg-mi-canvas py-16">
        <div className="container max-w-lg text-center">
          <h1 className="font-display text-2xl font-semibold text-mi-text">Report not found</h1>
          <p className="mt-3 text-mi-muted">
            This link needs the assessment completed on this device. Take the test again to generate
            your unique Mindora Dossier PDF.
          </p>
          <Link
            to={retakeSlug ? `/test/${retakeSlug}` : '/library'}
            className="btn-primary mt-6 inline-flex"
          >
            {retakeSlug ? 'Retake assessment' : 'Back to library'}
          </Link>
        </div>
      </section>
    )
  }

  if (!built.ok && built.reason === 'mismatch') {
    return (
      <section className="bg-mi-canvas py-16">
        <div className="container max-w-lg text-center">
          <h1 className="font-display text-2xl font-semibold text-mi-text">Report link mismatch</h1>
          <p className="mt-3 text-mi-muted">
            This session belongs to a different assessment. Open the correct report link.
          </p>
          <Link
            to={`/report/${session.slug}?session=${session.id}`}
            className="btn-primary mt-6 inline-flex"
          >
            Open saved report
          </Link>
        </div>
      </section>
    )
  }

  if (!built.ok) {
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

  if (nmMetaMissing) {
    return (
      <section className="bg-mi-canvas py-16">
        <div className="container max-w-lg text-center">
          <h1 className="font-display text-2xl font-semibold text-mi-text">
            Dossier data missing
          </h1>
          <p className="mt-3 text-mi-muted">
            Scores were saved, but the unique Mindora dossier payload is incomplete on this device.
            Retake once to regenerate your PDF.
          </p>
          <Link to={`/test/${session.slug}`} className="btn-primary mt-6 inline-flex">
            Retake assessment
          </Link>
        </div>
      </section>
    )
  }

  const doc = built.doc
  const sharePath = `/report/${session.slug}?session=${session.id}`
  const basicHref = `/report/${session.slug}?session=${session.id}`
  const fullHref = `/report/${session.slug}?session=${session.id}&full=1`
  const checkoutHref = `/checkout?product=0&addon=comprehensive-report&test=${session.slug}&session=${session.id}`
  const unlocked = session.unlocked || isNm
  const showFull = wantFull && unlocked && !isNm

  return (
    <>
      <Seo title={`${doc.primary.name} · ${doc.assessmentTitle}`} description={doc.blurb} noindex />
      <section className="bg-[#F7FBF9] px-0 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:py-8 md:py-10">
        <div className="container !px-3 sm:!px-5">
          <div className="mx-auto mb-3 flex max-w-xl items-center justify-between gap-2">
            <Link to="/free-tests" className="text-xs font-semibold text-mi-muted hover:text-mi-forest">
              ← Free tests
            </Link>
            <LanguageSwitcher />
          </div>
          {showFull ? (
            <ComprehensiveReportView doc={doc} sharePath={sharePath} basicHref={basicHref} />
          ) : (
            <BasicResultView
              doc={doc}
              unlocked={unlocked}
              checkoutHref={checkoutHref}
              fullReportHref={fullHref}
              sharePath={sharePath}
              hideLegacyFullUpsell={isNm}
              clearHeadline={nmBrief?.brief.headline}
              clearShape={nmBrief?.shape.title}
              clearWatch={nmBrief?.brief.watch}
              onOpenBasicPdf={nmBrief ? () => openDesignedDossier(nmBrief) : undefined}
              onOpenExtendedPdf={nmBrief ? () => openExtendedDossier(nmBrief) : undefined}
            />
          )}
          {wantFull && nmBrief && (
            <p className="mx-auto mt-2 max-w-xl px-1 text-center text-sm text-mi-muted">
              Your full report is the unique{' '}
              <button
                type="button"
                className="font-semibold text-mi-green underline"
                onClick={() => void openExtendedDossier(nmBrief)}
              >
                extended 1000+ word Mindora PDF download
              </button>
              .
            </p>
          )}
          {wantFull && !unlocked && !isNm && (
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
