import React, { useContext } from "react"
import { Layout } from "../../components/Layout"
import { Button, Text } from "react-native"
import { DataContext } from "../../providers/DataProvider"
import { List, ListItem, ListItemProps } from "@ui-kitten/components"
import { Restaurant } from "../../types"

interface RestaurantsProps {}

export const Restaurants: React.FC<RestaurantsProps> = () => {
  const { restaurants } = useContext(DataContext)
  console.log(restaurants)
  return (
    <Layout>
      <Text>Restaurants</Text>
      <List
        style={{ width: "100%" }}
        data={restaurants}
        renderItem={({ item }: { item: Restaurant }) => (
          <ListItem key={item.id} title={item.name} description={item.address} />
        )}
      />
    </Layout>
  )
}
