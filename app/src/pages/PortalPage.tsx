import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '@/components/layout/Seo'
import { getPortalStats } from '@/application/portal'
import { isClerkConfigured } from '@/config/env'
import { getAssessmentCopy } from '@/i18n/assessmentCopy'
import { useI18n } from '@/i18n/I18nProvider'
import type { PortalStats } from '@/ports/portal'

export function PortalPage() {
  const { t, code } = useI18n()
  const [stats, setStats] = useState<PortalStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await getPortalStats()
        if (alive) setStats(data)
      } catch {
        if (alive) setError('Could not load portal progress.')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  return (
    <>
      <Seo title={t.portal.title} description={t.portal.subtitle} noindex />
      <section className="bg-mi-canvas py-8 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:py-14">
        <div className="container">
          <div className="mb-6 max-w-2xl sm:mb-8">
            <h1 className="text-2xl font-semibold text-mi-text sm:text-3xl md:text-4xl">{t.portal.title}</h1>
            <p className="mt-2 text-mi-muted">{t.portal.subtitle}</p>
            {!isClerkConfigured && (
              <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                {t.portal.signInPrompt} Local progress is stored on this device until Clerk + Supabase
                sync is enabled.
              </p>
            )}
          </div>

          {loading && <p className="text-mi-muted">{t.portal.loading}</p>}
          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {stats && (
            <>
              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-mi-border bg-white p-5 shadow-sm">
                  <p className="text-sm text-mi-muted">{t.portal.completed}</p>
                  <p className="mt-2 text-4xl font-bold text-mi-text">{stats.completedCount}</p>
                </div>
                <div className="rounded-2xl border border-mi-border bg-white p-5 shadow-sm">
                  <p className="text-sm text-mi-muted">{t.portal.inProgress}</p>
                  <p className="mt-2 text-4xl font-bold text-mi-text">{stats.inProgressCount}</p>
                </div>
              </div>

              {stats.recent.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-mi-border bg-white p-8 text-center">
                  <p className="font-semibold text-mi-text">{t.portal.empty}</p>
                  <Link to="/library" className="btn-primary mt-5 inline-flex">
                    {t.portal.continueLibrary}
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  {stats.recent.map((item) => {
                    const copy = getAssessmentCopy(code, item.assessmentSlug)
                    return (
                      <li
                        key={item.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-mi-border bg-white px-4 py-4 shadow-sm"
                      >
                        <div>
                          <p className="font-semibold text-mi-text">{copy.title}</p>
                          <p className="text-xs text-mi-muted">
                            {item.completedAt
                              ? new Date(item.completedAt).toLocaleString(code)
                              : '—'}
                          </p>
                        </div>
                        <Link
                          to={`/test/${item.assessmentSlug}`}
                          className="text-sm font-semibold text-mi-green hover:underline"
                        >
                          {t.common.tryNow}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
