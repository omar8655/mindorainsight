import { jsPDF } from 'jspdf'
import { BOOK_SOURCES, referenceNote, type RunAssessmentResult } from '@/data/newmindora'
import {
  dossierDocumentId,
  dossierFileName,
  triggerPdfDownload,
} from '@/features/reports/newmindora/dossierId'
import {
  doctorFourteenDayPlan,
  doctorOnScreenClose,
  doctorSessionClose,
  doctorWatchLine,
  isActionableWatch,
} from '@/features/reports/clinicalVoice'
import { ASSESSMENT_LEGAL } from '@/data/legal/assessmentProtection'

const FOREST = '#032514'
const SAGE = '#31B070'
const BLUE = '#4880D9'
const MUTED = '#5b6b73'
const TEXT = '#1f2a33'
const LINE = '#d5ebe0'

type PdfOpts = {
  name?: string
  tier: 'basic' | 'extended'
  sections?: { title: string; body: string }[]
  wordCount?: number
}

function bandLabel(score: number) {
  if (score >= 75) return 'Dominant'
  if (score >= 60) return 'Strong'
  if (score >= 40) return 'Present'
  return 'Quiet'
}

function wrapLines(doc: jsPDF, text: string, maxWidth: number, fontSize: number): string[] {
  doc.setFontSize(fontSize)
  const paragraphs = String(text || '')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
  const lines: string[] = []
  for (const p of paragraphs) {
    const wrapped = doc.splitTextToSize(p, maxWidth) as string[]
    lines.push(...wrapped)
    lines.push('')
  }
  if (lines.length && lines[lines.length - 1] === '') lines.pop()
  return lines
}

