import type { ContentPack } from '@/domain/reports/types'
import { buildPrimaryPack } from '@/data/reports/packs/packHelpers'

function work(id: string, name: string, blurb: string, hue: string) {
  return buildPrimaryPack({
    id,
    name,
    blurb,
    emblemHue: hue,
    experiment: {
      title: 'One work habit, twenty-one days',
      body: 'Pick one behavior that expresses your primary strength and one guardrail for its overuse. Track both daily with a simple yes/no. Review on day 21 with a peer or manager.',
    },
    seeds: [
      {
        title: 'Your lead operating strength',
        teaser: 'What this assessment says you reach for first.',
        body: `{{primary}} at {{score}}% is your lead operating strength on this MindoraInsight profile. Secondary strength in {{secondary}} ({{secondaryScore}}%) is the modifier — together they explain why the same role can feel effortless one month and draining the next.`,
      },
      {
        title: 'Best brief for a manager',
        teaser: 'A forwardable paragraph about how you work.',
        body: `“I do my best work when {{primary}} has a clear lane. I also need light structure around {{secondary}} so the week stays honest.” Edit the nouns; keep the specificity.`,
      },
      {
        title: 'Overuse under pressure',
        teaser: 'How the strength frays when stakes rise.',
        body: `Every strength over-indexes under load. {{primary}} may become rigidity, noise, withdrawal, or heroics. Name your overuse early. Use {{secondary}} as the counterweight you deliberately dial up.`,
      },
    ],
  })
}

export const workGenericPack: ContentPack = {
  family: 'workGeneric',
  fallbackPrimaryId: 'learning-agility',
  disclaimer:
    'Work-style educational profile for growth and conversation. Not a hiring score or clinical assessment.',
  primaries: {
    'learning-agility': work(
      'learning-agility',
      'Learning Agility',
      'You metabolize new material fast and stay useful when the problem keeps changing shape.',
      '#4880D9',
    ),
    'execution-discipline': work(
      'execution-discipline',
      'Execution Discipline',
      'You turn intent into finished work — systems, cadence, and a low tolerance for almost-done.',
      '#31B070',
    ),
    'team-presence': work(
      'team-presence',
      'Team Presence',
      'You show up visibly for the group: energy, voice, and accountability that others can feel.',
      '#E8A838',
    ),
    'collaborative-trust': work(
      'collaborative-trust',
      'Collaborative Trust',
      'You build working trust — clear commitments, fair credit, and repair after friction.',
      '#7BC4A0',
    ),
    'pressure-reactivity': work(
      'pressure-reactivity',
      'Pressure Reactivity',
      'You notice rising stakes early; the work is channeling that signal into proportion rather than spike.',
      '#C45C6A',
    ),
  },
}
