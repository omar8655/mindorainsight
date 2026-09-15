import { REVIEW_CATALOG } from '@/data/reviews'
import type { Review, ReviewStats } from '@/domain/review'
import type { ReviewsPort } from '@/ports/reviews'

function statsFrom(items: Review[]): ReviewStats {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as ReviewStats['distribution']
  let sum = 0
  for (const r of items) {
    distribution[r.rating] += 1
    sum += r.rating
  }
  return {
    total: items.length,
    average: items.length ? Math.round((sum / items.length) * 10) / 10 : 0,
    distribution,
  }
}

export function createMemoryReviewsAdapter(catalog = REVIEW_CATALOG): ReviewsPort {
  const sorted = [...catalog].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))

  return {
    async listLatest(limit, offset = 0) {
      return sorted.slice(offset, offset + limit)
    },
    async listAll() {
      return sorted
    },
    async getStats() {
      return statsFrom(sorted)
    },
  }
}
