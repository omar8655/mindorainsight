import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import {
  AdminContactsPage,
  AdminDealsPage,
  AdminLeadsPage,
  AdminOverviewPage,
  AdminTablePage,
} from '@/features/crm/AdminPages'
import { AdminLayout } from '@/layouts/AdminLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { AboutPage } from '@/pages/AboutPage'
import { CancelPage } from '@/pages/CancelPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { ContactPage } from '@/pages/ContactPage'
import { PrivacyPage, SubscriptionDocPage, TermsPage } from '@/pages/DocsPages'
import { FaqPage } from '@/pages/FaqPage'
import { FreeTestsPage } from '@/pages/FreeTestsPage'
import { HomePage } from '@/pages/HomePage'
import { LibraryPage } from '@/pages/LibraryPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PortalPage } from '@/pages/PortalPage'
import { PricingPage } from '@/pages/PricingPage'
import { ReportPage } from '@/pages/ReportPage'
import { TestPage } from '@/pages/TestPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="free-tests" element={<FreeTestsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="contacts" element={<Navigate to="/contact" replace />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="portal" element={<PortalPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="cancel" element={<CancelPage />} />
          <Route path="test/:slug" element={<TestPage />} />
          <Route path="report/:slug" element={<ReportPage />} />
          <Route path="docs/terms" element={<TermsPage />} />
          <Route path="docs/privacy" element={<PrivacyPage />} />
          <Route path="docs/subscription" element={<SubscriptionDocPage />} />
          <Route path="docs/billing" element={<Navigate to="/docs/subscription" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminOverviewPage />} />
          <Route path="leads" element={<AdminLeadsPage />} />
          <Route path="contacts" element={<AdminContactsPage />} />
          <Route path="deals" element={<AdminDealsPage />} />
          <Route
            path="assessments"
            element={
              <AdminTablePage
                title="Assessments"
                rows={[
                  ['Assessment', 'Completions', 'Avg score'],
                  ['Work Focus Patterns', '1,204', '72'],
                  ['EQ for Teams', '986', '68'],
                  ['Career Path Fit', '754', '71'],
                ]}
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
