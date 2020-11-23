import React, { useEffect, useState } from "react"
import { Burger, Restaurant } from "../types"

export const DataContext = React.createContext<{
  restaurants: Restaurant[]
  burgers: Burger[]
}>({
  restaurants: [],
  burgers: [],
})

interface DataProviderProps {}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [burgers, setBurgers] = useState<Burger[]>([])

  const fetchRestaurants = () =>
    fetch("http://87.92.141.110:5000/api/restaurants")
      .then((response) => response.json())
      .then((json) => setRestaurants(json))
      .catch((error) => console.error(error))

  const fetchBurgers = () =>
    fetch("http://87.92.141.110:5000/api/burgers")
      .then((response) => response.json())
      .then((json) => setBurgers(json))
      .catch((error) => console.error(error))

  useEffect(() => {
    fetchRestaurants()
    fetchBurgers()
  }, [])

  return (
    <DataContext.Provider
      value={{
        restaurants,
        burgers,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}