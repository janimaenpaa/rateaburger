import React, { useContext, useRef } from "react"
import { Image, StyleSheet } from "react-native"
import { Button, Card, Text, List, Layout } from "@ui-kitten/components"
import { Container } from "../../../components/Container"
import { Burger, BurgerNavProps } from "../../../types"
import { DataContext } from "../../../providers/DataProvider"
import { averageRating } from "../../../utils"
import { useScrollToTop } from "@react-navigation/native"

export const BurgerList = ({ navigation }: BurgerNavProps<"Burgers">) => {
  const { burgers, loading } = useContext(DataContext)

  const renderItem = ({ item }: { item: Burger }) => (
    <Card
      style={styles.card}
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

  const ref = useRef(null)
  useScrollToTop(ref)

  return (
    <Container style={styles.container}>
      <List
        ref={ref}
        ListHeaderComponent={
          <Layout style={styles.buttonView}>
            <Button
              style={styles.rateButton}
              onPress={() => navigation.navigate("RateBurger")}
            >
              RATE BURGER
            </Button>
            <Button
              status="info"
              style={styles.addButton}
              onPress={() => navigation.navigate("AddBurger")}
            >
              ADD BURGER
            </Button>
          </Layout>
        }
        style={styles.list}
        data={burgers}
        renderItem={renderItem}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 14,
    marginRight: 14,
    marginTop: 20,
  },
  rateButton: {
    width: "46%",
  },
  addButton: {
    width: "46%",
  },
  list: {
    width: "100%",
  },
  rating: {
    marginLeft: 20,
    padding: 4,
  },
  card: {
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
  },
})
