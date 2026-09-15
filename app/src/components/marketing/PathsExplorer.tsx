import { Link } from 'react-router-dom'
import { categories } from '@/data/categories'
import { useI18n } from '@/i18n/I18nProvider'

/**
 * Soft colored path pills — capsule chips on a sage/sky field.
 * Intentionally not TestLibrary’s cream “mosaic of traits” collage:
 * no cream cluster, no overlapping float layout, own copy + MindoraInsight framing.
 */
export function PathsExplorerSection() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden border-y border-mi-border bg-gradient-to-b from-mi-sky/80 via-mi-canvas to-mi-green-soft/40 py-12 md:py-16">
      <div
        className="pointer-events-none absolute -end-16 top-8 h-40 w-40 rounded-full bg-mi-green/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -start-10 bottom-4 h-32 w-32 rounded-full bg-mi-blue/10 blur-3xl"
        aria-hidden
      />

      <div className="container relative">
        <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-mi-green">
            {t.mosaic.eyebrow}
          </p>
          <h2 className="font-display mb-3 text-[26px] font-semibold leading-tight text-mi-forest md:text-[34px]">
            {t.mosaic.title}
          </h2>
          <p className="text-[15px] leading-7 text-mi-muted md:text-base">{t.mosaic.subtitle}</p>
        </div>

        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2.5 md:gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/library?category=${cat.id}`}
              className={`category-pill ${cat.tone}`}
            >
              <span className="pill-icon" aria-hidden>
                {cat.icon}
              </span>
              {t.categories[cat.id]}
            </Link>
          ))}
        </div>

        <div className="mt-9 text-center">
          <Link to="/library" className="btn-primary !px-6 !py-3.5 !text-base">
            {t.common.explore}
          </Link>
        </div>
      </div>
    </section>
  )
}
