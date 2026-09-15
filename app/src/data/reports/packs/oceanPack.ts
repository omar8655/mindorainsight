import type { ContentPack } from '@/domain/reports/types'
import { buildPrimaryPack } from '@/data/reports/packs/packHelpers'

export const oceanPack: ContentPack = {
  family: 'ocean',
  fallbackPrimaryId: 'openness',
  disclaimer:
    'Educational personality profile for work and growth. Not a clinical diagnosis or hiring score.',
  primaries: {
    openness: buildPrimaryPack({
      id: 'openness',
      name: 'Openness',
      blurb:
        'An appetite for unfamiliar material: strange dishes, difficult books, reopened questions, and a standing suspicion that the settled answer is only the first answer.',
      emblemHue: '#4880D9',
      experiment: {
        title: 'A ticket, a torn label',
        body: 'Week 1: once a day, take the unfamiliar option where stakes stay under ten dollars. Keep one physical scrap. Week 2: write one word on the back for what it gave you. Week 3: return three times to the scrap that still matters. Week 4: bring one finding into a stuck conversation.',
      },
      seeds: [
        {
          title: 'Standing at the shelf',
          teaser: 'Why the unfamiliar option keeps winning your hand.',
          body: `A shelf, a menu you half-read, a map with one road unmarked: the hand goes to the unfamiliar option. At {{score}}% Openness, that reflex is not a mood — it is your tallest workplace dimension. This report names that fragment precisely. Your secondary lean toward {{secondary}} ({{secondaryScore}}%) changes how the curiosity lands: with whom, under what deadline, and whether the idea gets finished.`,
        },
        {
          title: 'A strange idea gets a hearing',
          teaser: 'Openness is not the same as agreeing with everything.',
          body: `Openness hears the odd option without needing to adopt it. The skill is giving strange material a fair minute — then deciding. When {{secondary}} runs high too, that minute can stretch into a redesign. Use a ceiling: explore for a fixed window, then ship the crude version.`,
        },
        {
          title: 'Taking the long way in',
          teaser: 'Where this appetite outperforms the safe route.',
          body: `Stalled processes, collapsed plans, and rooms stuck between two beige options are your home field. {{primary}} at {{score}}% is less “novelty for its own sake” and more refusal to pretend the settled answer is finished. Pair it with {{secondary}} so exploration stays useful to the people who need a deliverable.`,
        },
        {
          title: 'When interesting beats finished',
          teaser: 'The point where improving something quietly kills it.',
          body: `The tell is mid-thought escalation: a fifteen-minute task becomes a redesign. Catch the moment interesting starts replacing finished. Write the crude version first. Your {{secondary}} score is the second dial — use it as a brake or a fuel, deliberately.`,
          requireSecondaryMin: 55,
        },
      ],
    }),
    conscientiousness: buildPrimaryPack({
      id: 'conscientiousness',
      name: 'Conscientiousness',
      blurb:
        'A bias toward plans that survive Tuesday: checklists that get used, standards that hold when nobody is watching, and follow-through that treats “almost done” as not done.',
      emblemHue: '#31B070',
      experiment: {
        title: 'One list that tells the truth',
        body: 'For 14 days, keep a single daily list of three outcomes only. Cross off only when shipped. On Fridays, note what slipped and whether the slip was ambition or avoidance. Adjust next week’s three accordingly.',
      },
      seeds: [
        {
          title: 'The closed loop',
          teaser: 'Why unfinished loops bother you more than most people.',
          body: `At {{score}}% Conscientiousness, open loops cost attention. You feel the unfinished email, the undelegated task, the standard that slipped. That is a gift for teams that need reliability — and a tax when the work is inherently messy. {{secondary}} at {{secondaryScore}}% tells you how you cushion or intensify that tax.`,
        },
        {
          title: 'Standards without theater',
          teaser: 'Quality that holds when applause is absent.',
          body: `Your best days are quiet excellence: the doc that needs no rewrite, the handoff that needs no apology. Protect that without turning it into perfection theater. Time-box polish. Let {{secondary}} remind you when “good enough to ship” is the conscientious move.`,
        },
      ],
    }),
    extraversion: buildPrimaryPack({
      id: 'extraversion',
      name: 'Extraversion',
      blurb:
        'Energy that rises with people in the room: faster starts, louder ideas, and a preference for thinking that happens out loud.',
      emblemHue: '#E8A838',
      experiment: {
        title: 'Two rooms, two clocks',
        body: 'Week 1–2: schedule one deep solo block daily and protect it. Week 3–4: schedule one high-contact block and measure recovery. Learn your real battery — not the one you perform.',
      },
      seeds: [
        {
          title: 'Thinking out loud',
          teaser: 'Why silence can feel like stalled work.',
          body: `At {{score}}% Extraversion, ideas often arrive mid-sentence. Meetings can feel productive even when messy. The risk is leaving quieter colleagues behind. Use {{secondary}} as a check: pause, invite the second voice, then decide.`,
        },
      ],
    }),
    agreeableness: buildPrimaryPack({
      id: 'agreeableness',
      name: 'Agreeableness',
      blurb:
        'A reflex toward harmony and fair treatment: you smooth friction, grant benefit of the doubt, and feel the temperature of the room before you speak.',
      emblemHue: '#7BC4A0',
      experiment: {
        title: 'One honest preference a day',
        body: 'For 21 days, state one real preference without shrinking it — lunch spot, deadline, seating, wording. Notice how little resistance you actually meet. Keep a one-line log.',
      },
      seeds: [
        {
          title: 'The nod you did not mean',
          teaser: 'When agreement stops carrying information.',
          body: `High Agreeableness ({{score}}%) makes yes arrive early. Sometimes that yes is kindness; sometimes it is conflict avoidance. Practice a beat before agreeing. Your {{secondary}} score shows whether you need more backbone language or more recovery after hard talks.`,
        },
      ],
    }),
    neuroticism: buildPrimaryPack({
      id: 'neuroticism',
      name: 'Emotional Sensitivity',
      blurb:
        'A finely tuned alarm system: you feel stakes early, rehearse edge cases, and notice risk before the room is ready to name it.',
      emblemHue: '#C45C6A',
      experiment: {
        title: 'Name the alarm, then choose',
        body: 'For two weeks, when worry spikes, write: alarm / evidence / next action / park-until time. Share one entry with a trusted person. Train the alarm without silencing it.',
      },
      seeds: [
        {
          title: 'The useful alarm',
          teaser: 'Sensitivity is not the same as fragility.',
          body: `At {{score}}%, emotional sensitivity means you detect threat and opportunity early. Untrained, it floods. Trained, it becomes foresight. Pair with {{secondary}} ({{secondaryScore}}%) to decide when to escalate and when to park the worry until morning.`,
        },
      ],
    }),
    'emotional-stability': buildPrimaryPack({
      id: 'emotional-stability',
      name: 'Emotional Stability',
      blurb:
        'A steadier baseline under pressure: you recover faster, keep proportion, and help rooms stay usable when stakes rise.',
      emblemHue: '#5A8F7B',
      experiment: {
        title: 'Pressure log',
        body: 'After three stressful events this month, note: trigger, body signal, what you protected, what you skipped. Keep the habits that preserved proportion; drop the ones that were numbness in disguise.',
      },
      seeds: [
        {
          title: 'Steady under load',
          teaser: 'Calm that is earned, not performed.',
          body: `Emotional Stability at {{score}}% is a team asset — and can hide needs you never invoice for. Watch for under-asking. Let {{secondary}} tell you what still needs care even when you look fine.`,
        },
      ],
    }),
  },
}
