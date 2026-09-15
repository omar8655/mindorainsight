import { useState } from 'react'
import type { ReportGender } from '@/features/reports/emblemAssets'

type GenderSelectProps = {
  onSelect: (gender: ReportGender) => void
}

const CHOICES: {
  id: ReportGender
  label: string
  hint: string
  symbol: string
  symbolLabel: string
}[] = [
  {
    id: 'female',
    label: 'Female',
    hint: 'She / her voice + emblem',
    symbol: '♀',
    symbolLabel: 'Female symbol',
  },
  {
    id: 'male',
    label: 'Male',
    hint: 'He / him voice + emblem',
    symbol: '♂',
    symbolLabel: 'Male symbol',
  },
]

/**
 * Neutral gender step — text + symbol only (no portraits).
 * Tapping female/male continues immediately (no second Continue press).
 */
export function GenderSelect({ onSelect }: GenderSelectProps) {
  const [choice, setChoice] = useState<ReportGender | null>(null)

  function pick(id: ReportGender) {
    setChoice(id)
    // Brief selected flash, then continue into preparing screen
    window.setTimeout(() => onSelect(id), 220)
  }

  return (
    <div className="mx-auto w-full max-w-md px-0">
      <div className="overflow-hidden rounded-2xl border border-mi-border bg-white shadow-[var(--mi-card-shadow)]">
        <div className="border-b border-mi-border/70 px-4 pb-4 pt-5 text-center sm:px-6 sm:pb-5 sm:pt-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-mi-blue sm:text-[11px]">
            Before you begin
          </p>
          <h1 className="font-display mt-1.5 text-[1.35rem] font-semibold leading-snug text-mi-forest sm:text-2xl">
            Are you female or male?
          </h1>
          <p className="mx-auto mt-2 max-w-[34ch] text-[13px] leading-5 text-mi-muted sm:text-sm sm:leading-6">
            Choose female or male. We use this only for your report emblem and listening voice —
            never for scoring or diagnosis.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 sm:gap-3.5 sm:p-5">
          {CHOICES.map((opt) => {
            const selected = choice === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => pick(opt.id)}
                aria-pressed={selected}
                className={`relative flex flex-col items-center gap-2 rounded-2xl border-2 px-3 py-5 text-center transition active:scale-[0.99] sm:py-6 ${
                  selected
                    ? 'border-mi-green bg-mi-green-soft/70 shadow-sm ring-2 ring-mi-green/25'
                    : 'border-mi-border bg-white hover:border-mi-green/45'
                }`}
              >
                <span
                  className={`absolute end-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                    selected
                      ? 'bg-mi-green text-white'
                      : 'border border-mi-border bg-white text-transparent'
                  }`}
                  aria-hidden
                >
                  ✓
                </span>

                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full text-3xl sm:h-16 sm:w-16 sm:text-4xl ${
                    selected
                      ? 'bg-mi-green text-white'
                      : 'bg-mi-canvas text-mi-forest ring-1 ring-mi-border'
                  }`}
                  aria-hidden
                  title={opt.symbolLabel}
                >
                  {opt.symbol}
                </span>

                <span className="font-display text-base font-semibold text-mi-forest sm:text-lg">
                  {opt.label}
                </span>
                <span className="text-xs leading-4 text-mi-muted">{opt.hint}</span>
                {selected && (
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-mi-green">
                    Selected
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <p className="border-t border-mi-border/70 px-4 py-3 text-center text-[11px] text-mi-muted sm:px-5">
          Tap female or male to continue — we’ll prepare your test next.
        </p>
      </div>
    </div>
  )
}
