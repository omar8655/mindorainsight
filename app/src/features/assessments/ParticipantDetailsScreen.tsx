import { useState } from 'react'
import {
  loadParticipantDetails,
  validateParticipantDetails,
  type ParticipantDetails,
} from '@/features/assessments/participantDetails'

type ParticipantDetailsScreenProps = {
  assessmentTitle: string
  onContinue: (details: ParticipantDetails) => void
}

/**
 * Collect first name, last name, and phone before gender / questions.
 * Required so results and PDFs can address the person by name.
 */
export function ParticipantDetailsScreen({
  assessmentTitle,
  onContinue,
}: ParticipantDetailsScreenProps) {
  const saved = loadParticipantDetails()
  const [firstName, setFirstName] = useState(saved?.firstName ?? '')
  const [lastName, setLastName] = useState(saved?.lastName ?? '')
  const [phone, setPhone] = useState(saved?.phone ?? '')
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; phone?: string }>({})

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const next: typeof errors = {}
    if (firstName.trim().length < 2) next.firstName = 'Enter your first name.'
    if (lastName.trim().length < 2) next.lastName = 'Enter your last name.'
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 7 || digits.length > 15) {
      next.phone = 'Enter a valid phone (7–15 digits). Spaces and dashes are fine.'
    }
    if (Object.keys(next).length) {
      setErrors(next)
      return
    }
    const result = validateParticipantDetails({ firstName, lastName, phone })
    if (!result.ok) {
      setErrors({ phone: result.error })
      return
    }
    setErrors({})
    onContinue(result.value)
  }

  const field =
    'mt-1.5 w-full rounded-xl border bg-white px-3.5 py-3 text-[15px] text-mi-text outline-none transition placeholder:text-mi-muted/70 focus:border-mi-green focus:ring-2 focus:ring-mi-green/25'
  const okBorder = 'border-mi-border'
  const badBorder = 'border-red-400'

  return (
    <div className="mx-auto w-full min-w-0 max-w-md">
      <div className="rounded-2xl border border-mi-border bg-white p-5 shadow-sm sm:p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-mi-green">
          Before you begin
        </p>
        <h2 className="font-display mt-1.5 text-xl font-semibold text-mi-forest sm:text-2xl">
          Your details
        </h2>
        <p className="mt-2 text-sm leading-6 text-mi-muted">
          We use your name on your results and Mindora Dossier PDF — so the write-up can speak to
          you directly about {assessmentTitle}.
        </p>

        <form className="mt-5 space-y-4" onSubmit={submit} noValidate>
          <label className="block text-start">
            <span className="text-xs font-semibold text-mi-forest">First name</span>
            <input
              className={`${field} ${errors.firstName ? badBorder : okBorder}`}
              name="firstName"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
                setErrors((prev) => ({ ...prev, firstName: undefined }))
              }}
              placeholder="e.g. Alex"
              required
              minLength={2}
              maxLength={40}
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? 'err-first' : undefined}
            />
            {errors.firstName ? (
              <p id="err-first" className="mt-1 text-xs text-red-700" role="alert">
                {errors.firstName}
              </p>
            ) : null}
          </label>
          <label className="block text-start">
            <span className="text-xs font-semibold text-mi-forest">Last name</span>
            <input
              className={`${field} ${errors.lastName ? badBorder : okBorder}`}
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
                setErrors((prev) => ({ ...prev, lastName: undefined }))
              }}
              placeholder="e.g. Morgan"
              required
              minLength={2}
              maxLength={40}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? 'err-last' : undefined}
            />
            {errors.lastName ? (
              <p id="err-last" className="mt-1 text-xs text-red-700" role="alert">
                {errors.lastName}
              </p>
            ) : null}
          </label>
          <label className="block text-start">
            <span className="text-xs font-semibold text-mi-forest">Phone number</span>
            <input
              className={`${field} ${errors.phone ? badBorder : okBorder}`}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                setErrors((prev) => ({ ...prev, phone: undefined }))
              }}
              placeholder="e.g. +1 555 0100"
              required
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'err-phone phone-hint' : 'phone-hint'}
            />
            <p id="phone-hint" className="mt-1 text-[11px] leading-4 text-mi-muted">
              Stored on this device for your report. Digits only count — spaces and dashes are OK.
            </p>
            {errors.phone ? (
              <p id="err-phone" className="mt-1 text-xs text-red-700" role="alert">
                {errors.phone}
              </p>
            ) : null}
          </label>

          <button type="submit" className="btn-primary mt-1 w-full !py-3.5 !text-[15px]">
            Continue →
          </button>
          <p className="text-center text-[11px] leading-4 text-mi-muted">
            See Terms for how we handle contact details.
          </p>
        </form>
      </div>
    </div>
  )
}
