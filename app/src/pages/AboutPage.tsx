import { Link } from 'react-router-dom'
import { Seo } from '@/components/layout/Seo'
import { UniversityLogos } from '@/components/marketing/UniversityLogos'
import { useI18n } from '@/i18n/I18nProvider'

export function AboutPage() {
  const { t } = useI18n()

  const principles = [
    { title: t.about.p1Title, text: t.about.p1Text },
    { title: t.about.p2Title, text: t.about.p2Text },
    { title: t.about.p3Title, text: t.about.p3Text },
  ]

  return (
    <>
      <Seo title={t.about.title} description={t.about.subtitle} />

      <section className="bg-white py-8 md:py-12">
        <div className="container max-w-[820px] text-center">
          <h1 className="mb-3 text-[28px] font-semibold text-mi-text md:text-[44px]">{t.about.title}</h1>
          <p className="text-[15px] leading-7 text-mi-muted md:text-lg">{t.about.subtitle}</p>
        </div>
      </section>

      <section className="bg-mi-cream py-8 md:py-12">
        <div className="container grid items-center gap-6 md:grid-cols-2 md:gap-12">
          <img
            src="/images/about-mission.png?v=cartoon1"
            alt=""
            className="h-44 w-full rounded-2xl object-cover shadow-[var(--mi-card-shadow)] md:h-72"
          />
          <div>
            <h2 className="mb-3 text-xl font-semibold text-mi-text md:text-[28px]">{t.about.missionTitle}</h2>
            <p className="mb-3 text-sm leading-7 text-mi-muted md:text-[15px]">{t.about.missionOne}</p>
            <p className="text-sm leading-7 text-mi-muted md:text-[15px]">{t.about.missionTwo}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 md:py-12">
        <div className="container">
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
            <div className="order-2 md:order-1">
              <h2 className="mb-3 text-xl font-semibold text-mi-text md:text-[28px]">{t.about.researchTitle}</h2>
              <p className="mb-4 text-sm leading-7 text-mi-muted md:text-[15px]">{t.about.researchOne}</p>
            </div>
            <img
              src="/images/about-research.png?v=cartoon1"
              alt=""
              className="order-1 h-44 w-full rounded-2xl object-cover shadow-[var(--mi-card-shadow)] md:order-2 md:h-72"
            />
          </div>

          <div className="mt-8 md:mt-10">
            <UniversityLogos />
          </div>
        </div>
      </section>

      <section className="bg-mi-sky py-8 md:py-12">
        <div className="container">
          <h2 className="mb-6 text-center text-xl font-semibold text-mi-text md:mb-8 md:text-[28px]">
            {t.about.principlesTitle}
          </h2>
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {principles.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-mi-border bg-white p-4 shadow-[var(--mi-card-shadow)] md:p-5"
              >
                <h3 className="mb-2 text-base font-semibold text-mi-text md:text-lg">{item.title}</h3>
                <p className="text-sm leading-6 text-mi-muted">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/library" className="btn-primary !px-6 !py-3.5 !text-base">
              {t.about.cta}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
