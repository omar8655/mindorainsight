import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'mi.cookie.consent.v1'

type ConsentChoice = 'essential' | 'analytics' | 'custom'

type ConsentRecord = {
  choice: ConsentChoice
  analytics: boolean
  marketing: boolean
  decidedAt: string
}

function readConsent(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ConsentRecord
  } catch {
    return null
  }
}

function writeConsent(record: ConsentRecord) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    // no-op — preference is cosmetic only
  }
}

/**
 * Production-style cookie banner. Saves a local preference only —
 * no analytics or marketing scripts are loaded.
 */
export function CookieConsent() {
  const titleId = useId()
  const [visible, setVisible] = useState(false)
  const [customiseOpen, setCustomiseOpen] = useState(false)
  const [analyticsOn, setAnalyticsOn] = useState(true)
  const [marketingOn, setMarketingOn] = useState(false)

  useEffect(() => {
    if (readConsent()) return
    const t = window.setTimeout(() => setVisible(true), 450)
    return () => window.clearTimeout(t)
  }, [])

  function decide(choice: ConsentChoice, analytics: boolean, marketing: boolean) {
    writeConsent({
      choice,
      analytics,
      marketing,
      decidedAt: new Date().toISOString(),
    })
    setVisible(false)
    setCustomiseOpen(false)
  }

  if (!visible) return null

  return (
    <div
      className="report-no-print fixed inset-x-0 bottom-0 z-[80] px-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2 sm:px-4 sm:pb-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
    >
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-mi-border bg-[#F7F6F2] p-5 pb-6 shadow-[0_18px_50px_rgba(3,37,20,0.18)] sm:p-6 sm:pb-7">
        <h2 id={titleId} className="font-display text-xl font-semibold text-mi-forest sm:text-2xl">
          Cookie choices
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-mi-muted sm:text-[15px]">
          Essential storage keeps MindoraInsight working. With your permission, analytics cookies
          help us understand visits. Marketing consent permits storage of advertising click
          identifiers for campaign attribution.
        </p>

        {customiseOpen && (
          <div className="mt-4 space-y-3 rounded-xl border border-mi-border/80 bg-white/80 p-3.5 sm:p-4">
            <label className="flex items-start gap-3 text-sm text-mi-text">
              <input type="checkbox" checked disabled className="mt-1 accent-mi-forest" />
              <span>
                <span className="font-semibold">Essential</span>
                <span className="mt-0.5 block text-xs text-mi-muted">
                  Always on — session, language, and access preferences.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm text-mi-text">
              <input
                type="checkbox"
                checked={analyticsOn}
                onChange={(e) => setAnalyticsOn(e.target.checked)}
                className="mt-1 accent-mi-forest"
              />
              <span>
                <span className="font-semibold">Analytics</span>
                <span className="mt-0.5 block text-xs text-mi-muted">
                  Helps us improve the product (preference only — nothing is sent yet).
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm text-mi-text">
              <input
                type="checkbox"
                checked={marketingOn}
                onChange={(e) => setMarketingOn(e.target.checked)}
                className="mt-1 accent-mi-forest"
              />
              <span>
                <span className="font-semibold">Marketing</span>
                <span className="mt-0.5 block text-xs text-mi-muted">
                  Campaign attribution identifiers (preference only).
                </span>
              </span>
            </label>
            <button
              type="button"
              className="btn-primary !rounded-full !px-5 !py-2.5 !text-sm"
              onClick={() => decide('custom', analyticsOn, marketingOn)}
            >
              Save choices
            </button>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-mi-forest px-5 py-2.5 text-sm font-bold text-white transition hover:bg-mi-forest/90"
            onClick={() => decide('analytics', true, false)}
          >
            Accept analytics
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-mi-forest/30 bg-white px-5 py-2.5 text-sm font-bold text-mi-forest transition hover:bg-mi-canvas"
            onClick={() => decide('essential', false, false)}
          >
            Essential only
          </button>
          <button
            type="button"
            className="min-h-11 px-1 text-sm font-semibold text-mi-text underline underline-offset-2"
            onClick={() => setCustomiseOpen((o) => !o)}
            aria-expanded={customiseOpen}
          >
            Customise
          </button>
        </div>

        <p className="mt-4 text-[11px] leading-4 text-mi-muted">
          See our{' '}
          <Link to="/docs/privacy" className="font-semibold text-mi-forest underline-offset-2 hover:underline">
            Privacy
          </Link>{' '}
          policy. You can change this later from the footer.
        </p>
      </div>
    </div>
  )
}

/** Clears saved cookie preference so the banner can show again (footer link). */
export function resetCookieConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // no-op
  }
  window.location.reload()
}
