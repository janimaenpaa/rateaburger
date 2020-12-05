import React, { useEffect, useState } from "react"
import { Burger, Restaurant, Review } from "../types"

export const DataContext = React.createContext<{
  restaurants: Restaurant[]
  burgers: Burger[]
  reviews: Review[]
  loading: boolean
}>({
  restaurants: [],
  burgers: [],
  reviews: [],
  loading: true,
})

interface DataProviderProps {}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [burgers, setBurgers] = useState<Burger[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchRestaurants = () =>
    fetch("https://rateaburger.herokuapp.com/api/restaurants")
      .then((response) => response.json())
      .then((json) => {
        setRestaurants(json)
        setLoading(false)
      })
      .catch((error) => console.error(error))

  const fetchBurgers = () =>
    fetch("https://rateaburger.herokuapp.com/api/burgers")
      .then((response) => response.json())
      .then((json) => {
        setBurgers(json)
        setLoading(false)
      })
      .catch((error) => console.error(error))

  const fetchReviews = () =>
    fetch("https://rateaburger.herokuapp.com/api/reviews")
      .then((response) => response.json())
      .then((json) => {
        setReviews(json)
        setLoading(false)
      })
      .catch((error) => console.error(error))

  useEffect(() => {
    fetchRestaurants()
    fetchBurgers()
    fetchReviews()
  }, [])

  return (
    <DataContext.Provider
      value={{
        restaurants,
        burgers,
        reviews,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
