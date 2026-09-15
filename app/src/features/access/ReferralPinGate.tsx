import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { verifyReferralPin } from '@/features/access/referralPin'
import { AdhdTrustSupport } from '@/features/assessments/AdhdTrustSupport'

type Props = {
  courseTitle: string
  onUnlocked: () => void
  /** ADHD referral flow — supportive trust emblem + alliance framing */
  trustSupport?: boolean
}

/**
 * Phone-first referral PIN unlock — calm, large tap targets.
 */
export function ReferralPinGate({ courseTitle, onUnlocked, trustSupport = false }: Props) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function unlockWith(code: string) {
    setSubmitting(true)
    setError(null)
    if (!verifyReferralPin(code)) {
      setError('That PIN is not valid. Check the code from your GP or healthcare provider.')
      setSubmitting(false)
      return
    }
    onUnlocked()
    setSubmitting(false)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    unlockWith(pin)
  }

  const digits = pin.replace(/\D/g, '').slice(0, 9)
  const ready = digits.length === 9

  return (
    <div className="mx-auto w-full max-w-md space-y-3 sm:max-w-lg sm:space-y-4">
      {trustSupport && <AdhdTrustSupport variant="full" />}

      <div className="overflow-hidden rounded-2xl border border-mi-border bg-white shadow-[var(--mi-card-shadow)]">
        <div className="border-b border-mi-border/70 px-4 py-4 text-center sm:px-6 sm:py-5">
          {!trustSupport && (
            <img
              src="/brand/mindorainsight-brain-logo-forest.png"
              alt="MindoraInsight"
              width={64}
              height={64}
              className="mx-auto mb-3 h-14 w-14 object-contain"
              draggable={false}
            />
          )}
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mi-blue sm:text-[11px]">
            {trustSupport ? 'Referral access' : 'Healthcare referral access'}
          </p>
          <h1 className="font-display mt-1.5 text-[1.35rem] font-semibold leading-snug text-mi-forest sm:text-2xl">
            Enter your referral PIN
          </h1>
          <p className="mx-auto mt-2 max-w-[34ch] text-[13px] leading-5 text-mi-muted sm:text-sm sm:leading-6">
            Unlock <span className="font-semibold text-mi-text">{courseTitle}</span> with your GP /
            healthcare PIN.
          </p>
        </div>

        <form className="space-y-4 px-4 py-5 sm:px-6 sm:py-6" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="referral-pin" className="block text-sm font-semibold text-mi-text">
              Referral PIN
            </label>

            <button
              type="button"
              className="mt-2.5 grid w-full grid-cols-9 gap-1 sm:gap-1.5"
              onClick={() => inputRef.current?.focus()}
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
              ref={inputRef}
              id="referral-pin"
              name="pin"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              autoFocus
              maxLength={9}
              value={digits}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, '').slice(0, 9))
                setError(null)
              }}
              className="mt-3 box-border w-full rounded-xl border-2 border-mi-border bg-white px-3 py-3.5 text-center text-lg font-bold tracking-[0.28em] text-mi-forest outline-none focus:border-mi-green focus:ring-2 focus:ring-mi-green/30 sm:text-xl sm:tracking-[0.35em]"
              placeholder="·········"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'referral-pin-error' : undefined}
            />
          </div>

          {error && (
            <p
              id="referral-pin-error"
              className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm leading-5 text-red-700"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-primary w-full !py-3.5 !text-[15px] disabled:cursor-not-allowed disabled:opacity-40"
            disabled={submitting || !ready}
          >
            {submitting ? 'Checking…' : 'Unlock this course'}
          </button>
        </form>
      </div>
    </div>
  )
}
