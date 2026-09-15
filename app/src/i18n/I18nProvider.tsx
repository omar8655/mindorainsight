import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  dictionaries,
  locales,
  type Dictionary,
  type Locale,
  type LocaleCode,
} from '@/i18n/dictionaries'

type I18nContextValue = {
  locale: Locale
  code: LocaleCode
  t: Dictionary
  setLocale: (code: LocaleCode) => void
  locales: Locale[]
}

const I18nContext = createContext<I18nContextValue | null>(null)
const STORAGE_KEY = 'mindorainsight.locale'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState<LocaleCode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as LocaleCode | null
    if (saved && dictionaries[saved]) return saved
    return 'en'
  })

  const locale = locales.find((l) => l.code === code) ?? locales[0]
  const t = dictionaries[code]

  const setLocale = useCallback((next: LocaleCode) => {
    setCode(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  useEffect(() => {
    document.documentElement.lang = code
    document.documentElement.dir = locale.dir
  }, [code, locale.dir])

  const value = useMemo(
    () => ({ locale, code, t, setLocale, locales }),
    [locale, code, t, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
