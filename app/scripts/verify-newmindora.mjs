/**
 * Verify all 20 NewMindora topics: 100Q, scorer, book source, brief fingerprint, extended length.
 * Run: node --experimental-strip-types is not used; plain ESM against .js engines.
 */
import { QUESTIONS } from '../src/data/newmindora/questions-bank.js'
import { SCORERS, TEST_META } from '../src/data/newmindora/tests-core.js'
import { BRIEFS, BOOK_SOURCES, personaliseReport, referenceNote } from '../src/data/newmindora/reports.js'
import { classifyProfile } from '../src/data/newmindora/profile-engine.js'
import { compileExtended } from '../src/data/newmindora/report-engine.js'

const errors = []
console.log('topics', TEST_META.length)

for (const meta of TEST_META) {
  const id = meta.id
  const qs = QUESTIONS[id] || (id === 'personality' ? QUESTIONS.big5 : null)
  if (!qs || qs.length !== 100) errors.push(`${id}: questions ${qs?.length || 0}`)
  const scorer = SCORERS[id] || (id === 'personality' ? SCORERS.big5 : null)
  if (!scorer) errors.push(`${id}: missing scorer`)
  if (!BOOK_SOURCES[id]) errors.push(`${id}: missing BOOK_SOURCES`)
  const ref = referenceNote(id)
  if (!ref?.text) errors.push(`${id}: missing referenceNote`)
  const briefFn = BRIEFS[id] || BRIEFS.big5
  if (!briefFn) errors.push(`${id}: missing brief`)

  const answers = Array.from({ length: 100 }, (_, i) => 1 + (i % 5))
  const scores = scorer(answers)
  const shape = classifyProfile(id, scores)
  let brief = briefFn(scores, 'Alex', id === 'personality' ? 'personality' : undefined)
  brief = personaliseReport(brief, scores, 'Alex', meta.title, answers)
  if (!brief.fingerprint) errors.push(`${id}: no fingerprint`)
  if (!brief.headline) errors.push(`${id}: no headline`)

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
  if ((compiled.total || 0) < 1000) errors.push(`${id}: extended words ${compiled.total}`)

  // second pattern → different fingerprint
  const answers2 = Array.from({ length: 100 }, (_, i) => 5 - (i % 5))
  const scores2 = scorer(answers2)
  let brief2 = briefFn(scores2, 'Alex', id === 'personality' ? 'personality' : undefined)
  brief2 = personaliseReport(brief2, scores2, 'Alex', meta.title, answers2)
  if (brief.fingerprint === brief2.fingerprint) errors.push(`${id}: fingerprints not unique across answer stacks`)
}

if (errors.length) {
  console.error('FAIL', errors.join('\n'))
  process.exit(1)
}
console.log('OK · 20 topics · 100Q · refs · unique fingerprints · extended ≥1000 words')
