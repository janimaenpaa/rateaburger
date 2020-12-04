import { Review } from "./types"

export const averageRating = (reviews: Review[]) => {
  if (reviews.length === 0) return 0

  return (
    reviews.reduce((a, { stars }) => a + stars, 0) / reviews.length
  ).toFixed(1)
}