function drawHeader(doc: jsPDF, title: string, serial: string, date: string, y = 14) {
  doc.setFillColor(FOREST)
  doc.rect(0, 0, 210, 28, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.text('MindoraInsight', 14, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(154, 230, 180)
  doc.text(title, 14, y + 6)
  doc.setTextColor(213, 228, 220)
  doc.setFontSize(8)
  doc.text(`REF ${serial} · ${date}`, 196, y + 2, { align: 'right' })
  return 36
}

function drawFooter(doc: jsPDF, page: number, ofPages: number, serial: string) {
  doc.setDrawColor(LINE)
  doc.line(14, 287, 196, 287)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(MUTED)
  doc.text('MindoraInsight · Educational summary', 14, 292)
  doc.text(`Page ${page}/${ofPages} · ${serial}`, 196, 292, { align: 'right' })
}

function drawScoreBars(
  doc: jsPDF,
  scores: { key: string; score: number }[],
  startY: number,
  maxWidth = 182,
): number {
  let y = startY
  for (const s of scores) {
    if (y > 265) break
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(TEXT)
    doc.text(s.key, 14, y)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(FOREST)
    doc.text(`${s.score}/100 · ${bandLabel(s.score)}`, 196, y, { align: 'right' })
    y += 3.5
    doc.setFillColor(238, 242, 244)
    doc.roundedRect(14, y, maxWidth, 4, 1.4, 1.4, 'F')
    const w = Math.max(2, Math.min(maxWidth, (s.score / 100) * maxWidth))
    const fill =
      s.score >= 75 ? '#0f4a36' : s.score >= 60 ? SAGE : s.score >= 40 ? BLUE : '#6b7280'
    const [r, g, b] = hexToRgb(fill)
    doc.setFillColor(r, g, b)
    doc.roundedRect(14, y, w, 4, 1.4, 1.4, 'F')
    y += 9
  }
  return y
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  if (h.length === 3) {
    return [
      parseInt(h[0] + h[0], 16),
      parseInt(h[1] + h[1], 16),
      parseInt(h[2] + h[2], 16),
    ]
  }
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

function ensurePage(
  doc: jsPDF,
  y: number,
  need: number,
  meta: { title: string; serial: string; date: string; pageTracker: { n: number } },
): number {
  if (y + need <= 280) return y
  drawFooter(doc, meta.pageTracker.n, 0, meta.serial)
  doc.addPage()
  meta.pageTracker.n += 1
  return drawHeader(doc, meta.title, meta.serial, meta.date)
}

function writeWrapped(
  doc: jsPDF,
  text: string,
  y: number,
  meta: { title: string; serial: string; date: string; pageTracker: { n: number } },
  fontSize = 10,
  lineH = 5,
): number {
  const lines = wrapLines(doc, text, 182, fontSize)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(fontSize)
  doc.setTextColor(TEXT)
  for (const line of lines) {
    y = ensurePage(doc, y, lineH + 2, meta)
    if (line === '') {
      y += 2
      continue
    }
    doc.text(line, 14, y)
    y += lineH
  }
  return y + 2
}

/** Build a real unique PDF (vector text — not a browser screenshot). */
export function buildMindoraPdfBytes(result: RunAssessmentResult, opts: PdfOpts): Uint8Array {
  const name = opts.name || 'You'
  const you = name.split(' ')[0] || 'You'
  const date = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const serial = dossierDocumentId(result, opts.tier)
  const book = BOOK_SOURCES[result.testId] || {
    bookTitle: `${result.title} Foundations`,
    authors: 'Psychometric Trait Research',
    theory: 'Personality & Cognitive Styles',
    vibe: 'Discovering Your Unique Strengths',
    emoji: '📚',
    screenNote: '',
  }
  const ref = referenceNote(result.testId)
  const scores = [...result.scores]
    .filter((s) => s.score != null)
    .sort((a, b) => b.score - a.score)
  const top = scores[0] || { key: 'Lead pattern', score: 50 }
  const second = scores[1] || top
  const leadName = top.key
  const fingerprint =
    (result.brief as { fingerprint?: string }).fingerprint ||
    scores.map((s) => s.key).join(' → ')

  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true })
  const pageTracker = { n: 1 }
  const meta = {
    title: `${result.title} · ${opts.tier === 'extended' ? 'Extended' : 'Basic'} dossier`,
    serial,
    date,
    pageTracker,
  }

  let y = drawHeader(doc, meta.title, serial, date)

  // Hero — personal result for this sitting
  const shapeTitle = result.shape?.title || ''
  const clearHero = shapeTitle
    ? `${you}, you land as «${shapeTitle}» — ${top.key} leads at ${top.score}/100`
    : String(
        result.brief.headline ||
          `${you}, ${top.key} leads at ${top.score}/100 on this sitting`,
      ).replace(/^Clear answer:\s*/i, '')
  const heroLines = doc.splitTextToSize(clearHero, 174) as string[]
  const heroH = Math.max(36, 14 + heroLines.length * 6.5 + 12)
  doc.setFillColor(247, 251, 248)
  doc.setDrawColor(SAGE)
  doc.roundedRect(14, y, 182, heroH, 3, 3, 'FD')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(SAGE)
  doc.text(
    `${String(result.title || 'ASSESSMENT').toUpperCase()} · WRITTEN FOR ${you.toUpperCase()} · THIS SITTING ONLY`,
    18,
    y + 8,
  )
  doc.setFontSize(13)
  doc.setTextColor(FOREST)
  doc.text(heroLines, 18, y + 16)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(BLUE)
  doc.text(
    `Lead ${top.score}/100 · ${bandLabel(top.score)} · Next ${second.key} ${second.score}/100`,
    18,
    y + heroH - 6,
  )
  y += heroH + 7

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(MUTED)
  doc.text(`Prepared for ${name} · Completed ${date} · Document ${serial}`, 14, y)
  y += 6
  doc.setFontSize(9)
  const topThree = scores
    .slice(0, 3)
    .map((s) => `${s.key} ${s.score}`)
    .join(' · ')
  doc.text(`Sitting marker: ${topThree || fingerprint} · REF ${serial}`, 14, y)
  y += 9

  // One short note (avoid stacking legal warnings in the dossier)
  y = ensurePage(doc, y, 10, meta)
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  doc.setTextColor(MUTED)
  doc.text(ASSESSMENT_LEGAL.pdfShortLine, 14, y)
  y += 9

  // Reference card
  doc.setFillColor(240, 253, 244)
  doc.setDrawColor(LINE)
  doc.roundedRect(14, y, 182, 22, 2.5, 2.5, 'FD')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(FOREST)
  doc.text('PRIMARY RESEARCH REFERENCE · THIS TOPIC ONLY', 18, y + 6)
  doc.setFontSize(10)
  doc.text(String(book.bookTitle || '').slice(0, 95), 18, y + 12)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(BLUE)
  doc.text(String(book.authors || '').slice(0, 110), 18, y + 17)
  y += 26

  if (result.shape?.title) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(FOREST)
    doc.text(`Your type / profile shape · ${result.shape.title}`, 14, y)
    y += 5
    y = writeWrapped(doc, result.shape.blurb || '', y, meta, 9, 4.5)
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(TEXT)
  y = ensurePage(doc, y, 20, meta)
  doc.text('Ranked scores — what stands out', 14, y)
  y += 6
  y = drawScoreBars(doc, scores, y)
  y += 2

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(TEXT)
  y = ensurePage(doc, y, 16, meta)
  doc.text('What your results say', 14, y)
  y += 6
  const lead =
    Math.abs(top.score - second.score) < 8
      ? `${you}, ${top.key} and ${second.key} sit close (${top.score} and ${second.score}/100) — read them as a pair.`
      : `${you}, ${top.key} leads at ${top.score}/100 (${top.score - second.score} points over ${second.key}).`
  y = writeWrapped(doc, lead, y, meta, 11, 6)
  y = writeWrapped(doc, result.brief.body || '', y, meta, 11, 6)

  if (isActionableWatch(result.brief.watch)) {
    y = ensurePage(doc, y, 22, meta)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor('#c0392b')
    doc.text('Watch-out', 14, y)
    y += 5
    y = writeWrapped(doc, doctorWatchLine(result.brief.watch, you), y, meta, 10.5, 5.8)
    y += 3
  }

  // Framework note
  const framework = (ref && ref.text) || book.screenNote || book.theory || ''
  if (framework) {
    y = ensurePage(doc, y, 20, meta)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(FOREST)
    doc.text(ref?.clinical ? 'Educational screen themes' : 'Educational framework', 14, y)
    y += 5
    y = writeWrapped(doc, framework, y, meta, 10.5, 5.8)
  }

  // Page 2+ growth / extended
  drawFooter(doc, pageTracker.n, 0, serial)
  doc.addPage()
  pageTracker.n += 1
  y = drawHeader(doc, meta.title, serial, date)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(FOREST)
  doc.text(
    opts.tier === 'extended' ? 'Extended 1000+ word dossier' : 'Growth playbook',
    14,
    y,
  )
  y += 8

  if (opts.tier === 'basic') {
    const deep = result.brief.longform || result.brief.body || ''
    const chunks = String(deep)
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
    const titles = ['What this sitting adds', 'Work & relationships', 'Your experiment', 'Keep this in mind']
    chunks.forEach((chunk, i) => {
      y = ensurePage(doc, y, 18, meta)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      doc.setTextColor(FOREST)
      doc.text(titles[Math.min(i, titles.length - 1)] || `Section ${i + 1}`, 14, y)
      y += 6
      y = writeWrapped(doc, chunk, y, meta, 11, 6)
      y += 3
    })
  } else {
    const sections = opts.sections || []
    for (const sec of sections) {
      y = ensurePage(doc, y, 18, meta)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      doc.setTextColor(FOREST)
      doc.text(sec.title, 14, y)
      y += 6
      y = writeWrapped(doc, sec.body, y, meta, 11, 6)
      y += 4
    }
    if (opts.wordCount) {
      y = ensurePage(doc, y, 10, meta)
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(9)
      doc.setTextColor(MUTED)
      doc.text(`Extended narrative · ~${opts.wordCount} words · unique document ${serial}`, 14, y)
      y += 6
    }
  }

  // Closing + plan (practical; legal stays in the short note above)
  y = ensurePage(doc, y, 20, meta)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(FOREST)
  doc.text('Closing', 14, y)
  y += 6
  y = writeWrapped(
    doc,
    doctorOnScreenClose({
      title: result.title,
      topName: String(leadName),
      leadScore: top.score,
      clinical: result.clinical || !!ref?.clinical,
      crisis: result.crisis,
      brief: result.brief,
      you,
    }),
    y,
    meta,
    11,
    6,
  )
  y += 2
  y = writeWrapped(
    doc,
    doctorSessionClose({
      you,
      title: result.title,
      leadName: String(leadName),
      leadScore: top.score,
      bookTitle: String(book.bookTitle || ''),
      authors: String(book.authors || ''),
      serial,
      clinical: result.clinical || !!ref?.clinical,
      crisis: result.crisis,
    }),
    y,
    meta,
    10.5,
    5.8,
  )
  y += 4

  // 14-day plan
  y = ensurePage(doc, y, 36, meta)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(TEXT)
  doc.text('14-day self-reflection plan', 14, y)
  y += 6
  y = writeWrapped(doc, doctorFourteenDayPlan(String(leadName), you), y, meta, 11, 6)

  // Crisis-only end box (skip repeating diagnosis disclaimers)
  if (result.crisis) {
    y = ensurePage(doc, y, 22, meta)
    doc.setFillColor(255, 242, 240)
    doc.setDrawColor('#ffccc7')
    doc.roundedRect(14, y, 182, 18, 2, 2, 'FD')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor('#a8071a')
    doc.text('If you need support now', 18, y + 6)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(TEXT)
    doc.text(
      doc.splitTextToSize(
        'Contact emergency services, 988 (US/Canada), or Samaritans 116 123 (UK).',
        172,
      ) as string[],
      18,
      y + 11,
    )
  }

  // Fix footers with total page count
  const total = doc.getNumberOfPages()
  for (let i = 1; i <= total; i++) {
    doc.setPage(i)
    drawFooter(doc, i, total, serial)
  }

  return new Uint8Array(doc.output('arraybuffer') as ArrayBuffer)
}

export async function downloadMindoraPdf(result: RunAssessmentResult, opts: PdfOpts) {
  const bytes = buildMindoraPdfBytes(result, opts)
  // Copy into a standalone buffer so Blob always receives real PDF bytes
  const copy = new Uint8Array(bytes)
  const blob = new Blob([copy], { type: 'application/pdf' })
  return triggerPdfDownload(blob, dossierFileName(result, opts.tier))
}
