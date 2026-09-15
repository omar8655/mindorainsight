/**
 * Adult ADHD educational screening — 100 original items.
 *
 * Informed by publicly known ADHD clinical domains discussed in the professional
 * literature (including frameworks associated with Russell A. Barkley’s ADHD handbook):
 * inattention, hyperactivity, impulsivity, executive self-regulation, emotional
 * regulation, and time/motivation follow-through.
 *
 * NOT a diagnostic instrument. NOT medical advice. Results are a basic initial
 * indication only — share with a licensed professional for clinical evaluation.
 */

export type AdhdDomain =
  | 'inattention'
  | 'hyperactivity'
  | 'impulsivity'
  | 'executive'
  | 'emotion'
  | 'time_motivation'

export type AdhdQuestion = {
  id: number
  domain: AdhdDomain
  text: string
}

export const ADHD_DOMAIN_LABELS: Record<AdhdDomain, string> = {
  inattention: 'Focus & attention',
  hyperactivity: 'Restlessness & energy',
  impulsivity: 'Impulse control',
  executive: 'Getting started & finishing',
  emotion: 'Feelings & stress',
  time_motivation: 'Time & follow-through',
}

/** Likert 1–5 → percentage contribution for that item */
export const LIKERT_PERCENT = [0, 25, 50, 75, 100] as const

