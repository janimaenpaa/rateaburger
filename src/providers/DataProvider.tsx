import React, { useEffect, useState } from "react"
import { Burger, Restaurant, Review } from "../types"

export const DataContext = React.createContext<{
  restaurants: Restaurant[]
  burgers: Burger[]
  reviews: Review[]
  loading: boolean
  refetch: () => void
}>({
  restaurants: [],
  burgers: [],
  reviews: [],
  loading: true,
  refetch: () => {},
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
      })
      .catch((error) => console.error(error))

  const fetchBurgers = () =>
    fetch("https://rateaburger.herokuapp.com/api/burgers")
      .then((response) => response.json())
      .then((json) => {
        setBurgers(json)
      })
      .catch((error) => console.error(error))

  const fetchReviews = () =>
    fetch("https://rateaburger.herokuapp.com/api/reviews")
      .then((response) => response.json())
      .then((json) => {
        setReviews(json)
      })
      .catch((error) => console.error(error))

  useEffect(() => {
    /* This fetches all the data from different end points 
    and then sets the Loading state to false */
    const fetchAll = () =>
      Promise.all([fetchRestaurants(), fetchBurgers(), fetchReviews()])
        .then(() => setLoading(false))
        .catch((error) => console.log(error))

    fetchAll()
  }, [])

  const refetch = () => {
    fetchBurgers()
      .then(fetchRestaurants)
      .then(fetchReviews)
      .catch((error) => console.log(error))
  }

  return (
    <DataContext.Provider
      value={{
        restaurants,
        burgers,
        reviews,
        loading,
        refetch,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
