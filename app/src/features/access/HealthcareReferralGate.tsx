import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { NhsMark } from '@/components/brand/NhsMark'
import {
  isValidHealthcareEmail,
  unlockReferral,
  verifyReferralPin,
} from '@/features/access/referralPin'
import { getAccessCopy } from '@/i18n/accessCopy'
import { useI18n } from '@/i18n/I18nProvider'

type Props = {
  courseTitle: string
  slug: string
  onUnlocked: () => void
}

/**
 * Limited-edition catalog unlock — healthcare email + referral PIN.
 * ADHD and UI preview stay free and skip this gate.
 */
export function HealthcareReferralGate({ courseTitle, slug, onUnlocked }: Props) {
  const { code } = useI18n()
  const access = getAccessCopy(code)
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const pinRef = useRef<HTMLInputElement>(null)

  const digits = pin.replace(/\D/g, '').slice(0, 9)
  const emailOk = isValidHealthcareEmail(email)
  const pinOk = digits.length === 9
  const ready = emailOk && pinOk

  function tryUnlock(nextPin: string, nextEmail: string) {
    setSubmitting(true)
    setError(null)

    if (!isValidHealthcareEmail(nextEmail)) {
      setError(access.invalidEmail)
      setSubmitting(false)
      return
    }
    if (!verifyReferralPin(nextPin)) {
      setError(access.invalidPin)
      setSubmitting(false)
      return
    }

    unlockReferral(slug, nextEmail)
    onUnlocked()
    setSubmitting(false)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    tryUnlock(digits, email)
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-4 sm:max-w-lg">
      <div className="overflow-hidden rounded-2xl border border-mi-border bg-white shadow-[var(--mi-card-shadow)]">
        <div className="border-b border-mi-border/70 px-4 py-5 text-center sm:px-6">
          <div className="mb-3 flex justify-center">
            <NhsMark size="lg" />
          </div>
          <h1 className="font-display mt-1.5 text-[1.35rem] font-semibold leading-snug text-mi-forest sm:text-2xl">
            {access.gateTitle}
          </h1>
          <p className="mx-auto mt-2 max-w-[36ch] text-[13px] leading-5 text-mi-muted sm:text-sm">
            {access.gateBody.replace('{course}', courseTitle)}
          </p>
        </div>

        <form className="space-y-4 px-4 py-5 sm:px-6" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="referral-email" className="block text-sm font-semibold text-mi-text">
              {access.emailLabel}
            </label>
            <input
              id="referral-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError(null)
              }}
              placeholder="doctor@clinic.example"
              className="mt-2 w-full rounded-xl border-2 border-mi-border bg-white px-3 py-3.5 text-[15px] text-mi-text outline-none focus:border-mi-green focus:ring-2 focus:ring-mi-green/25"
              aria-invalid={error?.includes('email') || error?.includes('E-mail') || error?.includes('بريد') ? true : undefined}
            />
          </div>

          <div>
            <label htmlFor="referral-pin" className="block text-sm font-semibold text-mi-text">
              {access.pinLabel}
            </label>
            <button
              type="button"
              className="mt-2.5 grid w-full grid-cols-9 gap-1 sm:gap-1.5"
              onClick={() => pinRef.current?.focus()}
              aria-hidden
              tabIndex={-1}
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex h-10 items-center justify-center rounded-lg border text-base font-bold tabular-nums sm:h-11 sm:text-lg ${
                    digits[i]
                      ? 'border-mi-green bg-mi-green-soft/60 text-mi-forest'
                      : 'border-mi-border bg-[#FBFCFB] text-mi-muted/35'
                  }`}
                >
                  {digits[i] ?? '·'}
                </div>
              ))}
            </button>
            <input
              ref={pinRef}
              id="referral-pin"
              name="pin"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              maxLength={9}
              value={digits}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, '').slice(0, 9))
                setError(null)
              }}
              className="mt-3 box-border w-full rounded-xl border-2 border-mi-border bg-white px-3 py-3.5 text-center text-lg font-bold tracking-[0.28em] text-mi-forest outline-none focus:border-mi-green focus:ring-2 focus:ring-mi-green/30 sm:text-xl sm:tracking-[0.35em]"
              placeholder="·········"
              aria-invalid={error ? true : undefined}
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || !ready}
            className="btn-primary w-full !py-3.5 !text-[15px] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? access.checking : access.unlockCta}
          </button>
        </form>
      </div>

      <p className="text-center text-[11px] leading-4 text-mi-muted">{access.gateFootnote}</p>
    </div>
  )
}
