import type { ContentPack } from '@/domain/reports/types'
import { buildPrimaryPack } from '@/data/reports/packs/packHelpers'

function type16(id: string, name: string, blurb: string, hue: string) {
  return buildPrimaryPack({
    id,
    name,
    blurb,
    emblemHue: hue,
    experiment: {
      title: 'Career lens week',
      body: 'For five workdays, note one decision you made in type-typical fashion and one you forced against type. Keep what produced clean outcomes; renegotiate roles that constantly fight your grain.',
    },
    seeds: [
      {
        title: 'Your operating posture',
        teaser: 'How this type tends to enter problems at work.',
        body: `As {{primary}} at {{score}}%, your default posture is distinctive. That is useful for role fit and team design — not a cage. Secondary pull toward {{secondary}} ({{secondaryScore}}%) softens or sharpens the stereotype in ways that matter on real teams.`,
      },
      {
        title: 'Friction that is informative',
        teaser: 'Conflicts that reveal type, not character failure.',
        body: `When {{primary}} meets a strong opposite, arguments often feel moral. Reframe them as information design: different time horizons, different evidence standards. Use {{secondary}} as a bridge language.`,
      },
    ],
  })
}

export const types16Pack: ContentPack = {
  family: 'types16',
  fallbackPrimaryId: 'architect',
  disclaimer:
    'Career-oriented type lens inspired by common four-dimension frameworks. Educational fit tool — not a clinical or hiring instrument.',
  primaries: {
    architect: type16('architect', 'The Architect', 'Systems, models, and independent precision — you want the map before the march.', '#1F2A33'),
    logician: type16('logician', 'The Logician', 'Curious analysis and inventive theory — you open questions others close too early.', '#4880D9'),
    commander: type16('commander', 'The Commander', 'Decisive drive and strategic coordination — you move people toward a clear aim.', '#C45C6A'),
    debater: type16('debater', 'The Debater', 'Spark and argument as discovery — you pressure-test ideas until they earn the right to survive.', '#E8A838'),
    advocate: type16('advocate', 'The Advocate', 'Quiet conviction and long-range values — you protect meaning underneath the metrics.', '#5A8F7B'),
    mediator: type16('mediator', 'The Mediator', 'Empathic imagination — you see people whole and work best when the mission feels humane.', '#7BC4A0'),
    protagonist: type16('protagonist', 'The Protagonist', 'Warm leadership and mobilizing hope — you bring others into a better story.', '#31B070'),
    campaigner: type16('campaigner', 'The Campaigner', 'Enthusiastic connection — you spot possibility in people and rooms.', '#9B6B9E'),
    logistician: type16('logistician', 'The Logistician', 'Reliable structure and duty — you make quality repeatable.', '#6B7C85'),
    defender: type16('defender', 'The Defender', 'Steady care and practical loyalty — you hold the line for people who need it.', '#8FCBAA'),
    executive: type16('executive', 'The Executive', 'Organizing people and standards — you turn chaos into an operating rhythm.', '#032514'),
    consul: type16('consul', 'The Consul', 'Social glue and supportive tradition — you keep groups feeling like groups.', '#E2A8B0'),
    virtuoso: type16('virtuoso', 'The Virtuoso', 'Hands-on improvisation — you learn by building and adjusting in motion.', '#C47A3A'),
    adventurer: type16('adventurer', 'The Adventurer', 'Aesthetic presence and flexible experience — you notice what others rush past.', '#7A9E9F'),
    entrepreneur: type16('entrepreneur', 'The Entrepreneur', 'Bold timing and persuasive momentum — you act while the window is open.', '#D97B4A'),
    entertainer: type16('entertainer', 'The Entertainer', 'Live energy and improvisational warmth — you lift the room’s pulse.', '#E8A838'),
  },
}
