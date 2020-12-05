import React, { useContext, useState } from "react"
import { Container } from "../../../components/Container"
import { BurgerNavProps } from "../../../types"
import { useForm, Controller } from "react-hook-form"
import {
  Button,
  Input,
  Layout,
  Radio,
  RadioGroup,
  Text,
} from "@ui-kitten/components"
import { DataContext } from "../../../providers/DataProvider"
import { View, StyleSheet } from "react-native"
import { Picker } from "@react-native-picker/picker"

export const RateBurger = ({ navigation }: BurgerNavProps<"RateBurger">) => {
  const { restaurants } = useContext(DataContext)
  const [selectedIndex, setSelectedIndex] = useState(4)
  const { control, handleSubmit, errors } = useForm()
  const onSubmit = (data: any) => console.log(data)

  return (
    <Container style={{ padding: 20 }}>
      <Controller
        control={control}
        render={({ onChange, value, ref }) => (
          <>
            <Text style={styles.label} category="c2" appearance="hint">
              Restaurant
            </Text>
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
          </>
        )}
        name="restaurant"
        defaultValue={restaurants[0].name || ""}
      />
      {errors.restaurant && (
        <Text style={{ marginBottom: 10 }} status="danger">
          Restaurant is required.
        </Text>
      )}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            label="Burger"
            placeholder="Burger name..."
            style={styles.input}
            size="large"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="burger"
        defaultValue=""
        rules={{ required: true }}
      />
      {errors.burger && (
        <Text style={{ marginBottom: 10 }} status="danger">
          Burger name is required.
        </Text>
      )}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            label="Review"
            placeholder="Type review here..."
            style={styles.input}
            size="large"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="review"
        defaultValue=""
        rules={{ required: true }}
      />
      {errors.review && (
        <Text style={{ marginBottom: 10 }} status="danger">
          Review is required.
        </Text>
      )}

      <Controller
        control={control}
        render={({ onChange, value }) => (
          <>
            <Text style={styles.label} category="c2" appearance="hint">
              Rating
            </Text>
            <View style={styles.radioGroupLayout}>
              <RadioGroup
                selectedIndex={value}
                onChange={onChange}
                style={styles.radioGroup}
              >
                <Radio>1</Radio>
                <Radio>2</Radio>
                <Radio>3</Radio>
                <Radio>4</Radio>
                <Radio>5</Radio>
              </RadioGroup>
            </View>
          </>
        )}
        name="rating"
        defaultValue=""
        rules={{ required: true }}
      />
      {errors.rating && (
        <Text style={{ marginBottom: 10 }} status="danger">
          Rating is required.
        </Text>
      )}

      <Button
        style={{ marginTop: 16 }}
        size="large"
        onPress={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
    </Container>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
  },
  select: {
    borderWidth: 1,
    borderColor: "#ebeff5",
    borderRadius: 4,
    marginBottom: 10,
  },
  radioGroupLayout: {
    backgroundColor: "#fff",
    borderColor: "#ebeff5",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
  },
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  label: {
    marginBottom: 3,
  },
})
