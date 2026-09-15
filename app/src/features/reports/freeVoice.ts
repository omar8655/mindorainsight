/**
 * Free browser TTS voice ranking — $0, no API keys.
 * Best available on-device voices (macOS Samantha/Daniel, Google UK/US, Microsoft Neural).
 */

export type VoiceGender = 'female' | 'male' | undefined

const FEMALE =
  /samantha|karen|moira|fiona|victoria|zira|siri|female|woman|aria|jenny|sonia|susan|hazel|serena|ava|emma|allison|kathy|linda|nancy|salli|joanna|ivy|kimberly|kendra|michelle|nicky|nicole|kate|martha|tessa|veena|raveena|olivia|emily|lily|amy|natasha|catherine|heather/i

const MALE =
  /daniel|alex|fred|tom|david|mark|guy|ryan|arthur|male|man|james|george|oliver|thomas|aaron|brian|matthew|justin|joey|nathan|russell|rishi|eric|lee|bruce|gordon|ralph|reed|rocko|eddy|flo|grandpa|reed|william|albert|bad news|bahh|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|zarvox|paul|richard|wayne|steven|christopher/i

/** Higher = more natural / less robotic on typical devices */
function qualityScore(v: SpeechSynthesisVoice): number {
  const n = v.name
  let s = 0
  if (/premium|enhanced|natural|neural|wavenet|studio|generative/i.test(n)) s += 100
  if (/google/i.test(n)) s += 70
  if (/microsoft/i.test(n)) s += 65
  if (/samantha|daniel|karen|moira|fiona|kate|oliver|serena|aria|jenny/i.test(n)) s += 55
  if (/siri/i.test(n)) s += 50
  if (/uk english|en-gb|en_gb/i.test(`${n} ${v.lang}`)) s += 20
  if (/en-us|en_us|en-au|en_au|en-ca|en_ca/i.test(v.lang)) s += 10
  if (v.localService) s += 8
  // Prefer fewer robotic default eSpeak-style names
  if (/espeak|compact|robot/i.test(n)) s -= 40
  return s
}

function englishPool(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  const en = voices.filter((v) => /^en(-|_|$)/i.test(v.lang) || /english/i.test(v.name))
  return en.length ? en : voices
}

export function listFreeVoices(
  voices: SpeechSynthesisVoice[],
  gender: VoiceGender,
): SpeechSynthesisVoice[] {
  const pool = englishPool(voices)
  let filtered = pool
  if (gender === 'female') {
    const f = pool.filter((v) => FEMALE.test(v.name) && !MALE.test(v.name))
    filtered = f.length ? f : pool.filter((v) => !MALE.test(v.name))
  } else if (gender === 'male') {
    const m = pool.filter((v) => MALE.test(v.name) && !FEMALE.test(v.name))
    filtered = m.length ? m : pool.filter((v) => !FEMALE.test(v.name))
  }
  return [...filtered].sort((a, b) => qualityScore(b) - qualityScore(a))
}

export function pickBestFreeVoice(
  voices: SpeechSynthesisVoice[],
  gender: VoiceGender,
): SpeechSynthesisVoice | null {
  const ranked = listFreeVoices(voices, gender)
  return ranked[0] ?? null
}

export function voiceLabel(v: SpeechSynthesisVoice): string {
  const local = v.localService ? 'on-device' : 'network'
  return `${v.name} · ${v.lang} · ${local}`
}

/** Calm therapist pacing for free TTS */
export function freeVoiceProsody(gender: VoiceGender): { rate: number; pitch: number } {
  if (gender === 'male') return { rate: 0.86, pitch: 0.92 }
  if (gender === 'female') return { rate: 0.88, pitch: 1.02 }
  return { rate: 0.87, pitch: 1 }
}
