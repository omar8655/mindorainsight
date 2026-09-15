import { Link } from 'react-router-dom'
import { SalePriceBadge } from '@/components/marketing/SalePriceBadge'
import { ADHD_SCREENING_SLUG } from '@/data/adhdScreening'
import { useCurrency } from '@/features/currency/CurrencyProvider'
import { SaleCtaLink } from '@/features/sale/SaleCtaLink'

const FREE_ADHD_HREF = `/test/${ADHD_SCREENING_SLUG}`

/** Dark sale strip — localized list / free pricing. */
export function FreeAdhdSaleBanner() {
  const { listPrice, wasNowFreeLine } = useCurrency()
  const shortList = listPrice.replace(/\.00$/, '')

  return (
    <div className="mx-auto mb-5 w-full max-w-2xl sm:mb-6">
      <Link
        to={FREE_ADHD_HREF}
        className="flex w-full items-start gap-3 rounded-2xl border-2 border-mi-green/55 bg-gradient-to-br from-[#0c1f17] to-[#143528] px-4 py-3.5 text-start shadow-sm transition active:scale-[0.99] sm:px-5"
      >
        <span
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mi-green text-sm font-bold text-white"
          aria-hidden
        >
          →
        </span>
        <span className="min-w-0">
          <span className="mb-1 inline-flex">
            <SalePriceBadge priceUsd={0} size="sm" />
          </span>
          <span className="mt-1.5 block text-sm font-bold leading-5 text-white">
            New here? Grab the free ADHD test (normally {shortList}) — start in under a minute.
          </span>
          <span className="mt-1 block text-xs text-[#9fd9b8]">{wasNowFreeLine}</span>
        </span>
      </Link>
      <div className="mt-3 flex justify-center">
        <SaleCtaLink to={FREE_ADHD_HREF} className="w-full sm:w-auto">
          Start free ADHD test
        </SaleCtaLink>
      </div>
    </div>
  )
}
