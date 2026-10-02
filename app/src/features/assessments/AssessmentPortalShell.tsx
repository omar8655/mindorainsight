import { BrandLogo } from '@/components/brand/BrandLogo'

type AssessmentPortalShellProps = {
  children: React.ReactNode
  /** Optional subtle label under the centered brand */
  eyebrow?: string
}

/**
 * Immersive assessment portal chrome — centered MindoraInsight, no site nav / language switcher.
 */
export function AssessmentPortalShell({
  children,
  eyebrow = 'Assessment portal',
}: AssessmentPortalShellProps) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-2 sm:px-4">
      <div className="mb-5 flex flex-col items-center pt-[max(0.5rem,env(safe-area-inset-top))] sm:mb-7 sm:pt-[max(0.75rem,env(safe-area-inset-top))]">
        <BrandLogo size={40} to="/" className="justify-center" />
        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-mi-muted">
          {eyebrow}
        </p>
      </div>
      {children}
    </div>
  )
}
