import type { ContentPack } from '@/domain/reports/types'
import { buildPrimaryPack } from '@/data/reports/packs/packHelpers'

function spirit(id: string, name: string, blurb: string, hue: string, open: string) {
  return buildPrimaryPack({
    id,
    name,
    blurb,
    emblemHue: hue,
    experiment: {
      title: 'Thirty days of flight',
      body: 'Week 1: one solo hour that matches your animal’s habitat. Week 2: one conversation where you use your rare sentence. Week 3: one stretch into your productive opposite. Week 4: keep the ritual that still fits.',
    },
    seeds: [
      {
        title: 'The quiet recognition',
        teaser: 'Why this animal fits the way you already move.',
        body: `${open} At {{score}}% affinity, {{primary}} is your lead metaphor — not a mystical claim, a usable map. Secondary pull toward {{secondary}} ({{secondaryScore}}%) shows who sharpens you and who drains you.`,
      },
      {
        title: 'Natural habitat',
        teaser: 'Rooms, pace, and company where you think well.',
        body: `Design your week like habitat design: light, noise, group size, recovery. {{primary}} wants a specific ecology. Ignore it and you call yourself lazy; honor it and output returns. Watch how {{secondary}} modifies the habitat you actually need.`,
      },
    ],
  })
}

export const spiritPack: ContentPack = {
  family: 'spirit',
  fallbackPrimaryId: 'owl',
  disclaimer: 'Metaphorical drive profile for reflection and growth. Entertainment-grade framing with practical habits — not destiny.',
  primaries: {
    owl: spirit(
      'owl',
      'The Owl',
      'The quiet observer with night-shift wisdom: you see the whole room, keep your own counsel, and think in questions nobody else asks.',
      '#3D4F6F',
      'You watch first and speak last — and you are usually right when you finally speak.',
    ),
    wolf: spirit(
      'wolf',
      'The Wolf',
      'Loyal depth over noisy breadth: you bond hard, protect your circle, and prefer a known pack to a crowded room.',
      '#6B5B4B',
      'Loyalty and long bonds sit at the center of how you move.',
    ),
    dolphin: spirit(
      'dolphin',
      'The Dolphin',
      'Play, momentum, and out-loud emotion: you lift rooms, recover through connection, and think better when the water is moving.',
      '#4880D9',
      'Motion and social play are how your mind stays sharp.',
    ),
    fox: spirit(
      'fox',
      'The Fox',
      'Adaptive wit: you read angles fast, keep options open, and prefer clever routes to blunt force.',
      '#C47A3A',
      'Flexibility and reading the angle are your first tools.',
    ),
    deer: spirit(
      'deer',
      'The Deer',
      'Sensitive atmosphere reading: you notice shifts early, move with care, and need gentleness to stay brave.',
      '#8FCBAA',
      'Attunement to atmosphere is your quiet superpower.',
    ),
    eagle: spirit(
      'eagle',
      'The Eagle',
      'Altitude and aim: you want the long view, clean decisions, and space enough to dive once — accurately.',
      '#1F2A33',
      'You prefer height, clarity, and decisive moves over chatter.',
    ),
  },
}
