import React, { useContext, useState } from "react"
import { Button, Icon, IconProps, Input, Text } from "@ui-kitten/components"
import { AuthNavProps } from "../../types"
import { AuthContext } from "../../providers/AuthProvider"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { Container } from "../../components/Container"

const AlertIcon = (props: IconProps) => (
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
    <Container style={{ alignItems: "center" }}>
      <Text category="h2">Login</Text>
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
    </Container>
  )
}
