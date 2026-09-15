import { Link } from 'react-router-dom'
import { MI_TRUST } from '@/components/brand/trustAssets'

/**
 * Site-wide trust band — original MindoraInsight mark + calm claims.
 * Distinct from TestLibrary collage/emblem patterns.
 */
export function SiteTrustBand() {
  return (
    <section className="border-y border-mi-border bg-gradient-to-br from-[#F7FBF9] via-white to-[#EDF2FB]">
      <div className="container flex flex-col items-center gap-6 py-10 text-center md:flex-row md:items-center md:gap-10 md:py-12 md:text-start">
        <img
          src={MI_TRUST.orb}
          alt=""
          width={112}
          height={112}
          className="h-24 w-24 shrink-0 object-contain md:h-28 md:w-28"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-mi-blue">Built on clarity</p>
          <h2 className="font-display mt-1 text-xl font-semibold text-mi-forest md:text-2xl">
            Trust starts with how the product feels
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-mi-muted md:text-base">
            Soft visuals, plain language, and honest limits — educational assessments you can share
            with a professional, not a theatrical quiz. Our marks and copy are MindoraInsight’s own.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
            <span className="rounded-full bg-mi-green-soft px-3 py-1 text-xs font-semibold text-mi-forest">
              Private by default
            </span>
            <span className="rounded-full bg-mi-green-soft px-3 py-1 text-xs font-semibold text-mi-forest">
              Not a diagnosis
            </span>
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-mi-blue">
              Clinician-ready language
            </span>
          </div>
        </div>
        <Link to="/about" className="btn-outline shrink-0 !px-5 !py-2.5 !text-sm">
          Why we built this
        </Link>
      </div>
    </section>
  )
}
