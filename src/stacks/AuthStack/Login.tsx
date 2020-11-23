import React, { useContext, useState } from "react"
import { Button, Icon, IconProps, Input } from "@ui-kitten/components"
import { AuthNavProps } from "../../types"
import { AuthContext } from "../../AuthProvider"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { Text } from "react-native"
import { Layout } from "../../components/Layout"

interface Props {}

const AlertIcon: IconProps = (props: any) => (
  <Icon {...props} name="alert-circle-outline" />
)

export const Login = ({ navigation }: AuthNavProps<"Login">) => {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry)
  }

  const renderIcon: IconProps = (props: any) => (
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
        accessoryRight={renderIcon}
        captionIcon={AlertIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={(nextValue) => setPassword(nextValue)}
      />
      <Button style={{ width: "80%", margin: 5 }} onPress={() => login()}>
        Log me in
      </Button>
      <Button
        style={{ width: "80%", margin: 5 }}
        onPress={() => navigation.navigate("Signup")}
      >
        Signup
      </Button>
    </Layout>
  )
}
