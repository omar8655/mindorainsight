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
  const [error, setError] = useState<string | null>(null)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const result = validateParticipantDetails({ firstName, lastName, phone })
    if (!result.ok) {
      setError(result.error)
      return
    }
    setError(null)
    onContinue(result.value)
  }

  const field =
    'mt-1.5 w-full rounded-xl border border-mi-border bg-white px-3.5 py-3 text-[15px] text-mi-text outline-none transition placeholder:text-mi-muted/70 focus:border-mi-green focus:ring-2 focus:ring-mi-green/25'

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
              className={field}
              name="firstName"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Alex"
              required
              minLength={2}
              maxLength={40}
            />
          </label>
          <label className="block text-start">
            <span className="text-xs font-semibold text-mi-forest">Last name</span>
            <input
              className={field}
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g. Morgan"
              required
              minLength={2}
              maxLength={40}
            />
          </label>
          <label className="block text-start">
            <span className="text-xs font-semibold text-mi-forest">Phone number</span>
            <input
              className={field}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +1 555 0100"
              required
            />
          </label>

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900" role="alert">
              {error}
            </p>
          ) : null}

          <button type="submit" className="btn-primary mt-1 w-full !py-3.5 !text-[15px]">
            Continue →
          </button>
          <p className="text-center text-[11px] leading-4 text-mi-muted">
            Stored on this device only for your reports. See Terms for how we handle contact details.
          </p>
        </form>
      </div>
    </div>
  )
}
