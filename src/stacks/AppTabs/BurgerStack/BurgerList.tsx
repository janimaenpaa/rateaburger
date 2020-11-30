import React, { useContext } from "react"
import { Image } from "react-native"
import { Button, Card, Text, List } from "@ui-kitten/components"
import { Layout } from "../../../components/Layout"
import { Burger, BurgerNavProps } from "../../../types"
import { DataContext } from "../../../providers/DataProvider"

export const BurgerList = ({ navigation }: BurgerNavProps<"Burgers">) => {
  const { burgers } = useContext(DataContext)

  const renderItem = ({ item }: { item: Burger }) => (
    <Card
      style={{ margin: 10 }}
      header={() => (
        <Image
          resizeMode="cover"
          style={{ width: "100%", height: 180}}
          source={{ uri: item.imgUrl }}
        />
      )}
    >
      <Text>{item.name}</Text>
    </Card>
  )

  return (
    <Layout>
      <Text>Burgers</Text>
      <Button
        style={{ width: "95%", margin: 10 }}
        onPress={() => navigation.navigate("RateBurger")}
      >
        Rate A Burger
      </Button>
      <List
        style={{ width: "100%", margin: 10 }}
        data={burgers}
        renderItem={renderItem}
      />
    </Layout>
  )
}
