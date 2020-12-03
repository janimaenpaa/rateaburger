import React, { useContext, useState } from "react"
import { Button, Icon, IconProps, Input, Text } from "@ui-kitten/components"
import { StyleSheet } from "react-native"
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
    <Container style={styles.container}>
      <Text category="h2">Login</Text>
      <Input
        style={styles.input}
        label="email"
        placeholder="email"
        value={email}
        onChangeText={(nextValue) => setEmail(nextValue)}
      />
      <Input
        style={styles.input}
        label="password"
        placeholder="password"
        value={password}
        accessoryRight={renderIcon}
        captionIcon={AlertIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={(nextValue) => setPassword(nextValue)}
      />
      <Button style={styles.button} onPress={() => login()}>
        Log me in
      </Button>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate("Signup")}
      >
        Signup
      </Button>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  input: {
    width: "80%",
    margin: 5,
    backgroundColor: "#fff",
  },
  button: {
    width: "80%",
    margin: 5,
  },
})
