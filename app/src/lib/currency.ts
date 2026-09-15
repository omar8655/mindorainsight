/** Display currencies derived from visitor region (IP / locale fallback). */

export type CurrencyCode = 'USD' | 'GBP' | 'EUR'

export type CurrencyProfile = {
  code: CurrencyCode
  symbol: string
  /** Approx FX from USD for display (not live rates). */
  fromUsd: number
  locale: string
  countryHint: string | null
}

export const CURRENCY_PROFILES: Record<CurrencyCode, Omit<CurrencyProfile, 'countryHint'>> = {
  USD: { code: 'USD', symbol: '$', fromUsd: 1, locale: 'en-US' },
  GBP: { code: 'GBP', symbol: '£', fromUsd: 1, locale: 'en-GB' },
  EUR: { code: 'EUR', symbol: '€', fromUsd: 1, locale: 'de-DE' },
}

/** United Kingdom → pounds. */
const GBP_COUNTRIES = new Set(['GB', 'UK', 'GG', 'JE', 'IM'])

/**
 * Europe → euros (EU + common European markets; UK handled separately).
 */
const EUR_COUNTRIES = new Set([
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  'IS',
  'LI',
  'NO',
  'CH',
  'AL',
  'BA',
  'MK',
  'ME',
  'RS',
  'XK',
  'MD',
  'UA',
  'BY',
  'AD',
  'MC',
  'SM',
  'VA',
])

const STORAGE_KEY = 'mi.currency.v1'

export function currencyFromCountry(countryCode: string | null | undefined): CurrencyCode {
  const cc = (countryCode || '').toUpperCase()
  if (!cc) return 'USD'
  if (GBP_COUNTRIES.has(cc)) return 'GBP'
  if (EUR_COUNTRIES.has(cc)) return 'EUR'
  return 'USD'
}

export function currencyFromLocaleFallback(): CurrencyCode {
  try {
    const lang = (navigator.language || '').toLowerCase()
    if (lang.endsWith('-gb') || lang === 'en-uk' || lang.startsWith('cy')) return 'GBP'
    if (
      lang.endsWith('-ie') ||
      lang.startsWith('de') ||
      lang.startsWith('fr') ||
      lang.startsWith('es') ||
      lang.startsWith('it') ||
      lang.startsWith('nl') ||
      lang.startsWith('pt') ||
      lang.startsWith('pl') ||
      lang.startsWith('sv') ||
      lang.startsWith('da') ||
      lang.startsWith('fi') ||
      lang.startsWith('cs') ||
      lang.startsWith('hu') ||
      lang.startsWith('ro') ||
      lang.startsWith('el') ||
      lang.startsWith('sk') ||
      lang.startsWith('sl') ||
      lang.startsWith('hr') ||
      lang.startsWith('bg') ||
      lang.startsWith('et') ||
      lang.startsWith('lv') ||
      lang.startsWith('lt') ||
      lang.startsWith('mt') ||
      lang.startsWith('ga')
    ) {
      return 'EUR'
    }
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    if (tz === 'Europe/London') return 'GBP'
    if (tz.startsWith('Europe/')) return 'EUR'
  } catch {
    // no-op
  }
  return 'USD'
}

export function buildProfile(code: CurrencyCode, countryHint: string | null = null): CurrencyProfile {
  return { ...CURRENCY_PROFILES[code], countryHint }
}

/** Convert a USD catalog amount into the visitor display currency. */
export function convertFromUsd(amountUsd: number, code: CurrencyCode): number {
  if (amountUsd === 0) return 0
  const rate = CURRENCY_PROFILES[code].fromUsd
  const raw = amountUsd * rate
  // Keep marketing prices clean (whole units for list prices ≥ 1)
  if (raw >= 1) return Math.round(raw)
  return Math.round(raw * 100) / 100
}

export function formatMoneyAmount(amountUsd: number, code: CurrencyCode, withDecimals = true): string {
  const profile = CURRENCY_PROFILES[code]
  const value = convertFromUsd(amountUsd, code)
  if (!withDecimals || Number.isInteger(value)) {
    return `${profile.symbol}${value.toFixed(value % 1 === 0 ? 0 : 2)}`
  }
  return `${profile.symbol}${value.toFixed(2)}`
}

/** Always two decimals for badge consistency ($49.00 / £49.00 / €49.00). */
export function formatMoneyFixed(amountUsd: number, code: CurrencyCode): string {
  const profile = CURRENCY_PROFILES[code]
  const value = convertFromUsd(amountUsd, code)
  return `${profile.symbol}${value.toFixed(2)}`
}

export function formatFreeZero(code: CurrencyCode): string {
  return `${CURRENCY_PROFILES[code].symbol}0`
}

export function formatSalePair(listUsd: number, code: CurrencyCode): string {
  return `${formatMoneyFixed(listUsd, code)} → Free · ${formatFreeZero(code)}`
}

/** Rewrite legacy $49 / $0 copy into the visitor currency. */
export function localizePriceCopy(text: string, code: CurrencyCode): string {
  const listFixed = formatMoneyFixed(49, code)
  const listPlain = `${CURRENCY_PROFILES[code].symbol}${convertFromUsd(49, code)}`
  const zero = formatFreeZero(code)
  return text
    .replace(/\$49\.00/g, listFixed)
    .replace(/\$49/g, listPlain)
    .replace(/Free · \$0/g, `Free · ${zero}`)
    .replace(/\$0/g, zero)
}

/**
 * English language flag by region: UK + Europe → GB, elsewhere → US.
 */
export function englishFlagForCurrency(code: CurrencyCode): 'gb' | 'us' {
  return code === 'GBP' || code === 'EUR' ? 'gb' : 'us'
}

export type StoredCurrency = {
  code: CurrencyCode
  country: string | null
  source: 'ip' | 'locale' | 'manual'
  at: string
}

export function readStoredCurrency(): StoredCurrency | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredCurrency
    if (parsed.code === 'USD' || parsed.code === 'GBP' || parsed.code === 'EUR') return parsed
  } catch {
    // no-op
  }
  return null
}

export function writeStoredCurrency(record: StoredCurrency) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    // no-op
  }
}

/**
 * Resolve visitor country via public IP lookup (no API key).
 * Falls back to locale/timezone when offline or blocked.
 */
export async function detectCurrencyFromIp(): Promise<StoredCurrency> {
  const controllers: AbortController[] = []
  const withTimeout = (ms: number) => {
    const c = new AbortController()
    controllers.push(c)
    window.setTimeout(() => c.abort(), ms)
    return c.signal
  }

  try {
    const res = await fetch('https://ipwho.is/', { signal: withTimeout(3500) })
    if (res.ok) {
      const data = (await res.json()) as { success?: boolean; country_code?: string }
      if (data.success !== false && data.country_code) {
        const code = currencyFromCountry(data.country_code)
        return {
          code,
          country: data.country_code.toUpperCase(),
          source: 'ip',
          at: new Date().toISOString(),
        }
      }
    }
  } catch {
    // try next
  }

  try {
    const res = await fetch('https://ipapi.co/json/', { signal: withTimeout(3500) })
    if (res.ok) {
      const data = (await res.json()) as { country_code?: string; error?: boolean }
      if (!data.error && data.country_code) {
        const code = currencyFromCountry(data.country_code)
        return {
          code,
          country: data.country_code.toUpperCase(),
          source: 'ip',
          at: new Date().toISOString(),
        }
      }
    }
  } catch {
    // locale fallback
  }

  return {
    code: currencyFromLocaleFallback(),
    country: null,
    source: 'locale',
    at: new Date().toISOString(),
  }
}
