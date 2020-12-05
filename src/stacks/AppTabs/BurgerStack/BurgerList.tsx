import React, { useContext } from "react"
import { Image, StyleSheet } from "react-native"
import { Button, Card, Text, List, Layout } from "@ui-kitten/components"
import { Container } from "../../../components/Container"
import { Burger, BurgerNavProps } from "../../../types"
import { DataContext } from "../../../providers/DataProvider"
import { averageRating } from "../../../utils"

export const BurgerList = ({ navigation }: BurgerNavProps<"Burgers">) => {
  const { burgers, loading } = useContext(DataContext)

  const renderItem = ({ item }: { item: Burger }) => (
    <Card
      style={{ flex: 1, margin: 10 }}
      onPress={() => navigation.navigate("Burger", item)}
      header={() => (
        <Image
          resizeMode="cover"
          style={{ width: "100%", height: 180 }}
          source={{ uri: item.imgUrl }}
        />
      )}
      footer={() => (
        <Text style={styles.rating} category="s1" appearance="hint">
          rating {averageRating(item.reviews)} / 5.0 | {item.reviews.length}{" "}
          reviews
        </Text>
      )}
    >
      <Text style={{ fontWeight: "bold" }} category="h6">
        {item.name}
      </Text>
      <Text style={{ marginBottom: 8 }} appearance="hint">
        {item.restaurant.name}
      </Text>
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
  rating: {
    marginLeft: 20,
    padding: 4,
  },
})
