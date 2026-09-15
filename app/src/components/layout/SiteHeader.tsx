import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { useCurrency } from '@/features/currency/CurrencyProvider'
import { useI18n } from '@/i18n/I18nProvider'

export function SiteHeader() {
  const { t } = useI18n()
  const { listPrice, saleFreeLabel } = useCurrency()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const navId = useId()

  const navLinks = [
    { to: '/', label: t.nav.home, end: true },
    { to: '/about', label: t.nav.about },
    { to: '/library', label: t.nav.library },
    { to: '/pricing', label: t.nav.pricing },
  ]

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const mobileMenu =
    open &&
    createPortal(
      <div
        id={navId}
        className="fixed inset-0 z-[100] flex flex-col bg-white lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-mi-border px-4 pt-[env(safe-area-inset-top)] sm:h-16 sm:px-5">
          <BrandLogo size={32} onClick={() => setOpen(false)} />
          <button
            type="button"
            aria-label="Close menu"
            className="relative z-[101] flex h-11 w-11 items-center justify-center rounded-xl border border-mi-border bg-white"
            onClick={() => setOpen(false)}
          >
            <span className="text-lg leading-none text-mi-text" aria-hidden>
              ✕
            </span>
          </button>
        </div>
        <nav
          className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-4 py-4 sm:px-5"
          aria-label="Mobile"
          style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3.5 text-base font-semibold text-mi-text active:bg-mi-green-soft"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-auto space-y-2 border-t border-mi-border pt-4">
            <Link
              to="/test/adhd-adult-screening"
              onClick={() => setOpen(false)}
              className="btn-primary flex w-full items-center justify-center gap-2 !text-base"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold text-[#1a2e24]">
                <span className="font-semibold text-[#8a9a92] line-through">{listPrice}</span>
                {saleFreeLabel}
              </span>
              Free ADHD
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-center text-sm font-medium text-mi-muted"
            >
              {t.nav.contacts}
            </Link>
          </div>
        </nav>
      </div>,
      document.body,
    )

  return (
    <header className="sticky top-0 z-50 border-b border-mi-border bg-white/95 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between gap-2 sm:h-16 md:h-[72px]">
        <BrandLogo size={32} onClick={() => setOpen(false)} />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                [
                  'relative rounded-md px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'text-mi-forest after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:rounded-full after:bg-mi-green'
                    : 'text-mi-muted hover:text-mi-forest',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher showLabel />
          <Link
            to="/test/adhd-adult-screening"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-mi-green px-4 text-sm font-bold text-white transition hover:bg-mi-green-hover"
          >
            Free ADHD
          </Link>
        </div>

        <div className="flex items-center gap-1.5 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-expanded={open}
            aria-controls={navId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative z-[101] flex h-11 w-11 items-center justify-center rounded-xl border border-mi-border bg-white"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-lg leading-none text-mi-text" aria-hidden>
              {open ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      {mobileMenu}
    </header>
  )
}
