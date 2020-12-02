import React from "react"
import { Container } from "../../../components/Container"
import { Card, Layout, List, Text } from "@ui-kitten/components"
import { Image, ImageBackground } from "react-native"
import { Burger, RestaurantNavProps } from "../../../types"
import { ScrollView } from "react-native-gesture-handler"

/* const CardRows = (burgers: Burger[]) =>
  burgers.length === 0 ? (
    <Card>
      <Text>No burgers yet.</Text>
    </Card>
  ) : (
    burgers.map((burger) => <BurgerCard key={burger.id} burger={burger} />)
  ) */

export const RestaurantPage = ({ route }: RestaurantNavProps<"Restaurant">) => {
  const { imgUrl, name, address, description, burgers } = route.params

  const Img = imgUrl ? { uri: imgUrl } : require("../../../restaurantImg.jpg")

  const renderItem = ({ item }: { item: Burger }) => {
    return (
      <Card
        style={{ marginBottom: 20 }}
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
      <ScrollView>
        <ImageBackground
          resizeMode="cover"
          style={{ width: "100%", height: 260 }}
          source={Img}
        >
          <Text style={{ color: "white" }} category="h2">
            5.0
          </Text>
        </ImageBackground>

        <Layout style={{ margin: 20, backgroundColor: "#F7F9FC", flex: 1 }}>
          <Text category="h2">{name}</Text>
          <Text style={{ marginLeft: 4, marginBottom: 10 }}>{address}</Text>
          <Text style={{ marginLeft: 4, marginBottom: 10 }}>{description}</Text>
          <Text style={{ marginBottom: 10 }} category="h4">
            Burgers
          </Text>
          <List data={burgers} renderItem={renderItem} />
        </Layout>
      </ScrollView>
    </Container>
  )
}
