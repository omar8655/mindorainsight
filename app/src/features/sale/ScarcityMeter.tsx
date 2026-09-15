import { useEffect, useState } from 'react'
import { SALE_SCARCITY_CAP } from '@/features/sale/saleTactic'
import { readScarcityClaimed, scarcityRemaining } from '@/features/sale/scarcityCounter'

/** Live-feeling free-spot meter for option 3 (1–1000). */
export function ScarcityMeter({ compact = false }: { compact?: boolean }) {
  const [claimed, setClaimed] = useState(() => readScarcityClaimed())

  useEffect(() => {
    const tick = () => setClaimed(readScarcityClaimed())
    tick()
    const id = window.setInterval(tick, 4000)
    return () => window.clearInterval(id)
  }, [])

  const remaining = scarcityRemaining(claimed)
  const pct = Math.min(100, Math.round((claimed / SALE_SCARCITY_CAP) * 100))

  if (compact) {
    return (
      <p className="text-[11px] font-semibold tabular-nums text-mi-forest">
        Free spots · <span className="text-mi-green">{claimed.toLocaleString()}</span> /{' '}
        {SALE_SCARCITY_CAP.toLocaleString()} filled
      </p>
    )
  }

  return (
    <div className="rounded-2xl border border-mi-border bg-white px-4 py-3.5 shadow-sm sm:px-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mi-green">
            Limited free cohort
          </p>
          <p className="mt-1 text-sm font-semibold text-mi-forest">
            Spot{' '}
            <span className="tabular-nums text-mi-green">{Math.min(claimed + 1, SALE_SCARCITY_CAP)}</span>{' '}
            of {SALE_SCARCITY_CAP.toLocaleString()}
          </p>
        </div>
        <p className="text-xs font-semibold tabular-nums text-mi-muted">
          {remaining.toLocaleString()} left
        </p>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-mi-green to-[#5bc48a] transition-[width] duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-[11px] leading-4 text-mi-muted">
        Free seats fill in real time — not unlimited. Numbers refresh as people start the ADHD screen.
      </p>
    </div>
  )
}
