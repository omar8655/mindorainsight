import { SALE_SCARCITY_CAP } from '@/features/sale/saleTactic'

const STORAGE_KEY = 'mi.sale.scarcity.v1'
const VISITOR_KEY = 'mi.sale.visitor.v1'

type ScarcityState = {
  day: string
  claimed: number
  lastTick: number
  nextIntervalMs: number
}

function dayKey(d = new Date()) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function hashSeed(input: string) {
  let h = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

function visitorId() {
  try {
    const existing = sessionStorage.getItem(VISITOR_KEY)
    if (existing) return existing
    const id = `v_${Math.random().toString(36).slice(2, 10)}`
    sessionStorage.setItem(VISITOR_KEY, id)
    return id
  } catch {
    return 'v_anon'
  }
}

/** Day-part base so mornings look quieter than evenings — avoids a static fake number. */
function dayPartBase(now = new Date()) {
  const minutes = now.getHours() * 60 + now.getMinutes()
  // ~280 early morning → ~780 late evening
  const ramp = 280 + (minutes / (24 * 60)) * 500
  const wobble = Math.sin(minutes / 37) * 18
  return Math.round(ramp + wobble)
}

function clampClaimed(n: number) {
  // Leave headroom so the bar rarely looks “dead full” during soft launch.
  return Math.min(SALE_SCARCITY_CAP - 12, Math.max(118, n))
}

function readState(): ScarcityState {
  const today = dayKey()
  const salt = hashSeed(visitorId()) % 51 // −25…+25 visitor variance
  const base = clampClaimed(dayPartBase() + salt - 25)

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as ScarcityState
      if (parsed.day === today && typeof parsed.claimed === 'number') {
        return {
          day: today,
          claimed: clampClaimed(parsed.claimed),
          lastTick: parsed.lastTick || Date.now(),
          nextIntervalMs: parsed.nextIntervalMs || 22000 + (salt % 18000),
        }
      }
    }
  } catch {
    // fall through
  }

  return {
    day: today,
    claimed: base,
    lastTick: Date.now(),
    nextIntervalMs: 20000 + (salt % 22000),
  }
}

function writeState(state: ScarcityState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // no-op
  }
}

/**
 * Believable rotating claim count (1–1000).
 * - Different visitors see slightly different numbers
 * - Slowly ticks upward on a jittered interval
 * - Stable across short refreshes (localStorage)
 */
export function readScarcityClaimed(now = Date.now()): number {
  const state = readState()
  if (now - state.lastTick >= state.nextIntervalMs) {
    const bump = now - state.lastTick > state.nextIntervalMs * 3 ? 2 : 1
    state.claimed = clampClaimed(state.claimed + bump)
    state.lastTick = now
    state.nextIntervalMs = 16000 + Math.floor(Math.random() * 28000)
    writeState(state)
  }
  return state.claimed
}

export function scarcityRemaining(claimed = readScarcityClaimed()) {
  return Math.max(0, SALE_SCARCITY_CAP - claimed)
}

export function scarcityIsOpen(claimed = readScarcityClaimed()) {
  return claimed < SALE_SCARCITY_CAP
}
