import { useEffect, useMemo, useRef } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { buildReportDocument } from '@/application/reports/buildReportDocument'
import { getReportSession, getReportSessionById } from '@/application/reports/sessionStore'
import { Seo } from '@/components/layout/Seo'
import { BasicResultView } from '@/features/reports/BasicResultView'
import { ComprehensiveReportView } from '@/features/reports/ComprehensiveReportView'
import { parseNmResult, parseParticipantFromMeta } from '@/features/reports/newmindora/nmSessionMeta'
import { openDesignedDossier } from '@/features/reports/newmindora/openDesignedDossier'
import { openExtendedDossier } from '@/features/reports/newmindora/openExtendedDossier'
import { isNewMindoraId } from '@/data/newmindora'
import {
  participantDisplayName,
  participantFirstName,
} from '@/features/assessments/participantDetails'

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
  const participant = useMemo(
    () => (session ? parseParticipantFromMeta(session.meta) : null),
    [session],
  )
  const displayName = participantDisplayName(participant)
  const firstName = participantFirstName(participant)

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
            name: nmBrief.topName || nmBrief.shape?.title || session.primaryName,
            score: nmBrief.overall ?? doc.primary.score,
          },
          blurb: nmBrief.shape?.blurb || nmBrief.brief?.headline || doc.blurb,
          summary: nmBrief.brief?.headline || doc.summary,
          traits: nmBrief.traits?.length ? nmBrief.traits : doc.traits,
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
  const pdfSectionRef = useRef<HTMLDivElement>(null)

  // NewMindora has no HTML "full report" page — scroll to the PDF download buttons.
  useEffect(() => {
    if (!wantFull || !isNm) return
    const t = window.setTimeout(() => {
      pdfSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 120)
    return () => window.clearTimeout(t)
  }, [wantFull, isNm])

  return (
    <>
      <Seo title={`${doc.primary.name} · ${doc.assessmentTitle}`} description={doc.blurb} noindex />
      <section className="bg-[#F7FBF9] px-0 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:py-8 md:py-10">
        <div className="container !px-3 sm:!px-5">
          <div className="mx-auto mb-3 flex max-w-xl items-center justify-between gap-2">
            <Link
              to="/library"
              className="inline-flex min-h-11 items-center text-xs font-semibold text-mi-muted hover:text-mi-forest"
            >
              ← Free tests
            </Link>
          </div>
          {wantFull && isNm ? (
            <div
              ref={pdfSectionRef}
              className="mx-auto mb-3 max-w-xl rounded-xl border border-mi-green/30 bg-mi-green-soft/60 px-4 py-3 text-center text-sm text-mi-forest"
            >
              Your full report is the <strong>Download full report PDF</strong> button below — tap
              it to save or share. This page stays open so you never get a blank screen.
            </div>
          ) : null}
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
              participantName={participant ? displayName : undefined}
              participantFirstName={participant ? firstName : undefined}
              onOpenBasicPdf={nmBrief ? () => openDesignedDossier(nmBrief, displayName) : undefined}
              onOpenExtendedPdf={nmBrief ? () => openExtendedDossier(nmBrief, displayName) : undefined}
            />
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
