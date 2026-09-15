import { MI_TRUST } from '@/components/brand/trustAssets'

type AdhdTrustSupportProps = {
  /** compact = in-flow strip during questions; full = gate / results; cover = orb only */
  variant?: 'full' | 'compact' | 'cover'
}

/**
 * MindoraInsight trust cue for Adult ADHD Pattern Screen.
 * Keep gate/results short — no logo dump, no essay. Research framing stays light.
 */
export function AdhdTrustSupport({ variant = 'full' }: AdhdTrustSupportProps) {
  if (variant === 'compact') {
    return (
      <aside className="report-no-print rounded-xl border border-mi-border bg-white/95 px-3.5 py-2.5 shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-mi-green">MindoraInsight</p>
        <p className="mt-0.5 text-xs leading-4 text-mi-muted">
          Go at your pace. Educational screen — not a diagnosis.
        </p>
      </aside>
    )
  }

  if (variant === 'cover') {
    return (
      <div className="mx-auto max-w-[180px]">
        <img
          src={MI_TRUST.orb}
          alt="MindoraInsight support mark"
          width={180}
          height={180}
          className="mx-auto h-auto w-full object-contain"
          draggable={false}
        />
        <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-mi-muted">
          Calm · Private · Educational
        </p>
      </div>
    )
  }

  // Slim full card — phone-first, no side logo, short copy
  return (
    <aside className="rounded-2xl border border-mi-border bg-white px-4 py-4 shadow-sm sm:px-5 sm:py-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mi-blue">Adult ADHD Test</p>
      <h2 className="font-display mt-1 text-base font-semibold leading-snug text-mi-forest sm:text-lg">
        Answer honestly, at your pace
      </h2>
      <p className="mt-1.5 text-[13px] leading-5 text-mi-muted sm:text-sm sm:leading-6">
        Educational only — not a diagnosis. Your scores are for reflection and, if you want, a
        conversation with a clinician.
      </p>
      <p className="mt-2 text-[11px] leading-4 text-mi-muted/90">
        Tone informed by alliance research (Horvath &amp; Symonds, 1991). Domains follow Barkley
        educational framing.
      </p>
    </aside>
  )
}
