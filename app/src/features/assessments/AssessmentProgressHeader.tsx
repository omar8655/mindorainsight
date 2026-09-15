import { Link } from 'react-router-dom'
import { BrandLogo } from '@/components/brand/BrandLogo'

type AssessmentProgressHeaderProps = {
  title: string
  page: number
  totalPages: number
  progressPercent: number
  rangeLabel: string
  hint?: string
}

/**
 * Sticky portal header: logo left, page badge right, test title, progress bar.
 */
export function AssessmentProgressHeader({
  title,
  page,
  totalPages,
  progressPercent,
  rangeLabel,
  hint,
}: AssessmentProgressHeaderProps) {
  return (
    <div className="sticky top-0 z-30 -mx-0 mb-3 border-b border-mi-border/80 bg-mi-canvas/95 px-0 pb-3 pt-[max(0.5rem,env(safe-area-inset-top))] backdrop-blur-md sm:static sm:mb-5 sm:rounded-2xl sm:border sm:border-mi-border sm:bg-white/95 sm:px-5 sm:pb-4 sm:pt-4 sm:shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <Link
          to="/library"
          className="text-xs font-semibold text-mi-muted transition hover:text-mi-forest"
        >
          ← Library
        </Link>
        <span className="shrink-0 rounded-full bg-mi-green-soft px-2.5 py-1 text-[11px] font-bold tabular-nums text-mi-forest sm:text-xs">
          Page {page} / {totalPages}
        </span>
      </div>
      <div className="flex items-center justify-center gap-3">
        <BrandLogo size={28} withWordmark className="min-w-0 justify-center [&_span]:truncate" />
      </div>

      <h1 className="font-display mt-2.5 truncate text-center text-base font-semibold text-mi-forest sm:mt-3 sm:text-lg">
        {title}
      </h1>

      <div className="mt-2.5 flex items-center justify-between gap-2 text-[11px] font-semibold text-mi-muted sm:text-xs">
        <span className="min-w-0 truncate">{rangeLabel}</span>
        <span className="shrink-0 tabular-nums text-mi-forest">{progressPercent}%</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-mi-green transition-all duration-300"
          style={{ width: `${Math.max(progressPercent, 2)}%` }}
        />
      </div>
      {hint && (
        <p className="mt-1.5 text-center text-[10px] leading-4 text-mi-muted sm:text-[11px]">{hint}</p>
      )}
    </div>
  )
}
