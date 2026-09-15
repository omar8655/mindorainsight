import type { ReactNode } from 'react'
import { Seo } from '@/components/layout/Seo'
import { COMPANY } from '@/data/legal/company'
import { privacyBlocks, PRIVACY_UPDATED } from '@/data/legal/privacy'
import { termsBlocks, TERMS_UPDATED, type LegalBlock } from '@/data/legal/terms'

function LegalBlocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="space-y-4 text-[15px] leading-7 text-mi-muted">
      {blocks.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h2
              key={i}
              className="font-display pt-4 text-xl font-semibold text-mi-forest first:pt-0 sm:text-2xl"
            >
              {block.text}
            </h2>
          )
        }
        if (block.type === 'h3') {
          return (
            <h3 key={i} className="pt-2 text-base font-semibold text-mi-text">
              {block.text}
            </h3>
          )
        }
        if (block.type === 'ul') {
          return (
            <ul key={i} className="list-disc space-y-1.5 ps-5">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )
        }
        if (block.type === 'note') {
          return (
            <p
              key={i}
              className="rounded-xl border border-amber-200/80 bg-amber-50 px-3.5 py-3 text-sm font-semibold text-amber-950"
            >
              {block.text}
            </p>
          )
        }
        return <p key={i}>{block.text}</p>
      })}
    </div>
  )
}

export function DocPage({
  title,
  updated,
  children,
}: {
  title: string
  updated?: string
  children: ReactNode
}) {
  return (
    <>
      <Seo title={title} />
      <section className="bg-white py-12 md:py-16">
        <div className="container max-w-[800px]">
          <h1 className="font-display mb-2 text-3xl font-semibold text-mi-text md:text-4xl">{title}</h1>
          {updated ? (
            <p className="mb-6 text-sm text-mi-muted">Last updated {updated}.</p>
          ) : (
            <div className="mb-6" />
          )}
          {children}
        </div>
      </section>
    </>
  )
}

export function TermsPage() {
  return (
    <DocPage title="Terms & Conditions" updated={TERMS_UPDATED}>
      <LegalBlocks blocks={termsBlocks} />
    </DocPage>
  )
}

export function PrivacyPage() {
  return (
    <DocPage title="Privacy Policy" updated={PRIVACY_UPDATED}>
      <LegalBlocks blocks={privacyBlocks} />
    </DocPage>
  )
}

export function SubscriptionDocPage() {
  return (
    <DocPage title="Billing policy" updated={TERMS_UPDATED}>
      <div className="space-y-4 text-[15px] leading-7 text-mi-muted">
        <p>
          This Billing policy explains how {COMPANY.brand} handles trial memberships, subscriptions, renewals,
          cancellations, and refunds. Prices and currency shown on the site may localise by region; the amount
          and currency confirmed at checkout control what you pay.
        </p>

        <h2 className="font-display pt-2 text-xl font-semibold text-mi-forest">Plans and disclosure</h2>
        <p>
          Before you pay, checkout shows the plan name, price, currency, trial length (if any), subscription
          interval, and renewal terms. By completing payment you authorise {COMPANY.brand} and/or its payment
          processors to charge the disclosed Fees, including renewals until you cancel.
        </p>

        <h2 className="font-display pt-2 text-xl font-semibold text-mi-forest">Trials</h2>
        <p>
          Where a Trial Membership is offered, access begins when payment succeeds for the period shown at
          checkout. Unless you cancel before conversion, the trial may become a renewing Subscription under the
          terms disclosed to you.
        </p>

        <h2 className="font-display pt-2 text-xl font-semibold text-mi-forest">Renewals</h2>
        <p>
          Subscriptions renew automatically at the start of each period unless cancelled. Failed renewals may be
          retried using authorised payment credentials as allowed by law and card-network rules. A failed charge
          alone does not cancel your Subscription.
        </p>

        <h2 className="font-display pt-2 text-xl font-semibold text-mi-forest">Cancellation</h2>
        <p>
          Cancel anytime via{' '}
          <a className="font-semibold text-mi-forest hover:underline" href="/cancel">
            Cancel plan
          </a>{' '}
          or by emailing{' '}
          <a className="font-semibold text-mi-forest hover:underline" href={`mailto:${COMPANY.supportEmail}`}>
            {COMPANY.supportEmail}
          </a>{' '}
          from your account email. Cancel before the next renewal date to avoid the next charge. Cancellation
          stops future renewals; it does not refund Fees already charged except where required by law.
        </p>

        <h2 className="font-display pt-2 text-xl font-semibold text-mi-forest">Refunds</h2>
        <p>
          Digital access is often available immediately. Refunds are assessed case-by-case and are not guaranteed
          except where the law requires. Contact {COMPANY.supportEmail} with your account email, purchase details,
          and reason. Please contact us before opening a chargeback.
        </p>

        <h2 className="font-display pt-2 text-xl font-semibold text-mi-forest">More detail</h2>
        <p>
          Full legal terms live in our{' '}
          <a className="font-semibold text-mi-forest hover:underline" href={COMPANY.termsUrl}>
            Terms & Conditions
          </a>{' '}
          and{' '}
          <a className="font-semibold text-mi-forest hover:underline" href={COMPANY.privacyUrl}>
            Privacy Policy
          </a>
          .
        </p>
        <p>Address: {COMPANY.officeAddress}.</p>
      </div>
    </DocPage>
  )
}
