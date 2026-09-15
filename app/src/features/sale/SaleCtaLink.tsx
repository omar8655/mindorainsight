import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { SalePriceBadge } from '@/components/marketing/SalePriceBadge'
import { useCurrency } from '@/features/currency/CurrencyProvider'

type SaleCtaLinkProps = {
  to: string
  children?: ReactNode
  className?: string
  /** Show the mint ~~$49~~ Free · $0 chip inside the button */
  showBadge?: boolean
  variant?: 'primary' | 'outline' | 'hero'
}

/**
 * Primary free-course CTA with the sale chip baked into the button.
 */
export function SaleCtaLink({
  to,
  children = 'Start free ADHD test',
  className = '',
  showBadge = true,
  variant = 'primary',
}: SaleCtaLinkProps) {
  const base =
    variant === 'outline'
      ? 'btn-outline'
      : variant === 'hero'
        ? 'btn-primary hero-cta'
        : 'btn-primary'

  return (
    <Link
      to={to}
      className={`${base} inline-flex items-center justify-center gap-2 !px-4 !py-3.5 ${className}`}
    >
      {showBadge && (
        <SalePriceBadge
          priceUsd={0}
          size="sm"
          className={variant === 'outline' ? '' : '!bg-white/95 shadow-sm'}
        />
      )}
      <span className="font-bold">{children}</span>
    </Link>
  )
}

export function SaleCtaLabel({ free }: { free: boolean }) {
  const { listPrice } = useCurrency()
  if (!free) return null
  return (
    <span className="inline-flex items-center gap-1.5">
      <SalePriceBadge priceUsd={0} size="sm" className="!bg-white/95" />
      <span>was {listPrice.replace(/\.00$/, '')}</span>
    </span>
  )
}
