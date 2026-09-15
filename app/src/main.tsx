import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { CurrencyProvider } from '@/features/currency/CurrencyProvider'
import { I18nProvider } from '@/i18n/I18nProvider'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <I18nProvider>
        <CurrencyProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CurrencyProvider>
      </I18nProvider>
    </HelmetProvider>
  </StrictMode>,
)
