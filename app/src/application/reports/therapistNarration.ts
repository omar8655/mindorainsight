import type { ReportDocument } from '@/domain/reports/types'
import { pickEmotionalEmblem, profileFingerprint } from '@/features/reports/emblemAssets'

function cleanForSpeech(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/[*_#`]/g, '')
    .replace(/(\d+)\s*%/g, '$1 percent')
    .replace(/\u2026/g, '…')
    .trim()
}

function firstSentences(text: string, count: number): string {
  return cleanForSpeech(text)
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean)
    .slice(0, count)
    .join(' ')
}

function breath(): string {
  return '…'
}

type NarrationOptions = {
  /** Include every chapter (longer session). Default: first 4 + invitation to PDF. */
  extended?: boolean
}

/**
 * Warm therapist-session narration for speech synthesis.
 * Gender-aware, second person, human pacing — not a robotic PDF dump.
 */
export function buildTherapistNarration(doc: ReportDocument, opts: NarrationOptions = {}): string {
  const extended = opts.extended === true
  const mood = pickEmotionalEmblem({
    label: doc.primary.name,
    family: doc.family,
    hue: doc.emblemHue,
    profileKey: profileFingerprint(doc.traits, doc.overall),
    gender: doc.gender,
  })
  const secondary = doc.traits[1]
  const chapterLimit = extended ? doc.chapters.length : Math.min(4, doc.chapters.length)
  const walkChapters = doc.chapters.slice(0, chapterLimit)

  const genderNote =
    doc.gender === 'female'
      ? 'You chose female before this assessment. I will keep that in mind as we talk — still as a whole person, never as a stereotype.'
      : doc.gender === 'male'
        ? 'You chose male before this assessment. I will keep that in mind as we talk — still as a whole person, never as a stereotype.'
        : 'I will speak with you directly, as a whole person.'

  const parts: string[] = []

  parts.push(
    `Hi. Take a slow breath with me for a second. ${breath()} This is not a verdict about who you are. It is a careful look at one pattern that showed up strongly for you on ${doc.assessmentTitle}.`,
  )

  parts.push(genderNote)

  if (doc.family === 'adhd') {
    parts.push(
      `Before the numbers: answering honestly takes courage. This screen is educational — a map you can bring to a licensed professional. It is not a diagnosis, and it is not a label that gets to define you.`,
    )
  }

  parts.push(
    `Your result title is ${doc.primary.name}, at ${doc.primary.score} percent. If I had to name the emotional color of this profile, I would call it ${mood.emotion}. ${cleanForSpeech(doc.blurb)}`,
  )

  if (secondary) {
    parts.push(
      `You are not only that one note. ${secondary.name} sits close behind at ${secondary.score} percent — and that pairing matters. Two people with the same primary can feel completely different once the second score walks into the room.`,
    )
  }

  if (doc.traits.length > 2) {
    const rest = doc.traits
      .slice(0, 6)
      .map((t) => `${t.name} at ${t.score} percent`)
      .join(', ')
    parts.push(`Here is your score shape, spoken simply: ${rest}.`)
  }

  parts.push(
    `Here is how I would say your snapshot out loud. ${cleanForSpeech(doc.summary)} Overall intensity sits around ${doc.overall} percent — useful as a headline, not as a cage.`,
  )

  if (doc.themes.length > 0) {
    const themeNames = doc.themes.map((t) => t.title).join(', ')
    parts.push(
      `Your written report is organized into themes: ${themeNames}. I will walk the chapters with you the way I would talk in session — slowly, as if we are sitting across from each other. You can pause or stop anytime.`,
    )
  } else {
    parts.push(
      `I am going to walk you through the chapters the way I would talk in session — slowly, as if we are sitting across from each other. You can pause or stop anytime.`,
    )
  }

  let lastTheme = ''
  for (const ch of walkChapters) {
    if (ch.theme && ch.theme !== lastTheme) {
      parts.push(`We are entering the theme: ${ch.theme}.`)
      lastTheme = ch.theme
    }
    parts.push(`Chapter ${ch.number}. ${ch.title}.`)
    parts.push(firstSentences(ch.body, extended ? 4 : 3))
    parts.push(`Okay. Let that land before we move on. ${breath()}`)
  }

  if (!extended && doc.chapters.length > walkChapters.length) {
    parts.push(
      `There are ${doc.chapters.length} chapters in your full written report. I am not going to race through every page out loud right now. If you want the longer session, turn on Longer session and press Start again — or sit with the PDF in silence when you are ready.`,
    )
  } else if (extended && doc.chapters.length > 4) {
    parts.push(
      `That was the longer walk-through of all ${doc.chapters.length} chapters. You do not have to hold all of it at once.`,
    )
  }

  parts.push(
    `Before we close: your experiment is called ${doc.experiment.title}. ${cleanForSpeech(doc.experiment.body)}`,
  )

  parts.push(
    `One last thing, said the way I would say it to someone I care about: this report is educational. It is not a diagnosis, and it is not a replacement for a licensed clinician. If something here stings or opens a door, you are allowed to bring it to a real person who can sit with you longer than an audio track can.`,
  )

  parts.push(`You are done for now. Be gentle with yourself when you put this away.`)

  return parts.filter(Boolean).join('\n\n')
}

/** Longer session — every chapter, still paced for listening */
export function buildExtendedNarration(doc: ReportDocument): string {
  return buildTherapistNarration(doc, { extended: true })
}

/**
 * Split narration into speakable chunks.
 * Chrome truncates long utterances; keep each chunk modest and sentence-aware.
 */
export function narrationChunks(text: string): string[] {
  const paragraphs = text
    .split(/\n\n+/)
    .map((c) => cleanForSpeech(c))
    .filter((c) => c.length > 0)

  const out: string[] = []
  const MAX = 220

  for (const p of paragraphs) {
    if (p.length <= MAX) {
      out.push(p)
      continue
    }
    const sentences = p.split(/(?<=[.!?…])\s+/).filter(Boolean)
    let buf = ''
    for (const s of sentences) {
      const next = buf ? `${buf} ${s}` : s
      if (next.length > MAX && buf) {
        out.push(buf)
        buf = s
      } else if (s.length > MAX) {
        // Hard-split rare mega-sentences
        if (buf) {
          out.push(buf)
          buf = ''
        }
        for (let i = 0; i < s.length; i += MAX) {
          out.push(s.slice(i, i + MAX).trim())
        }
      } else {
        buf = next
      }
    }
    if (buf) out.push(buf)
  }

  return out.filter(Boolean)
}

/** Rough listen-time estimate for UI (words ≈ 130 wpm at calm rate). */
export function estimateListenMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 130))
}
