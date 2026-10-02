import { Link } from 'react-router-dom'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { Seo } from '@/components/layout/Seo'
import { plans } from '@/data/content'
import { useCurrency } from '@/features/currency/CurrencyProvider'
import { getAccessCopy } from '@/i18n/accessCopy'
import { useI18n } from '@/i18n/I18nProvider'

export function PricingPage() {
  const { listPrice, money } = useCurrency()
  const { code } = useI18n()
  const access = getAccessCopy(code)
  const shortList = listPrice.replace(/\.00$/, '')

  return (
    <>
      <Seo
        title="Pricing — all plans free · sold out"
        description="MindoraInsight paid plans are sold out. Every assessment is free on the Free tests library — no card required."
        path="/pricing"
      />
      <section className="relative overflow-hidden border-b border-mi-border bg-[#0c1f17] text-white">
        <div
          className="pointer-events-none absolute -left-16 top-8 h-48 w-48 rounded-full bg-mi-green/20 blur-3xl"
          aria-hidden
        />
        <div className="container relative py-10 text-center sm:py-12 md:py-16">
          <div className="mb-5 flex justify-center">
            <img
              src="/logo.svg"
              alt="MindoraInsight"
              width={56}
              height={56}
              className="h-12 w-12 sm:h-14 sm:w-14"
            />
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#9fd9b8] sm:text-sm">
            MindoraInsight · Paid plans sold out
          </p>
          <h1 className="font-display mx-auto mb-4 max-w-2xl text-[1.65rem] font-semibold leading-tight sm:text-[32px] md:text-[44px]">
            Everything is{' '}
            <span className="text-[#7ddea8]">free</span>
            {' — '}
            paid seats are sold out
          </h1>
          <p className="mx-auto max-w-[640px] px-1 text-[15px] leading-6 text-white/70 sm:text-base sm:leading-7 md:text-lg">
            Was {shortList}. Now £0 / $0. Checkout is closed. Take any of the 20 free assessments
            instead — no card, no PIN.
          </p>
        </div>
      </section>

      <section className="bg-mi-canvas py-8 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:py-12 md:py-16">
        <div className="container grid gap-5 sm:gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.id}
              aria-disabled="true"
              className={`relative flex flex-col rounded-2xl bg-white p-5 opacity-90 shadow-[var(--mi-card-shadow)] sm:p-7 ${
                plan.highlighted ? 'ring-2 ring-mi-border' : 'border border-mi-border'
              }`}
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#5b6b73] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                Sold out
              </span>
              <div className="mb-4 flex items-center gap-2 pt-1">
                <BrandLogo withWordmark={false} size={28} to="" />
                <h3 className="text-xl font-semibold text-mi-text">{plan.name}</h3>
              </div>
              <p className="mb-1 flex flex-wrap items-baseline gap-2 font-display text-4xl font-bold text-mi-forest">
                <span className="text-2xl font-semibold text-mi-muted line-through decoration-2">
                  {money(plan.priceUsd)}
                </span>
                <span>Free</span>
              </p>
              <p className="mb-6 text-sm leading-6 text-mi-muted">
                This paid plan is sold out. Use Free tests for the same assessments at £0.
              </p>
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-[15px] text-mi-muted">
                    <span className="text-mi-border">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-lg border border-mi-border bg-slate-100 px-4 py-3.5 text-sm font-bold text-mi-muted opacity-70"
              >
                Sold out
              </button>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-mi-green/25 bg-white p-5 text-center shadow-sm sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-mi-green">Open now</p>
          <p className="mt-2 text-sm leading-6 text-mi-forest">
            All 20 assessments are free — 100 questions, instant scores, printable PDF.
          </p>
          <Link to="/library" className="btn-primary mt-4 inline-flex w-full justify-center sm:w-auto">
            Browse free tests →
          </Link>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-6 text-mi-muted">
          {access.nhsBody}
        </p>
      </section>
    </>
  )
}
