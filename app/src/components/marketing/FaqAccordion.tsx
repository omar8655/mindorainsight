import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nProvider'

type Faq = { question: string; answer: string }

export function FaqAccordion({ items, showCta = false }: { items: Faq[]; showCta?: boolean }) {
  const { t } = useI18n()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-8">
      <div className="w-full space-y-3">
        {items.map((item, index) => {
          const open = openIndex === index
          return (
            <div key={item.question} className="overflow-hidden rounded-xl bg-[#f3f4f6]">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
              >
                <span className="text-base font-semibold text-mi-text md:text-lg">{item.question}</span>
                <span className={`text-mi-muted transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              {open && (
                <div className="border-t border-black/5 px-5 pb-5 pt-1 text-[15px] leading-7 text-mi-muted md:px-6">
                  {item.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
      {showCta && (
        <Link to="/library" className="btn-primary">
          {t.faq.cta}
        </Link>
      )}
    </div>
  )
}
