import { COMPANY } from '@/data/legal/company'

/** Visible product legal protection for assessments, results, and PDFs (not code comments). */

export const ASSESSMENT_LEGAL = {
  shortBanner:
    'For education and self-reflection only — not a medical diagnosis or treatment. Talk with a licensed professional about health concerns.',
  clinicalBanner:
    'Educational questionnaire only — not a diagnosis. MindoraInsight is not a healthcare provider. If daily life feels impaired, talk with a licensed clinician.',
  crisisBanner:
    'If you are in crisis or have thoughts of self-harm, contact emergency services, 988 (US/Canada), or Samaritans 116 123 (UK) immediately. This tool cannot replace emergency care.',
  gateTitle: 'Before you begin',
  gateBody:
    `${COMPANY.brand} assessments and Mindora Dossier PDFs are for education and self-reflection only. ` +
    `They are not medical diagnoses, not therapy, and not a substitute for licensed care. ` +
    `No doctor–patient relationship is created. You decide how to use your results.`,
  gateAck:
    'I understand this is educational only — not a diagnosis or medical advice — and I agree to the Terms.',
  pdfLegalTitle: 'LEGAL NOTICE · EDUCATIONAL PRODUCT',
  pdfLegalBody: (bookTitle: string, authors: string) =>
    `${COMPANY.brand} provides educational self-reports only. ` +
    `This document is not a medical record, clinical diagnosis, therapy note, hiring record, or court document. ` +
    `Reference themes paraphrase educational literature (${bookTitle} — ${authors}) in original wording; no copyrighted clinical scale items are reproduced. ` +
    `By downloading or using this file you acknowledge ${COMPANY.brand} is not your doctor, therapist, or healthcare provider, ` +
    `and you will not treat scores as a diagnosis. For health decisions, consult a licensed professional. Terms: ${COMPANY.website}${COMPANY.termsUrl}`,
  resultsFooter:
    `© ${COMPANY.brand}. Educational use only. Not medical advice. Full terms: ${COMPANY.termsUrl}`,
  noProvider:
    `${COMPANY.brand} offers educational self-reflection tools. It is not a clinic, hospital, or licensed healthcare service.`,
} as const

export function assessmentLegalBannerText(opts: { clinical?: boolean; crisis?: boolean }) {
  if (opts.crisis) return ASSESSMENT_LEGAL.crisisBanner
  if (opts.clinical) return ASSESSMENT_LEGAL.clinicalBanner
  return ASSESSMENT_LEGAL.shortBanner
}
