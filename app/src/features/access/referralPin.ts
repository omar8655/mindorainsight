export const REFERRAL_PIN = '987987987'

/** @deprecated use REFERRAL_PIN */
export const REFERRAL_DEMO_PIN = REFERRAL_PIN

const UNLOCK_KEY = 'mi.referral.unlock.v2'

export type ReferralUnlockRecord = {
  email: string
  unlockedAt: string
}

function readMap(): Record<string, ReferralUnlockRecord> {
  try {
    const raw = sessionStorage.getItem(UNLOCK_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, ReferralUnlockRecord>
  } catch {
    return {}
  }
}

function writeMap(map: Record<string, ReferralUnlockRecord>) {
  try {
    sessionStorage.setItem(UNLOCK_KEY, JSON.stringify(map))
  } catch {
    // no-op
  }
}

/** Referral PIN check (healthcare unlock). */
export function verifyReferralPin(pin: string): boolean {
  return pin.replace(/\D/g, '') === REFERRAL_PIN
}

export function isValidHealthcareEmail(email: string): boolean {
  const v = email.trim().toLowerCase()
  // Practical email shape — not a full RFC parser
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 120
}

export function isReferralUnlocked(slug: string): boolean {
  return Boolean(readMap()[slug])
}

export function unlockReferral(slug: string, email: string) {
  const map = readMap()
  map[slug] = { email: email.trim().toLowerCase(), unlockedAt: new Date().toISOString() }
  writeMap(map)
}

export function getReferralUnlock(slug: string): ReferralUnlockRecord | null {
  return readMap()[slug] ?? null
}

/** Drop legacy keys from older demos. */
try {
  localStorage.removeItem('mi_referral_pin_unlocked')
  localStorage.removeItem('mi_referral_pin_unlocked_slugs')
} catch {
  // no-op
}
