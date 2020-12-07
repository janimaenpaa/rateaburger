import React from "react"
import { Container } from "../../../components/Container"
import { Card, Layout, List, Text } from "@ui-kitten/components"
import { Image, StyleSheet } from "react-native"
import { Burger, Restaurant, RestaurantNavProps } from "../../../types"
import { restaurantRating } from "../../../utils"

export const RestaurantPage = ({
  route,
  navigation,
}: RestaurantNavProps<"Restaurant">) => {
  const { imgUrl, name, address, description, burgers } = route.params
  const restaurant: Restaurant = route.params

  const Img = imgUrl ? { uri: imgUrl } : require("../../../restaurantImg.jpg")

  const renderItem = ({ item }: { item: Burger }) => {
    return (
      <Card
        onPress={() => navigation.navigate("Burger", item)}
        style={{ marginBottom: 10, marginLeft: 20, marginRight: 20 }}
        header={() => (
          <Image
            resizeMode="cover"
            style={{ width: "100%", height: 120 }}
            source={{ uri: item.imgUrl }}
          />
        )}
      >
        <Text>{item.name}</Text>
      </Card>
    )
  }

  return (
    <Container style={{ justifyContent: "flex-start" }}>
      <List
        ListHeaderComponent={
          <>
            <Image
              resizeMode="cover"
              style={{ width: "100%", height: 260 }}
              source={Img}
            />

            <Layout style={{ margin: 20, backgroundColor: "#F7F9FC", flex: 1 }}>
              <Text category="h2">{name}</Text>
              <Text style={{ marginLeft: 4, marginBottom: 10 }}>{address}</Text>
              <Text style={styles.rating} category="h4">
                {restaurantRating(restaurant)}
              </Text>
              <Text style={{ marginLeft: 4, marginBottom: 10 }}>
                {description}
              </Text>
              <Text category="h4">Burgers</Text>
            </Layout>
          </>
        }
        data={burgers}
        renderItem={renderItem}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  rating: {
    backgroundColor: "#FFC529",
    color: "#fff",
    fontWeight: "700",
    width: 60,
    height: 40,
    textAlign: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
})
