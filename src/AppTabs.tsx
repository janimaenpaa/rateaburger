import React, { useContext } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Center } from "./Center"
import { Button, Text } from "react-native"
import { AuthContext } from "./AuthProvider"
import { Ionicons } from "@expo/vector-icons"
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"

interface AppTabsProps {}

const Tabs = createBottomTabNavigator()

const Home = () => {
  const { logout } = useContext(AuthContext)
  return (
    <Center>
      <Text>Home</Text>
      <Button title="Logout" onPress={() => logout()} />
    </Center>
  )
}

const Map = () => (
  <Center>
    <Text>Map</Text>
  </Center>
)

const Burgers = () => (
  <Center>
    <Text>Burgers</Text>
  </Center>
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
      <Tabs.Screen name="Map" component={Map}></Tabs.Screen>
    </Tabs.Navigator>
  )
}
