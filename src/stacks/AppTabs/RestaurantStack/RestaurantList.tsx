import React, { useContext, useRef } from "react"
import { Container } from "../../../components/Container"
import { Image } from "react-native"
import { DataContext } from "../../../providers/DataProvider"
import { Button, Card, Layout, List, Text } from "@ui-kitten/components"
import { Restaurant, RestaurantNavProps } from "../../../types"
import { useScrollToTop } from "@react-navigation/native"

export const RestaurantList = ({
  navigation,
}: RestaurantNavProps<"Restaurants">) => {
  const { restaurants, loading } = useContext(DataContext)
  console.log(restaurants)

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
          <Text style={{ color: "#636363" }}>
            burgers: {item.burgers.length}
          </Text>
        </Layout>
      )}
      onPress={() => navigation.navigate("Restaurant", item)}
    >
      <Text>{item.name}</Text>
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
    <Container>
      <Layout style={{ margin: 10 }}>
        <List
          ref={ref}
          ListHeaderComponent={
            <Button
              style={{ margin: 10, marginTop: 20 }}
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
