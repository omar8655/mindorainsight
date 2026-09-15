export const faqs = [
  {
    question: 'What does MindoraInsight do?',
    answer:
      'MindoraInsight is a social-impact nonprofit helping people break the silence, build confidence, and move toward a better quality of life — with practical courses and clear reports.',
  },
  {
    question: 'Is this clinical or diagnostic?',
    answer:
      'No. Assessments are educational tools for professional development and self-reflection only. They are not medical diagnoses or treatment.',
  },
  {
    question: 'Why is every course $49?',
    answer:
      'We keep a flat $49.00 price on every course so access stays clear and fair — aligned with our nonprofit mission to break down barriers.',
  },
  {
    question: 'How does the short trial work?',
    answer:
      'The trial unlocks the library and reports for a limited window so you can judge depth before choosing a longer plan.',
  },
  {
    question: 'What do I get with Lifetime?',
    answer:
      'A one-time $49 purchase for ongoing access to the current catalog plus future additions, without a recurring charge.',
  },
  {
    question: 'How do cancellations work?',
    answer:
      'Cancel anytime from your account or by emailing hello@mindorainsight.com. Cancellation stops future renewals.',
  },
  {
    question: 'Where do my reports live?',
    answer:
      'Reports appear as soon as you finish an assessment and remain available in your portal so you can revisit them later.',
  },
]

export const plans = [
  {
    id: 'one-time',
    name: 'Single Course',
    priceUsd: 49,
    detail: 'One focused course with a full report. Flat nonprofit pricing.',
    features: [
      'Full report for one course',
      'Instant results',
      'Email delivery of your summary',
    ],
    product: 0,
    highlighted: false,
  },
  {
    id: 'monthly',
    name: 'Full Library Access',
    priceUsd: 49,
    detail: 'Every course unlocked at the same flat $49 nonprofit rate.',
    features: [
      'Entire course library',
      'Unlimited reports during access',
      'New paths as they launch',
    ],
    product: 1,
    highlighted: true,
  },
  {
    id: 'lifetime',
    name: 'Lifetime Access',
    priceUsd: 49,
    detail: 'One $49 payment. Keep access as the catalog grows.',
    features: [
      'Permanent library access',
      'All future courses included',
      'Same flat nonprofit price',
    ],
    product: 2,
    highlighted: false,
  },
]
