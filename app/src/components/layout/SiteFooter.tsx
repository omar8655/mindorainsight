import { Link } from 'react-router-dom'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { NhsMark } from '@/components/brand/NhsMark'
import { resetCookieConsent } from '@/components/layout/CookieConsent'
import { ADHD_SCREENING_SLUG } from '@/data/adhdScreening'
import { FOOTER_SEO_TESTS } from '@/data/footerSeoTests'
import { getAccessCopy } from '@/i18n/accessCopy'
import { useI18n } from '@/i18n/I18nProvider'
import { getSeoTestLabel } from '@/i18n/seoTestLabels'

const disclaimer =
  'Educational assessments for professional development only — not medical or clinical advice. Seek a licensed professional for health concerns.'

export function SiteFooter() {
  const { t, code } = useI18n()
  const access = getAccessCopy(code)
  const freeAdhdLabel = getSeoTestLabel(code, 'freeAdhd')

  const columns = [
    {
      title: t.footer.colProduct,
      links: [
        { to: '/library', label: t.nav.library },
        { to: '/pricing', label: t.nav.pricing },
        { to: '/free-tests', label: access.moreFreeTests },
        { to: `/test/${ADHD_SCREENING_SLUG}`, label: freeAdhdLabel },
      ],
    },
    {
      title: t.footer.colCompany,
      links: [
        { to: '/about', label: t.nav.about },
        { to: '/contact', label: t.nav.contacts },
        { to: '/faq', label: t.footer.faq },
      ],
    },
    {
      title: t.footer.colLegal,
      links: [
        { to: '/docs/privacy', label: t.footer.privacy },
        { to: '/docs/terms', label: t.footer.terms },
        { to: '/docs/subscription', label: t.footer.subscription },
        { to: '/cancel', label: t.footer.cancel },
      ],
    },
  ]

  return (
    <footer className="mt-auto border-t border-mi-border bg-mi-text text-white">
      <div className="container py-10 pb-[max(2.5rem,calc(1.5rem+env(safe-area-inset-bottom)))] md:py-14">
        <div className="grid gap-8 md:grid-cols-[1.2fr_2fr] md:gap-10">
          <div>
            <BrandLogo size={32} onDark />
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">{t.footer.blurb}</p>

            <div className="mt-5 rounded-xl border border-white/15 bg-white/5 p-3.5 sm:p-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <NhsMark size="sm" className="!border-white/20 !bg-white" />
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/55">
                  {access.nhsLabel}
                </p>
              </div>
              <p className="mt-2 text-sm leading-5 text-white/75">{access.nhsBody}</p>
              <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
                <Link
                  to={`/test/${ADHD_SCREENING_SLUG}`}
                  className="inline-flex text-sm font-semibold text-mi-green hover:underline"
                >
                  {freeAdhdLabel} →
                </Link>
                <a
                  href="mailto:hello@mindorainsight.com"
                  className="inline-flex text-sm font-semibold text-white/70 hover:text-white hover:underline"
                >
                  hello@mindorainsight.com
                </a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-white/45">
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.to + l.label}>
                      <Link
                        to={l.to}
                        className="inline-block py-0.5 text-sm text-white/80 active:text-white hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/45">
                {access.moreFreeTests}
              </p>
              <h2 className="mt-1 font-display text-lg font-semibold text-white sm:text-xl">
                {access.exploreAssessments}
              </h2>
            </div>
            <Link
              to="/free-tests"
              className="text-sm font-semibold text-mi-green hover:underline"
            >
              {access.allFreeTests}
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {FOOTER_SEO_TESTS.map((item) => {
              const label = getSeoTestLabel(code, item.labelKey)
              return (
                <li key={`${item.labelKey}-${item.slug}`}>
                  <Link
                    to={`/test/${item.slug}`}
                    className={`inline-block py-0.5 text-sm transition hover:text-white ${
                      item.free ? 'font-semibold text-mi-green' : 'text-white/55 hover:text-white/90'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <p className="mt-4 text-[11px] leading-4 text-white/35">{access.freeTestsDisclaimer}</p>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 md:mt-10 md:pt-6">
          <p className="text-xs leading-5 text-white/45">{disclaimer}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/35">
            <p>{t.footer.rights}</p>
            <button
              type="button"
              className="font-semibold text-white/55 underline-offset-2 hover:text-white hover:underline"
              onClick={() => resetCookieConsent()}
            >
              Cookie choices
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
