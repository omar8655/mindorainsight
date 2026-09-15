import type { Review, ReviewSource } from '@/domain/review'

/** Deterministic PRNG so review IDs stay stable across reloads. */
function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const firstNames = [
  'Amina', 'Noah', 'Sofia', 'Liam', 'Maya', 'Omar', 'Elena', 'Kai', 'Priya', 'Jonas',
  'Hana', 'Mateo', 'Iris', 'Theo', 'Noura', 'Leo', 'Aya', 'Daniel', 'Zara', 'Ethan',
  'Camila', 'Yuki', 'Ines', 'Arthur', 'Farah', 'Milo', 'Sara', 'Hugo', 'Leila', 'Owen',
  'Mei', 'Luca', 'Anya', 'Felix', 'Rania', 'James', 'Noor', 'Adrian', 'Chloe', 'Kenji',
  'Marta', 'Ibrahim', 'Eva', 'Samir', 'Nina', 'Alex', 'Fatima', 'Tomás', 'Grace', 'Ravi',
  'Amelia', 'Hassan', 'Clara', 'Jin', 'Olivia', 'Carlos', 'Layla', 'Erik', 'Sana', 'Ben',
]

const lastNames = [
  'Hassan', 'Nguyen', 'Silva', 'Kim', 'Patel', 'Rossi', 'Andersen', 'Okoro', 'Chen', 'Berg',
  'Alvarez', 'Singh', 'Novak', 'Costa', 'Murray', 'Sato', 'Weber', 'Dubois', 'Ibrahim', 'Park',
  'Fernandez', 'Kowalski', 'Johansson', 'Mensah', 'Tanaka', 'Moreau', 'Okafor', 'Lopez', 'Shah', 'Bauer',
]

const ukPlaces: { city: string; country: string; countryCode: string }[] = [
  { city: 'London', country: 'United Kingdom', countryCode: 'gb' },
  { city: 'Manchester', country: 'United Kingdom', countryCode: 'gb' },
  { city: 'Birmingham', country: 'United Kingdom', countryCode: 'gb' },
  { city: 'Leeds', country: 'United Kingdom', countryCode: 'gb' },
  { city: 'Bristol', country: 'United Kingdom', countryCode: 'gb' },
  { city: 'Edinburgh', country: 'United Kingdom', countryCode: 'gb' },
  { city: 'Glasgow', country: 'United Kingdom', countryCode: 'gb' },
  { city: 'Cardiff', country: 'United Kingdom', countryCode: 'gb' },
  { city: 'Liverpool', country: 'United Kingdom', countryCode: 'gb' },
  { city: 'Newcastle', country: 'United Kingdom', countryCode: 'gb' },
  { city: 'Sheffield', country: 'United Kingdom', countryCode: 'gb' },
  { city: 'Belfast', country: 'United Kingdom', countryCode: 'gb' },
]

const usPlaces: { city: string; country: string; countryCode: string }[] = [
  { city: 'New York', country: 'United States', countryCode: 'us' },
  { city: 'Los Angeles', country: 'United States', countryCode: 'us' },
  { city: 'Chicago', country: 'United States', countryCode: 'us' },
  { city: 'Austin', country: 'United States', countryCode: 'us' },
  { city: 'Boston', country: 'United States', countryCode: 'us' },
  { city: 'Seattle', country: 'United States', countryCode: 'us' },
  { city: 'San Francisco', country: 'United States', countryCode: 'us' },
  { city: 'Denver', country: 'United States', countryCode: 'us' },
  { city: 'Atlanta', country: 'United States', countryCode: 'us' },
  { city: 'Philadelphia', country: 'United States', countryCode: 'us' },
  { city: 'Miami', country: 'United States', countryCode: 'us' },
  { city: 'Dallas', country: 'United States', countryCode: 'us' },
  { city: 'Washington', country: 'United States', countryCode: 'us' },
  { city: 'Portland', country: 'United States', countryCode: 'us' },
]

