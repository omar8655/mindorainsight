import { useState } from 'react'
import type { ReportGender } from '@/features/reports/emblemAssets'

type GenderSelectProps = {
  onSelect: (gender: ReportGender) => void
  /** Hide duplicate “Before you begin” chrome when the parent page already has a header */
  compact?: boolean
}

const CHOICES: {
  id: ReportGender
  label: string
  hint: string
  symbol: string
  symbolLabel: string
  /** Soft wash / solid accent / deep text — distinct at a glance */
  soft: string
  accent: string
  deep: string
  ring: string
  selectedBorder: string
  selectedBg: string
  idleBorder: string
  focusRing: string
}[] = [
  {
    id: 'female',
    label: 'Female',
    hint: 'She / her voice + emblem',
    symbol: '♀',
    symbolLabel: 'Female symbol',
    soft: 'bg-[#FCE8EC]',
    accent: 'bg-[#E85D75]',
    deep: 'text-[#9B2C45]',
    ring: 'ring-[#E85D75]/35',
    selectedBorder: 'border-[#E85D75]',
    selectedBg: 'bg-[#FCE8EC]',
    idleBorder: 'border-[#E85D75]/45',
    focusRing: 'focus-visible:ring-[#E85D75]/50',
  },
  {
    id: 'male',
    label: 'Male',
    hint: 'He / him voice + emblem',
    symbol: '♂',
    symbolLabel: 'Male symbol',
    soft: 'bg-[#E8F0FB]',
    accent: 'bg-[#4880D9]',
    deep: 'text-[#1E4A8C]',
    ring: 'ring-[#4880D9]/35',
    selectedBorder: 'border-[#4880D9]',
    selectedBg: 'bg-[#E8F0FB]',
    idleBorder: 'border-[#4880D9]/45',
    focusRing: 'focus-visible:ring-[#4880D9]/50',
  },
]

/**
 * Gender step — text + symbol only.
 * Female = rose, Male = blue so the two options are instantly distinct.
 */
export function GenderSelect({ onSelect, compact = false }: GenderSelectProps) {
  const [choice, setChoice] = useState<ReportGender | null>(null)

  function pick(id: ReportGender) {
    setChoice(id)
    window.setTimeout(() => onSelect(id), 220)
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-md">
      <div className="overflow-hidden rounded-2xl border border-mi-border bg-white shadow-[var(--mi-card-shadow)]">
        {!compact ? (
          <div className="border-b border-mi-border/70 px-3 pb-4 pt-4 text-center min-[360px]:px-4 sm:px-6 sm:pb-5 sm:pt-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mi-blue sm:text-[11px] sm:tracking-[0.18em]">
              Before you begin
            </p>
            <h2 className="font-display mt-1.5 text-[1.2rem] font-semibold leading-snug text-mi-forest min-[360px]:text-[1.35rem] sm:text-2xl">
              Are you female or male?
            </h2>
            <p className="mx-auto mt-2 max-w-[34ch] text-[13px] leading-5 text-mi-muted sm:text-sm sm:leading-6">
              Choose female or male. We use this only for your report emblem and listening voice —
              never for scoring or diagnosis.
            </p>
          </div>
        ) : null}

        <div className="grid min-w-0 grid-cols-2 gap-2.5 p-3 min-[360px]:gap-3 min-[360px]:p-4 sm:gap-3.5 sm:p-5">
          {CHOICES.map((opt) => {
            const selected = choice === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => pick(opt.id)}
                aria-pressed={selected}
                aria-label={`${opt.label} — ${opt.hint}`}
                className={`relative flex w-full min-w-0 min-h-[11rem] touch-manipulation select-none flex-col items-center justify-center gap-2 rounded-2xl border-2 px-2 py-4 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] min-[360px]:gap-2.5 min-[360px]:px-3 min-[360px]:py-5 sm:min-h-[12rem] sm:py-6 ${opt.focusRing} ${
                  selected
                    ? `${opt.selectedBorder} ${opt.selectedBg} shadow-md ring-2 ${opt.ring}`
                    : `${opt.idleBorder} ${opt.soft} hover:brightness-[0.98] hover:shadow-sm`
                }`}
              >
                <span
                  className={`absolute end-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white transition sm:end-2.5 sm:top-2.5 ${
                    selected ? opt.accent : 'border-2 border-white/80 bg-white/50 text-transparent'
                  }`}
                  aria-hidden
                >
                  ✓
                </span>

                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[1.65rem] font-semibold leading-none text-white shadow-sm min-[360px]:h-14 min-[360px]:w-14 min-[360px]:text-3xl sm:h-16 sm:w-16 sm:text-4xl ${opt.accent}`}
                  aria-hidden
                  title={opt.symbolLabel}
                >
                  {opt.symbol}
                </span>

                <span className={`font-display w-full break-words text-[15px] font-bold leading-tight sm:text-lg ${opt.deep}`}>
                  {opt.label}
                </span>
                <span
                  className={`w-full break-words px-0.5 text-[10px] font-medium leading-4 min-[360px]:text-[11px] sm:text-xs ${opt.deep} opacity-80`}
                >
                  {opt.hint}
                </span>
                {selected && (
                  <span
                    className={`mt-0.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white min-[360px]:tracking-[0.12em] ${opt.accent}`}
                  >
                    Selected
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 border-t border-mi-border/70 px-3 py-3 sm:gap-x-4 sm:px-5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#9B2C45]">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#E85D75]" aria-hidden />
            Female
          </span>
          <span className="hidden text-mi-border min-[360px]:inline" aria-hidden>
            ·
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1E4A8C]">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#4880D9]" aria-hidden />
            Male
          </span>
        </div>
        <p className="px-3 pb-[max(0.875rem,env(safe-area-inset-bottom))] text-center text-[11px] leading-4 text-mi-muted sm:px-5 sm:pb-3.5">
          Tap female or male to continue — we’ll prepare your test next.
        </p>
      </div>
    </div>
  )
}
