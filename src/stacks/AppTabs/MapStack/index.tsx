import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Map } from "./Map"

interface MapStackProps {}

const Stack = createStackNavigator()

export const MapStack: React.FC<MapStackProps> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFC529"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  )
}
