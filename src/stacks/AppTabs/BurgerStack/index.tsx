import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { RateBurger } from "./RateBurger"
import { BurgerList } from "./BurgerList"

interface BurgerStackProps {}

const Stack = createStackNavigator()

export const BurgerStack: React.FC<BurgerStackProps> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFC529",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Burgers"
        component={BurgerList}
      />
      <Stack.Screen name="RateBurger" component={RateBurger} />
    </Stack.Navigator>
  )
}
