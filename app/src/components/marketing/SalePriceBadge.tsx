import { useCurrency } from '@/features/currency/CurrencyProvider'
import { SALE_LIST_PRICE_USD } from '@/features/sale/saleTactic'

/** Sale / free pricing chip — localized ~~list~~ Free · zero mint pill. */
export function SalePriceBadge({
  priceUsd = SALE_LIST_PRICE_USD,
  className = '',
  size = 'md',
}: {
  priceUsd?: number
  className?: string
  size?: 'sm' | 'md'
}) {
  const { money, listPrice, saleFreeLabel } = useCurrency()
  const free = priceUsd === 0
  const text = size === 'sm' ? 'text-[10px]' : 'text-xs'
  const pad = size === 'sm' ? 'px-2 py-0.5' : 'px-2.5 py-1'

  if (!free) {
    return (
      <span className={`badge badge-meta font-bold text-mi-forest ${text} ${pad} ${className}`}>
        {money(priceUsd)}
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#E7F6EE] font-bold text-[#1a2e24] ${text} ${pad} ${className}`}
    >
      <span className="font-semibold text-[#8a9a92] line-through decoration-[#8a9a92]">
        {listPrice}
      </span>
      <span>{saleFreeLabel}</span>
    </span>
  )
}

export function SalePriceLine({ priceUsd = SALE_LIST_PRICE_USD }: { priceUsd?: number }) {
  const { money, listPrice, saleFreeLabel } = useCurrency()
  if (priceUsd !== 0) {
    return <span className="font-bold text-mi-forest">{money(priceUsd)}</span>
  }
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span className="text-sm text-white/45 line-through decoration-white/50">{listPrice}</span>
      <span className="rounded-full bg-mi-green px-2.5 py-0.5 text-xs font-bold text-white">
        {saleFreeLabel}
      </span>
    </span>
  )
}
