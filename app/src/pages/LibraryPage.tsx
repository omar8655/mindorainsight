import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Seo } from '@/components/layout/Seo'
import { TestCard } from '@/components/marketing/TestCard'
import { categories, getCategory, type CategoryId } from '@/data/categories'
import { testsForLibrary } from '@/data/tests'
import { getAccessCopy } from '@/i18n/accessCopy'
import { useI18n } from '@/i18n/I18nProvider'

export function LibraryPage() {
  const { t, code } = useI18n()
  const access = getAccessCopy(code)
  const [params, setParams] = useSearchParams()
  const categoryId = params.get('category')
  const activeCategory = getCategory(categoryId)
  const activeLabel = activeCategory ? t.categories[activeCategory.id] : ''

  const filtered = useMemo(() => {
    const ordered = testsForLibrary()
    if (!categoryId) return ordered
    return ordered.filter((test) => test.categoryIds.includes(categoryId as CategoryId))
  }, [categoryId])

  function onSelect(id: string | null) {
    if (!id) setParams({})
    else setParams({ category: id })
  }

  return (
    <>
      <Seo title={t.library.title} description={t.library.subtitle} />

      {/* Theme chips — static (does not scroll/stick with the page) */}
      <div className="border-b border-mi-border bg-white">
        <div className="container py-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-wide text-mi-muted">
              {t.library.themesTitle}
            </p>
            {categoryId && (
              <button
                type="button"
                className="text-xs font-semibold text-mi-blue"
                onClick={() => onSelect(null)}
              >
                {t.library.clear}
              </button>
            )}
          </div>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => onSelect(null)}
              className={`shrink-0 rounded-full px-3.5 py-2.5 text-sm font-semibold transition min-h-10 ${
                !categoryId
                  ? 'bg-mi-green text-white'
                  : 'bg-mi-canvas text-mi-text ring-1 ring-mi-border'
              }`}
            >
              {t.library.allThemes}
            </button>
            {categories.map((cat) => {
              const active = categoryId === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelect(active ? null : cat.id)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2.5 text-sm font-semibold transition min-h-10 ${
                    active
                      ? 'bg-mi-green text-white'
                      : 'bg-mi-canvas text-mi-text ring-1 ring-mi-border'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] text-white ${cat.tone}`}
                    aria-hidden
                  >
                    {cat.icon}
                  </span>
                  {t.categories[cat.id]}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <section className="bg-mi-canvas py-5 md:py-10">
        <div className="container">
          <div className="mb-5 rounded-2xl border border-[#005EB8]/20 bg-gradient-to-br from-[#E8F1FA] via-white to-mi-green-soft/40 px-4 py-4 sm:px-5 sm:py-5">
            <p className="text-sm leading-6 text-mi-forest sm:text-[15px]">{access.libraryBanner}</p>
          </div>

          <div className="mb-4 flex items-baseline justify-between gap-3">
            <p className="text-sm font-semibold text-mi-muted">
              {t.library.showing} <span className="text-mi-text">{filtered.length}</span>
              {activeCategory ? (
                <>
                  {' '}
                  · <span className="text-mi-green">{activeLabel}</span>
                </>
              ) : null}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-mi-border bg-white p-8 text-center">
              <p className="font-semibold text-mi-text">{t.library.empty}</p>
              <button type="button" className="btn-primary mt-4 !px-5 !py-3 !text-base" onClick={() => onSelect(null)}>
                {t.library.showAll}
              </button>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {filtered.map((test) => (
                <TestCard key={test.slug} test={test} />
              ))}
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-mi-border bg-gradient-to-br from-white via-white to-mi-green-soft/50 p-5 md:flex md:items-center md:justify-between md:gap-6 md:p-6">
            <div className="flex max-w-xl gap-4">
              <img
                src="/logo.svg"
                alt=""
                width={44}
                height={44}
                className="mt-0.5 h-11 w-11 shrink-0"
              />
              <div>
                <h3 className="text-lg font-semibold text-mi-text md:text-xl">{t.library.enticeTitle}</h3>
                <p className="mt-1 text-sm leading-6 text-mi-muted">{t.library.enticeText}</p>
              </div>
            </div>
            <Link to="/pricing" className="btn-primary mt-4 w-full shrink-0 !px-5 !py-3 !text-base sm:w-auto md:mt-0">
              {t.library.enticeCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
