import React from "react"
import { useForm, Controller } from "react-hook-form"
import { Alert, StyleSheet } from "react-native"
import { Text, Input, Button, Layout } from "@ui-kitten/components"
import { Container } from "../../../components/Container"
import { RestaurantNavProps } from "../../../types"

type FormData = {}

export const AddRestaurant = ({
  navigation,
}: RestaurantNavProps<"AddRestaurant">) => {
  const { control, handleSubmit, errors } = useForm()
  const onSubmit = (data: any) => console.log(data)
  return (
    <Container>
      <Layout style={styles.layout}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="Restaurant name"
              placeholder="Restaurant name..."
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="name"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.name && <Text>Restaurant name is required.</Text>}
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="Description"
              placeholder="Description..."
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="description"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.description && <Text>Restaurant name is required.</Text>}
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="Address"
              placeholder="Streetname 123..."
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="address"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.address && <Text>Restaurant name is required.</Text>}
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="Add Image"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="imgUrl"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.address && <Text>Restaurant name is required.</Text>}
        <Button style={styles.button} onPress={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Layout>
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
  },
  layout: {
    margin: 20,
    backgroundColor: "#F7F9FC",
  },
})
