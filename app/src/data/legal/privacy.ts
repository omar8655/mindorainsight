import { COMPANY } from '@/data/legal/company'
import type { LegalBlock } from '@/data/legal/terms'

const email = COMPANY.supportEmail
const brand = COMPANY.brand
const site = COMPANY.websiteHost
const office = COMPANY.officeAddress

export const PRIVACY_UPDATED = '17 August 2026'

export const privacyBlocks: LegalBlock[] = [
  {
    type: 'p',
    text: `This Privacy Policy (the “Policy”) explains how ${brand} (“we”, “our”, or “us”) collects, uses, discloses, and protects personal information when you use ${brand} at ${site} (the “Website”), the related application (the “Application”), and associated services (collectively, the “Services”). Contact: ${email}. Postal correspondence: ${office}.`,
  },
  {
    type: 'p',
    text: `Depending on checkout disclosures, ${brand} may act as seller of a Trial Membership or Subscription. Payment processing may involve authorised payment processors acting only for billing and related administration.`,
  },
  {
    type: 'p',
    text: `We handle personal data in line with the UK GDPR / EU GDPR and, where applicable, U.S. state privacy laws such as the CCPA/CPRA. Please read this Policy with our Terms and Conditions.`,
  },

  { type: 'h2', text: '1. Personal information we collect' },
  { type: 'h3', text: 'Information you provide' },
  {
    type: 'ul',
    items: [
      'Email address and, where provided, name and contact details for your account;',
      'Assessment answers and related inputs needed to generate reports;',
      'Payment-related metadata (transaction IDs, billing status, tokenised credentials). Full card numbers are handled by payment providers, not stored by us;',
      'Support messages, cancellation or refund requests, and feedback.',
    ],
  },
  { type: 'h3', text: 'Information collected automatically' },
  {
    type: 'ul',
    items: [
      'Device, browser, and operating system details;',
      'IP address and approximate location used for security, currency display, and language flag preference;',
      'Usage data such as pages viewed, features used, and session timing;',
      'Cookies and similar technologies as described below.',
    ],
  },
  {
    type: 'p',
    text: `We may receive information from payment processors, hosting providers, analytics tools, fraud-prevention services, and customer-support tools solely to operate the Services.`,
  },
  {
    type: 'p',
    text: `Assessment responses may include sensitive personal information when you voluntarily submit them. We process that information based on your explicit consent and contractual necessity to generate your report.`,
  },

  { type: 'h2', text: '2. How we use personal information' },
  {
    type: 'ul',
    items: [
      'Provide, operate, and maintain the Services and generate reports;',
      'Create and manage accounts, authenticate users, and send service communications;',
      'Process payments, renewals, cancellations, refunds, and fraud prevention;',
      'Analyse performance, improve usability, and secure the platform;',
      'Comply with legal obligations and enforce our Terms;',
      'Send marketing only where permitted and with an easy opt-out.',
    ],
  },
  {
    type: 'p',
    text: `Legal bases may include contract performance, legitimate interests (security, improvement, support), consent (where required, including certain cookies and sensitive assessment inputs), and legal obligation.`,
  },

  { type: 'h2', text: '3. How we share personal information' },
  {
    type: 'p',
    text: `We share personal information only as needed to run the Services, including with:`,
  },
  {
    type: 'ul',
    items: [
      'Authorised payment processors and billing providers;',
      'Hosting, infrastructure, and IT providers;',
      'Customer support and communication tools;',
      'Analytics and performance monitoring providers;',
      'Fraud detection, security, and compliance partners;',
      'Professional advisers and authorities when required by law.',
    ],
  },
  {
    type: 'p',
    text: `If Google Analytics, Google Ads, Google Tag Manager, or similar tools are enabled, limited technical and usage data may be processed by Google under Google’s terms. We do not sell personal information for money. Certain analytics disclosures may count as “sharing” under some U.S. state laws; where required, you can opt out.`,
  },
  {
    type: 'p',
    text: `In a merger, acquisition, or asset sale, personal information may transfer subject to appropriate safeguards.`,
  },

  { type: 'h2', text: '4. Your rights and choices' },
  {
    type: 'p',
    text: `Depending on where you live, you may have rights to access, rectify, erase, restrict, port, or object to certain processing, and to withdraw consent. U.S. residents may have rights to know, delete, correct, and opt out of sale/sharing for targeted advertising where applicable.`,
  },
  {
    type: 'p',
    text: `To exercise rights, email ${email}. We may need to verify your identity. We respond within timeframes required by law.`,
  },

  { type: 'h2', text: '5. Complaints' },
  {
    type: 'p',
    text: `Contact us first at ${email}. You may also lodge a complaint with your local data protection authority (for the UK, the Information Commissioner’s Office).`,
  },

  { type: 'h2', text: '6. Cookies and tracking technologies' },
  {
    type: 'p',
    text: `We use essential cookies to run the Services (session, language, access preferences, security). With your permission via our cookie choices banner, we may use analytics cookies. Marketing cookies are used only with consent where required.`,
  },
  {
    type: 'p',
    text: `You can change cookie preferences from the Website footer (“Cookie choices”) or via browser settings. Disabling some cookies may affect functionality.`,
  },

  { type: 'h2', text: '7. Security and retention' },
  {
    type: 'p',
    text: `We use appropriate technical and organisational measures to protect personal information. No internet transmission is fully secure. Retain data only as long as needed to provide the Services, meet legal, tax, and dispute-resolution needs, then delete or anonymise it.`,
  },

  { type: 'h2', text: '8. Children' },
  {
    type: 'p',
    text: `The Services are for users aged 18+. We do not knowingly collect data from children. If you believe a minor has used the Services, contact ${email} so we can delete the data and close the account.`,
  },

  { type: 'h2', text: '9. Third-party websites' },
  {
    type: 'p',
    text: `Links to third parties are for convenience. Their privacy practices are their own. Review their policies before sharing information with them.`,
  },

  { type: 'h2', text: '10. Changes to this Policy' },
  {
    type: 'p',
    text: `We may update this Policy by posting a revised version with a new “Last updated” date. Material changes may also be notified by email or site notice where required.`,
  },

  { type: 'h2', text: '11. Contact information' },
  {
    type: 'ul',
    items: [`Email: ${email}`, `Address: ${office}`, `Website: ${site}`],
  },
]
