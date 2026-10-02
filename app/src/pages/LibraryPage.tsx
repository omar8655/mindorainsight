import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Seo } from '@/components/layout/Seo'
import { TestCard } from '@/components/marketing/TestCard'
import { categories, getCategory, type CategoryId } from '@/data/categories'
import { testsForLibrary } from '@/data/tests'
import { getAccessCopy } from '@/i18n/accessCopy'
import { useI18n } from '@/i18n/I18nProvider'
import { DEFAULT_SEO } from '@/lib/seo'
import { freeTestsItemListJsonLd, organizationJsonLd } from '@/lib/structuredData'
import { TEST_META } from '@/data/newmindora/tests-core.js'

export function LibraryPage() {
  const { t, code } = useI18n()
  const access = getAccessCopy(code)
  const [params, setParams] = useSearchParams()
  const categoryId = params.get('category')
  const qParam = params.get('q') || ''
  const [query, setQuery] = useState(qParam)
  const activeCategory = getCategory(categoryId)
  const activeLabel = activeCategory ? t.categories[activeCategory.id] : ''
  const allTests = useMemo(() => testsForLibrary(), [])

  const themesWithTests = useMemo(
    () =>
      categories.filter((cat) => allTests.some((test) => test.categoryIds.includes(cat.id))),
    [allTests],
  )

  const filtered = useMemo(() => {
    let list = allTests
    if (categoryId && getCategory(categoryId)) {
      list = list.filter((test) => test.categoryIds.includes(categoryId as CategoryId))
    } else if (categoryId && !getCategory(categoryId)) {
      list = allTests
    }
    const needle = query.trim().toLowerCase()
    if (!needle) return list
    return list.filter((test) => {
      const title = test.slug
      const meta = TEST_META.find((m) => m.id === test.slug)
      const hay = `${title} ${meta?.title || ''} ${meta?.blurb || ''}`.toLowerCase()
      return hay.includes(needle)
    })
  }, [allTests, categoryId, query])

  function onSelect(id: string | null) {
    const next = new URLSearchParams(params)
    if (!id) next.delete('category')
    else next.set('category', id)
    if (query.trim()) next.set('q', query.trim())
    else next.delete('q')
    setParams(next)
  }

  function onSearch(value: string) {
    setQuery(value)
    const next = new URLSearchParams(params)
    if (value.trim()) next.set('q', value.trim())
    else next.delete('q')
    setParams(next, { replace: true })
  }

  return (
    <>
      <Seo
        title="20 Free Tests — Personality, ADHD, EQ & More"
        description="Browse 20 free MindoraInsight assessments: Personality, Big 5, ADHD, Enneagram, Attachment, Career, DISC, EQ, and more. Instant scores and printable Mindora Dossier PDFs. No referral PIN."
        path="/library"
        keywords={DEFAULT_SEO.keywords}
        jsonLd={[
          organizationJsonLd(),
          freeTestsItemListJsonLd(
            TEST_META.map((t) => ({ title: t.title, slug: t.id, description: t.blurb })),
          ),
        ]}
      />

      <div className="sticky top-14 z-40 overflow-x-hidden border-b border-mi-border bg-white/95 backdrop-blur-md sm:top-16 md:top-[72px]">
        <div className="container min-w-0 py-3">
          <label className="mb-2 block">
            <span className="sr-only">Search free tests</span>
            <input
              type="search"
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search ADHD, Big 5, Enneagram…"
              className="w-full rounded-xl border border-mi-border bg-mi-canvas px-3.5 py-2.5 text-sm text-mi-text outline-none focus:border-mi-green focus:ring-2 focus:ring-mi-green/25"
            />
          </label>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-wide text-mi-muted">
              {t.library.themesTitle}
            </p>
            {categoryId && (
              <button
                type="button"
                className="min-h-11 text-xs font-semibold text-mi-blue sm:min-h-0"
                onClick={() => onSelect(null)}
              >
                {t.library.clear}
              </button>
            )}
          </div>
          <div className="flex w-full max-w-full gap-2 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => onSelect(null)}
              className={`min-h-11 shrink-0 rounded-full px-3.5 py-2.5 text-sm font-semibold transition sm:min-h-10 ${
                !categoryId
                  ? 'bg-mi-green text-white'
                  : 'bg-mi-canvas text-mi-text ring-1 ring-mi-border'
              }`}
            >
              {t.library.allThemes}
            </button>
            {themesWithTests.map((cat) => {
              const active = categoryId === cat.id
              const count = allTests.filter((test) => test.categoryIds.includes(cat.id)).length
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelect(active ? null : cat.id)}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2.5 text-sm font-semibold transition sm:min-h-10 ${
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
                  <span className={active ? 'text-white/80' : 'text-mi-muted'}>({count})</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <section className="bg-mi-canvas py-5 md:py-10">
        <div className="container min-w-0">
          <div className="mb-5 rounded-2xl border border-mi-green/25 bg-gradient-to-br from-mi-green-soft/50 via-white to-white px-4 py-4 sm:px-5 sm:py-5">
            <h1 className="font-display text-xl font-semibold text-mi-forest sm:text-2xl">
              Free tests — 20 assessments
            </h1>
            <p className="mt-2 text-sm leading-6 text-mi-forest sm:text-[15px]">
              {access.libraryBanner}
            </p>
            <Link
              to="/test/adhd"
              className="btn-primary mt-4 inline-flex !px-5 !py-3 !text-[15px]"
            >
              Start with Adult ADHD →
            </Link>
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
              {query.trim() ? (
                <>
                  {' '}
                  · search “{query.trim()}”
                </>
              ) : null}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-mi-border bg-white p-8 text-center">
              <p className="font-semibold text-mi-text">{t.library.empty}</p>
              <button
                type="button"
                className="btn-primary mt-4 !px-5 !py-3 !text-base"
                onClick={() => {
                  setQuery('')
                  onSelect(null)
                }}
              >
                {t.library.showAll}
              </button>
            </div>
          ) : (
            <div className="grid min-w-0 gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {filtered.map((test) => (
                <div key={test.slug} className="min-w-0">
                  <TestCard test={test} />
                </div>
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
                <h3 className="text-lg font-semibold text-mi-text md:text-xl">
                  Ready for another sitting?
                </h3>
                <p className="mt-1 text-sm leading-6 text-mi-muted">
                  All 20 assessments are free. Pick a theme above or start Adult ADHD — the most
                  popular screen.
                </p>
              </div>
            </div>
            <Link
              to="/test/adhd"
              className="btn-primary mt-4 w-full shrink-0 !px-5 !py-3 !text-base sm:w-auto md:mt-0"
            >
              Start Adult ADHD →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
