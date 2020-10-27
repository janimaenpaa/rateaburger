import React from "react"
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack"
import { NavigationContainer, RouteProp } from "@react-navigation/native"
import { Button, Text } from "react-native"
import { Center } from "./Center"
import { AuthNavProps, AuthParamList } from "./types"

interface RoutesProps {}

const Stack = createStackNavigator<AuthParamList>()

const Login = ({ navigation }: AuthNavProps<"Login">) => (
  <Center>
    <Text>Login</Text>
    <Button title="Signup" onPress={() => navigation.navigate("Signup")} />
  </Center>
)

const Signup = ({ navigation }: AuthNavProps<"Signup">) => (
  <Center>
    <Text>Signup</Text>
    <Button title="Go back" onPress={() => navigation.goBack()} />
  </Center>
)

export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
