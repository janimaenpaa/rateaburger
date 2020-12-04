import React, { useContext } from "react"
import { Image, ImageBackground, View, StyleSheet } from "react-native"
import { Button, Card, Text, List, Layout } from "@ui-kitten/components"
import { Container } from "../../../components/Container"
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
    <Container style={styles.container}>
      <Layout style={styles.buttonView}>
        <Button
          style={styles.rateButton}
          onPress={() => navigation.navigate("RateBurger")}
        >
          Rate burger
        </Button>
        <Button
          status="info"
          style={styles.addButton}
          onPress={() => navigation.navigate("AddBurger")}
        >
          Add burger
        </Button>
      </Layout>
      <List style={styles.list} data={burgers} renderItem={renderItem} />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  buttonView: {
    flexDirection: "row",
    marginTop: 10,
  },
  rateButton: {
    width: "46%",
    margin: 5,
  },
  addButton: {
    width: "46%",
    margin: 5,
  },
  list: {
    width: "100%",
  },
})
