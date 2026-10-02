import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AssessmentPortalShell } from '@/features/assessments/AssessmentPortalShell'
import { ASSESSMENT_LEGAL } from '@/data/legal/assessmentProtection'
import { COMPANY } from '@/data/legal/company'

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
  clinical?: boolean
  crisis?: boolean
  onStart: () => void
}

/**
 * How to answer + mandatory legal acknowledgement before the assessment starts.
 */
export function HowToUseScreen({ title, clinical, crisis, onStart }: HowToUseScreenProps) {
  const [acked, setAcked] = useState(false)

  return (
    <AssessmentPortalShell eyebrow="How this works">
      <div className="w-full overflow-hidden rounded-2xl border border-mi-border bg-white shadow-[var(--mi-card-shadow)]">
        <div className="border-b border-mi-border/70 px-4 py-5 text-center sm:px-8">
          <h1 className="font-display mx-auto max-w-[22ch] text-xl font-semibold text-mi-forest sm:text-2xl">
            {title}
          </h1>
          <p className="mx-auto mt-2 max-w-[40ch] text-sm leading-5 text-mi-muted">
            Choose one option per question. Five per screen — on mobile we scroll you to the next.
            When you finish, you get clear scores and a Mindora Dossier PDF.
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

        <div
          className={`border-t px-4 py-4 sm:px-8 ${
            crisis ? 'border-red-200 bg-red-50/80' : 'border-mi-border/70 bg-mi-green-soft/30'
          }`}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-mi-forest">
            {ASSESSMENT_LEGAL.gateTitle}
          </p>
          <p className="mt-2 text-[13px] leading-5 text-mi-forest">{ASSESSMENT_LEGAL.gateBody}</p>
          {clinical ? (
            <p className="mt-2 text-[12px] leading-5 text-amber-950">{ASSESSMENT_LEGAL.clinicalBanner}</p>
          ) : null}
          {crisis ? (
            <p className="mt-2 text-[12px] font-semibold leading-5 text-red-950">
              {ASSESSMENT_LEGAL.crisisBanner}
            </p>
          ) : null}
          <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-mi-border bg-white px-3 py-3 text-start">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center">
              <input
                type="checkbox"
                className="h-6 w-6 accent-mi-forest"
                checked={acked}
                onChange={(e) => setAcked(e.target.checked)}
              />
            </span>
            <span className="text-[13px] leading-5 text-mi-text">
              {ASSESSMENT_LEGAL.gateAck}{' '}
              <Link to={COMPANY.termsUrl} className="font-semibold text-mi-green underline">
                Read Terms
              </Link>
              .
            </span>
          </label>
          <button
            type="button"
            onClick={onStart}
            disabled={!acked}
            className="btn-primary mt-3 w-full !py-3.5 !text-[15px] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Start assessment →
          </button>
        </div>
      </div>
    </AssessmentPortalShell>
  )
}
