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
 * Mobile-safe PDF download.
 * Never navigate the current tab to a blob: URL — on iOS/Android that often
 * replaces the SPA with a blank/black PDF viewer and looks like a crash.
 */
export function triggerPdfDownload(
  blob: Blob,
  fileName: string,
): Promise<'shared' | 'downloaded' | 'opened'> {
  return runDownload(blob, fileName)
}

async function runDownload(
  blob: Blob,
  fileName: string,
): Promise<'shared' | 'downloaded' | 'opened'> {
  const file = new File([blob], fileName, { type: 'application/pdf' })

  // iOS / Android: Share Sheet keeps the user on the results page
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      const canFiles =
        typeof navigator.canShare === 'function' ? navigator.canShare({ files: [file] }) : false
      if (canFiles) {
        await navigator.share({
          files: [file],
          title: fileName,
          text: 'Your MindoraInsight report PDF',
        })
        return 'shared'
      }
    } catch (err) {
      // AbortError = user cancelled — treat as handled so we don't open a blank tab
      if (err instanceof DOMException && err.name === 'AbortError') return 'shared'
      /* fall through */
    }
  }

  const url = URL.createObjectURL(blob)
  const mobile = isMobileBrowser()

  try {
    if (mobile) {
      // Open in a NEW tab so the results screen stays put
      const opened = window.open(url, '_blank', 'noopener,noreferrer')
      if (opened) {
        window.setTimeout(() => URL.revokeObjectURL(url), 120_000)
        return 'opened'
      }
      // Popup blocked — fall through to anchor (still try not to replace SPA)
    }

    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.rel = 'noopener'
    a.style.display = 'none'
    // Desktop Chrome/Firefox honor download. On stubborn mobile, target=_blank
    // is safer than same-tab navigation.
    if (mobile) a.target = '_blank'
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 120_000)
    return mobile ? 'opened' : 'downloaded'
  } catch {
    window.setTimeout(() => URL.revokeObjectURL(url), 120_000)
    throw new Error('Could not start PDF download')
  }
}

function isMobileBrowser() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) return true
  // iPadOS desktop UA
  return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
}
