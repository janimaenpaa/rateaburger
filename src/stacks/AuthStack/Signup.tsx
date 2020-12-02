import React from "react"
import { Container } from "../../components/Container"
import { AuthNavProps } from "../../types"
import { Button } from "@ui-kitten/components"
import { Text } from "react-native"

interface SignupProps {}

export const Signup = ({ navigation }: AuthNavProps<"Signup">) => (
  <Container>
    <Text>Signup</Text>
    <Button onPress={() => navigation.goBack()}>Go Back</Button>
  </Container>
)
