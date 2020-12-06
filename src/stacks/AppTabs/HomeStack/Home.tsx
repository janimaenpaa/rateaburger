import React, { useContext, useEffect, useState } from "react"
import { Container } from "../../../components/Container"
import { Card, Layout, List, Text } from "@ui-kitten/components"
import { DataContext } from "../../../providers/DataProvider"
import { Review } from "../../../types"
import { Stars } from "../../../components/Stars"
import { Carousel } from "./Carousel"
import { StyleSheet } from "react-native"
import { formatDistance, subDays, format, parseISO } from "date-fns"

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const [sortedReviews, setSortedReviews] = useState<Review[] | null>(null)
  const { reviews, loading } = useContext(DataContext)

  useEffect(() => {
    const sortReviews = [...reviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4)

    setSortedReviews(sortReviews)
  }, [])

  const renderItem = ({ item }: { item: Review }) => (
    <Card style={styles.card} key={item.id}>
      <Text appearance="hint">
        {formatDistance(new Date(item.date), new Date(), {
          includeSeconds: true,
        })}{" "}
        ago
      </Text>
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

  if (!sortedReviews)
    return (
      <Container style={{ alignItems: "center" }}>
        <Text>No reviews...</Text>
      </Container>
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
        data={sortedReviews}
        renderItem={renderItem}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 25,
  },
  card: {
    margin: 6,
    marginLeft: 20,
    marginRight: 20,
  },
})
