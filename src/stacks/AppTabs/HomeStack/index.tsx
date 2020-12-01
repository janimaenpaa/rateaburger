import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { Home } from "./Home"

interface HomeStackProps {}

const Stack = createStackNavigator()

export const HomeStack: React.FC<HomeStackProps> = () => {
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
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}
