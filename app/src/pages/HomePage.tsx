import { Link } from 'react-router-dom'
import { SiteTrustBand } from '@/components/brand/SiteTrustBand'
import { Seo } from '@/components/layout/Seo'
import { FaqAccordion } from '@/components/marketing/FaqAccordion'
import { HeroSlideshow } from '@/components/marketing/HeroSlideshow'
import { PathsExplorerSection } from '@/components/marketing/PathsExplorer'
import { LatestReviews } from '@/components/marketing/LatestReviews'
import { LiveCompletions } from '@/components/marketing/LiveCompletions'
import { UniversityLogos } from '@/components/marketing/UniversityLogos'
import { faqs } from '@/data/content'
import { useCurrency } from '@/features/currency/CurrencyProvider'
import { useI18n } from '@/i18n/I18nProvider'
import {
  faqJsonLd,
  freeAdhdJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from '@/lib/structuredData'

const growthImages = [
  '/images/mi-clearer-view.png',
  '/images/mi-connect.png',
  '/images/mi-level-up.png',
]

export function HomePage() {
  const { t } = useI18n()
  const { listPrice, localize } = useCurrency()

  const steps = [
    { n: '01', title: t.steps.oneTitle, text: t.steps.oneText },
    { n: '02', title: t.steps.twoTitle, text: t.steps.twoText },
    { n: '03', title: t.steps.threeTitle, text: t.steps.threeText },
  ]

  const growth = [
    { title: t.growth.oneTitle, text: t.growth.oneText, image: growthImages[0] },
    { title: t.growth.twoTitle, text: t.growth.twoText, image: growthImages[1] },
    { title: t.growth.threeTitle, text: t.growth.threeText, image: growthImages[2] },
  ]

  return (
    <>
      <Seo
        title={`Start free — ${t.hero.eyebrow}`}
        description={t.hero.subtitle}
        path="/"
        jsonLd={[
          organizationJsonLd(),
          websiteJsonLd(),
          freeAdhdJsonLd(),
          faqJsonLd(
            faqs.map((f) => ({
              question: localize(f.question),
              answer: localize(f.answer),
            })),
          ),
        ]}
      />
      <HeroSlideshow />
      <SiteTrustBand />
      <LiveCompletions />

      <section className="border-b border-mi-border bg-mi-green-soft/60 py-8 md:py-10">
        <div className="container grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-10">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-mi-blue">
              Why we exist
            </p>
            <h2 className="font-display text-[24px] font-semibold leading-snug text-mi-forest md:text-[32px]">
              Breaking down barriers to tomorrow&apos;s society.
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-mi-muted md:text-base">
              We are a nonprofit built for people ready to stop staying quiet. Better quality of
              life starts with confidence — and we walk with you every step of the way.
            </p>
          </div>
          <div className="rounded-2xl border border-mi-green/25 bg-white px-5 py-5 text-center shadow-[var(--mi-card-shadow)] md:px-6 md:py-6">
            <img
              src="/logo.svg"
              alt=""
              width={40}
              height={40}
              className="mx-auto mb-3 h-10 w-10"
            />
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-mi-muted">
              Flat course pricing
            </p>
            <p className="font-display mt-1 text-4xl font-bold text-mi-forest md:text-5xl">{listPrice}</p>
            <p className="mt-2 text-sm leading-6 text-mi-muted">
              Every course. Same clear price. No surprise tiers.
            </p>
            <Link to="/pricing" className="btn-primary mt-4 inline-flex !px-5 !py-3 !text-[15px]">
              Build your confidence now
            </Link>
          </div>
        </div>
      </section>

      <UniversityLogos compact />
      <PathsExplorerSection />

      <section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="mb-8 max-w-2xl md:mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-mi-blue">
              How MindoraInsight works
            </p>
            <h2 className="font-display text-[26px] font-semibold text-mi-forest md:text-[34px]">
              {t.steps.title}
            </h2>
          </div>
          <ol className="grid gap-4 md:grid-cols-3 md:gap-5">
            {steps.map((step) => (
              <li
                key={step.n}
                className="rounded-2xl border border-mi-border bg-mi-canvas/80 p-5 md:p-6"
              >
                <span className="mb-4 inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-mi-green-soft px-2.5 text-sm font-bold text-mi-forest">
                  {step.n}
                </span>
                <h3 className="text-lg font-semibold text-mi-forest">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-mi-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <Link to="/library" className="btn-primary mt-8 inline-flex !px-6 !py-3.5 !text-base">
            {t.steps.cta}
          </Link>
        </div>
      </section>

      <LatestReviews />

      <section className="bg-white py-12 md:py-16">
        <div className="container">
          <h2 className="mb-8 text-[26px] font-semibold text-mi-text md:mb-10 md:text-[34px]">
            {t.growth.title}
          </h2>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="overflow-hidden rounded-2xl border border-mi-border">
              <img src={growth[0].image} alt="" className="h-52 w-full object-cover md:h-64" />
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-mi-text">{growth[0].title}</h3>
                <p className="text-[15px] leading-6 text-mi-muted">{growth[0].text}</p>
              </div>
            </article>
            <div className="flex flex-col gap-4">
              {growth.slice(1).map((item) => (
                <article
                  key={item.title}
                  className="flex flex-1 gap-4 overflow-hidden rounded-2xl border border-mi-border bg-mi-canvas/50 p-4"
                >
                  <img src={item.image} alt="" className="h-24 w-28 shrink-0 rounded-xl object-cover" />
                  <div>
                    <h3 className="mb-1 font-semibold text-mi-text">{item.title}</h3>
                    <p className="text-sm leading-6 text-mi-muted">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <Link to="/library" className="btn-primary !px-6 !py-3.5 !text-base">
              {t.common.explore}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-mi-border bg-mi-canvas py-12 md:py-16">
        <div className="container max-w-3xl">
          <h2 className="mb-8 text-[26px] font-semibold text-mi-text md:text-[34px]">{t.faq.title}</h2>
          <FaqAccordion items={faqs.map((f) => ({ ...f, question: localize(f.question), answer: localize(f.answer) }))} showCta />
        </div>
      </section>
    </>
  )
}
