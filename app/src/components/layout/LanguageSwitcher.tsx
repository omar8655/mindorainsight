import { useEffect, useRef, useState } from 'react'
import { useCurrency } from '@/features/currency/CurrencyProvider'
import { flagUrl, type LocaleCode } from '@/i18n/dictionaries'
import { useI18n } from '@/i18n/I18nProvider'

export function LanguageSwitcher({ showLabel = false }: { showLabel?: boolean }) {
  const { locale, locales, setLocale, t } = useI18n()
  const { englishFlag } = useCurrency()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  function flagFor(code: LocaleCode, fallback: string) {
    if (code === 'en') return englishFlag
    return fallback
  }

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  function choose(code: LocaleCode) {
    setLocale(code)
    setOpen(false)
  }

  const triggerFlag = flagFor(locale.code, locale.flag)

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className="inline-flex h-10 items-center gap-2 rounded-full border border-mi-border bg-white px-3 text-sm font-semibold text-mi-text shadow-sm transition hover:border-mi-green/40 hover:bg-mi-green-soft/60"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.changeLanguage}
        title={t.nav.changeLanguage}
        onClick={() => setOpen((v) => !v)}
      >
        <img
          src={flagUrl(triggerFlag, 40)}
          alt=""
          width={22}
          height={16}
          className="h-4 w-[22px] rounded-[3px] object-cover ring-1 ring-black/5"
        />
        {showLabel && <span className="hidden max-w-[88px] truncate lg:inline">{locale.label}</span>}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`text-mi-muted transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t.nav.changeLanguage}
          className="absolute end-0 z-[60] mt-2 max-h-[70vh] w-56 overflow-auto rounded-2xl border border-mi-border bg-white py-2 shadow-[0_16px_48px_rgba(31,42,51,0.14)]"
        >
          <p className="px-3 pb-1.5 pt-1 text-[11px] font-bold uppercase tracking-wide text-mi-muted">
            {t.nav.changeLanguage}
          </p>
          {locales.map((item) => {
            const active = item.code === locale.code
            const flag = flagFor(item.code, item.flag)
            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={active}
                className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition hover:bg-mi-green-soft/70 ${
                  active ? 'bg-mi-green-soft font-semibold text-mi-green' : 'text-mi-text'
                }`}
                onClick={() => choose(item.code)}
              >
                <img
                  src={flagUrl(flag, 40)}
                  alt=""
                  width={22}
                  height={16}
                  className="h-4 w-[22px] rounded-[3px] object-cover ring-1 ring-black/5"
                />
                <span className="flex-1">{item.label}</span>
                {active && <span className="text-mi-green">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
