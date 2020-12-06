import React from "react"
import { Container } from "./Container"
import { Text } from "@ui-kitten/components"
import { Image } from "react-native"
import "../burgericon.png"

interface Props {}

export const SplashScreen: React.FC<Props> = () => {
  return (
    <Container style={{ alignItems: "center" }}>
      <Image
        source={require("../burgericon.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text category="h2" style={{ fontWeight: "bold" }}>
        RATEABURGER
      </Text>
      <Text category="h6" style={{ fontWeight: "bold", color: "darkgray" }}>
        Flipping burgers...
      </Text>
    </Container>
  )
}
