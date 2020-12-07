import React, { useContext } from "react"
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
import { AuthContext } from "../../../providers/AuthProvider"

export const RateBurger = ({ navigation }: BurgerNavProps<"RateBurger">) => {
  const { burgers, refetch } = useContext(DataContext)
  const { user } = useContext(AuthContext)
  const { control, handleSubmit, errors } = useForm()

  const onSubmit = (data: any) => {
    if (user) {
      const review = { ...data, stars: data.stars + 1, user: user.id }
      console.log(review)

      fetch("https://rateaburger.herokuapp.com/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          refetch()
        })
        .then(() => navigation.navigate("Burgers"))
        .catch((error) => console.log(error))
    } else {
      console.log("error")
    }
  }

  return (
    <Container style={{ padding: 20 }}>
      <Controller
        control={control}
        render={({ onChange, value, ref }) => (
          <>
            <Text style={styles.label} category="c2" appearance="hint">
              Burger
            </Text>
            <Layout style={styles.select}>
              <Picker selectedValue={value} onValueChange={onChange} ref={ref}>
                {burgers.map((burger) => (
                  <Picker.Item
                    key={burger.id}
                    label={burger.name}
                    value={burger.id}
                  />
                ))}
              </Picker>
            </Layout>
          </>
        )}
        name="burger"
        defaultValue={burgers[0].id}
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
        name="description"
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
        name="stars"
        defaultValue={0}
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
