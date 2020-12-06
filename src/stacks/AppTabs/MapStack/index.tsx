import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Map } from "./Map"
import { LogoutButton } from "../../../components/LogoutButton"
import { RestaurantPage } from "../RestaurantStack/RestaurantPage"

interface MapStackProps {}

const Stack = createStackNavigator()

export const MapStack: React.FC<MapStackProps> = () => {
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
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Restaurant" component={RestaurantPage} />
    </Stack.Navigator>
  )
}
