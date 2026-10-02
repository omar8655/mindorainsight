/**
 * Smoke: build unique real jsPDF dossiers for ALL 20 NewMindora topics (basic + extended).
 * Run from app/: node scripts/smoke-pdf.mjs
 */
import { createRequire } from 'node:module'
import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { QUESTIONS } from '../src/data/newmindora/questions-bank.js'
import { SCORERS, TEST_META } from '../src/data/newmindora/tests-core.js'
import { BRIEFS, BOOK_SOURCES, personaliseReport, referenceNote } from '../src/data/newmindora/reports.js'
import { classifyProfile } from '../src/data/newmindora/profile-engine.js'
import { compileExtended } from '../src/data/newmindora/report-engine.js'

const require = createRequire(import.meta.url)
const { jsPDF } = require('jspdf')
const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../tmp-pdf-smoke')
mkdirSync(outDir, { recursive: true })

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

function bandLabel(score) {
  if (score >= 75) return 'Dominant'
  if (score >= 60) return 'Strong'
  if (score >= 40) return 'Present'
  return 'Quiet'
}

/** Minimal production-shaped PDF to prove every topic renders a real unique file. */
function buildSmokePdf(result, tier, sections, wordCount) {
  const scores = [...result.scores].filter((s) => s.score != null).sort((a, b) => b.score - a.score)
  const top = scores[0] || { key: 'Lead', score: 50 }
  const second = scores[1] || top
  const serial = dossierDocumentId(result, tier)
  const book = BOOK_SOURCES[result.testId] || BOOK_SOURCES.big5
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true })
  const shapeTitle = result.shape?.title || ''
  const clearHero = shapeTitle
    ? `Alex, you land as «${shapeTitle}» — ${top.key} leads at ${top.score}/100`
    : String(result.brief.headline || `${top.key} at ${top.score}/100`)

  doc.setFillColor('#032514')
  doc.rect(0, 0, 210, 28, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.text('MindoraInsight', 14, 14)
  doc.setFontSize(9)
  doc.setTextColor(154, 230, 180)
  doc.text(`${result.title} · ${tier} dossier`, 14, 20)
  doc.setTextColor(213, 228, 220)
  doc.setFontSize(8)
  doc.text(`REF ${serial}`, 196, 16, { align: 'right' })

  let y = 36
  doc.setFillColor(247, 251, 248)
  doc.setDrawColor('#31B070')
  doc.roundedRect(14, y, 182, 28, 3, 3, 'FD')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor('#31B070')
  doc.text(`${String(result.title).toUpperCase()} · WRITTEN FOR YOU`, 18, y + 7)
  doc.setFontSize(11)
  doc.setTextColor('#032514')
  const lines = doc.splitTextToSize(clearHero, 174)
  doc.text(lines, 18, y + 14)
  y += 34

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor('#5b6b73')
  doc.text(`Lead ${top.score}/100 · ${bandLabel(top.score)} · Next ${second.key} ${second.score}/100`, 14, y)
  y += 8
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor('#032514')
  doc.text(String(book.bookTitle || '').slice(0, 90), 14, y)
  y += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor('#4880D9')
  doc.text(String(book.authors || '').slice(0, 100), 14, y)
  y += 10

  for (const s of scores.slice(0, 8)) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor('#1f2a33')
    doc.text(`${s.key}  ${s.score}/100 · ${bandLabel(s.score)}`, 14, y)
    y += 5
    if (y > 270) break
  }

  y += 4
  const body = String(result.brief.body || '').slice(0, 1200)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor('#1f2a33')
  const bodyLines = doc.splitTextToSize(body, 182)
  for (const line of bodyLines) {
    if (y > 275) {
      doc.addPage()
      y = 20
    }
    doc.text(line, 14, y)
    y += 4.5
  }

  if (tier === 'extended' && sections?.length) {
    doc.addPage()
    y = 20
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor('#032514')
    doc.text(`Extended dossier · ~${wordCount || '?'} words`, 14, y)
    y += 8
    for (const sec of sections.slice(0, 6)) {
      if (y > 250) {
        doc.addPage()
        y = 20
      }
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text(String(sec.title || 'Section').slice(0, 80), 14, y)
      y += 5
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      const secLines = doc.splitTextToSize(String(sec.body || '').slice(0, 800), 182)
      for (const line of secLines) {
        if (y > 275) {
          doc.addPage()
          y = 20
        }
        doc.text(line, 14, y)
        y += 4
      }
      y += 3
    }
  }

  const bytes = doc.output('arraybuffer')
  return { bytes: new Uint8Array(bytes), serial, pages: doc.getNumberOfPages() }
}

