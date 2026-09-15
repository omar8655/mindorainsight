export const likert = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
] as const

const bank = [
  'I protect deep-work blocks even when messages pile up.',
  'I prefer clear plans over improvising under pressure.',
  'I notice shifts in team energy before conflict escalates.',
  'I stay composed when stakes and deadlines rise together.',
  'I actively seek unfamiliar problems that stretch my skill.',
  'I keep systems that make quality repeatable.',
  'I recover quickly after a missed target or tough review.',
  'I prioritize team outcomes over being personally right.',
  'I revisit long-term goals weekly, not just when firefighting.',
  'I can open a useful conversation with someone new at work.',
  'I lose track of time when solving a hard craft problem.',
  'Feedback stings — but I extract the signal fast.',
  'I decide with evidence first, then gut-check the edge cases.',
  'Low-stimulation days make me restless and less effective.',
  'I track how my choices land on people downstream.',
  'When data is incomplete, I still move with a reversible bet.',
]

export function questionsForSlug(slug: string, count = 12) {
  const seed = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    text: bank[(seed + i * 3) % bank.length],
  }))
}

export function scoreAnswers(answers: number[]) {
  const avg = answers.reduce((a, b) => a + b, 0) / Math.max(answers.length, 1)
  const traits = [
    { name: 'Learning Agility', score: clamp(Math.round(55 + avg * 8)) },
    { name: 'Execution Discipline', score: clamp(Math.round(50 + (5 - avg) * 7)) },
    { name: 'Team Presence', score: clamp(Math.round(48 + avg * 9)) },
    { name: 'Collaborative Trust', score: clamp(Math.round(60 + avg * 5)) },
    { name: 'Pressure Reactivity', score: clamp(Math.round(40 + (5 - avg) * 6)) },
  ]
  const top = [...traits].sort((a, b) => b.score - a.score)[0]
  const summary =
    avg >= 3.4
      ? 'You operate with high engagement and outward drive — strong for leadership visibility and fast learning loops.'
      : avg <= 2.2
        ? 'You lean toward deliberate craft, structure, and careful judgment — powerful when systems and quality matter most.'
        : 'You balance social energy with thoughtful caution — adaptable across IC excellence and collaborative leadership.'

  return { traits, top, summary, overall: Math.round(avg * 20) }
}

function clamp(n: number) {
  return Math.max(5, Math.min(98, n))
}
