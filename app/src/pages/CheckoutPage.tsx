import { type FormEvent, Suspense, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { unlockReportSessionFlexible } from '@/application/reports/sessionStore'
import { Seo } from '@/components/layout/Seo'
import { plans } from '@/data/content'
import { getTestBySlug } from '@/data/tests'
import { useCurrency } from '@/features/currency/CurrencyProvider'
import { getAssessmentCopy } from '@/i18n/assessmentCopy'
import { useI18n } from '@/i18n/I18nProvider'

/** Local demo checkout only — never charged. Safe placeholders for testing unlock + PDF. */
const DEMO_CHECKOUT = {
  email: 'demo@mindorainsight.test',
  card: '4242 4242 4242 4242',
  expiry: '12 / 34',
  cvc: '123',
}

function CheckoutInner() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const product = Number(params.get('product') ?? '1')
  const testSlug = params.get('test')
  const addon = params.get('addon')
  const sessionId = params.get('session')
  const isReportAddon =
    addon === 'comprehensive-report' || addon === 'adhd-brief-report'
  const plan = useMemo(() => plans.find((p) => p.product === product) ?? plans[0], [product])
  const test = testSlug ? getTestBySlug(testSlug) : null
  const { t, code } = useI18n()
  const { money, localize } = useCurrency()
  const testCopy = test ? getAssessmentCopy(code, test.slug) : null
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState(DEMO_CHECKOUT.email)
  const [card, setCard] = useState(DEMO_CHECKOUT.card)
  const [expiry, setExpiry] = useState(DEMO_CHECKOUT.expiry)
  const [cvc, setCvc] = useState(DEMO_CHECKOUT.cvc)

  function completeUnlock() {
    setError(null)

    if (isReportAddon) {
      const unlocked = unlockReportSessionFlexible(sessionId, testSlug)
      if (!unlocked) {
        setError(
          'No assessment session found. Finish a test first, then unlock from the results page.',
        )
        return
      }
      setDone(true)
      navigate(`/report/${unlocked.slug}?session=${unlocked.id}&full=1`, { replace: true })
      return
    }

    setDone(true)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    completeUnlock()
  }

  if (done && !isReportAddon) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-mi-border bg-white p-5 text-center shadow-[var(--mi-card-shadow)] sm:p-8">
        <h1 className="font-display mb-3 text-2xl font-semibold text-mi-text sm:text-3xl">You&apos;re in</h1>
        <p className="mb-6 text-mi-muted">Demo checkout only — no real payment. Library unlocked for browsing.</p>
        <Link to={test ? `/test/${test.slug}` : '/library'} className="btn-primary">
          {testCopy ? `${t.common.startAssessment}: ${testCopy.title}` : t.library.backToLibrary}
        </Link>
      </div>
    )
  }

  const addonPrice = isReportAddon ? money(19) : money(plan.priceUsd)
  const addonTitle = isReportAddon
    ? 'Comprehensive MindoraInsight report'
    : plan.name
  const addonDetail = isReportAddon
    ? 'Multi-chapter individualized report with Download PDF. Demo unlock — no real charge.'
    : localize(plan.detail)

  return (
    <div className="mx-auto grid max-w-[960px] gap-4 sm:gap-6 md:grid-cols-[1fr_0.9fr]">
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-mi-border bg-white p-4 shadow-[var(--mi-card-shadow)] sm:p-6 md:p-8"
      >
        <h1 className="font-display mb-3 text-2xl font-semibold text-mi-text md:text-3xl">
          Secure checkout
        </h1>

        <div className="mb-5 rounded-xl border border-mi-green/30 bg-mi-green-soft/60 px-4 py-3 text-sm text-mi-forest">
          <p className="font-semibold">Demo mode — no real payment</p>
          <p className="mt-1 text-mi-muted">
            Card fields are prefilled. Click unlock, or skip payment entirely to open the full
            report and download the PDF.
          </p>
          <p className="mt-2 font-mono text-xs text-mi-forest/80">
            {DEMO_CHECKOUT.card} · {DEMO_CHECKOUT.expiry} · CVC {DEMO_CHECKOUT.cvc}
          </p>
        </div>

        {error && (
          <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
            {error}
          </p>
        )}
        <label className="mb-4 block">
          <span className="mb-1.5 block text-sm font-semibold">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-mi-border px-3 py-2.5 outline-none focus:border-mi-green"
          />
        </label>
        <div className="mb-4 space-y-3">
          <input
            required
            value={card}
            onChange={(e) => setCard(e.target.value)}
            placeholder="Card number"
            inputMode="numeric"
            autoComplete="cc-number"
            className="w-full rounded-lg border border-mi-border px-3 py-2.5 outline-none focus:border-mi-green"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM / YY"
              autoComplete="cc-exp"
              className="w-full rounded-lg border border-mi-border px-3 py-2.5 outline-none focus:border-mi-green"
            />
            <input
              required
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="CVC"
              inputMode="numeric"
              autoComplete="cc-csc"
              className="w-full rounded-lg border border-mi-border px-3 py-2.5 outline-none focus:border-mi-green"
            />
          </div>
        </div>
        <label className="mb-6 flex items-start gap-2 text-sm text-mi-muted">
          <input type="checkbox" required defaultChecked className="mt-1" />
          <span>
            I accept the{' '}
            <Link to="/docs/terms" className="text-mi-teal">
              Terms
            </Link>{' '}
            and{' '}
            <Link to="/docs/privacy" className="text-mi-teal">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <button type="submit" className="btn-primary w-full">
          {isReportAddon ? 'Unlock full report' : 'Submit secure payment'}
        </button>
        {isReportAddon && (
          <button
            type="button"
            onClick={completeUnlock}
            className="btn-outline mt-3 w-full"
          >
            Skip payment — unlock for testing
          </button>
        )}
      </form>
      <aside className="h-fit rounded-2xl border border-mi-border bg-white p-4 shadow-[var(--mi-card-shadow)] sm:p-6">
        <h2 className="mb-2 text-lg font-semibold text-mi-text">{addonTitle}</h2>
        {testCopy && (
          <p className="mb-2 text-sm text-mi-muted">
            {t.common.selected}: {testCopy.title}
          </p>
        )}
        <p className="mb-1 font-display text-3xl font-bold text-mi-text">{addonPrice}</p>
        <p className="mb-6 text-sm text-mi-muted">{addonDetail}</p>
        <div className="flex justify-between border-t border-mi-border pt-4 font-semibold">
          <span>Total</span>
          <span>{addonPrice}</span>
        </div>
      </aside>
    </div>
  )
}

export function CheckoutPage() {
  return (
    <>
      <Seo title="Checkout" noindex />
      <section className="bg-mi-canvas py-8 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:py-12 md:py-16">
        <div className="container !px-3 sm:!px-5">
          <Suspense fallback={<p className="text-center text-mi-muted">Loading…</p>}>
            <CheckoutInner />
          </Suspense>
        </div>
      </section>
    </>
  )
}
