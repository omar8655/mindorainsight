export type TraitScore = {
  id: string
  name: string
  score: number
}

export type ReportChapter = {
  id: string
  number: number
  theme: string
  title: string
  body: string
}

export type ReportTheme = {
  id: string
  title: string
  chapters: { id: string; title: string; teaser: string }[]
}

export type ReportDocument = {
  sessionId: string
  slug: string
  assessmentTitle: string
  family: ReportFamily
  completedAt: string
  primary: TraitScore
  blurb: string
  summary: string
  traits: TraitScore[]
  overall: number
  themes: ReportTheme[]
  chapters: ReportChapter[]
  experiment: { title: string; body: string }
  disclaimer: string
  emblemHue: string
  /** Optional gender from pre-test selection — personalizes emblem bank + narration */
  gender?: 'female' | 'male'
}

export type ReportFamily =
  | 'ocean'
  | 'adhd'
  | 'types16'
  | 'enneagram'
  | 'spirit'
  | 'wellbeing'
  | 'workGeneric'

export type ReportSession = {
  id: string
  slug: string
  assessmentTitle: string
  completedAt: string
  traits: TraitScore[]
  overall: number
  summary: string
  primaryId: string
  primaryName: string
  blurb: string
  unlocked: boolean
  family: ReportFamily
  /** female | male from pre-test selection */
  gender?: 'female' | 'male'
  /** Extra narrative fields (e.g. ADHD shape) */
  meta?: Record<string, string>
}

export type SharePayload = {
  title: string
  text: string
  url: string
}

export type ChapterTemplate = {
  id: string
  themeId: string
  title: string
  teaser: string
  /** Base body; {{primary}}, {{score}}, {{secondary}}, {{secondaryScore}} replaced */
  body: string
  /** Only include when a secondary trait score is at least this */
  requireSecondaryMin?: number
}

export type PrimaryPack = {
  id: string
  name: string
  blurb: string
  emblemHue: string
  themes: { id: string; title: string }[]
  chapters: ChapterTemplate[]
  experiment: { title: string; body: string }
}

export type ContentPack = {
  family: ReportFamily
  disclaimer: string
  primaries: Record<string, PrimaryPack>
  /** Fallback when primary id missing */
  fallbackPrimaryId: string
}
