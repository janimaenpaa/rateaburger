import React from "react"
import { Container } from "../../../components/Container"
import { Text } from "@ui-kitten/components"
import { ImageBackground } from "react-native"
import { RestaurantNavProps } from "../../../types"

export const RestaurantPage = ({ route }: RestaurantNavProps<"Restaurant">) => {
  const { imgUrl, name, address } = route.params

  const Img = imgUrl ? { uri: imgUrl } : require("../../../restaurantImg.jpg")

  return (
    <Container style={{ justifyContent: "flex-start" }}>
      <ImageBackground
        resizeMode="cover"
        style={{ width: "100%", height: 300 }}
        source={Img}
      >
        <Text style={{ color: "white" }} category="h2">
          5.0
        </Text>
      </ImageBackground>
      <Text category="h2">{name}</Text>
      <Text>{address}</Text>
    </Container>
  )
}
