import React from "react"
import { Layout } from "../../components/Layout"
import { Text } from "react-native"

interface BurgersProps {}

export const Burgers: React.FC<BurgersProps> = () => {
  return (
    <Layout>
      <Text>Burgers</Text>
    </Layout>
  )
}