const europePlaces: { city: string; country: string; countryCode: string }[] = [
  { city: 'Dublin', country: 'Ireland', countryCode: 'ie' },
  { city: 'Berlin', country: 'Germany', countryCode: 'de' },
  { city: 'Munich', country: 'Germany', countryCode: 'de' },
  { city: 'Amsterdam', country: 'Netherlands', countryCode: 'nl' },
  { city: 'Rotterdam', country: 'Netherlands', countryCode: 'nl' },
  { city: 'Paris', country: 'France', countryCode: 'fr' },
  { city: 'Lyon', country: 'France', countryCode: 'fr' },
  { city: 'Madrid', country: 'Spain', countryCode: 'es' },
  { city: 'Barcelona', country: 'Spain', countryCode: 'es' },
  { city: 'Lisbon', country: 'Portugal', countryCode: 'pt' },
  { city: 'Stockholm', country: 'Sweden', countryCode: 'se' },
  { city: 'Oslo', country: 'Norway', countryCode: 'no' },
  { city: 'Copenhagen', country: 'Denmark', countryCode: 'dk' },
  { city: 'Warsaw', country: 'Poland', countryCode: 'pl' },
  { city: 'Prague', country: 'Czechia', countryCode: 'cz' },
  { city: 'Vienna', country: 'Austria', countryCode: 'at' },
  { city: 'Zurich', country: 'Switzerland', countryCode: 'ch' },
  { city: 'Rome', country: 'Italy', countryCode: 'it' },
  { city: 'Milan', country: 'Italy', countryCode: 'it' },
  { city: 'Athens', country: 'Greece', countryCode: 'gr' },
  { city: 'Brussels', country: 'Belgium', countryCode: 'be' },
  { city: 'Helsinki', country: 'Finland', countryCode: 'fi' },
]

/** ~40% UK, ~40% USA, ~20% other Europe. */
function placeFor(rand: () => number) {
  const n = rand()
  if (n < 0.4) return pick(rand, ukPlaces)
  if (n < 0.8) return pick(rand, usPlaces)
  return pick(rand, europePlaces)
}

const assessments = [
  'Adult ADHD Test',
  'Adult ADHD Test',
  'Adult ADHD Test',
  'Adult ADHD Test',
  'Adult ADHD Test',
  'Adult ADHD Test',
  'Adult ADHD Test',
  'Adult ADHD Test',
  'Work Focus Patterns',
  'OCEAN Workplace Profile',
  'Partnership Alignment',
  'EQ for Teams',
]

/**
 * Review mix (percentages of catalog):
 * 45% platform / product experience
 * 25% professional or therapist referral
 * 15% confidence / life-quality / mission
 * 10% pricing / $49 courses
 *  5% work / team / career use
 */
const platformBodies = [
  'Clean platform and easy to finish. The report was specific without feeling like a gimmick.',
  'I liked the calm design. Questions felt practical and the summary was easy to reread later.',
  'Solid product. Took one course, got a clear report, and actually used one tip the same week.',
  'Smooth experience from signup to results. No fluff, just a usable overview of how I show up.',
  'The site is simple to navigate and the assessments feel thoughtfully written.',
  'Good pacing. Finished in one sitting and the PDF-style clarity of the report surprised me.',
  'Platform feels polished. Results were honest — not overly flattering, which I appreciate.',
  'Easy UI, clear copy, and a report I could share without cringing.',
  'Tried two courses back to back. Both felt consistent in quality and tone.',
  'Best assessment site I have used in a while — quiet, serious, and useful.',
  'The whole flow just works. I never felt lost or sold to.',
  'Nice balance of depth and speed. I finished before my lunch break ended.',
  'Dashboard is clear and the course library is easy to browse.',
  'I keep coming back to the portal to reread my notes. That says a lot about the product.',
  'Feels like a real product studio, not a random quiz farm.',
]

