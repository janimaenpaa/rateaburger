import React, { useContext, useState } from "react"
import {
  Button,
  Icon,
  IconProps,
  Input,
  Text,
  Layout,
} from "@ui-kitten/components"
import { StyleSheet } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { Container } from "../../components/Container"
import { AuthNavProps, SignupData } from "../../types"
import { AuthContext } from "../../providers/AuthProvider"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { TextStyle } from "react-native"

const AlertIcon = (props: IconProps) => (
  <Icon {...props} name="alert-circle-outline" />
)

export const Signup = ({ navigation }: AuthNavProps<"Signup">) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const { signup } = useContext(AuthContext)
  const { control, handleSubmit, errors } = useForm()
  const onSubmit = (data: SignupData) => {
    signup(data)
    navigation.goBack()
  }

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
      <Layout style={{ margin: 10, backgroundColor: "#F7F9FC" }}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="Email"
              placeholder="email"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.email && <Text style={styles.error}>Email is required.</Text>}

        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="First name"
              placeholder="first name"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="firstName"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.firstName && (
          <Text style={styles.error}>First name is required.</Text>
        )}

        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="Last name"
              placeholder="last name"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="lastName"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.lastName && (
          <Text style={styles.error}>Last name is required.</Text>
        )}

        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="Password"
              placeholder="password"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              accessoryRight={renderIcon}
              captionIcon={AlertIcon}
              secureTextEntry={secureTextEntry}
            />
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.password && (
          <Text style={styles.error}>Password is required.</Text>
        )}

        <Button style={{ marginTop: 10 }} onPress={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Layout>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  layout: {
    margin: 10,
    backgroundColor: "#F7F9FC",
  },
  input: {
    width: "100%",
    marginTop: 16,
    backgroundColor: "#fff",
  },
  button: {
    width: "80%",
    margin: 5,
  },
  error: {
    color: "red",
  },
})
