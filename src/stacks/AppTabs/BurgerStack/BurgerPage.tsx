import React from "react"
import { Card, Layout, List, Text } from "@ui-kitten/components"
import { Image, StyleSheet } from "react-native"
import { Container } from "../../../components/Container"
import { BurgerNavProps, Review } from "../../../types"
import { Stars } from "../../../components/Stars"
import { format } from "date-fns"
import { burgerRating } from "../../../utils"

export const BurgerPage = ({ route }: BurgerNavProps<"Burger">) => {
  const { imgUrl, name, description, reviews, patty, date } = route.params

  const Img = imgUrl ? { uri: imgUrl } : require("../../../restaurantImg.jpg")

  const renderItem = ({ item }: { item: Review }) => {
    return (
      <Card style={{ margin: 8, marginLeft: 20, marginRight: 20 }}>
        <Text appearance="hint">{format(new Date(date), "dd/MM/yyyy")}</Text>
        <Text style={{ fontWeight: "bold" }}>
          {item.user.firstName} {item.user.lastName}
        </Text>
        <Text>{item.description}</Text>
        <Stars value={item.stars} />
      </Card>
    )
  }

  const HeaderComponent = () => (
    <>
      <Image
        resizeMode="cover"
        style={{ width: "100%", height: 260 }}
        source={Img}
      />
      <Layout
        style={{
          margin: 10,
          backgroundColor: "#F7F9FC",
          flex: 1,
        }}
      >
        <Text category="h2">{name}</Text>
        <Text style={{ marginLeft: 4, marginBottom: 10 }} appearance="hint">
          Patty: {patty}
        </Text>
        <Text style={styles.rating} category="h4">
          {burgerRating(reviews)}
        </Text>
        <Text style={{ marginLeft: 4, marginBottom: 10 }}>{description}</Text>
        <Text category="h4">Reviews</Text>
        {reviews.length === 0 && <Text>No review yet...</Text>}
      </Layout>
    </>
  )

  return (
    <Container style={{ justifyContent: "flex-start" }}>
      <List
        ListHeaderComponent={HeaderComponent}
        data={reviews}
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