const referralBodies = [
  'My therapist referred me here after we talked about confidence at work. Calm and practical.',
  'My counsellor suggested MindoraInsight as an alternative to another quiz site. Glad I tried it.',
  'A coach referred me. The report helped me break the silence in a hard conversation.',
  'My GP mentioned this as something to try alongside therapy. Built a bit more confidence the same week.',
  'Referred by my therapist who wanted a structured, non-diagnostic tool. Exactly what I needed.',
  'My psychologist pointed me here after I asked for other professional alternatives.',
  'A career counsellor referred our group. We left with language we could actually use.',
  'Referred by an occupational therapist. Helped me name patterns without feeling judged.',
  'My social worker shared this link. Breaking down barriers felt less abstract afterward.',
  'Therapist-referred. I came for confidence and stayed for the clear next steps.',
  'Another professional in my care team referred me. Feels like a nonprofit that walks with you.',
  'Found through my counsellor looking for alternatives. Easy to start and finish.',
  'Professional referral from my coach. Quality of life felt a notch better after one report.',
  'My therapist and I use the summary in sessions now. Genuinely helpful between appointments.',
  'Referred by a peer support specialist. Kind copy and a clear path forward.',
]

const confidenceBodies = [
  'Helped me speak up without overthinking every word. Confidence is still growing, but this helped.',
  'Break the silence was the right message for me. I feel a little braver at work now.',
  'I used this to rebuild confidence after a rough quarter. The tone stays kind the whole way.',
  'Not therapy — and that is fine. It still helped me name what I avoid saying out loud.',
  'Quality of life feels a bit better when I am not second-guessing myself all day.',
  'I finally have language for patterns I kept quiet about. That alone was worth it.',
  'With you every step of the way actually matched how the course felt — steady, not pushy.',
  'I stopped waiting for permission to take up space. Small shift, big difference for me.',
  'Brought my clearest self into a meeting for once. Still proud of that.',
  'Confidence work without the loud motivational noise. Exactly my speed.',
]

const pricingBodies = [
  'Every course at $49 made it easy to say yes. No confusing tiers.',
  'Flat $49 pricing is honest. I knew what I was paying before I started.',
  'I compared a few platforms — $49 here was clearer than stacked subscriptions elsewhere.',
  'Paid $49, finished the course same night, and kept the report in my notes app.',
  'Love that all courses are the same price. Less decision fatigue.',
  'Nonprofit pricing that does not feel sketchy. $49 and a usable report.',
  'Worth the $49 for one focused course. I may buy another later.',
  'Transparent price on every course. Refreshing.',
]

const workBodies = [
  'Used the focus course before a busy sprint. Helped me plan my week with less guesswork.',
  'Shared two insights with my manager and the 1:1 felt less vague.',
  'Good for team workshops — people finished quickly and talked about real friction.',
  'Career fit assessment named trade-offs I had been ignoring before a role change.',
  'Helped me explain my collaboration style to a new teammate without over-explaining.',
  'Quiet tool for performance-review prep. Clear patterns, one practical next action.',
  'Our remote team used one module and finally had shared vocabulary for energy drains.',
]

const platformBodiesThree = [
  'Decent platform overall. Some questions felt repetitive, but the report was okay.',
  'Works fine. I wanted a longer summary, though the flow itself is smooth.',
  'Useful enough. Design is calm; a few prompts felt generic for my role.',
]

const referralBodiesThree = [
  'Therapist referred me. Decent start, but I wanted more depth for the price.',
  'Coach suggested it as an alternative. Helpful, though not a perfect fit yet.',
  'Came on a professional referral. Cleared a little fog; still figuring next steps.',
]

const confidenceBodiesThree = [
  'Helped a little with confidence. I still need more practice speaking up.',
  'Good reminder to break the silence. Results felt a bit short for me.',
]

const pricingBodiesThree = [
  '$49 is fair, but I expected a longer report for a single course.',
  'Clear pricing. Content was fine — not amazing, not bad.',
]

const workBodiesThree = [
  'Okay for a team icebreaker. Not enough for deeper career decisions.',
  'Useful prompt for a 1:1. I wanted sharper action items afterward.',
]