export const adhdQuestions: AdhdQuestion[] = [
  // —— Inattention (1–20) ——
  { id: 1, domain: 'inattention', text: 'I often miss details even when I am trying to be careful.' },
  { id: 2, domain: 'inattention', text: 'I find it hard to stay focused on long reading or paperwork.' },
  { id: 3, domain: 'inattention', text: 'People say I seem not to listen when they speak directly to me.' },
  { id: 4, domain: 'inattention', text: 'I start tasks but leave them unfinished more often than I want.' },
  { id: 5, domain: 'inattention', text: 'Organizing steps for a multi-part task feels unusually hard.' },
  { id: 6, domain: 'inattention', text: 'I avoid work that needs long stretches of mental effort.' },
  { id: 7, domain: 'inattention', text: 'I lose everyday items (keys, phone, papers) more than most people.' },
  { id: 8, domain: 'inattention', text: 'Nearby sounds or movement pull my attention off what I am doing.' },
  { id: 9, domain: 'inattention', text: 'I forget appointments, chores, or return messages without meaning to.' },
  { id: 10, domain: 'inattention', text: 'My mind drifts during meetings even when the topic matters.' },
  { id: 11, domain: 'inattention', text: 'I reread the same paragraph because meaning did not stick.' },
  { id: 12, domain: 'inattention', text: 'I lose my place in conversations and ask people to repeat themselves.' },
  { id: 13, domain: 'inattention', text: 'I overlook instructions that were clear to others.' },
  { id: 14, domain: 'inattention', text: 'I struggle to keep both the big picture and the small details in mind.' },
  { id: 15, domain: 'inattention', text: 'I zone out during routine tasks like driving a familiar route or washing dishes.' },
  { id: 16, domain: 'inattention', text: 'I miss visual cues others notice quickly (signs, on-screen alerts).' },
  { id: 17, domain: 'inattention', text: 'I need more reminders than peers to stay on a boring but important task.' },
  { id: 18, domain: 'inattention', text: 'I forget what I walked into a room to do.' },
  { id: 19, domain: 'inattention', text: 'Holding several pieces of information in mind at once is exhausting.' },
  { id: 20, domain: 'inattention', text: 'I make “careless” mistakes on work I actually understand.' },

  // —— Hyperactivity (21–35) ——
  { id: 21, domain: 'hyperactivity', text: 'I feel restless if I have to sit still for a long time.' },
  { id: 22, domain: 'hyperactivity', text: 'I fidget with my hands, feet, or an object without noticing.' },
  { id: 23, domain: 'hyperactivity', text: 'I leave my seat in situations where staying seated is expected.' },
  { id: 24, domain: 'hyperactivity', text: 'I feel driven by an inner motor that rarely fully switches off.' },
  { id: 25, domain: 'hyperactivity', text: 'I talk more or faster than the situation needs.' },
  { id: 26, domain: 'hyperactivity', text: 'Quiet rooms make me uncomfortable because I want to move or do something.' },
  { id: 27, domain: 'hyperactivity', text: 'I pace, stretch, or walk while on calls or thinking.' },
  { id: 28, domain: 'hyperactivity', text: 'Evenings still feel “wired” when I want to wind down.' },
  { id: 29, domain: 'hyperactivity', text: 'I prefer standing or moving work setups over sitting for hours.' },
  { id: 30, domain: 'hyperactivity', text: 'I bounce my leg or tap during meetings.' },
  { id: 31, domain: 'hyperactivity', text: 'Long dinners, films, or ceremonies feel physically hard to endure.' },
  { id: 32, domain: 'hyperactivity', text: 'My body energy feels higher than people around me expect.' },
  { id: 33, domain: 'hyperactivity', text: 'I change posture constantly to stay comfortable.' },
  { id: 34, domain: 'hyperactivity', text: 'Waiting in one place with nothing to do makes me agitated.' },
  { id: 35, domain: 'hyperactivity', text: 'I take on extra activity just to burn restless energy.' },

  // —— Impulsivity (36–50) ——
  { id: 36, domain: 'impulsivity', text: 'I blurt answers before the other person finishes speaking.' },
  { id: 37, domain: 'impulsivity', text: 'I interrupt conversations more often than I intend.' },
  { id: 38, domain: 'impulsivity', text: 'I struggle to wait my turn in lines or group discussions.' },
  { id: 39, domain: 'impulsivity', text: 'I make purchases or commitments I later regret.' },
  { id: 40, domain: 'impulsivity', text: 'I send messages or emails before I have cooled down enough.' },
  { id: 41, domain: 'impulsivity', text: 'I jump into tasks without reading key instructions first.' },
  { id: 42, domain: 'impulsivity', text: 'I say things in the moment that I wish I could take back.' },
  { id: 43, domain: 'impulsivity', text: 'Delayed rewards feel much harder to choose than immediate ones.' },
  { id: 44, domain: 'impulsivity', text: 'I change plans suddenly without weighing the impact on others.' },
  { id: 45, domain: 'impulsivity', text: 'I take unnecessary risks for stimulation or relief.' },
  { id: 46, domain: 'impulsivity', text: 'I finish other people’s sentences for them.' },
  { id: 47, domain: 'impulsivity', text: 'I agree to things quickly and feel overloaded afterward.' },
  { id: 48, domain: 'impulsivity', text: 'Stopping an enjoyable activity mid-flow is very hard.' },
  { id: 49, domain: 'impulsivity', text: 'I act on urges (food, apps, scrolling) before I think them through.' },
  { id: 50, domain: 'impulsivity', text: 'I open new tabs or tasks before finishing the current one.' },

  // —— Executive self-regulation (51–70) ——
  { id: 51, domain: 'executive', text: 'Breaking a large project into clear next steps is difficult for me.' },
  { id: 52, domain: 'executive', text: 'I struggle to prioritize what matters most on a crowded to-do list.' },
  { id: 53, domain: 'executive', text: 'Keeping my workspace or digital files orderly takes constant effort.' },
  { id: 54, domain: 'executive', text: 'I know what I should do but cannot get myself started.' },
  { id: 55, domain: 'executive', text: 'Switching between tasks or topics costs me a lot of mental energy.' },
  { id: 56, domain: 'executive', text: 'I lose track of multi-step instructions unless I write them down.' },
  { id: 57, domain: 'executive', text: 'I under- or overestimate how long a task will take.' },
  { id: 58, domain: 'executive', text: 'I leave many tasks around 80–90% complete.' },
  { id: 59, domain: 'executive', text: 'I need external structure (timers, lists, accountability) to follow through.' },
  { id: 60, domain: 'executive', text: 'Planning my week feels overwhelming even when the goals are clear.' },
  { id: 61, domain: 'executive', text: 'I struggle to monitor my own progress without someone checking in.' },
  { id: 62, domain: 'executive', text: 'Stopping one strategy and trying another (cognitive flexibility) is hard under stress.' },
  { id: 63, domain: 'executive', text: 'I forget the goal I set earlier in the day once distractions appear.' },
  { id: 64, domain: 'executive', text: 'Household or admin routines (bills, laundry, paperwork) often slip.' },
  { id: 65, domain: 'executive', text: 'I rely on last-minute pressure to finish important work.' },
  { id: 66, domain: 'executive', text: 'Holding a plan in mind while handling interruptions is difficult.' },
  { id: 67, domain: 'executive', text: 'I struggle to sequence work in a logical order without help.' },
  { id: 68, domain: 'executive', text: 'Too many options create mental fog and freeze my decisions.' },
  { id: 69, domain: 'executive', text: 'I start new systems often but rarely maintain them.' },
  { id: 70, domain: 'executive', text: 'Self-talk that guides “what to do next” is quieter or less useful for me than for peers.' },

  // —— Emotional self-regulation (71–85) ——
  { id: 71, domain: 'emotion', text: 'I get frustrated or angry faster than people around me.' },
  { id: 72, domain: 'emotion', text: 'Once upset, it takes me a long time to return to baseline.' },
  { id: 73, domain: 'emotion', text: 'Small setbacks can feel disproportionately intense.' },
  { id: 74, domain: 'emotion', text: 'Criticism or perceived rejection hits me harder than I expect.' },
  { id: 75, domain: 'emotion', text: 'My mood can shift quickly based on minor events.' },
  { id: 76, domain: 'emotion', text: 'I show emotions outwardly when I wish I could stay composed.' },
  { id: 77, domain: 'emotion', text: 'I feel impatient or irritable when others move slowly.' },
  { id: 78, domain: 'emotion', text: 'Stress leads to emotional outbursts I later regret.' },
  { id: 79, domain: 'emotion', text: 'I feel emotions strongly in my body (tight chest, heat, restlessness).' },
  { id: 80, domain: 'emotion', text: 'Letting go of minor annoyances is harder than it “should” be.' },
  { id: 81, domain: 'emotion', text: 'I worry or ruminate in loops that are hard to stop.' },
  { id: 82, domain: 'emotion', text: 'Fairness and injustice issues trigger strong reactions in me.' },
  { id: 83, domain: 'emotion', text: 'I overreact to tone of voice or small social cues.' },
  { id: 84, domain: 'emotion', text: 'Shame after mistakes stays with me longer than the mistake itself.' },
  { id: 85, domain: 'emotion', text: 'I struggle to calm myself without walking away or shutting down.' },

  // —— Time, motivation & follow-through (86–100) ——
  { id: 86, domain: 'time_motivation', text: 'I am often late despite intending to be on time.' },
  { id: 87, domain: 'time_motivation', text: 'Deadlines sneak up on me even when I knew they were coming.' },
  { id: 88, domain: 'time_motivation', text: 'I wait until the last minute to start important work.' },
  { id: 89, domain: 'time_motivation', text: 'Motivation drops sharply once novelty wears off.' },
  { id: 90, domain: 'time_motivation', text: 'I work in intense sprints rather than steady daily progress.' },
  { id: 91, domain: 'time_motivation', text: 'Interesting tasks get hours; boring-but-needed tasks get delayed.' },
  { id: 92, domain: 'time_motivation', text: 'I lose sense of time when absorbed in something engaging.' },
  { id: 93, domain: 'time_motivation', text: 'Long-term goals feel abstract compared with what is urgent today.' },
  { id: 94, domain: 'time_motivation', text: 'I struggle to stick to budgets or long-term financial plans.' },
  { id: 95, domain: 'time_motivation', text: 'Without immediate feedback, my drive fades quickly.' },
  { id: 96, domain: 'time_motivation', text: 'I overcommit my calendar and then cancel or scramble.' },
  { id: 97, domain: 'time_motivation', text: 'Morning routines are inconsistent even when I value them.' },
  { id: 98, domain: 'time_motivation', text: 'I underestimate how much recovery time I need after busy days.' },
  { id: 99, domain: 'time_motivation', text: 'I start strong on New Year / Monday plans and fade within days.' },
  { id: 100, domain: 'time_motivation', text: 'Future consequences feel less “real” than what is in front of me right now.' },
]

