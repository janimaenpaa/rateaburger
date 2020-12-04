import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { RateBurger } from "./RateBurger"
import { BurgerList } from "./BurgerList"
import { AddBurger } from "./AddBurger"
import { LogoutButton } from "../../../components/LogoutButton"
import { BurgerPage } from "./BurgerPage"

interface BurgerStackProps {}

const Stack = createStackNavigator()

export const BurgerStack: React.FC<BurgerStackProps> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <LogoutButton />,
        headerStyle: {
          backgroundColor: "#FFC529",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Burgers" component={BurgerList} />
      <Stack.Screen
        name="Burger"
        component={BurgerPage}
        options={{ title: "Burger" }}
      />
      <Stack.Screen name="RateBurger" component={RateBurger} />
      <Stack.Screen name="AddBurger" component={AddBurger} />
    </Stack.Navigator>
  )
}
