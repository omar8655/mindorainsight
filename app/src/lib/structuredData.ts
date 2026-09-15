import { COMPANY } from '@/data/legal/company'
import { ADHD_SCREENING_SLUG } from '@/data/adhdScreening'
import { absoluteUrl, SITE_ORIGIN } from '@/lib/seo'

/** Global Organization + WebSite schema for AI / Google rich results. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MindoraInsight',
    url: SITE_ORIGIN,
    logo: absoluteUrl('/brand/mindorainsight-brain-logo-forest.png'),
    email: COMPANY.supportEmail,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Level39, 39th Floor, One Canada Square, Canary Wharf Estate',
      addressLocality: 'London',
      postalCode: 'E14 5AB',
      addressCountry: 'GB',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: COMPANY.supportEmail,
      contactType: 'customer support',
      availableLanguage: ['English'],
    },
    sameAs: [SITE_ORIGIN],
    description:
      'MindoraInsight provides educational professional assessments including a free Adult ADHD Test.',
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MindoraInsight',
    url: SITE_ORIGIN,
    description:
      'Free Adult ADHD test and professional assessments for focus, personality, career, and growth.',
    publisher: { '@type': 'Organization', name: 'MindoraInsight', url: SITE_ORIGIN },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_ORIGIN}/library?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function freeAdhdJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Free Adult ADHD Test',
    url: absoluteUrl(`/test/${ADHD_SCREENING_SLUG}`),
    description:
      'Free educational Adult ADHD Test on MindoraInsight. Calm, private, not a medical diagnosis.',
    isPartOf: { '@type': 'WebSite', name: 'MindoraInsight', url: SITE_ORIGIN },
    about: {
      '@type': 'Thing',
      name: 'Adult ADHD screening (educational)',
    },
  }
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function assessmentJsonLd(opts: {
  title: string
  description: string
  slug: string
  free?: boolean
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: opts.title,
    description: opts.description,
    url: absoluteUrl(`/test/${opts.slug}`),
    learningResourceType: 'Assessment',
    isAccessibleForFree: Boolean(opts.free),
    provider: { '@type': 'Organization', name: 'MindoraInsight', url: SITE_ORIGIN },
    inLanguage: 'en',
  }
}
