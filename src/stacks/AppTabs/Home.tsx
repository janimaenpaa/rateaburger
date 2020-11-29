import React, { useContext } from "react"
import { AuthContext } from "../../providers/AuthProvider"
import { Layout } from "../../components/Layout"
import { Button } from "react-native"
import { Card, List, ListItem, Text } from "@ui-kitten/components"
import { DataContext } from "../../providers/DataProvider"
import { Review } from "../../types"

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const { logout } = useContext(AuthContext)
  const { reviews } = useContext(DataContext)

  const renderItem = ({ item }: { item: Review }) => (
    <Card style={{ margin: 6 }} key={item.id}>
      <Text category="p1">user rated a burger</Text>
      <Text style={{ fontWeight: "700" }} category="p1">
        {item.burger.name}
      </Text>
      <Text style={{ fontWeight: "700", marginTop: 8 }} category="p1">
        Rating
      </Text>
    </Card>
  )

  return (
    <Layout>
      <Text>Home</Text>
      <Button title="Logout" onPress={() => logout()} />
      <Text category="h2">Feed</Text>
      <List style={{ width: "100%" }} data={reviews} renderItem={renderItem} />
    </Layout>
  )
}
