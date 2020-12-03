import React, { useContext } from "react"
import {
  Button,
  Icon,
  IconProps,
  Input,
  Text,
  Layout,
} from "@ui-kitten/components"
import { useForm, Controller } from "react-hook-form"
import { Container } from "../../components/Container"
import { AuthNavProps, SignupData } from "../../types"
import { AuthContext } from "../../providers/AuthProvider"

const AlertIcon = (props: IconProps) => (
  <Icon {...props} name="alert-circle-outline" />
)

export const Signup = ({ navigation }: AuthNavProps<"Signup">) => {
  const { signup } = useContext(AuthContext)
  const { control, handleSubmit, errors } = useForm()
  const onSubmit = (data: SignupData) => {
    signup(data)
    navigation.goBack()
  }

  const inputStyle = { width: "100%", marginBottom: 16 }

  return (
    <Container style={{ alignItems: "center" }}>
      <Layout style={{ margin: 10, backgroundColor: "#F7F9FC" }}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="Email"
              style={inputStyle}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.email && <Text>This is required.</Text>}

        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="First name"
              style={inputStyle}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="firstName"
          defaultValue=""
        />

        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="Last name"
              style={inputStyle}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="lastName"
          defaultValue=""
        />

        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="Password"
              style={inputStyle}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="password"
          defaultValue=""
        />
        <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
      </Layout>
    </Container>
  )
}