import { buildIndividualNarrative } from '@/data/adhdIndividualReport'

export function likertToPercent(value: number): number {
  if (value < 1 || value > 5) return 0
  return LIKERT_PERCENT[value - 1]!
}

export function scoreAdhdAnswers(answers: Record<number, number>) {
  const domains = Object.keys(ADHD_DOMAIN_LABELS) as AdhdDomain[]
  const byDomain: Record<AdhdDomain, number[]> = {
    inattention: [],
    hyperactivity: [],
    impulsivity: [],
    executive: [],
    emotion: [],
    time_motivation: [],
  }

  for (const q of adhdQuestions) {
    const v = answers[q.id]
    if (typeof v === 'number') byDomain[q.domain].push(likertToPercent(v))
  }

  const traits = domains.map((domain) => {
    const scores = byDomain[domain]
    const avg =
      scores.length === 0 ? 0 : Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    return { domain, name: ADHD_DOMAIN_LABELS[domain], score: avg }
  })

  const answered = Object.keys(answers).length
  const overall =
    answered === 0
      ? 0
      : Math.round(
          Object.values(answers).reduce((a, v) => a + likertToPercent(v), 0) / answered,
        )

  const top = [...traits].sort((a, b) => b.score - a.score)[0]!
  const elevated = traits.filter((t) => t.score >= 60)
  const narrative = buildIndividualNarrative(traits, overall)

  return {
    traits,
    top,
    elevated,
    overall,
    summary: narrative.summary,
    narrative,
    answered,
  }
}

export const ADHD_SCREENING_SLUG = 'adhd-adult-screening'
/** One question per view — phone + web friendly, minimal scrolling. */
export const ADHD_PAGE_SIZE = 5
