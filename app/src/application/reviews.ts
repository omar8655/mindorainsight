import { createMemoryReviewsAdapter } from '@/adapters/reviews/memory-reviews'
import type { ReviewsPort } from '@/ports/reviews'

/** Composition root for reviews — swap memory adapter for Supabase later. */
export const reviewsService: ReviewsPort = createMemoryReviewsAdapter()

export async function getLatestReviews(limit = 12, offset = 0) {
  return reviewsService.listLatest(limit, offset)
}

export async function getReviewStats() {
  return reviewsService.getStats()
}
