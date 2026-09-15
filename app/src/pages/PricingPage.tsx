import { Link } from 'react-router-dom'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { Seo } from '@/components/layout/Seo'
import { plans } from '@/data/content'
import { useCurrency } from '@/features/currency/CurrencyProvider'
import { getAccessCopy } from '@/i18n/accessCopy'
import { useI18n } from '@/i18n/I18nProvider'

export function PricingPage() {
  const { listPrice, money, localize } = useCurrency()
  const { code } = useI18n()
  const access = getAccessCopy(code)
  const shortList = listPrice.replace(/\.00$/, '')

  return (
    <>
      <Seo
        title={`Pricing — every course ${shortList}`}
        description={`Clear nonprofit pricing. Every MindoraInsight course is ${shortList} — build confidence with no surprise tiers.`}
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
            MindoraInsight · Flat nonprofit pricing
          </p>
          <h1 className="font-display mx-auto mb-4 max-w-2xl text-[1.65rem] font-semibold leading-tight sm:text-[32px] md:text-[44px]">
            Invest in confidence — every course is{' '}
            <span className="text-[#7ddea8]">{shortList}</span>
          </h1>
          <p className="mx-auto max-w-[640px] px-1 text-[15px] leading-6 text-white/70 sm:text-base sm:leading-7 md:text-lg">
            One clear price. Practical reports. Start when you are ready — we walk with you every step.
          </p>
        </div>
      </section>

      <section className="bg-mi-canvas py-8 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:py-12 md:py-16">
        <div className="container grid gap-5 sm:gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-2xl bg-white p-5 shadow-[var(--mi-card-shadow)] sm:p-7 ${
                plan.highlighted ? 'ring-2 ring-mi-green' : 'border border-mi-border'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-mi-green px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  Most chosen
                </span>
              )}
              <div className="mb-4 flex items-center gap-2">
                <BrandLogo withWordmark={false} size={28} to="" />
                <h3 className="text-xl font-semibold text-mi-text">{plan.name}</h3>
              </div>
              <p className="mb-1 font-display text-4xl font-bold text-mi-forest">
                {money(plan.priceUsd)}
              </p>
              <p className="mb-6 text-sm leading-6 text-mi-muted">{localize(plan.detail)}</p>
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-[15px] text-mi-text">
                    <span className="text-mi-green">✓</span>
                    {localize(f)}
                  </li>
                ))}
              </ul>
              <Link
                to={`/checkout?product=${plan.product}`}
                className={plan.highlighted ? 'btn-primary w-full' : 'btn-outline w-full'}
              >
                {plan.highlighted ? `Start for ${shortList}` : 'Continue'}
              </Link>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-6 text-mi-muted">
          {access.nhsBody}
        </p>
      </section>
    </>
  )
}
