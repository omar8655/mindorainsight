import {
  compileExtended,
  getNewMindoraMeta,
  type RunAssessmentResult,
} from '@/data/newmindora'
import { downloadMindoraPdf } from '@/features/reports/newmindora/buildMindoraPdf'

/**
 * Download the extended Mindora dossier as a real unique PDF file.
 * Static import keeps the click gesture chain intact (important for iOS).
 */
export async function openExtendedDossier(result: RunAssessmentResult, name = 'You') {
  try {
    const meta = getNewMindoraMeta(result.testId) || {
      id: result.testId,
      title: result.title,
      blurb: '',
      mins: 15,
      clinical: result.clinical,
      crisis: result.crisis,
    }

    const compiled = compileExtended({
      test: meta,
      scores: result.scores,
      brief: result.brief,
      name,
      answers: [],
      profile: { name },
      profileShape: result.shape,
      note: result.brief.longform || result.brief.body,
    })

    const sections = (compiled.sections || []).map((s) => ({
      title: String(s.title || 'Section'),
      body: String(s.body || s.text || ''),
    }))

    return await downloadMindoraPdf(result, {
      name,
      tier: 'extended',
      sections,
      wordCount: compiled.total,
    })
  } catch (err) {
    console.error('[mi] extended PDF failed', err)
    throw err instanceof Error ? err : new Error('Could not create PDF')
  }
}
