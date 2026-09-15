import { Link } from 'react-router-dom'

type BrandLogoProps = {
  /** Show wordmark next to the mark */
  withWordmark?: boolean
  /** Invert / light treatment for dark surfaces */
  onDark?: boolean
  /** Mark size in px */
  size?: number
  className?: string
  to?: string
  onClick?: () => void
}

export function BrandLogo({
  withWordmark = true,
  onDark = false,
  size = 36,
  className = '',
  to = '/',
  onClick,
}: BrandLogoProps) {
  const mark = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/logo.svg"
        alt=""
        width={size}
        height={size}
        className="shrink-0"
        style={{ width: size, height: size }}
      />
      {withWordmark && (
        <span
          className={`font-display text-[1.05em] font-semibold tracking-tight ${
            onDark ? 'text-white' : 'text-mi-forest'
          }`}
          style={{ fontSize: Math.max(16, Math.round(size * 0.52)) }}
        >
          Mindora
          <span className={onDark ? 'text-[#7ddea8]' : 'text-mi-green'}>Insight</span>
        </span>
      )}
    </span>
  )

  if (!to) return mark

  return (
    <Link to={to} onClick={onClick} aria-label="MindoraInsight home" className="inline-flex shrink-0">
      {mark}
    </Link>
  )
}
