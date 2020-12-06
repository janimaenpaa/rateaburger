import React, { useContext } from "react"
import { Container } from "../../../components/Container"
import { Card, List, Text } from "@ui-kitten/components"
import { DataContext } from "../../../providers/DataProvider"
import { Review } from "../../../types"
import { Stars } from "../../../components/Stars"
import { Carousel } from "./Carousel"
import { StyleSheet } from "react-native"

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const { reviews, loading } = useContext(DataContext)

  const renderItem = ({ item }: { item: Review }) => (
    <Card style={styles.card} key={item.id}>
      <Text category="p1">
        <Text
          style={{ fontWeight: "bold" }}
        >{`${item.user.firstName} ${item.user.lastName}`}</Text>{" "}
        rated a burger
      </Text>
      <Text style={{ fontWeight: "700", marginBottom: 5 }} category="p1">
        {item.burger.name}
      </Text>
      <Text appearance="hint" style={{ marginBottom: 4 }}>
        {item.description}
      </Text>
      <Stars value={item.stars} />
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
    <Container>
      <List
        ListHeaderComponent={
          <>
            <Text category="h4" style={styles.text}>
              Latest burgers
            </Text>
            <Carousel />
            <Text category="h4" style={styles.text}>
              Latest reviews
            </Text>
          </>
        }
        style={{ width: "100%" }}
        data={reviews}
        renderItem={renderItem}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
  },
  card: {
    margin: 6,
    marginLeft: 10,
    marginRight: 10,
  },
})
