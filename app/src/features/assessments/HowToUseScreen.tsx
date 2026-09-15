import { AssessmentPortalShell } from '@/features/assessments/AssessmentPortalShell'

const DEMO_OPTIONS = [
  { short: 'SD', label: 'Strongly Disagree', color: '#C45C6A', bg: '#F8E4E7', size: 'lg' },
  { short: 'D', label: 'Disagree', color: '#E2A8B0', bg: '#FBF0F2', size: 'md' },
  { short: 'N', label: 'Neutral', color: '#C9D0D4', bg: '#FFFFFF', size: 'sm' },
  { short: 'A', label: 'Agree', color: '#8FCBAA', bg: '#EAF7F0', size: 'md' },
  { short: 'SA', label: 'Strongly Agree', color: '#31B070', bg: '#D8F0E4', size: 'lg' },
] as const

const SIZE = {
  lg: 'h-11 w-11 sm:h-14 sm:w-14',
  md: 'h-9 w-9 sm:h-12 sm:w-12',
  sm: 'h-8 w-8 sm:h-10 sm:w-10',
} as const

type HowToUseScreenProps = {
  title: string
  onStart: () => void
}

/**
 * Second portal page — how to answer (circles), then start.
 */
export function HowToUseScreen({ title, onStart }: HowToUseScreenProps) {
  return (
    <AssessmentPortalShell eyebrow="How to answer">
      <div className="w-full overflow-hidden rounded-2xl border border-mi-border bg-white shadow-[var(--mi-card-shadow)]">
        <div className="border-b border-mi-border/70 px-4 py-5 text-center sm:px-8">
          <h1 className="font-display mx-auto max-w-[22ch] text-xl font-semibold text-mi-forest sm:text-2xl">
            {title}
          </h1>
          <p className="mx-auto mt-2 max-w-[36ch] text-sm leading-5 text-mi-muted">
            Tap one circle per question. 5 questions per screen. Phone scrolls to the next for you.
          </p>
        </div>

        <div className="px-3 py-5 sm:px-8 sm:py-7">
          <div className="mb-3 flex items-center justify-between gap-2 px-1 text-[10px] font-semibold sm:text-sm">
            <span className="text-[#A84856]">Strongly Disagree</span>
            <span className="text-[#1F7A4D]">Strongly Agree</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 sm:gap-4" aria-hidden>
            {DEMO_OPTIONS.map((opt) => (
              <div key={opt.short} className="flex flex-col items-center gap-1.5 py-2">
                <span
                  style={{ borderColor: opt.color, backgroundColor: opt.bg }}
                  className={`rounded-full border-[3px] shadow-sm ${SIZE[opt.size]}`}
                />
                <span className="text-xs font-bold text-mi-forest sm:text-sm">{opt.short}</span>
                <span className="hidden text-center text-[10px] font-semibold leading-tight text-mi-muted sm:block">
                  {opt.label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-mi-muted sm:text-sm">
            Red = disagree · Grey = neutral · Green = agree
          </p>
        </div>

        <div className="border-t border-mi-border/70 px-4 py-4 sm:px-8">
          <button type="button" onClick={onStart} className="btn-primary w-full !py-3.5 !text-[15px]">
            Start answering →
          </button>
        </div>
      </div>
    </AssessmentPortalShell>
  )
}
