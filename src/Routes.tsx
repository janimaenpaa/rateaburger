import React, { useState, useEffect, useContext } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { ActivityIndicator, Button, Text } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { Center } from "./Center"
import { AuthNavProps, AuthParamList } from "./types"
import { AuthContext } from "./AuthProvider"

const Stack = createStackNavigator<AuthParamList>()

const Login = ({ navigation }: AuthNavProps<"Login">) => {
  const { login } = useContext(AuthContext)
  return (
    <Center>
      <Text>Login</Text>
      <Button title="Log me in" onPress={() => login()} />
      <Button title="Signup" onPress={() => navigation.navigate("Signup")} />
    </Center>
  )
}
const Signup = ({ navigation }: AuthNavProps<"Signup">) => (
  <Center>
    <Text>Signup</Text>
    <Button title="Go back" onPress={() => navigation.goBack()} />
  </Center>
)

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { user, login } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((user) => {
        console.log(user)
        if (user) {
          //do something
          login()
          setLoading(false)
        } else {
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    )
  }

  return (
    <NavigationContainer>
      {user ? (
        <Center>
          <Text>User exists</Text>
        </Center>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
