import { Restaurant, Review } from "./types"

export const averageRating = (reviews: Review[]) => {
  if (reviews.length === 0) return 0

  return (
    reviews.reduce((a, { stars }) => a + stars, 0) / reviews.length
  ).toFixed(1)
}

export const restaurantRating = (restaurant: Restaurant) => {
  let averages: number[] = []

  restaurant.burgers.map((burger) =>
    averages.push(Number(averageRating(burger.reviews)))
  )

  if (averages.length === 0) return 0

  return Number(
    (
      averages.reduce((a: number, b: number) => a + b, 0) / averages.length
    ).toFixed(0)
  )
}
