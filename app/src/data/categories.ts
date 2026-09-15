export type CategoryId =
  | 'memory'
  | 'personality'
  | 'mindset'
  | 'wellbeing'
  | 'career'
  | 'neuro'
  | 'eq'
  | 'decisions'
  | 'energy'
  | 'growth'

export type Category = {
  id: CategoryId
  icon: string
  /** Tailwind background class — soft muted colors only; do not casually change */
  tone: string
  keywords: string[]
}

/** Soft muted tones — keep pill colors stable */
export const categories: Category[] = [
  { id: 'memory', icon: '🧠', tone: 'bg-[#5F9E86]', keywords: ['focus', 'memory', 'attention', 'impulse'] },
  { id: 'personality', icon: '👤', tone: 'bg-[#5B7FBF]', keywords: ['personality', 'ocean', 'big five', 'enneagram', '16 types', 'archetype'] },
  { id: 'mindset', icon: '💡', tone: 'bg-[#C4A35A]', keywords: ['mindset', 'drive', 'motivation', 'strengths', 'ego'] },
  { id: 'wellbeing', icon: '🌿', tone: 'bg-[#C97878]', keywords: ['mood', 'emotional', 'resilience', 'energy', 'wellbeing'] },
  { id: 'career', icon: '💼', tone: 'bg-[#D0895B]', keywords: ['career', 'disc', 'path', 'professional', 'iq'] },
  { id: 'neuro', icon: '⚡', tone: 'bg-[#8B7BB8]', keywords: ['neuro', 'autism', 'adhd', 'audhd', 'sensory'] },
  { id: 'eq', icon: '🤝', tone: 'bg-[#4FA3A0]', keywords: ['eq', 'empathy', 'collaboration', 'teams', 'attachment', 'influence'] },
  { id: 'decisions', icon: '🎯', tone: 'bg-[#6B8F9E]', keywords: ['decision', 'values', 'systems', 'order', 'problem'] },
  { id: 'energy', icon: '🔥', tone: 'bg-[#B88A6E]', keywords: ['energy', 'cycle', 'motivation', 'drive'] },
  { id: 'growth', icon: '📈', tone: 'bg-[#31B070]', keywords: ['growth', 'learning', 'career', 'path'] },
]

export function getCategory(id: string | null | undefined) {
  if (!id) return undefined
  return categories.find((c) => c.id === id)
}
