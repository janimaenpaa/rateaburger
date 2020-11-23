import React from "react"
import { Layout } from "../../components/Layout"
import { AuthNavProps } from "../../types"
import { Button } from "@ui-kitten/components"
import { Text } from "react-native"

interface SignupProps {}

export const Signup = ({ navigation }: AuthNavProps<"Signup">) => (
  <Layout>
    <Text>Signup</Text>
    <Button onPress={() => navigation.goBack()}>Go Back</Button>
  </Layout>
)
