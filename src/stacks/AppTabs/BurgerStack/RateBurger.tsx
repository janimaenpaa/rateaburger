import React from "react"
import { Layout } from "../../../components/Layout"
import { BurgerNavProps } from "../../../types"
import { useForm, Controller } from "react-hook-form"
import { Button, Input, Text } from "@ui-kitten/components"

interface RateBurgerProps {}

export const RateBurger = ({ navigation }: BurgerNavProps<"RateBurger">) => {
  const { control, handleSubmit, errors } = useForm()
  const onSubmit = (data: any) => console.log(data)
  return (
    <Layout>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            label="Restaurant"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="restaurant"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.restaurant && <Text>This is required.</Text>}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            label="Burger"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="burger"
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            label="Review"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="review"
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            label="Rating"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="rating"
        defaultValue=""
      />

      <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
    </Layout>
  )
}
