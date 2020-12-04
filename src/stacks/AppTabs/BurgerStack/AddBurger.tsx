import React, { useContext, useState } from "react"
import { BurgerNavProps, Patty } from "../../../types"
import { useForm, Controller } from "react-hook-form"
import { StyleSheet } from "react-native"
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  IndexPath,
  Input,
  Layout,
  Radio,
  RadioGroup,
  Text,
} from "@ui-kitten/components"
import { Container } from "../../../components/Container"
import { DataContext } from "../../../providers/DataProvider"
import { Picker } from "@react-native-picker/picker"

interface IFormInput {
  name: String
  description: String
  patty: Patty
  imgUrl?: string
}

export const AddBurger = ({ navigation }: BurgerNavProps<"AddBurger">) => {
  const { burgers, restaurants } = useContext(DataContext)
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
    new IndexPath(0)
  )
  const { control, handleSubmit, register, errors } = useForm<IFormInput>()
  const onSubmit = (data: any) => console.log(data)
  return (
    <Container>
      <Layout style={styles.layout}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              style={styles.input}
              label="Burger name"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="name"
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              style={styles.input}
              label="Description"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="description"
          defaultValue=""
        />
        <Text style={{ marginBottom: 3 }} category="c2" appearance="hint">
          Patty
        </Text>
        <Controller
          control={control}
          render={({ onChange, value, ref }) => (
            <Layout style={styles.select}>
              <Picker selectedValue={value} onValueChange={onChange} ref={ref}>
                <Picker.Item label="Beef" value="beef" />
                <Picker.Item label="Chicken" value="chicken" />
                <Picker.Item label="Fish" value="fish" />
                <Picker.Item label="Veggie" value="veggie" />
              </Picker>
            </Layout>
          )}
          name="patty"
          defaultValue="beef"
        />
        <Text style={{ marginBottom: 3 }} category="c2" appearance="hint">
          Restaurant
        </Text>
        <Controller
          control={control}
          render={({ onChange, value, ref }) => (
            <Layout style={styles.select}>
              <Picker selectedValue={value} onValueChange={onChange} ref={ref}>
                {restaurants.map((restaurant) => (
                  <Picker.Item
                    key={restaurant.id}
                    label={restaurant.name}
                    value={restaurant.name}
                  />
                ))}
              </Picker>
            </Layout>
          )}
          name="restaurant"
          defaultValue={restaurants[0].name || ""}
        />

        <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
      </Layout>
    </Container>
  )
}

const styles = StyleSheet.create({
  layout: {
    margin: 20,
    backgroundColor: "#F7F9FC",
  },
  select: {
    borderWidth: 1,
    borderColor: "#ebeff5",
    borderRadius: 4,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    marginBottom: 10,
  },
})
