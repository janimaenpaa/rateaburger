import React, { useContext, useRef } from "react"
import { Container } from "../../../components/Container"
import { Image } from "react-native"
import { DataContext } from "../../../providers/DataProvider"
import { Button, Card, Layout, List, Text } from "@ui-kitten/components"
import { Restaurant, RestaurantNavProps } from "../../../types"
import { useScrollToTop } from "@react-navigation/native"
import { restaurantRating } from "../../../utils"

export const RestaurantList = ({
  navigation,
}: RestaurantNavProps<"Restaurants">) => {
  const { restaurants, loading } = useContext(DataContext)

  const renderItem = ({ item }: { item: Restaurant }) => (
    <Card
      style={{ flex: 1, margin: 10 }}
      header={() => (
        <Image
          resizeMode="cover"
          style={{ width: "100%", height: 160 }}
          source={{ uri: item.imgUrl }}
        />
      )}
      footer={() => (
        <Layout style={{ margin: 10, marginLeft: 20 }}>
          <Text appearance="hint">
            {restaurantRating(item)} / 5.0 | burgers: {item.burgers.length}
          </Text>
        </Layout>
      )}
      onPress={() => navigation.navigate("Restaurant", item)}
    >
      <Text style={{ fontWeight: "700" }}>{item.name}</Text>
      <Text>{item.description}</Text>
    </Card>
  )

  if (loading) {
    return (
      <Container style={{ alignItems: "center" }}>
        <Text>Loading...</Text>
      </Container>
    )
  }

  const ref = useRef(null)
  useScrollToTop(ref)

  return (
    <Container style={{ justifyContent: "flex-start" }}>
      <Layout style={{ margin: 10 }}>
        <List
          ref={ref}
          ListHeaderComponent={
            <Button
              style={{ marginLeft: 10, marginRight: 10, marginTop: 5 }}
              onPress={() => navigation.navigate("AddRestaurant")}
            >
              ADD RESTAURANT
            </Button>
          }
          data={restaurants}
          renderItem={renderItem}
        />
      </Layout>
    </Container>
  )
}
