import React, { useContext } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Layout } from "./components/Layout"
import { Button, Text } from "react-native"
import { AuthContext } from "./AuthProvider"
import { Ionicons } from "@expo/vector-icons"
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"

interface AppTabsProps {}

const Tabs = createBottomTabNavigator()

const Home = () => {
  const { logout } = useContext(AuthContext)
  return (
    <Layout>
      <Text>Home</Text>
      <Button title="Logout" onPress={() => logout()} />
    </Layout>
  )
}

const Map = () => (
  <Layout>
    <Text>Map</Text>
  </Layout>
)

const Burgers = () => (
  <Layout>
    <Text>Burgers</Text>
  </Layout>
)

const Restaurants = () => (
  <Layout>
    <Text>Restaurants</Text>
  </Layout>
)

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
      <Tabs.Screen name="Burgers" component={Burgers}></Tabs.Screen>
      <Tabs.Screen name="Restaurants" component={Restaurants}></Tabs.Screen>
      <Tabs.Screen name="Map" component={Map}></Tabs.Screen>
    </Tabs.Navigator>
  )
}
