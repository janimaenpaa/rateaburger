import React, { useContext } from "react"
import { AuthContext } from "../../../providers/AuthProvider"
import { Container } from "../../../components/Container"
import { Card, List, Text } from "@ui-kitten/components"
import { DataContext } from "../../../providers/DataProvider"
import { Review } from "../../../types"
import { Stars } from "../../../components/Stars"

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const { logout } = useContext(AuthContext)
  const { reviews, loading } = useContext(DataContext)

  const renderItem = ({ item }: { item: Review }) => (
    <Card style={{ margin: 6 }} key={item.id}>
      <Text category="p1">user rated a burger</Text>
      <Text style={{ fontWeight: "700" }} category="p1">
        {item.burger.name}
      </Text>
      <Text style={{ fontWeight: "700", marginTop: 8 }} category="p1">
        Rating
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
      <Text category="h2">Feed</Text>
      <List style={{ width: "100%" }} data={reviews} renderItem={renderItem} />
    </Container>
  )
}
