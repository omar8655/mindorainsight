import type { Review, ReviewStats } from '@/domain/review'

export type ReviewsPort = {
  listLatest(limit: number, offset?: number): Promise<Review[]>
  listAll(): Promise<Review[]>
  getStats(): Promise<ReviewStats>
}
