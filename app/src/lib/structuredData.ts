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
      'MindoraInsight provides 20 free educational assessments (Personality, Big 5, ADHD, Enneagram, Attachment, Career, DISC, EQ, and more) with printable Mindora Dossier PDFs. Not a medical diagnosis.',
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MindoraInsight',
    url: SITE_ORIGIN,
    description:
      '20 free psychometric assessments — 100 questions each, instant scores, printable Mindora Dossier PDF. Personality, ADHD, Autism, EQ, Career, and more.',
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
    '@type': ['LearningResource', 'Quiz'],
    name: `Free ${opts.title} Test (100 Questions)`,
    alternateName: `${opts.title} assessment`,
    description: opts.description,
    url: absoluteUrl(`/test/${opts.slug}`),
    learningResourceType: 'Assessment',
    educationalLevel: 'Adult',
    isAccessibleForFree: Boolean(opts.free),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    numberOfQuestions: 100,
    timeRequired: 'PT15M',
    provider: { '@type': 'Organization', name: 'MindoraInsight', url: SITE_ORIGIN },
    inLanguage: 'en',
    about: { '@type': 'Thing', name: opts.title },
  }
}

/** BreadcrumbList for assessment pages — helps Google sitelinks. */
export function breadcrumbJsonLd(opts: { title: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_ORIGIN,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Library',
        item: absoluteUrl('/library'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: opts.title,
        item: absoluteUrl(`/test/${opts.slug}`),
      },
    ],
  }
}

/** ItemList of all free assessments for the library / free-tests hubs. */
export function freeTestsItemListJsonLd(
  items: { title: string; slug: string; description: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '20 Free MindoraInsight Assessments',
    numberOfItems: items.length,
    itemListElement: items.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/test/${t.slug}`),
      name: `Free ${t.title} Test`,
      description: t.description,
    })),
  }
}
