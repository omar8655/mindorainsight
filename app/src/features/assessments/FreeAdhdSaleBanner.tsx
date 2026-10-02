import { Link } from 'react-router-dom'
import { SalePriceBadge } from '@/components/marketing/SalePriceBadge'
import { SaleCtaLink } from '@/features/sale/SaleCtaLink'
import { useCurrency } from '@/features/currency/CurrencyProvider'

const FREE_TESTS_HREF = '/library'

/** Dark sale strip — points to the 20 free-tests hub. */
export function FreeAdhdSaleBanner() {
  const { wasNowFreeLine } = useCurrency()

  return (
    <div className="mx-auto mb-5 w-full max-w-2xl sm:mb-6">
      <Link
        to={FREE_TESTS_HREF}
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
            Enter the free library — 20 research-grade assessments. Serious depth. $0.
          </span>
          <span className="mt-1 block text-xs text-[#9fd9b8]">{wasNowFreeLine}</span>
        </span>
      </Link>
      <div className="mt-3 flex justify-center">
        <SaleCtaLink to={FREE_TESTS_HREF} className="w-full sm:w-auto">
          Enter the free library
        </SaleCtaLink>
      </div>
    </div>
  )
}
