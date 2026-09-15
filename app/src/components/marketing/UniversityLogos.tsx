import { useI18n } from '@/i18n/I18nProvider'

const institutions = [
  { name: 'Harvard', src: '/images/unis/harvard.svg' },
  { name: 'Oxford', src: '/images/unis/oxford.svg' },
  { name: 'Cambridge', src: '/images/unis/cambridge.svg' },
  { name: 'MIT', src: '/images/unis/mit.svg' },
]

export function UniversityLogos({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n()

  return (
    <div
      className={
        compact
          ? 'border-y border-mi-border bg-mi-canvas/80 px-4 py-5'
          : 'rounded-2xl border border-mi-border bg-mi-canvas/70 px-4 py-5 md:px-6'
      }
    >
      <div className={compact ? 'container' : undefined}>
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-mi-muted">
          {t.about.logosLabel}
        </p>
        <ul className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-5 sm:gap-8">
          {institutions.map((uni) => (
            <li key={uni.name} className="flex w-[64px] flex-col items-center gap-1.5 sm:w-[72px]">
              <img
                src={uni.src}
                alt=""
                width={72}
                height={72}
                className="h-12 w-12 object-contain sm:h-14 sm:w-14"
              />
              <span className="text-[10px] font-medium text-mi-muted">{uni.name}</span>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-4 max-w-xl text-center text-[9px] leading-4 text-mi-muted/80 sm:text-[10px]">
          {t.about.logosFinePrint}
        </p>
      </div>
    </div>
  )
}
