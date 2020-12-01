import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"

import { Home } from "./Home"
import { BurgerStack } from "./BurgerStack"
import { RestaurantStack } from "./RestaurantStack"
import { Map } from "./Map"

interface AppTabsProps {}

const Tabs = createBottomTabNavigator()

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = ""

          if (route.name === "Home") {
            return <FontAwesome name="home" size={24} color="black" />
          } else if (route.name === "Burgers") {
            return <FontAwesome5 name="hamburger" size={24} color="black" />
          } else if (route.name === "Map") {
            return <FontAwesome name="map" size={24} color="black" />
          } else if (route.name === "Restaurants") {
            return <FontAwesome5 name="utensils" size={24} color="black" />
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        tabStyle: {
          alignSelf: "center",
        },
      }}
    >
      <Tabs.Screen name="Home" component={Home}></Tabs.Screen>
      <Tabs.Screen name="Burgers" component={BurgerStack}></Tabs.Screen>
      <Tabs.Screen name="Restaurants" component={RestaurantStack}></Tabs.Screen>
      <Tabs.Screen name="Map" component={Map}></Tabs.Screen>
    </Tabs.Navigator>
  )
}
