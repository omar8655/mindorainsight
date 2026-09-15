import { COMPANY } from '@/data/legal/company'

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'note'; text: string }

const email = COMPANY.supportEmail
const brand = COMPANY.brand
const site = COMPANY.websiteHost
const office = COMPANY.officeAddress

export const TERMS_UPDATED = '17 August 2026'

export const termsBlocks: LegalBlock[] = [
  {
    type: 'p',
    text: `These Terms and Conditions (“Terms”) govern your access to and use of the website available at ${site} (the “Website”), the ${brand} platform (the “Application”), and all related features, content, assessment tests, reports, subscriptions, and services offered therein (collectively, the “Services”).`,
  },
  {
    type: 'p',
    text: `The Services are provided by ${brand}. For questions, billing, or legal notices, contact us at ${email}. Postal correspondence: ${office}.`,
  },
  {
    type: 'p',
    text: `By accessing the Website, completing any assessment, creating an account, purchasing a trial membership or subscription, or otherwise using the Services, you agree to be bound by these Terms. If you do not agree, do not use the Services.`,
  },

  { type: 'h2', text: '1. Important information and disclaimers' },
  {
    type: 'p',
    text: `These Terms form a legally binding agreement between you (“you”, “your”, or “User”) and ${brand} (“we”, “us”, or “our”). We operate and maintain ${brand} and are responsible for the operation, content, performance, and legal compliance of the Services, as well as billing and subscription management where applicable.`,
  },
  {
    type: 'p',
    text: `${brand} assessments and reports are educational and for professional development and self-reflection only. They are not medical, clinical, diagnostic, or therapeutic advice. We do not guarantee the accuracy, outcomes, or suitability of any test or report except as required by applicable law.`,
  },
  {
    type: 'p',
    text: `Depending on your location, payment method, or checkout disclosures, payments may be processed by ${brand} or by an authorised payment processor acting solely for payment collection and related administration. The entity charging your payment method, amount, currency, and renewal terms will be disclosed at checkout and/or in your order confirmation.`,
  },
  {
    type: 'p',
    text: `You are responsible for ensuring your device meets the minimum technical requirements to use the Services. We do not guarantee compatibility with all devices, browsers, or operating systems.`,
  },

  { type: 'h2', text: '2. Eligibility' },
  {
    type: 'p',
    text: `You must be at least eighteen (18) years old, or the age of legal majority in your jurisdiction, to use the Services, create an account, or purchase a trial membership or subscription.`,
  },
  {
    type: 'ul',
    items: [
      'You meet applicable age requirements;',
      'You have legal capacity to enter a binding agreement; and',
      'Your use complies with all applicable laws.',
    ],
  },
  {
    type: 'p',
    text: `If you use the Services on behalf of an organisation, you confirm you have authority to bind that organisation. The Services are not intended for children. We do not knowingly collect personal data from anyone under 18.`,
  },

  { type: 'h2', text: '3. Data protection & privacy' },
  {
    type: 'p',
    text: `Our collection and use of personal information is described in our Privacy Policy, which forms part of these Terms. By using the Services you acknowledge the Privacy Policy. It is available at ${COMPANY.website}${COMPANY.privacyUrl}.`,
  },

  { type: 'h2', text: '4. Dispute resolution' },
  {
    type: 'note',
    text: 'Please read this section carefully. It includes important limitations on how disputes may be resolved.',
  },
  {
    type: 'p',
    text: `Before formal proceedings, contact us at ${email} with your name, contact details, a description of the claim, and the relief sought. If unresolved within sixty (60) days, either party may proceed under applicable law.`,
  },
  {
    type: 'p',
    text: `These Terms are governed by the laws of England and Wales, without regard to conflict-of-law rules, except that consumers retain any mandatory rights under the laws of their country of residence.`,
  },
  {
    type: 'p',
    text: `Where permitted, disputes shall be resolved in the courts of England and Wales, or such other venue required by mandatory consumer law. Nothing here limits EU consumers from using the European Commission’s ODR platform at https://ec.europa.eu/consumers/odr where applicable.`,
  },
  {
    type: 'p',
    text: `To the fullest extent permitted by law, claims must be brought in an individual capacity only. You agree not to participate in class, collective, or representative actions against ${brand} where such waiver is lawful.`,
  },

  { type: 'h2', text: '5. Your use of the Services' },
  {
    type: 'p',
    text: `Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable licence to access and use the Services for personal, non-commercial use only. You receive no ownership rights in the Services or content.`,
  },
  {
    type: 'p',
    text: `Some features require an account. You must keep credentials confidential and provide accurate information. Notify us promptly at ${email} if you suspect unauthorised access.`,
  },
  {
    type: 'p',
    text: `The Services allow you to complete digital assessments and receive reports generated from your responses. Reports are informational and educational only. You are responsible for the accuracy of information you submit and for decisions you make based on results.`,
  },
  { type: 'h3', text: 'Prohibited uses' },
  {
    type: 'ul',
    items: [
      'Creating multiple accounts to abuse trials or pricing;',
      'Sharing, selling, or transferring account access;',
      'Scraping, harvesting, reverse engineering, or attacking the Services;',
      'Uploading malware or interfering with security or performance;',
      'Using the Services for unlawful purposes.',
    ],
  },
  {
    type: 'p',
    text: `We may suspend or terminate access if we reasonably believe you violated these Terms, engaged in fraud or abuse, or where required by law or payment partners. Suspension does not cancel validly incurred payment obligations except where the law requires otherwise.`,
  },

  { type: 'h2', text: '6. Fees, trial & subscription plans' },
  {
    type: 'p',
    text: `Certain features require payment (“Fees”). Prices, currency, trial length, subscription period, and renewal terms are disclosed before purchase. By completing a purchase you authorise us and/or our payment processors to charge your payment method for disclosed Fees, including renewals.`,
  },
  {
    type: 'p',
    text: `Displayed local currency (for example £, €, or $) is for convenience and may reflect regional pricing. The final amount and currency shown at checkout before you authorise payment control.`,
  },
  {
    type: 'p',
    text: `Where offered, a paid Trial Membership provides limited access for the period disclosed at checkout and may convert to a Subscription unless cancelled in time. Subscription billing intervals and automatic renewal terms will be shown at checkout and in confirmation emails.`,
  },
  {
    type: 'p',
    text: `If a renewal charge fails, we may retry collection using authorised payment credentials as permitted by law and card network rules. A failed collection does not by itself cancel your Subscription. Cancel under Section 7 to stop future charges.`,
  },

  { type: 'h2', text: '7. Cancellation' },
  {
    type: 'p',
    text: `You may cancel a Trial Membership or Subscription at any time via account settings or by emailing ${email} from the address associated with your account. To avoid the next charge, cancel before the renewal or conversion date disclosed to you.`,
  },
  {
    type: 'p',
    text: `Cancellation stops future renewals from the effective date and does not refund Fees already charged except where required by law. Account deletion may be requested separately under the Privacy Policy.`,
  },

  { type: 'h2', text: '8. Refund policy' },
  {
    type: 'p',
    text: `Digital services are typically available immediately after purchase. Refunds are not guaranteed and are assessed case-by-case, except where required by applicable law. Contact ${email} with your account email, purchase details, and reason.`,
  },
  {
    type: 'p',
    text: `Please contact us before initiating a chargeback. Unwarranted chargebacks for authorised transactions may lead to account suspension and dispute of the chargeback with evidence of authorisation and use.`,
  },
  {
    type: 'p',
    text: `EU consumers generally have a 14-day withdrawal right for distance contracts. By requesting immediate access to digital content, you acknowledge that performance begins on payment and, where permitted by law, you may lose the right of withdrawal once performance has begun.`,
  },

  { type: 'h2', text: '9. Third-party websites' },
  {
    type: 'p',
    text: `The Services may link to third-party sites or tools. We do not control or endorse them and are not responsible for their content, privacy practices, or terms. Your use of third parties is at your own risk.`,
  },

  { type: 'h2', text: '10. Intellectual property' },
  {
    type: 'p',
    text: `All rights in the Services — including ${brand} branding, assessments, methodologies, questions, scoring logic, report structures, software, and content — belong to ${brand} or its licensors. “${brand}” and related marks may not be used without written permission.`,
  },
  {
    type: 'p',
    text: `You retain ownership of information you submit. You grant us a licence to process that information to operate, improve, and secure the Services and generate reports. Reports are for your personal use and may not be resold or commercially exploited without consent.`,
  },

  { type: 'h2', text: '11. Not healthcare advice' },
  {
    type: 'p',
    text: `${brand} content, assessments, and reports are for informational, educational, and professional-development purposes only. They are not clinical tools and are not intended to diagnose, treat, cure, or prevent any disease or condition. Always consult a qualified healthcare professional for health decisions. Do not disregard professional advice based on our Services.`,
  },

  { type: 'h2', text: '12. Disclaimer of warranties' },
  {
    type: 'p',
    text: `TO THE FULLEST EXTENT PERMITTED BY LAW, THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, OR ACCURACY. WE DO NOT WARRANT UNINTERRUPTED OR ERROR-FREE SERVICE.`,
  },

  { type: 'h2', text: '13. Limitation of liability' },
  {
    type: 'p',
    text: `TO THE FULLEST EXTENT PERMITTED BY LAW, ${brand.toUpperCase()} SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICES.`,
  },
  {
    type: 'p',
    text: `Our total aggregate liability for any claim relating to the Services shall not exceed the greater of (a) GBP 100, or (b) the total Fees you paid for the Services in the thirty (30) days before the event giving rise to the claim. Nothing excludes liability that cannot be limited under applicable law, including for death or personal injury caused by negligence or for fraud.`,
  },

  { type: 'h2', text: '14. Indemnification' },
  {
    type: 'p',
    text: `To the fullest extent permitted by law, you agree to indemnify and hold harmless ${brand} and its officers, employees, and agents from claims arising out of your misuse of the Services, violation of these Terms, or infringement of third-party rights.`,
  },

  { type: 'h2', text: '15. Modifications' },
  {
    type: 'p',
    text: `We may update these Terms by posting a revised version on the Website with an updated “Last updated” date. Continued use after changes take effect constitutes acceptance. If you disagree, stop using the Services and cancel any Subscription.`,
  },

  { type: 'h2', text: '16. Governing law' },
  {
    type: 'p',
    text: `These Terms are governed by the laws of England and Wales, without regard to conflict-of-law principles, subject to mandatory consumer protections where you live.`,
  },

  { type: 'h2', text: '17. Miscellaneous' },
  {
    type: 'p',
    text: `These Terms, with the Privacy Policy and Subscription Policy, are the entire agreement regarding the Services. If any provision is unenforceable, the remainder stays in effect. Failure to enforce a right is not a waiver. We may assign these Terms; you may not without our consent. Headings are for convenience only.`,
  },

  { type: 'h2', text: '18. Contact information' },
  {
    type: 'p',
    text: `For questions about the Services, billing, cancellations, refunds, or these Terms:`,
  },
  {
    type: 'ul',
    items: [`Email: ${email}`, `Address: ${office}`, `Website: ${site}`],
  },
]
