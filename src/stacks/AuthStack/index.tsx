import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { AuthParamList } from "../../types"
import { Signup } from "./Signup"
import { Login } from "./Login"

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>()

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  )
}
