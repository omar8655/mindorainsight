import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '@/components/layout/Seo'
import { COMPANY } from '@/data/legal/company'

export function CancelPage() {
  const [done, setDone] = useState(false)
  const [email, setEmail] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setDone(true)
  }

  return (
    <>
      <Seo
        title="Cancel plan"
        description={`Cancel your ${COMPANY.brand} trial or subscription. Contact ${COMPANY.supportEmail}.`}
      />
      <section className="bg-mi-canvas py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-lg rounded-2xl border border-mi-border bg-white p-6 shadow-[var(--mi-card-shadow)] sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-mi-muted">Billing</p>
            <h1 className="font-display mt-1 text-3xl font-semibold text-mi-text">Cancel plan</h1>
            <p className="mt-3 text-sm leading-6 text-mi-muted">
              To stop future renewals, cancel before your next billing date. You can also email{' '}
              <a className="font-semibold text-mi-forest hover:underline" href={`mailto:${COMPANY.supportEmail}`}>
                {COMPANY.supportEmail}
              </a>{' '}
              from the address on your account.
            </p>

            {done ? (
              <div className="mt-6 rounded-xl border border-mi-green/30 bg-mi-green-soft p-4 text-mi-forest">
                <p className="font-semibold">Request received</p>
                <p className="mt-1 text-sm text-mi-muted">
                  We will confirm cancellation for <span className="font-medium text-mi-text">{email}</span>{' '}
                  shortly. Check your inbox (and spam) for a confirmation.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link to="/" className="btn-primary">
                    Home
                  </Link>
                  <Link to="/docs/subscription" className="btn-outline">
                    Billing policy
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-mi-text">Account email</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-mi-border px-3 py-2.5 outline-none focus:border-mi-green"
                  />
                </label>
                <button type="submit" className="btn-primary w-full">
                  Request cancellation
                </button>
                <p className="text-center text-xs text-mi-muted">
                  Prefer self-serve later? Portal cancellation will appear once accounts are fully connected.
                </p>
              </form>
            )}

            <p className="mt-6 border-t border-mi-border pt-4 text-xs leading-5 text-mi-muted">
              Address: {COMPANY.officeAddress}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
