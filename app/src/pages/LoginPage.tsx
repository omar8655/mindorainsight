import { SignIn, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { Seo } from '@/components/layout/Seo'
import { isClerkConfigured } from '@/config/env'
import { useI18n } from '@/i18n/I18nProvider'

export function LoginPage() {
  const { t } = useI18n()

  if (!isClerkConfigured) {
    return (
      <>
        <Seo title="Login" noindex />
        <section className="bg-mi-canvas px-4 py-12 md:py-16">
          <div className="mx-auto max-w-md rounded-2xl border border-mi-border bg-white p-7 text-center shadow-[var(--mi-card-shadow)]">
            <h1 className="mb-3 text-2xl font-semibold text-mi-text">Clerk setup required</h1>
            <p className="mb-6 text-sm leading-6 text-mi-muted">
              Add <code className="rounded bg-mi-canvas px-1">VITE_CLERK_PUBLISHABLE_KEY</code> to{' '}
              <code className="rounded bg-mi-canvas px-1">app/.env</code>, enable Clerk ↔ Supabase
              third-party auth (not JWT templates), then restart the dev server.
            </p>
            <Link to="/library" className="btn-primary inline-flex">
              {t.library.backToLibrary}
            </Link>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Seo title="Login" noindex />
      <section className="bg-mi-canvas px-4 py-10 md:py-14">
        <div className="mx-auto flex max-w-lg flex-col items-center">
          <SignedOut>
            <SignIn
              routing="hash"
              signUpUrl="/login#/sign-up"
              forceRedirectUrl="/portal"
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-none border border-mi-border rounded-2xl',
                },
              }}
            />
          </SignedOut>
          <SignedIn>
            <div className="w-full rounded-2xl border border-mi-border bg-white p-8 text-center shadow-[var(--mi-card-shadow)]">
              <h1 className="mb-3 text-2xl font-semibold text-mi-text">You&apos;re signed in</h1>
              <p className="mb-6 text-sm text-mi-muted">{t.portal.subtitle}</p>
              <div className="mb-6 flex justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>
              <Link to="/portal" className="btn-primary inline-flex">
                {t.portal.title}
              </Link>
            </div>
          </SignedIn>
        </div>
      </section>
    </>
  )
}
