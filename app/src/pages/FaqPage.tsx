import { FaqAccordion } from '@/components/marketing/FaqAccordion'
import { Seo } from '@/components/layout/Seo'
import { faqs } from '@/data/content'
import { useCurrency } from '@/features/currency/CurrencyProvider'
import { faqJsonLd, organizationJsonLd } from '@/lib/structuredData'

export function FaqPage() {
  const { localize } = useCurrency()
  const items = faqs.map((f) => ({
    ...f,
    question: localize(f.question),
    answer: localize(f.answer),
  }))

  return (
    <>
      <Seo
        title="FAQ — Free ADHD Test & Assessments"
        description="Answers about MindoraInsight assessments, pricing, the free Adult ADHD Test, and what is (and is not) a clinical diagnosis."
        path="/faq"
        jsonLd={[organizationJsonLd(), faqJsonLd(items)]}
      />
      <section className="bg-white py-12 md:py-16">
        <div className="container flex flex-col items-center gap-10">
          <h1 className="text-center text-[32px] font-semibold text-mi-text md:text-[44px]">
            Frequently asked Questions
          </h1>
          <FaqAccordion items={items} showCta />
        </div>
      </section>
    </>
  )
}
