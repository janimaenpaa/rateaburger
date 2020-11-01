import React, { useContext, useState } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Button, Text, TouchableWithoutFeedback } from "react-native"
import { Icon, Input } from "@ui-kitten/components"
import { Layout } from "./Layout"
import { AuthNavProps, AuthParamList } from "./types"
import { AuthContext } from "./AuthProvider"

const AlertIcon: React.FC = (props: any) => <Icon {...props} name="alert-circle-outline" />

const Login = ({ navigation }: AuthNavProps<"Login">) => {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry)
  }

  const renderIcon: React.FC = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  )

  return (
    <Layout>
      <Text>Login</Text>
      <Input
        style={{ width: "80%", margin: 5 }}
        label="email"
        placeholder="email"
        value={email}
        onChangeText={(nextValue) => setEmail(nextValue)}
      />
      <Input
        style={{ width: "80%", margin: 5 }}
        label="password"
        placeholder="password"
        value={password}
        onChangeText={(nextValue) => setPassword(nextValue)}
      />
      <Button title="Log me in" onPress={() => login()} />
      <Button title="Signup" onPress={() => navigation.navigate("Signup")} />
    </Layout>
  )
}
const Signup = ({ navigation }: AuthNavProps<"Signup">) => (
  <Layout>
    <Text>Signup</Text>
    <Button title="Go back" onPress={() => navigation.goBack()} />
  </Layout>
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