function runOne(id) {
  const meta = TEST_META.find((t) => t.id === id)
  if (!meta) throw new Error(`missing meta ${id}`)
  const scorer = SCORERS[id] || SCORERS.big5
  const briefFn = BRIEFS[id] || BRIEFS.big5
  const qs = QUESTIONS[id] || (id === 'personality' ? QUESTIONS.big5 : null)
  if (!qs || qs.length !== 100) throw new Error(`${id}: bad questions`)
  if (!BOOK_SOURCES[id] && id !== 'personality') throw new Error(`${id}: missing BOOK_SOURCES`)
  if (!referenceNote(id)?.text) throw new Error(`${id}: missing reference`)

  const answers = Array.from({ length: 100 }, (_, i) => 1 + (i % 5))
  const scores = scorer(answers)
  const shape = classifyProfile(id, scores)
  let brief = briefFn(scores, 'Alex', id === 'personality' ? 'personality' : undefined)
  brief = personaliseReport(brief, scores, 'Alex', meta.title, answers)
  if (!String(brief.headline || '').trim()) {
    throw new Error(`${id}: headline missing → ${brief.headline}`)
  }
  // Different answer stacks must produce different fingerprints / dossier copy
  const answersB = Array.from({ length: 100 }, (_, i) => 5 - (i % 5))
  const scoresB = scorer(answersB)
  let briefB = briefFn(scoresB, 'Sam', id === 'personality' ? 'personality' : undefined)
  briefB = personaliseReport(briefB, scoresB, 'Sam', meta.title, answersB)
  if (brief.fingerprint && briefB.fingerprint && brief.fingerprint === briefB.fingerprint) {
    throw new Error(`${id}: fingerprints collided across different answer stacks`)
  }
  if (String(brief.body) === String(briefB.body)) {
    throw new Error(`${id}: body identical across different people/answers`)
  }

  const result = {
    testId: id,
    title: meta.title,
    clinical: !!meta.clinical,
    crisis: !!meta.crisis,
    scores,
    shape,
    brief,
    topName: shape?.title || scores[0]?.key,
  }

  const answers2 = Array.from({ length: 100 }, (_, i) => 5 - (i % 5))
  const scores2 = scorer(answers2)
  let brief2 = briefFn(scores2, 'Alex', id === 'personality' ? 'personality' : undefined)
  brief2 = personaliseReport(brief2, scores2, 'Alex', meta.title, answers2)
  const idA = dossierDocumentId(result, 'basic')
  const idB = dossierDocumentId(
    { ...result, scores: scores2, brief: brief2, shape: classifyProfile(id, scores2) },
    'basic',
  )
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
  if ((compiled.total || 0) < 1000) throw new Error(`${id}: short extended ${compiled.total}`)

  const sections = (compiled.sections || []).map((s) => ({
    title: String(s.title || 'Section'),
    body: String(s.body || s.text || ''),
  }))

  const basic = buildSmokePdf(result, 'basic', [], 0)
  const extended = buildSmokePdf(result, 'extended', sections, compiled.total)
  if (basic.bytes.byteLength < 1500) throw new Error(`${id}: basic PDF too small`)
  if (extended.bytes.byteLength < 2000) throw new Error(`${id}: extended PDF too small`)

  const safe = id.replace(/[^a-z0-9_-]/gi, '')
  writeFileSync(join(outDir, `Mindora-${safe}-${basic.serial}.pdf`), basic.bytes)
  writeFileSync(join(outDir, `Mindora-${safe}-EXT-${extended.serial}.pdf`), extended.bytes)

  const words = String(brief.body || '').split(/\s+/).filter(Boolean).length
  console.log(
    `PASS ${id} ${basic.serial} ≠ ${idB} pdfBytes~${basic.bytes.byteLength} words ${words} ext~${compiled.total}`,
  )
}

const errors = []
for (const meta of TEST_META) {
  try {
    runOne(meta.id)
  } catch (err) {
    errors.push(`${meta.id}: ${err instanceof Error ? err.message : String(err)}`)
  }
}

if (errors.length) {
  console.error('FAIL\n' + errors.join('\n'))
  process.exit(1)
}

// Guard the production browser path: jsPDF arraybuffer must be wrapped in Uint8Array
// (casting ArrayBuffer as Uint8Array produces blank/corrupt downloads).
{
  const probe = new jsPDF({ unit: 'mm', format: 'a4' })
  probe.text('MindoraInsight PDF probe', 14, 20)
  const wrapped = new Uint8Array(probe.output('arraybuffer'))
  const header = String.fromCharCode(wrapped[0], wrapped[1], wrapped[2], wrapped[3])
  if (header !== '%PDF') {
    console.error(`FAIL production-shaped PDF header was ${JSON.stringify(header)}`)
    process.exit(1)
  }
  console.log('OK · production-shaped Uint8Array(arraybuffer) yields %PDF')
}

console.log(`OK · PDF uniqueness + personalised dossiers for all ${TEST_META.length} topics`)
