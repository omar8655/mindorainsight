/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@/data/newmindora/questions-bank.js' {
  export const QUESTIONS: Record<string, string[]>
}
declare module '@/data/newmindora/tests-core.js' {
  export type TestMeta = {
    id: string
    title: string
    blurb: string
    mins: number
    clinical?: boolean
    crisis?: boolean
  }
  export type DomainScore = { key: string; score: number; label?: string; note?: string; low?: string; high?: string }
  export const TEST_META: TestMeta[]
  export const SCORERS: Record<string, (answers: number[]) => DomainScore[]>
}
declare module '@/data/newmindora/profile-engine.js' {
  export function classifyProfile(
    testId: string,
    scores: { key: string; score: number }[],
  ): { shapeId: string; title: string; blurb: string }
  export const PROFILE_ENGINE: { SHAPE_COUNT: number }
}
declare module '@/data/newmindora/adhd-interpret.js' {
  export const ADHD_INTERPRET: Record<string, unknown>
}
declare module '@/data/newmindora/reports.js' {
  export type BriefResult = {
    headline: string
    body: string
    watch: string
    longform?: string
    fingerprint?: string
  }
  export const BRIEFS: Record<
    string,
    (scores: { key: string; score: number }[], name?: string, sourceId?: string) => BriefResult
  >
  export const BOOK_SOURCES: Record<string, Record<string, string>>
  export const REFERENCE_SCREEN_NOTES: Record<string, string>
  export const TEST_NOTES: Record<string, string>
  export const CLINICAL_TEST_IDS: string[]
  export function referenceNote(testId: string): {
    text: string
    clinical?: boolean
    label?: string
    bookTitle?: string
    authors?: string
  } | null
  export function personaliseReport(
    brief: BriefResult,
    scores: { key: string; score: number }[],
    name?: string,
    testTitle?: string,
    answers?: number[],
  ): BriefResult
}
declare module '@/data/newmindora/report-engine.js' {
  export function compileExtended(state: Record<string, unknown>): {
    sections: { title?: string; body?: string; text?: string }[]
    total?: number
    top?: { key: string; score: number }
    book?: Record<string, string>
    shape?: { shapeId: string; title: string; blurb: string }
  }
  export function extendedHtml(compiled: unknown, state: Record<string, unknown>): string
}
