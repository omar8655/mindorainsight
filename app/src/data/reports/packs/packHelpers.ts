import type { ChapterTemplate, PrimaryPack } from '@/domain/reports/types'

const THEME_IDS = [
  { id: 'core', title: 'Your tallest pattern' },
  { id: 'daily', title: 'Where it shows up' },
  { id: 'costs', title: 'The costs nobody warns you about' },
  { id: 'living', title: 'Living with it on purpose' },
] as const

type EssaySeed = {
  title: string
  teaser: string
  body: string
  requireSecondaryMin?: number
}

/** Build 16 chapters (4 themes × 4) from seeds + shared fillers. */
export function buildPrimaryPack(opts: {
  id: string
  name: string
  blurb: string
  emblemHue: string
  seeds: EssaySeed[]
  experiment: { title: string; body: string }
}): PrimaryPack {
  const fillers: EssaySeed[] = [
    {
      title: 'The signal in the noise',
      teaser: 'How this pattern announces itself before you name it.',
      body: `When {{primary}} sits at {{score}}%, it rarely arrives as a slogan. It shows up as a preference you stop apologizing for: the meeting you want shorter, the draft you want stranger, the silence you protect. With {{secondary}} also elevated at {{secondaryScore}}%, the combination is yours — not a textbook average.`,
    },
    {
      title: 'What other people notice first',
      teaser: 'The tell colleagues and partners usually see before you do.',
      body: `People rarely say “your {{primary}} is high.” They say you reopen settled plans, or you finish early, or you read the room before speaking. That outsider view is useful. Pair it with your secondary lean toward {{secondary}} and you get a clearer brief for how you actually show up under load.`,
    },
    {
      title: 'Conditions that sharpen you',
      teaser: 'Environments where this pattern compounds instead of frays.',
      body: `{{primary}} thrives when the brief has room and the stakes are honest. Starve it of novelty or starve it of closure — depending on the trait — and the same strength becomes friction. Your {{secondary}} score suggests a second dial to watch when designing the week.`,
    },
    {
      title: 'A sentence you can forward',
      teaser: 'Language for a manager, partner, or teammate.',
      body: `Try: “I do my best work when {{primary}} has a clear lane — and I need a little structure around {{secondary}} so the week stays honest.” It is specific without being clinical, and it invites collaboration instead of judgment.`,
    },
    {
      title: 'When the week goes sideways',
      teaser: 'How stress distorts this pattern — and the smallest reset.',
      body: `Under strain, {{primary}} exaggerates: more intensity, less flexibility, or the opposite — retreat. Name the distortion early. A ten-minute reset that honors both {{primary}} and {{secondary}} beats a heroic recovery plan you will not keep.`,
    },
    {
      title: 'Thirty days, one experiment',
      teaser: 'A small protocol that makes the pattern visible in your own life.',
      body: `For four weeks, track one behavior tied to {{primary}} and one tether tied to {{secondary}}. Keep the stakes low. The point is evidence about how *you* run — not a personality makeover.`,
    },
  ]

  const pool = [...opts.seeds, ...fillers]
  while (pool.length < 16) {
    pool.push(fillers[pool.length % fillers.length]!)
  }

  const chapters: ChapterTemplate[] = pool.slice(0, 16).map((seed, i) => {
    const theme = THEME_IDS[Math.floor(i / 4)]!
    return {
      id: `${opts.id}-${theme.id}-${i % 4}`,
      themeId: theme.id,
      title: seed.title,
      teaser: seed.teaser,
      body: seed.body,
      requireSecondaryMin: seed.requireSecondaryMin,
    }
  })

  return {
    id: opts.id,
    name: opts.name,
    blurb: opts.blurb,
    emblemHue: opts.emblemHue,
    themes: THEME_IDS.map((t) => ({ id: t.id, title: t.title })),
    chapters,
    experiment: opts.experiment,
  }
}

export { THEME_IDS }
