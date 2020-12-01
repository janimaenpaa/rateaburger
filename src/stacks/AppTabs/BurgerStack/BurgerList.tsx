import React, { useContext } from "react"
import { Image, ImageBackground, View } from "react-native"
import { Button, Card, Text, List } from "@ui-kitten/components"
import { Layout } from "../../../components/Layout"
import { Burger, BurgerNavProps } from "../../../types"
import { DataContext } from "../../../providers/DataProvider"

export const BurgerList = ({ navigation }: BurgerNavProps<"Burgers">) => {
  const { burgers } = useContext(DataContext)

  const renderItem = ({ item }: { item: Burger }) => (
    <Card
      style={{ flex: 1, margin: 10 }}
      header={() => (
        <ImageBackground
          resizeMode="cover"
          style={{ width: "100%", height: 180 }}
          source={{ uri: item.imgUrl }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 36,
              fontWeight: "bold",
              textAlign: "right",
              alignContent: "flex-end",
              alignItems: "flex-end",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              padding: 10,
            }}
          >
            4.5 / 5.0
          </Text>
        </ImageBackground>
      )}
    >
      <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
    </Card>
  )

  return (
    <Layout>
      <Text style={{ margin: 10 }} category="h2">
        Burgers
      </Text>
      <View style={{ alignItems: "center" }}>
        <Button
          style={{ width: "95%" }}
          onPress={() => navigation.navigate("RateBurger")}
        >
          Rate A Burger
        </Button>
      </View>
      <List style={{ width: "100%" }} data={burgers} renderItem={renderItem} />
    </Layout>
  )
}
