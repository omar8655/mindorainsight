import type { RunAssessmentResult } from '@/data/newmindora'

/** FNV-1a style hash → stable unsigned 32-bit. */
export function hashDossierSeed(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Deterministic document id from scores + brief fingerprint (same sitting → same PDF id). */
export function dossierDocumentId(result: RunAssessmentResult, tier: 'basic' | 'extended'): string {
  const fp =
    (result.brief as { fingerprint?: string }).fingerprint ||
    result.scores
      .filter((s) => s.score != null)
      .map((s) => `${s.key}:${s.score}`)
      .join('|')
  const seed = hashDossierSeed(
    `${tier}|${result.testId}|${fp}|${result.shape?.shapeId || ''}|${result.sessionId || ''}`,
  )
  const prefix = tier === 'extended' ? 'MI-EXT' : 'MI-DOC'
  const body = String(seed % 1_000_000).padStart(6, '0')
  const tail = (seed >>> 16).toString(16).toUpperCase().padStart(4, '0')
  return `${prefix}-${body}-${tail}`
}

export function dossierFileName(result: RunAssessmentResult, tier: 'basic' | 'extended'): string {
  const id = dossierDocumentId(result, tier)
  const slug = String(result.title || result.testId)
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
  return `Mindora-${slug}-${id}.pdf`
}

/**
 * Download the PDF file in-place — never navigate or open a blank tab.
 * (Opening blob: URLs in a new window caused blank screens for many users.)
 */
export function triggerPdfDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob)
  try {
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.rel = 'noopener'
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    a.remove()
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(url), 90_000)
  }
}
