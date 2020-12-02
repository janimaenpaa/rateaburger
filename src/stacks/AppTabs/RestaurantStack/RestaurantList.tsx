import React, { useContext } from "react"
import { Container } from "../../../components/Container"
import { Image } from "react-native"
import { DataContext } from "../../../providers/DataProvider"
import { Card, Layout, List, Text } from "@ui-kitten/components"
import { Restaurant, RestaurantNavProps } from "../../../types"

export const RestaurantList = ({
  navigation,
}: RestaurantNavProps<"Restaurants">) => {
  const { restaurants } = useContext(DataContext)
  console.log(restaurants)

  const renderItem = ({ item }: { item: Restaurant }) => (
    <Card
      style={{ flex: 1, margin: 10 }}
      header={() => (
        <Image
          resizeMode="cover"
          style={{ width: "100%", height: 160 }}
          source={require("../../../restaurantImg.jpg")}
        />
      )}
      footer={() => (
        <Layout style={{margin: 10, marginLeft: 20 }}>
          <Text style={{color: "#636363"}}>
            burgers: {item.burgers.length} | rating: 4.5 / 5.0
          </Text>
        </Layout>
      )}
      onPress={() => navigation.navigate("Restaurant", item)}
    >
      <Text style={{ fontWeight: "bold" }} category="h6">
        {item.name}
      </Text>
      <Text>
        {item.description}
      </Text>
    </Card>
  )
  return (
    <Container>
      <List data={restaurants} renderItem={renderItem} />
    </Container>
  )
}
