/**
 * PDF result emblems = glass orbs matched to the result title letter.
 * 35 AI orb assets × emotion/geometry variants cover ~100 answer profiles.
 * Gender (female/male) shifts which orb bank is preferred.
 */

export type ReportGender = 'female' | 'male'

export type EmblemMood = {
  id: number
  emotion: string
  hue: string
  accent: string
  orb: number
  rotate: number
  mesh: 0 | 1 | 2 | 3 | 4
  filter: string
  /** Preferred presentation bank */
  bank: 'female' | 'male' | 'any'
}

/** All AI-generated glass orbs (no people portraits) */
export const ORB_ASSETS = [
  '/brand/emblems/01-sage.png',
  '/brand/emblems/02-blue.png',
  '/brand/emblems/03-forest.png',
  '/brand/emblems/04-amber.png',
  '/brand/emblems/05-rose.png',
  '/brand/emblems/06-mint.png',
  '/brand/emblems/07-plum.png',
  '/brand/emblems/08-slate.png',
  '/brand/emblems/09-warm.png',
  '/brand/emblems/10-depth.png',
  '/brand/emblems/11-heart.png',
  '/brand/emblems/emblem-12-sage-soft.png',
  '/brand/emblems/emblem-13-sky.png',
  '/brand/emblems/emblem-14-deep-forest.png',
  '/brand/emblems/emblem-15-mint-glow.png',
  '/brand/emblems/emblem-16-amber-soft.png',
  '/brand/emblems/emblem-17-rose-soft.png',
  '/brand/emblems/emblem-18-plum-soft.png',
  '/brand/emblems/emblem-19-slate-soft.png',
  '/brand/emblems/emblem-20-indigo.png',
  '/brand/emblems/emblem-21-coral.png',
  '/brand/emblems/emblem-22-seafoam.png',
  '/brand/emblems/emblem-23-charcoal-sage.png',
  '/brand/emblems/orb-calm-01.png',
  '/brand/emblems/orb-hope-02.png',
  '/brand/emblems/orb-focus-03.png',
  '/brand/emblems/orb-empathy-04.png',
  '/brand/emblems/orb-drive-05.png',
  '/brand/emblems/orb-night-06.png',
  '/brand/emblems/orb-steady-07.png',
  '/brand/emblems/orb-creative-08.png',
  '/brand/emblems/orb-courage-09.png',
  '/brand/emblems/orb-pressure-10.png',
  '/brand/emblems/orb-clear-11.png',
  '/brand/emblems/orb-ground-12.png',
] as const

export const EMBLEM_COUNT = 100

const EMOTIONS = [
  'quiet curiosity',
  'steady resolve',
  'warm loyalty',
  'restless spark',
  'gentle vigilance',
  'deep focus',
  'open heart',
  'clear water',
  'soft courage',
  'night thinking',
  'honest fire',
  'patient care',
  'bright hope',
  'tender doubt',
  'grounded calm',
  'sharp clarity',
  'playful lift',
  'quiet strength',
  'empathic pull',
  'steady rhythm',
  'wild wonder',
  'soft grief-light',
  'protective warmth',
  'morning resolve',
  'evening honesty',
  'curious hunger',
  'loyal stillness',
  'creative restless',
  'healing green',
  'brave soft',
  'analytical cool',
  'social glow',
  'inner compass',
  'tender ambition',
  'peaceful watch',
  'fierce care',
  'quiet delight',
  'weighted hope',
  'open horizon',
  'rooted truth',
  'gentle drive',
  'intimate focus',
  'sunny grit',
  'ocean breath',
  'ember patience',
  'silk resilience',
  'steel kindness',
  'luminous doubt',
  'forest listening',
  'whole-hearted',
  'dawn patience',
  'quiet fire',
  'measured spark',
  'soft armor',
  'clear weather',
  'low tide honesty',
  'high tide drive',
  'still water',
  'moving water',
  'warm threshold',
  'cool threshold',
  'kind friction',
  'honest friction',
  'slow bloom',
  'fast bloom',
  'held breath',
  'released breath',
  'inner lighthouse',
  'outer lighthouse',
  'gentle voltage',
  'steady voltage',
  'open ledger',
  'closed ledger',
  'shared silence',
  'chosen solitude',
  'team gravity',
  'solo gravity',
  'soft deadline',
  'hard deadline',
  'curious pause',
  'decisive pause',
  'repair instinct',
  'protect instinct',
  'learn instinct',
  'finish instinct',
  'listen first',
  'speak first',
  'map first',
  'move first',
  'ember focus',
  'glacier focus',
  'garden focus',
  'workshop focus',
  'midnight clarity',
  'noon clarity',
  'rainy resolve',
  'sunny resolve',
  'woven trust',
  'tested trust',
  'fresh start energy',
] as const

