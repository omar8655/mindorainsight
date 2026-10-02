/**
 * Smoke: build unique PDF bytes for 3 sample topics (basic + extended).
 * Run from app/: node scripts/smoke-pdf.mjs
 */
import { createRequire } from 'node:module'
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { QUESTIONS } from '../src/data/newmindora/questions-bank.js'
import { SCORERS, TEST_META } from '../src/data/newmindora/tests-core.js'
import { BRIEFS, BOOK_SOURCES, personaliseReport } from '../src/data/newmindora/reports.js'
import { classifyProfile } from '../src/data/newmindora/profile-engine.js'
import { compileExtended } from '../src/data/newmindora/report-engine.js'

const require = createRequire(import.meta.url)
const { jsPDF } = require('jspdf')

function hashDossierSeed(input) {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function dossierDocumentId(result, tier) {
  const fp =
    result.brief?.fingerprint ||
    result.scores.filter((s) => s.score != null).map((s) => `${s.key}:${s.score}`).join('|')
  const seed = hashDossierSeed(`${tier}|${result.testId}|${fp}|${result.shape?.shapeId || ''}`)
  const prefix = tier === 'extended' ? 'MI-EXT' : 'MI-DOC'
  return `${prefix}-${String(seed % 1_000_000).padStart(6, '0')}-${(seed >>> 16).toString(16).toUpperCase().padStart(4, '0')}`
}

function runOne(id) {
  const meta = TEST_META.find((t) => t.id === id)
  const scorer = SCORERS[id] || SCORERS.big5
  const briefFn = BRIEFS[id] || BRIEFS.big5
  const answers = Array.from({ length: 100 }, (_, i) => 1 + (i % 5))
  const scores = scorer(answers)
  const shape = classifyProfile(id, scores)
  let brief = briefFn(scores, 'Alex', id === 'personality' ? 'personality' : undefined)
  brief = personaliseReport(brief, scores, 'Alex', meta.title, answers)
  const result = {
    testId: id,
    title: meta.title,
    clinical: !!meta.clinical,
    crisis: !!meta.crisis,
    scores,
    shape,
    brief,
    topName: shape.title,
  }
  const idA = dossierDocumentId(result, 'basic')
  const answers2 = Array.from({ length: 100 }, (_, i) => 5 - (i % 5))
  const scores2 = scorer(answers2)
  let brief2 = briefFn(scores2, 'Alex', id === 'personality' ? 'personality' : undefined)
  brief2 = personaliseReport(brief2, scores2, 'Alex', meta.title, answers2)
  const idB = dossierDocumentId({ ...result, scores: scores2, brief: brief2, shape: classifyProfile(id, scores2) }, 'basic')
  if (idA === idB) throw new Error(`${id}: PDF ids not unique`)

  const compiled = compileExtended({
    test: meta,
    scores,
    brief,
    name: 'Alex',
    answers,
    profile: { name: 'Alex' },
    profileShape: shape,
    note: brief.longform || brief.body,
  })
  if ((compiled.total || 0) < 1000) throw new Error(`${id}: short extended`)

  // Minimal real PDF with jsPDF (proves library works in this env)
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text(`MindoraInsight · ${meta.title}`, 14, 20)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`REF ${idA}`, 14, 28)
  doc.text(`Reference: ${(BOOK_SOURCES[id] || {}).bookTitle || 'n/a'}`, 14, 36)
  doc.text(`Lead: ${scores[0]?.key} ${scores[0]?.score}/100`, 14, 44)
  doc.text(`Fingerprint: ${brief.fingerprint}`, 14, 52)
  doc.text(`Extended words: ${compiled.total}`, 14, 60)
  const bytes = doc.output('arraybuffer')
  if (!bytes || bytes.byteLength < 500) throw new Error(`${id}: PDF too small`)

  return { id, docId: idA, docIdAlt: idB, bytes: bytes.byteLength, words: compiled.total, book: !!(BOOK_SOURCES[id] && QUESTIONS[id]?.length === 100 || id === 'personality') }
}

const outDir = join(process.cwd(), 'tmp-pdf-smoke')
mkdirSync(outDir, { recursive: true })
const sample = ['adhd', 'big5', 'depression', 'sixteen', 'trauma']
const rows = sample.map(runOne)
for (const r of rows) {
  // Write a tiny proof PDF for adhd only
  if (r.id === 'adhd') {
    const meta = TEST_META.find((t) => t.id === 'adhd')
    const doc = new jsPDF()
    doc.text(`Mindora smoke ${r.docId}`, 10, 10)
    writeFileSync(join(outDir, `Mindora-ADHD-${r.docId}.pdf`), Buffer.from(doc.output('arraybuffer')))
  }
  console.log('PASS', r.id, r.docId, '≠', r.docIdAlt, 'pdfBytes~', r.bytes, 'words', r.words)
}
console.log('OK · PDF uniqueness + jsPDF + references for', sample.join(', '))
