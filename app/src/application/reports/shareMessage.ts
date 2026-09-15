import type { ReportDocument, SharePayload } from '@/domain/reports/types'

export function buildSharePayload(doc: ReportDocument, url: string): SharePayload {
  const text = [
    `I just finished the MindoraInsight ${doc.assessmentTitle} — my primary pattern is ${doc.primary.name} (${doc.primary.score}%).`,
    `Clear scores, a real report, and something I can actually use.`,
  ].join(' ')

  return {
    title: `I completed ${doc.assessmentTitle} on MindoraInsight`,
    text,
    url,
  }
}

export function encodeShareUrl(base: string, text: string, url: string) {
  return {
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
    mailto: `mailto:?subject=${encodeURIComponent(base)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
  }
}
