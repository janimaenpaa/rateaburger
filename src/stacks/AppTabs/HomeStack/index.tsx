import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Home } from "./Home"
import { LogoutButton } from "../../../components/LogoutButton"

interface HomeStackProps {}

const Stack = createStackNavigator()

export const HomeStack: React.FC<HomeStackProps> = () => {
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
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "RateABurger" }}
      />
    </Stack.Navigator>
  )
}
