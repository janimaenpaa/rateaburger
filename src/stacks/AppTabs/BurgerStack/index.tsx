import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { RateBurger } from "./RateBurger"
import { BurgerList } from "./BurgerList"

interface BurgerStackProps {}

const Stack = createStackNavigator()

export const BurgerStack: React.FC<BurgerStackProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Burgers"
        options={{ headerShown: false }}
        component={BurgerList}
      />
      <Stack.Screen name="RateBurger" component={RateBurger} />
    </Stack.Navigator>
  )
}
