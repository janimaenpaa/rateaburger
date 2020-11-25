import React from "react"
import { Layout } from "../../../components/Layout"
import { Button, Text } from "@ui-kitten/components"
import { createStackNavigator } from "@react-navigation/stack"
import { BurgerNavProps } from "../../../types"

const RateBurger = ({ navigation }: BurgerNavProps<"RateBurger">) => (
  <Layout>
    <Text>Rate A Burger</Text>
  </Layout>
)

const Burgers = ({ navigation }: BurgerNavProps<"Burgers">) => (
  <Layout>
    <Button onPress={() => navigation.navigate("RateBurger")}>
      Rate A Burger
    </Button>
  </Layout>
)

interface BurgerStackProps {}

const Stack = createStackNavigator()

export const BurgerStack: React.FC<BurgerStackProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Burgers"
        options={{ headerShown: false }}
        component={Burgers}
      />
      <Stack.Screen name="RateBurger" component={RateBurger} />
    </Stack.Navigator>
  )
}
