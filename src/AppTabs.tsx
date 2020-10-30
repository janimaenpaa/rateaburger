import React, { useContext } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Center } from "./Center"
import { Button, Text } from "react-native"
import { AuthContext } from "./AuthProvider"

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
