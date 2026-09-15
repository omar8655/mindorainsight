export type ReviewSource = 'community' | 'sample'

export type ReviewRating = 1 | 2 | 3 | 4 | 5

export type Review = {
  id: string
  name: string
  country: string
  countryCode: string
  city: string
  rating: ReviewRating
  body: string
  createdAt: string
  source: ReviewSource
  assessmentHint?: string
}

export type ReviewStats = {
  total: number
  average: number
  distribution: Record<ReviewRating, number>
}
