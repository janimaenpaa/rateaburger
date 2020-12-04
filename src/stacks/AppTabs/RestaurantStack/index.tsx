import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { RestaurantList } from "./RestaurantList"
import { RestaurantPage } from "./RestaurantPage"
import { LogoutButton } from "../../../components/LogoutButton"

interface RestaurantStackProps {}

const Stack = createStackNavigator()

export const RestaurantStack: React.FC<RestaurantStackProps> = () => {
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
      <Stack.Screen name="Restaurants" component={RestaurantList} />
      <Stack.Screen name="Restaurant" component={RestaurantPage} />
    </Stack.Navigator>
  )
}
