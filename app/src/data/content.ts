export const faqs = [
  {
    question: 'What does MindoraInsight do?',
    answer:
      'MindoraInsight offers 20 free educational assessments — Personality, Big 5, ADHD, EQ, Career, and more — with clear scores and a printable Mindora Dossier PDF. Calm self-reflection, not entertainment quizzes.',
  },
  {
    question: 'Is this a medical diagnosis?',
    answer:
      'No. Assessments are educational tools for self-reflection only. They are not medical diagnoses, therapy, or a substitute for licensed care. If health concerns persist, talk with a licensed professional.',
  },
  {
    question: 'Are the tests really free?',
    answer:
      'Yes. All 20 assessments are free — 100 questions each, instant scores, and a downloadable PDF dossier. No PIN and no card required.',
  },
  {
    question: 'How long does a test take?',
    answer:
      'About 15 minutes. You answer 100 questions, five per screen, then see plain-English scores and can download your PDF.',
  },
  {
    question: 'What is a Mindora Dossier?',
    answer:
      'A unique PDF report built from your scores for that sitting — not a screenshot. Basic and extended versions are available after you finish.',
  },
  {
    question: 'Where do my reports live?',
    answer:
      'Results appear as soon as you finish. On this device you can reopen the share link with the session id. Clearing browser storage removes local reports.',
  },
  {
    question: 'What languages are supported?',
    answer:
      'Site navigation and many pages follow your language choice. Assessment questions and legal notices are currently in English — we show that clearly before you start.',
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
