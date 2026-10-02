import { BrandLogo } from '@/components/brand/BrandLogo'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { useI18n } from '@/i18n/I18nProvider'

type AssessmentPortalShellProps = {
  children: React.ReactNode
  /** Optional subtle label under the centered brand */
  eyebrow?: string
}

/**
 * Immersive assessment portal chrome — centered MindoraInsight, no site nav.
 * Language switcher stays available; questions remain English (honest notice when locale ≠ en).
 */
export function AssessmentPortalShell({
  children,
  eyebrow = 'Assessment portal',
}: AssessmentPortalShellProps) {
  const { code } = useI18n()
  const questionsInEnglish = code !== 'en'

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-2 sm:px-4">
      <div className="mb-5 flex w-full flex-col items-center pt-1 sm:mb-7 sm:pt-2">
        <div className="flex w-full items-start justify-between gap-2">
          <span className="w-10 shrink-0" aria-hidden />
          <div className="flex min-w-0 flex-col items-center">
            <BrandLogo size={40} to="/" className="justify-center" />
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-mi-muted">
              {eyebrow}
            </p>
          </div>
          <div className="shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
        {questionsInEnglish ? (
          <p className="mt-3 max-w-sm rounded-lg border border-mi-border bg-white px-3 py-2 text-center text-[11px] leading-4 text-mi-muted">
            Assessment questions and legal notices are in English. Site chrome follows your language
            choice.
          </p>
        ) : null}
      </div>
      {children}
    </div>
  )
}
