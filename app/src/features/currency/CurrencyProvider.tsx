import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  SALE_LIST_PRICE_USD,
} from '@/features/sale/saleTactic'
import {
  buildProfile,
  detectCurrencyFromIp,
  englishFlagForCurrency,
  formatFreeZero,
  formatMoneyFixed,
  localizePriceCopy,
  readStoredCurrency,
  writeStoredCurrency,
  type CurrencyCode,
  type CurrencyProfile,
} from '@/lib/currency'

type CurrencyApi = {
  code: CurrencyCode
  profile: CurrencyProfile
  ready: boolean
  /** Format a catalog USD amount in the visitor currency. */
  money: (amountUsd: number) => string
  /** Free · $0 / £0 / €0 */
  freeZero: string
  /** List price e.g. $49.00 */
  listPrice: string
  /** Free · zero */
  saleFreeLabel: string
  wasNowFreeLine: string
  /** Rewrite $49/$0 strings in legacy copy */
  localize: (text: string) => string
  /** English UI flag: gb for UK/Europe, us elsewhere */
  englishFlag: 'gb' | 'us'
}

const CurrencyContext = createContext<CurrencyApi | null>(null)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const cached = typeof window !== 'undefined' ? readStoredCurrency() : null
  const [code, setCode] = useState<CurrencyCode>(cached?.code ?? 'USD')
  const [country, setCountry] = useState<string | null>(cached?.country ?? null)
  const [ready, setReady] = useState(Boolean(cached))

  useEffect(() => {
    let alive = true
    ;(async () => {
      // Refresh IP detection in background even if cached (same-day soft refresh)
      const detected = await detectCurrencyFromIp()
      if (!alive) return
      setCode(detected.code)
      setCountry(detected.country)
      writeStoredCurrency(detected)
      setReady(true)
    })()
    return () => {
      alive = false
    }
  }, [])

  const value = useMemo<CurrencyApi>(() => {
    const profile = buildProfile(code, country)
    const listPrice = formatMoneyFixed(SALE_LIST_PRICE_USD, code)
    const freeZero = formatFreeZero(code)
    return {
      code,
      profile,
      ready,
      money: (amountUsd: number) => formatMoneyFixed(amountUsd, code),
      freeZero,
      listPrice,
      saleFreeLabel: `Free · ${freeZero}`,
      wasNowFreeLine: `Was ${listPrice} — now Free · ${freeZero} · No PIN · No card`,
      localize: (text: string) => localizePriceCopy(text, code),
      englishFlag: englishFlagForCurrency(code),
    }
  }, [code, country, ready])

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency(): CurrencyApi {
  const ctx = useContext(CurrencyContext)
  if (!ctx) {
    const listPrice = formatMoneyFixed(SALE_LIST_PRICE_USD, 'USD')
    const freeZero = formatFreeZero('USD')
    return {
      code: 'USD',
      profile: buildProfile('USD'),
      ready: true,
      money: (amountUsd: number) => formatMoneyFixed(amountUsd, 'USD'),
      freeZero,
      listPrice,
      saleFreeLabel: `Free · ${freeZero}`,
      wasNowFreeLine: `Was ${listPrice} — now Free · ${freeZero} · No PIN · No card`,
      localize: (text: string) => localizePriceCopy(text, 'USD'),
      englishFlag: 'us',
    }
  }
  return ctx
}
