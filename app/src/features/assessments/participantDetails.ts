/** Participant intake before any assessment — reused across sittings on this device. */

export type ParticipantDetails = {
  firstName: string
  lastName: string
  phone: string
}

const STORAGE_KEY = 'mi.participant.v1'

export function participantDisplayName(p: ParticipantDetails | null | undefined): string {
  if (!p) return 'You'
  const full = `${p.firstName} ${p.lastName}`.trim()
  return full || p.firstName || 'You'
}

export function participantFirstName(p: ParticipantDetails | null | undefined): string {
  if (!p?.firstName?.trim()) return 'You'
  return p.firstName.trim()
}

export function loadParticipantDetails(): ParticipantDetails | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ParticipantDetails
    if (!parsed?.firstName?.trim() || !parsed?.lastName?.trim() || !parsed?.phone?.trim()) return null
    return {
      firstName: parsed.firstName.trim(),
      lastName: parsed.lastName.trim(),
      phone: parsed.phone.trim(),
    }
  } catch {
    return null
  }
}

export function saveParticipantDetails(details: ParticipantDetails): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      firstName: details.firstName.trim(),
      lastName: details.lastName.trim(),
      phone: details.phone.trim(),
    }),
  )
}

/** Basic validation — name letters/spaces, phone digits with optional +. */
export function validateParticipantDetails(input: {
  firstName: string
  lastName: string
  phone: string
}): { ok: true; value: ParticipantDetails } | { ok: false; error: string } {
  const firstName = input.firstName.trim()
  const lastName = input.lastName.trim()
  const phone = input.phone.trim()
  if (firstName.length < 2) return { ok: false, error: 'Please enter your first name.' }
  if (lastName.length < 2) return { ok: false, error: 'Please enter your last name.' }
  if (firstName.length > 40 || lastName.length > 40) {
    return { ok: false, error: 'Please use a shorter name.' }
  }
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15) {
    return { ok: false, error: 'Please enter a valid phone number.' }
  }
  return { ok: true, value: { firstName, lastName, phone } }
}
