import { useState } from 'react'
import { AccessCodeGate, isAccessCodeUnlocked } from '@/features/sale/AccessCodeGate'
import { ScarcityMeter } from '@/features/sale/ScarcityMeter'
import {
  ACTIVE_SALE_TACTIC,
  saleTacticUsesCode,
  saleTacticUsesScarcity,
} from '@/features/sale/saleTactic'
import { scarcityIsOpen } from '@/features/sale/scarcityCounter'
import { SalePriceBadge } from '@/components/marketing/SalePriceBadge'
import { Link } from 'react-router-dom'

type FreeAccessGateProps = {
  courseTitle: string
  children: React.ReactNode
}

/**
 * Applies the active launch sale tactic before free ADHD (and similar) flows.
 * - open_sale: pass-through + optional chip
 * - access_code: require 1234
 * - scarcity_1000: show live spots; soft-close when full
 */
export function FreeAccessGate({ courseTitle, children }: FreeAccessGateProps) {
  const [codeOk, setCodeOk] = useState(() => isAccessCodeUnlocked())

  if (saleTacticUsesCode(ACTIVE_SALE_TACTIC) && !codeOk) {
    return <AccessCodeGate courseTitle={courseTitle} onUnlocked={() => setCodeOk(true)} />
  }

  if (saleTacticUsesScarcity(ACTIVE_SALE_TACTIC) && !scarcityIsOpen()) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-mi-border bg-white p-6 text-center shadow-sm">
        <SalePriceBadge priceUsd={0} />
        <h2 className="font-display mt-3 text-xl font-semibold text-mi-forest">Free cohort is full</h2>
        <p className="mt-2 text-sm text-mi-muted">
          All 1,000 free seats are taken for now. Browse the library or check plans for paid access.
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link to="/library" className="btn-outline justify-center">
            Back to library
          </Link>
          <Link to="/pricing" className="btn-primary justify-center">
            View plans
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {saleTacticUsesScarcity(ACTIVE_SALE_TACTIC) && (
        <div className="mx-auto mb-4 max-w-md">
          <ScarcityMeter />
        </div>
      )}
      {children}
    </div>
  )
}