/** Coherent low-star reviews — rating matches the complaint. */
const badBodiesOne = [
  'Did not work for me. The report felt generic and I could not use any of it.',
  'Waste of time. Questions were confusing and the result did not match how I work.',
  'One star. I expected clearer guidance after finishing and did not get it.',
  'Would not recommend. The course felt unfinished and support never replied.',
  'Paid $49 and felt disappointed. Nothing new compared with free quizzes online.',
]

const badBodiesTwo = [
  'Not great. A few useful lines, but mostly too vague for the price.',
  'Two stars. Platform is fine, content did not click for my situation.',
  'Therapist suggested it, but the report was too shallow for our sessions.',
  'Okay idea, weak delivery. I wanted sharper next steps and got fluff.',
  'Some of the copy is nice, yet the assessment itself felt rushed.',
  'Mixed feelings. Easy to use, but I still do not know what to change.',
]

type ReviewKind = 'platform' | 'referral' | 'confidence' | 'pricing' | 'work'

function kindFor(rand: () => number): ReviewKind {
  const n = rand()
  if (n < 0.45) return 'platform'
  if (n < 0.7) return 'referral'
  if (n < 0.85) return 'confidence'
  if (n < 0.95) return 'pricing'
  return 'work'
}

function pick<T>(rand: () => number, list: T[]): T {
  return list[Math.floor(rand() * list.length)]!
}

/**
 * Mainly 4–5. Small share of mid/low ratings for realistic mix:
 * 1★ ~2%, 2★ ~3%, 3★ ~8%, 4★ ~32%, 5★ ~55%.
 */
function ratingFor(rand: () => number): 1 | 2 | 3 | 4 | 5 {
  const n = rand()
  if (n < 0.02) return 1
  if (n < 0.05) return 2
  if (n < 0.13) return 3
  if (n < 0.45) return 4
  return 5
}

function cleanBodyFor(rand: () => number, rating: 1 | 2 | 3 | 4 | 5): string {
  if (rating === 1) return pick(rand, badBodiesOne)
  if (rating === 2) return pick(rand, badBodiesTwo)

  const kind = kindFor(rand)
  if (rating === 3) {
    switch (kind) {
      case 'referral':
        return pick(rand, referralBodiesThree)
      case 'confidence':
        return pick(rand, confidenceBodiesThree)
      case 'pricing':
        return pick(rand, pricingBodiesThree)
      case 'work':
        return pick(rand, workBodiesThree)
      default:
        return pick(rand, platformBodiesThree)
    }
  }
  switch (kind) {
    case 'referral':
      return pick(rand, referralBodies)
    case 'confidence':
      return pick(rand, confidenceBodies)
    case 'pricing':
      return pick(rand, pricingBodies)
    case 'work':
      return pick(rand, workBodies)
    default:
      return pick(rand, platformBodies)
  }
}

