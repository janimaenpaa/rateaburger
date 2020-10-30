import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Button, Text } from 'react-native'
import { Center } from './Center'
import { AuthNavProps, AuthParamList } from './types'
import { AuthContext } from './AuthProvider'



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
