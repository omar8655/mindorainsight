import { Outlet, useLocation } from 'react-router-dom'
import { CookieConsent } from '@/components/layout/CookieConsent'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export function PublicLayout() {
  const { pathname } = useLocation()
  const inAssessmentPortal = pathname.startsWith('/test/')
  const hideFooter = inAssessmentPortal || pathname.startsWith('/report/')

  return (
    <div className="flex min-h-[100dvh] min-h-screen flex-col overflow-x-hidden bg-mi-canvas">
      {!inAssessmentPortal && (
        <div className="report-no-print" data-site-chrome>
          <SiteHeader />
        </div>
      )}
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
      {!hideFooter && (
        <div className="report-no-print safe-pb" data-site-chrome>
          <SiteFooter />
        </div>
      )}
      <CookieConsent />
    </div>
  )
}
