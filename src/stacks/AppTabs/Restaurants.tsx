import React, { useContext } from "react"
import { Layout } from "../../components/Layout"
import { Text } from "react-native"
import { DataContext } from "../../providers/DataProvider"

interface RestaurantsProps {}

export const Restaurants: React.FC<RestaurantsProps> = () => {
  const { restaurants } = useContext(DataContext)
  console.log(restaurants)
  return (
    <Layout>
      <Text>Restaurants</Text>
    </Layout>
  )
}
