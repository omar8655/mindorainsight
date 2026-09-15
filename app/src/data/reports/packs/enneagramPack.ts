import type { ContentPack } from '@/domain/reports/types'
import { buildPrimaryPack } from '@/data/reports/packs/packHelpers'

function ennea(id: string, name: string, blurb: string, hue: string) {
  return buildPrimaryPack({
    id,
    name,
    blurb,
    emblemHue: hue,
    experiment: {
      title: 'One honest counter-move',
      body: 'Each week, practice one small behavior that your type usually skips (asking directly, resting without earning it, deciding without more data). Journal the cost and the payoff.',
    },
    seeds: [
      {
        title: 'The core pattern',
        teaser: 'What this type is quietly optimizing for.',
        body: `{{primary}} at {{score}}% points to a strategy you learned early: how to stay safe, worthy, or connected. It still runs at work. Secondary resonance with {{secondary}} ({{secondaryScore}}%) shows your neighboring habits under stress or security.`,
      },
      {
        title: 'What people misread',
        teaser: 'The unfair label — and a sentence that corrects it.',
        body: `Types get flattened into cartoons. Your real pattern is {{primary}} working beside {{secondary}}. Correct early: name the intention underneath the behavior before the room invents a worse story.`,
      },
    ],
  })
}

export const enneagramPack: ContentPack = {
  family: 'enneagram',
  fallbackPrimaryId: 'peacemaker',
  disclaimer:
    'Reflective type model for self-leadership. Not a clinical diagnosis or fixed identity claim.',
  primaries: {
    reformer: ennea('reformer', 'The Reformer', 'Principled improvement — you notice what is wrong and want it made right.', '#C45C6A'),
    helper: ennea('helper', 'The Helper', 'Warm usefulness — you anticipate needs and build closeness through care.', '#E2A8B0'),
    achiever: ennea('achiever', 'The Achiever', 'Adaptive success — you read the room’s scoreboard and aim to win cleanly.', '#E8A838'),
    individualist: ennea('individualist', 'The Individualist', 'Authentic depth — you protect what feels true even when it is inconvenient.', '#9B6B9E'),
    investigator: ennea('investigator', 'The Investigator', 'Mastery through understanding — you withdraw to know before you act.', '#3D4F6F'),
    loyalist: ennea('loyalist', 'The Loyalist', 'Vigilant loyalty — you scan for risk and keep plans from falling apart.', '#6B7C85'),
    enthusiast: ennea('enthusiast', 'The Enthusiast', 'Forward appetite — you keep options bright and momentum alive.', '#31B070'),
    challenger: ennea('challenger', 'The Challenger', 'Protective force — you take space, set terms, and refuse to be controlled.', '#032514'),
    peacemaker: ennea(
      'peacemaker',
      'The Peacemaker',
      'A gift for lowering everyone’s guard, a talent for merging with the room, and a preference that keeps going unsaid.',
      '#7BC4A0',
    ),
  },
}