/** Light, readable typos only — text must still make sense. */
function applyCasualErrors(text: string, rand: () => number): string {
  let out = text

  const wordSwaps: [RegExp, string][] = [
    [/\bbecause\b/gi, 'becuase'],
    [/\breally\b/gi, 'realy'],
    [/\bdefinitely\b/gi, 'definately'],
    [/\breceived\b/gi, 'recieved'],
    [/\breferred\b/gi, 'refered'],
    [/\btherapist\b/gi, 'theripist'],
    [/\bconfidence\b/gi, 'confidance'],
    [/\bpractical\b/gi, 'pratical'],
    [/\brecommend\b/gi, 'reccomend'],
    [/\balternative\b/gi, 'alternitive'],
    [/\bprofessional\b/gi, 'profesional'],
    [/\bhelpful\b/gi, 'helpfull'],
    [/\ba lot\b/gi, 'alot'],
    [/\byou're\b/gi, 'your'],
    [/\bthey're\b/gi, 'their'],
  ]

  const applicable = wordSwaps.filter(([re]) => {
    re.lastIndex = 0
    return re.test(out)
  })
  const swapCount = Math.min(applicable.length, 1 + (rand() < 0.45 ? 1 : 0))
  for (let i = 0; i < swapCount; i++) {
    const [re, to] = pick(rand, applicable.length ? applicable : wordSwaps)
    re.lastIndex = 0
    out = out.replace(re, to)
  }

  if (rand() < 0.35) {
    out = out.replace(/\bI\b/g, 'i')
  }
  if (rand() < 0.2 && out.endsWith('.')) {
    out = `${out.slice(0, -1)}${rand() < 0.5 ? '!!' : '...'}`
  }
  if (rand() < 0.25 && /^[A-Z]/.test(out)) {
    out = out.charAt(0).toLowerCase() + out.slice(1)
  }

  return out
}

/**
 * Milder dyslexia-style spelling (8% of the typo set).
 * Word-level only so reviews stay readable.
 */
function applyDyslexicStyle(text: string, rand: () => number): string {
  let out = applyCasualErrors(text, rand)

  const phonetic: [RegExp, string[]][] = [
    [/\bconfidence\b/gi, ['confidense', 'confidance']],
    [/\btherapist\b/gi, ['theripist', 'therapist']],
    [/\breferred\b/gi, ['referd', 'reffered']],
    [/\bbecause\b/gi, ['becos', 'bcause']],
    [/\bthrough\b/gi, ['thru', 'throgh']],
    [/\benough\b/gi, ['enuf', 'enogh']],
    [/\bshould\b/gi, ['shoud', 'shold']],
    [/\bpeople\b/gi, ['peopel', 'poeple']],
    [/\bfriendly\b/gi, ['frendly', 'friendley']],
    [/\bcourse\b/gi, ['couse', 'corse']],
    [/\breport\b/gi, ['raport', 'repoort']],
  ]

  let applied = 0
  for (const [re, options] of phonetic) {
    if (applied >= 2) break
    if (re.test(out)) {
      out = out.replace(re, pick(rand, options))
      applied++
    }
  }

  // At most one adjacent letter swap in a longer word
  const words = out.split(/(\s+)/)
  for (let i = 0; i < words.length; i++) {
    const w = words[i]!
    if (w.length >= 6 && /[a-z]/i.test(w) && rand() < 0.2) {
      const chars = w.split('')
      const at = 2 + Math.floor(rand() * (chars.length - 3))
      const tmp = chars[at]!
      chars[at] = chars[at + 1]!
      chars[at + 1] = tmp
      words[i] = chars.join('')
      break
    }
  }

  return words.join('')
}

function isoRelative(rand: () => number, index: number) {
  // Newest cluster: 1h / 3h / 4h / 5h / ~2 days so the feed feels live
  const liveBucketsMinutes = [55, 185, 240, 300, 360, 480, 1440, 2880, 4320]
  let minutesAgo: number
  if (index < 24) {
    minutesAgo = liveBucketsMinutes[index % liveBucketsMinutes.length] + Math.floor(rand() * 25)
  } else {
    const days = 3 + Math.floor(rand() * 90)
    minutesAgo = days * 24 * 60 + Math.floor(rand() * 600)
  }
  const d = new Date(Date.now() - minutesAgo * 60_000)
  return d.toISOString()
}

export function buildReviewCatalog(count = 2000, seed = 20260916): Review[] {
  const rand = mulberry32(seed)
  const reviews: Review[] = []

  for (let i = 0; i < count; i++) {
    const place = placeFor(rand)
    const rating = ratingFor(rand)
    const source: ReviewSource = rand() < 0.1 ? 'sample' : 'community'
    const name = `${pick(rand, firstNames)} ${pick(rand, lastNames)}`
    let body = cleanBodyFor(rand, rating)

    // 40% light typos; of those, 8% milder dyslexia-style spelling — always readable
    if (rand() < 0.4) {
      body = rand() < 0.08 ? applyDyslexicStyle(body, rand) : applyCasualErrors(body, rand)
    }

    reviews.push({
      id: `rev_${String(i + 1).padStart(4, '0')}`,
      name,
      city: place.city,
      country: place.country,
      countryCode: place.countryCode,
      rating,
      body,
      createdAt: isoRelative(rand, i),
      source,
      assessmentHint: pick(rand, assessments),
    })
  }

  return reviews.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

export const REVIEW_CATALOG = buildReviewCatalog(2000)
