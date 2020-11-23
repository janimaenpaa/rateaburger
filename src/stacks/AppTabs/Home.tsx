import React, { useContext } from "react"
import { AuthContext } from "../../AuthProvider"
import { Layout } from "../../components/Layout"
import { Button, Text } from "react-native"

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const { logout } = useContext(AuthContext)
  return (
    <Layout>
      <Text>Home</Text>
      <Button title="Logout" onPress={() => logout()} />
    </Layout>
  )
}
