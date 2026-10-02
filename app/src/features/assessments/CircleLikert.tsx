type CircleLikertProps = {
  value: number | undefined
  onChange: (value: number) => void
  name: string
  /** Visible question text for screen readers (preferred over raw name). */
  groupLabel?: string
  labelledBy?: string
}

const OPTIONS = [
  { value: 1, label: 'Strongly Disagree', short: 'SD', color: '#C45C6A', bg: '#F8E4E7', size: 'lg' },
  { value: 2, label: 'Disagree', short: 'D', color: '#E2A8B0', bg: '#FBF0F2', size: 'md' },
  { value: 3, label: 'Neutral', short: 'N', color: '#C9D0D4', bg: '#FFFFFF', size: 'sm' },
  { value: 4, label: 'Agree', short: 'A', color: '#8FCBAA', bg: '#EAF7F0', size: 'md' },
  { value: 5, label: 'Strongly Agree', short: 'SA', color: '#31B070', bg: '#D8F0E4', size: 'lg' },
] as const

/** Visual circle sizes — mobile circles are ≥44px (h-11) for tap targets. */
const SIZE_CLASS = {
  lg: 'h-11 w-11 sm:h-14 sm:w-14 md:h-16 md:w-16',
  md: 'h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14',
  sm: 'h-11 w-11 sm:h-10 sm:w-10 md:h-12 md:w-12',
} as const

/**
 * Wide, easy-to-hit Likert — full width on desktop, safe on phone.
 */
export function CircleLikert({ value, onChange, name, groupLabel, labelledBy }: CircleLikertProps) {
  const a11yLabel = groupLabel || name
  return (
    <fieldset className="relative mt-4 w-full min-w-0 border-0 p-0 sm:mt-6">
      <legend className="sr-only">{a11yLabel}</legend>

      <div className="mb-3 flex items-center justify-between gap-2 px-0.5 text-[10px] font-semibold leading-tight sm:mb-4 sm:gap-3 sm:px-1 sm:text-sm">
        <span className="max-w-[48%] text-start text-[#A84856]">Strongly Disagree</span>
        <span className="max-w-[48%] text-end text-[#1F7A4D]">Strongly Agree</span>
      </div>

      <div
        className="grid w-full min-w-0 grid-cols-5 gap-1.5 sm:gap-4 md:gap-6"
        role="radiogroup"
        aria-label={labelledBy ? undefined : a11yLabel}
        aria-labelledby={labelledBy}
      >
        {OPTIONS.map((opt) => {
          const selected = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={opt.label}
              onClick={() => onChange(opt.value)}
              className={[
                'flex w-full min-w-0 flex-col items-center justify-center gap-1.5 rounded-2xl px-0.5 py-3 transition sm:gap-2 sm:px-1 sm:py-5 md:py-6',
                'min-h-[5.5rem] min-w-[44px] touch-manipulation select-none sm:min-h-[6.5rem] md:min-h-[7.25rem]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mi-green focus-visible:ring-offset-2',
                selected
                  ? 'bg-mi-green-soft/70 ring-2 ring-mi-green ring-offset-1'
                  : 'hover:bg-slate-50 active:bg-slate-100',
              ].join(' ')}
            >
              <span
                aria-hidden
                style={{
                  borderColor: opt.color,
                  backgroundColor: opt.bg,
                  boxShadow: selected ? `0 0 0 3px ${opt.color}` : undefined,
                }}
                className={[
                  'shrink-0 rounded-full border-[3px] shadow-sm transition',
                  SIZE_CLASS[opt.size],
                  selected ? 'scale-110' : 'scale-100',
                ].join(' ')}
              />
              <span
                className={[
                  'text-xs font-bold leading-none sm:text-sm md:text-base',
                  selected ? 'text-mi-forest' : 'text-mi-muted',
                ].join(' ')}
              >
                {opt.short}
              </span>
              <span className="hidden text-[10px] font-semibold text-mi-muted md:block">
                {opt.label}
              </span>
            </button>
          )
        })}
      </div>

      {typeof value === 'number' ? (
        <p className="mt-4 text-center text-sm font-semibold text-mi-forest sm:text-base">
          Selected: {OPTIONS[value - 1]?.label}
          <span className="text-mi-muted"> · {(value - 1) * 25}%</span>
        </p>
      ) : (
        <p className="mt-4 text-center text-xs text-mi-muted sm:text-sm">
          Click or tap a circle — big targets on purpose
        </p>
      )}
    </fieldset>
  )
}
