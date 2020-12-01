import React, { useContext } from "react"
import { Layout } from "../../../components/Layout"
import { ImageBackground, Text } from "react-native"
import { DataContext } from "../../../providers/DataProvider"
import { Card, List } from "@ui-kitten/components"
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
        <ImageBackground
          resizeMode="cover"
          style={{ width: "100%", height: 180 }}
          source={require("../../../restaurantImg.jpg")}
        >
          <Text
            style={{
              color: "white",
              fontSize: 36,
              fontWeight: "bold",
              alignContent: "flex-end",
              alignItems: "flex-end",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              padding: 10,
            }}
          >
            {item.name}
          </Text>
        </ImageBackground>
      )}
      onPress={() => navigation.navigate("Restaurant")}
    >
      <Text>{item.address}</Text>
    </Card>
  )
  return (
    <Layout>
      <List
        data={restaurants}
        renderItem={renderItem}
      />
    </Layout>
  )
}
