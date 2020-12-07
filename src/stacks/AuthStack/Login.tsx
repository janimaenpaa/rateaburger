import React, { useContext, useState } from "react"
import {
  Button,
  Icon,
  IconProps,
  Input,
  Layout,
  Text,
} from "@ui-kitten/components"
import { StyleSheet, Image } from "react-native"
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
    <Container>
      <Layout style={styles.center}>
        <Image
          source={require("../../burgericon.png")}
          style={{ width: 120, height: 120 }}
        />
        <Text category="h2" style={{ fontWeight: "bold" }}>
          RATEABURGER
        </Text>
        <Text category="s2" style={{ margin: 20, textAlign: "center" }}>
          RateABurger is an app where users can review burgers and see the best
          burgers at least in Helsinki!
        </Text>
      </Layout>
      <Text style={styles.loginText} category="h2">
        Login
      </Text>
      <Layout style={styles.center}>
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
        <Button
          status="info"
          style={styles.button}
          onPress={() => login({ email, password })}
        >
          Login
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate("Signup")}
        >
          Signup
        </Button>
      </Layout>
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
  center: {
    alignItems: "center",
    backgroundColor: "#f7f9fc",
  },
  loginText: {
    margin: 10,
    marginLeft: 40,
  },
})
