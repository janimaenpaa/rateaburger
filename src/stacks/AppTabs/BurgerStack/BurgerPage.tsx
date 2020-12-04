import React from "react"
import { Card, Layout, List, Text } from "@ui-kitten/components"
import { Image, ImageBackground } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Container } from "../../../components/Container"
import { BurgerNavProps, Review } from "../../../types"
import { Stars } from "../../../components/Stars"

export const BurgerPage = ({ route }: BurgerNavProps<"Burger">) => {
  const { imgUrl, name, description, reviews } = route.params

  const Img = imgUrl ? { uri: imgUrl } : require("../../../restaurantImg.jpg")

  const renderItem = ({ item }: { item: Review }) => {
    return (
      <Card style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold" }}>
          {item.user.firstName} {item.user.lastName}
        </Text>
        <Text>{item.description}</Text>
        <Stars value={item.stars} />
      </Card>
    )
  }
  return (
    <Container style={{ justifyContent: "flex-start" }}>
      <ScrollView>
        <Image
          resizeMode="cover"
          style={{ width: "100%", height: 260 }}
          source={Img}
        />
        <Layout style={{ margin: 20, backgroundColor: "#F7F9FC", flex: 1 }}>
          <Text category="h2">{name}</Text>
          <Text style={{ marginLeft: 4, marginBottom: 10 }}>{description}</Text>
          <Text style={{ marginBottom: 10 }} category="h4">
            Reviews
          </Text>
          {reviews.length > 0 ? (
            <List data={reviews} renderItem={renderItem} />
          ) : (
            <Text>No review yet...</Text>
          )}
        </Layout>
      </ScrollView>
    </Container>
  )
}
