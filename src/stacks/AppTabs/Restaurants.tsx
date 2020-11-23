import React from "react"
import { Layout } from "../../components/Layout"
import { Text } from "react-native"

interface RestaurantsProps {}

export const Restaurants: React.FC<RestaurantsProps> = () => {
  return (
    <Layout>
      <Text>Restaurants</Text>
    </Layout>
  )
}
