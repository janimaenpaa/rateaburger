import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { RestaurantList } from "./RestaurantList"

interface RestaurantStackProps {}

const Stack = createStackNavigator()

export const RestaurantStack: React.FC<RestaurantStackProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Restaurants"
        options={{ headerShown: false }}
        component={RestaurantList}
      />
    </Stack.Navigator>
  )
}
