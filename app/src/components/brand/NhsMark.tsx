type NhsMarkProps = {
  className?: string
  /** Visual size — cards use xs/sm; gates use md/lg */
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

/**
 * NHS wordmark for referral / healthcare-gated surfaces.
 */
export function NhsMark({ className = '', size = 'xs' }: NhsMarkProps) {
  const dims =
    size === 'lg'
      ? { w: 96, h: 38 }
      : size === 'md'
        ? { w: 72, h: 29 }
        : size === 'sm'
          ? { w: 44, h: 18 }
          : { w: 34, h: 14 }

  return (
    <span
      className={`inline-flex items-center rounded-md border border-[#005EB8]/20 bg-white px-1.5 py-1 ${className}`}
      title="NHS"
    >
      <img
        src="/brand/nhs-logo.svg"
        alt="NHS"
        width={dims.w}
        height={dims.h}
        className="block object-contain"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </span>
  )
}
