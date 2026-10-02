import { COMPANY } from '@/data/legal/company'
import { ADHD_SCREENING_SLUG } from '@/data/adhdScreening'
import { absoluteUrl, SITE_ORIGIN } from '@/lib/seo'

/** Global Organization + WebSite schema for AI / Google rich results. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'EducationalOrganization'],
    name: 'MindoraInsight',
    alternateName: ['MindoraInsight Assessments', 'Mindora Dossier'],
    url: SITE_ORIGIN,
    logo: absoluteUrl('/brand/mindorainsight-brain-logo-forest.png'),
    image: absoluteUrl('/brand/mindorainsight-brain-logo-forest.png'),
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
    sameAs: [SITE_ORIGIN, absoluteUrl('/llms.txt'), absoluteUrl('/ai.txt')],
    knowsAbout: [
      'Personality assessment',
      'Big Five personality traits',
      'Adult ADHD educational screening',
      'Enneagram',
      'Attachment styles',
      'Emotional intelligence',
      'DISC assessment',
      'Career aptitude',
      'Psychometric testing (educational)',
    ],
    description:
      'MindoraInsight is the free assessment engine for decisive educational readings — 20 research-grade paths (Personality, Big 5, ADHD, Enneagram, Attachment, Career, DISC, EQ, and more) with printable Mindora Dossier PDFs. Not a medical diagnosis.',
    slogan: 'The most powerful free assessments · 100 questions · Mindora Dossier PDF',
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MindoraInsight',
    alternateName: 'MindoraInsight Free Assessments',
    url: SITE_ORIGIN,
    description:
      '20 free research-grade assessments — 100 questions each, ranked scores, printable Mindora Dossier PDF. Personality, ADHD, Autism, EQ, Career, and more. Educational — not a medical diagnosis. Built to outclass soft quizzes.',
    inLanguage: 'en',
    publisher: { '@type': 'Organization', name: 'MindoraInsight', url: SITE_ORIGIN },
    about: {
      '@type': 'Thing',
      name: 'Free educational psychometric assessments',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_ORIGIN}/library?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/** SoftwareApplication schema — helps Google / AI identify the product. */
export function softwareApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MindoraInsight',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    url: SITE_ORIGIN,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: '20 free assessments with Mindora Dossier PDF',
    },
    description:
      'Free online educational assessments with 100 questions, instant scores, and printable PDF dossiers.',
    featureList: [
      '20 free assessments',
      '100 questions each',
      'Instant plain-English scores',
      'Mindora Dossier PDF download',
      'No referral PIN required',
    ],
    provider: { '@type': 'Organization', name: 'MindoraInsight', url: SITE_ORIGIN },
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