const HUES = [
  '#4880D9',
  '#31B070',
  '#C45C6A',
  '#E8A838',
  '#6B7C85',
  '#032514',
  '#E2A8B0',
  '#7A9E9F',
  '#7BC4A0',
  '#3D4F6F',
  '#D97B4A',
  '#5A8F7B',
  '#9B6B9E',
  '#8FCBAA',
  '#1F2A33',
  '#C47A3A',
] as const

const ACCENTS = ['#31B070', '#4880D9', '#E8A838', '#C45C6A', '#032514', '#7BC4A0', '#9B6B9E', '#6B7C85'] as const

const FILTERS = [
  'saturate(1.05)',
  'saturate(1.12)',
  'saturate(0.95) contrast(1.05)',
  'saturate(1.15) brightness(1.03)',
  'saturate(1.08) hue-rotate(-5deg)',
  'saturate(1.1) hue-rotate(6deg)',
  'saturate(1) brightness(0.97)',
  'saturate(1.18) brightness(1.04)',
] as const

/** Female-leaning orbs (warmer / softer indices) */
const FEMALE_ORB_POOL = [0, 4, 5, 6, 10, 11, 15, 16, 17, 21, 23, 26, 27, 31, 33]
/** Male-leaning orbs (cooler / deeper indices) */
const MALE_ORB_POOL = [1, 2, 3, 7, 8, 9, 12, 13, 14, 18, 19, 20, 22, 24, 25, 28, 29, 30, 32, 34]

export const EMOTIONAL_EMBLEMS: EmblemMood[] = EMOTIONS.map((emotion, i) => {
  const bank: EmblemMood['bank'] = i % 3 === 0 ? 'female' : i % 3 === 1 ? 'male' : 'any'
  const pool = bank === 'female' ? FEMALE_ORB_POOL : bank === 'male' ? MALE_ORB_POOL : [...FEMALE_ORB_POOL, ...MALE_ORB_POOL]
  return {
    id: i + 1,
    emotion,
    hue: HUES[i % HUES.length]!,
    accent: ACCENTS[i % ACCENTS.length]!,
    orb: pool[i % pool.length]!,
    rotate: (i * 3.6) % 360,
    mesh: (i % 5) as 0 | 1 | 2 | 3 | 4,
    filter: FILTERS[i % FILTERS.length]!,
    bank,
  }
})

function hashSeed(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function profileFingerprint(
  traits: { id?: string; name: string; score: number }[],
  overall?: number,
): string {
  const parts = [...traits]
    .map((t) => `${t.id ?? t.name}:${Math.round(t.score)}`)
    .sort()
  if (typeof overall === 'number') parts.push(`o:${Math.round(overall)}`)
  return parts.join('|')
}

export function pickEmotionalEmblem(opts: {
  label: string
  family: string
  hue: string
  profileKey?: string
  gender?: ReportGender | null
}): EmblemMood {
  const gender = opts.gender ?? null
  const pool =
    gender === 'female'
      ? EMOTIONAL_EMBLEMS.filter((e) => e.bank === 'female' || e.bank === 'any')
      : gender === 'male'
        ? EMOTIONAL_EMBLEMS.filter((e) => e.bank === 'male' || e.bank === 'any')
        : EMOTIONAL_EMBLEMS

  const key = `${opts.family}::${opts.label.toLowerCase()}::${opts.hue}::${opts.profileKey ?? ''}::${gender ?? 'x'}`
  const seed = hashSeed(key)
  return pool[seed % pool.length]!
}

export function emblemOrbSrc(mood: EmblemMood): string {
  return ORB_ASSETS[mood.orb % ORB_ASSETS.length] ?? ORB_ASSETS[0]!
}
