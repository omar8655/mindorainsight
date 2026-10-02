import { Link } from 'react-router-dom'
import { assessmentLegalBannerText } from '@/data/legal/assessmentProtection'
import { COMPANY } from '@/data/legal/company'

type AssessmentLegalBannerProps = {
  clinical?: boolean
  crisis?: boolean
  compact?: boolean
  className?: string
}

/** Always-visible legal protection strip on tests and results. */
export function AssessmentLegalBanner({
  clinical,
  crisis,
  compact,
  className = '',
}: AssessmentLegalBannerProps) {
  const text = assessmentLegalBannerText({ clinical, crisis })
  return (
    <aside
      role="note"
      className={`rounded-xl border px-3 py-2.5 text-start ${
        crisis
          ? 'border-red-300 bg-red-50 text-red-950'
          : clinical
            ? 'border-amber-200 bg-amber-50 text-amber-950'
            : 'border-mi-border bg-white text-mi-forest'
      } ${className}`}
    >
      <p className={`font-semibold uppercase tracking-[0.12em] ${compact ? 'text-[9px]' : 'text-[10px]'}`}>
        {crisis ? 'Crisis & safety' : clinical ? 'Important · not a diagnosis' : 'Important'}
      </p>
      <p className={`mt-1 leading-5 ${compact ? 'text-[11px]' : 'text-xs sm:text-[13px]'}`}>{text}</p>
      {!compact ? (
        <p className="mt-1.5 text-[11px] text-mi-muted">
          {COMPANY.brand} is educational software — not your doctor.{' '}
          <Link to={COMPANY.termsUrl} className="font-semibold text-mi-green underline">
            Terms
          </Link>
          {' · '}
          <Link to={COMPANY.privacyUrl} className="font-semibold text-mi-green underline">
            Privacy
          </Link>
        </p>
      ) : null}
    </aside>
  )
}
