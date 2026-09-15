import { type FormEvent, useState } from 'react'
import { Seo } from '@/components/layout/Seo'
import { COMPANY } from '@/data/legal/company'

export function ContactPage() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <Seo title="Contact" description={`Contact ${COMPANY.brand} at ${COMPANY.supportEmail}`} />
      <section className="bg-mi-canvas py-12 md:py-16">
        <div className="container mx-auto max-w-[720px]">
          <h1 className="font-display mb-4 text-center text-[32px] font-semibold text-mi-text md:text-[44px]">
            We&apos;re here to help
          </h1>
          <p className="mb-8 text-center text-mi-muted">
            Questions about plans, reports, referrals, or your account — reach out.
          </p>

          <div className="mb-6 rounded-2xl border border-mi-border bg-white p-5 shadow-[var(--mi-card-shadow)] sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-mi-muted">Contact</p>
            <p className="mt-2 text-sm leading-6 text-mi-text">
              Email:{' '}
              <a className="font-semibold text-mi-forest hover:underline" href={`mailto:${COMPANY.supportEmail}`}>
                {COMPANY.supportEmail}
              </a>
            </p>
            <p className="mt-3 text-sm leading-6 text-mi-muted">
              <span className="font-semibold text-mi-text">Address</span>
              <br />
              {COMPANY.officeAddress}
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-mi-border bg-white p-6 shadow-[var(--mi-card-shadow)] md:p-8"
          >
            {sent ? (
              <p className="rounded-xl bg-mi-green-soft p-4 text-mi-text">
                Thanks — message received. We&apos;ll reply at the email you provided.
              </p>
            ) : (
              <div className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold">Name</span>
                  <input
                    required
                    className="w-full rounded-lg border border-mi-border px-3 py-2.5 outline-none focus:border-mi-green"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold">Email</span>
                  <input
                    type="email"
                    required
                    className="w-full rounded-lg border border-mi-border px-3 py-2.5 outline-none focus:border-mi-green"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold">Message</span>
                  <textarea
                    required
                    rows={5}
                    className="w-full rounded-lg border border-mi-border px-3 py-2.5 outline-none focus:border-mi-green"
                  />
                </label>
                <button type="submit" className="btn-primary w-full">
                  Send message
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  )
}
