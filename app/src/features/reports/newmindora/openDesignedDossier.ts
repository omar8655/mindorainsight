import type { RunAssessmentResult } from '@/data/newmindora'
import { downloadMindoraPdf } from '@/features/reports/newmindora/buildMindoraPdf'

/**
 * Download a real unique Mindora Dossier PDF (jsPDF vector file — not a screenshot / print dialog).
 * Static import keeps the click gesture chain intact (important for iOS).
 */
export async function openDesignedDossier(result: RunAssessmentResult, name = 'You') {
  try {
    downloadMindoraPdf(result, { name, tier: 'basic' })
  } catch (err) {
    console.error('[mi] basic PDF failed', err)
    throw err instanceof Error ? err : new Error('Could not create PDF')
  }
}
