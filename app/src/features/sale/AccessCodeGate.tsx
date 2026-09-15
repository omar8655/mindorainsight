import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { SalePriceBadge } from '@/components/marketing/SalePriceBadge'
import { useCurrency } from '@/features/currency/CurrencyProvider'
import { SALE_ACCESS_CODE } from '@/features/sale/saleTactic'

const UNLOCK_KEY = 'mi.sale.access_code.unlocked'

export function isAccessCodeUnlocked() {
  try {
    return sessionStorage.getItem(UNLOCK_KEY) === '1'
  } catch {
    return false
  }
}

function persistUnlock() {
  try {
    sessionStorage.setItem(UNLOCK_KEY, '1')
  } catch {
    // no-op
  }
}

type AccessCodeGateProps = {
  courseTitle: string
  onUnlocked: () => void
}

/** Option 2 — ad materials print code 1234 for free course access. */
export function AccessCodeGate({ courseTitle, onUnlocked }: AccessCodeGateProps) {
  const { saleFreeLabel } = useCurrency()
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function submit(e: FormEvent) {
    e.preventDefault()
    const next = code.trim()
    if (next !== SALE_ACCESS_CODE) {
      setError('That code is not valid. Check your ad or flyer.')
      return
    }
    persistUnlock()
    onUnlocked()
  }

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-mi-border bg-white shadow-[var(--mi-card-shadow)]">
      <div className="border-b border-mi-border/70 px-4 py-5 text-center sm:px-6">
        <div className="mb-3 flex justify-center">
          <SalePriceBadge priceUsd={0} />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mi-blue">Promo access</p>
        <h1 className="font-display mt-1.5 text-[1.35rem] font-semibold text-mi-forest sm:text-2xl">
          Enter your free-access code
        </h1>
        <p className="mx-auto mt-2 max-w-[34ch] text-[13px] leading-5 text-mi-muted sm:text-sm">
          Ads and flyers include a short code to unlock{' '}
          <span className="font-semibold text-mi-text">{courseTitle}</span> at {saleFreeLabel}.
        </p>
      </div>

      <form className="space-y-4 px-4 py-5 sm:px-6" onSubmit={submit} noValidate>
        <div>
          <label htmlFor="sale-access-code" className="block text-sm font-semibold text-mi-text">
            Access code
          </label>
          <input
            ref={inputRef}
            id="sale-access-code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={8}
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\s/g, ''))
              setError(null)
            }}
            placeholder="Enter code"
            className="mt-2 w-full rounded-xl border border-mi-border bg-white px-4 py-3.5 text-center text-lg font-bold tracking-[0.2em] text-mi-forest outline-none focus:border-mi-green focus:ring-2 focus:ring-mi-green/25"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        <button type="submit" className="btn-primary flex w-full items-center justify-center gap-2 !py-3.5">
          <SalePriceBadge priceUsd={0} size="sm" className="!bg-white" />
          Unlock free access
        </button>
        <p className="text-center text-[11px] text-mi-muted">From ads: use code {SALE_ACCESS_CODE}</p>
      </form>
    </div>
  )
}
