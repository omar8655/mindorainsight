/**
 * MindoraInsight sale tactics.
 *
 * LIVE NOW: option 1 only — `open_sale` (~~$49.00~~ Free · $0, open access).
 * Options 2 (`access_code`) and 3 (`scarcity_1000`) stay locked until you
 * explicitly unlock rotation below and ask to switch.
 */
export type SaleTacticMode = 'open_sale' | 'access_code' | 'scarcity_1000'

export const SALE_LIST_PRICE_USD = 49
export const SALE_FREE_PRICE_USD = 0

/** Ad / flyer unlock code for option 2 (locked until rotation is allowed). */
export const SALE_ACCESS_CODE = '1234'

/** Soft cap for option 3 (locked until rotation is allowed). */
export const SALE_SCARCITY_CAP = 1000

/**
 * Keep `false` until Omar says to rotate tactics.
 * When false, the site always runs option 1 regardless of REQUESTED_SALE_TACTIC.
 */
export const SALE_TACTIC_ROTATION_UNLOCKED = false

/** Requested tactic — ignored while rotation is locked. */
export const REQUESTED_SALE_TACTIC: SaleTacticMode = 'open_sale'

const LAUNCH_TACTIC: SaleTacticMode = 'open_sale'

/** Effective tactic used by all UI / gates. */
export const ACTIVE_SALE_TACTIC: SaleTacticMode = SALE_TACTIC_ROTATION_UNLOCKED
  ? REQUESTED_SALE_TACTIC
  : LAUNCH_TACTIC

export function saleTacticUsesCode(mode: SaleTacticMode = ACTIVE_SALE_TACTIC) {
  return SALE_TACTIC_ROTATION_UNLOCKED && mode === 'access_code'
}

export function saleTacticUsesScarcity(mode: SaleTacticMode = ACTIVE_SALE_TACTIC) {
  return SALE_TACTIC_ROTATION_UNLOCKED && mode === 'scarcity_1000'
}

export function saleTacticIsOpen(mode: SaleTacticMode = ACTIVE_SALE_TACTIC) {
  return !SALE_TACTIC_ROTATION_UNLOCKED || mode === 'open_sale'
}
