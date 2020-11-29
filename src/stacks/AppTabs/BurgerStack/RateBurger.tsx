import React, { useContext, useEffect, useState } from "react"
import { Layout } from "../../../components/Layout"
import { BurgerNavProps, Restaurant } from "../../../types"
import { useForm, Controller } from "react-hook-form"
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Radio,
  RadioGroup,
  Text,
} from "@ui-kitten/components"
import { DataContext } from "../../../providers/DataProvider"
import { Keyboard, KeyboardEventName, Platform, View } from "react-native"

const showEvent: KeyboardEventName = Platform.select({
  android: "keyboardDidShow",
  default: "keyboardWillShow",
})

const hideEvent: KeyboardEventName = Platform.select({
  android: "keyboardDidHide",
  default: "keyboardWillHide",
})

const filter = (restaurant: Restaurant, query: string) =>
  restaurant.name.toLowerCase().includes(query.toLowerCase())

interface RateBurgerProps {}

export const RateBurger = ({ navigation }: BurgerNavProps<"RateBurger">) => {
  const { restaurants } = useContext(DataContext)
  const [restaurant, setRestaurant] = useState<string | undefined>(undefined)
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    restaurants
  )
  const [placement, setPlacement] = useState("bottom")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { control, handleSubmit, errors } = useForm()
  const onSubmit = (data: any) => console.log(data)

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(showEvent, () => {
      setPlacement("top")
    })

    const keyboardHideListener = Keyboard.addListener(hideEvent, () => {
      setPlacement("bottom")
    })

    return () => {
      keyboardShowListener.remove()
      keyboardHideListener.remove()
    }
  })

  const renderOption = (item: Restaurant, index: number) => (
    <AutocompleteItem key={index} title={item.name} />
  )

  const onSelect = (index: number) => {
    setRestaurant(filteredRestaurants[index].name)
  }

  const onChangeText = (query: string) => {
    setRestaurant(query)
    setFilteredRestaurants(
      filteredRestaurants.filter((item) => filter(item, query))
    )
  }

  const inputStyle = { width: "100%", marginBottom: 26 }

  return (
    <Layout style={{ padding: 20 }}>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Autocomplete
            label="Restaurant"
            placeholder="Type here..."
            value={restaurant}
            onSelect={onSelect}
            onChangeText={onChangeText}
            placement={placement}
            style={inputStyle}
          >
            {filteredRestaurants.map(renderOption)}
          </Autocomplete>
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
            style={inputStyle}
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
            style={inputStyle}
          />
        )}
        name="review"
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={{ width: "100%" }}>
            <Text appearance="hint">Rating</Text>
            <RadioGroup
              selectedIndex={selectedIndex}
              onChange={(index) => setSelectedIndex(index)}
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Radio>1</Radio>
              <Radio>2</Radio>
              <Radio>3</Radio>
              <Radio>4</Radio>
              <Radio>5</Radio>
            </RadioGroup>
          </View>
        )}
        name="rating"
        defaultValue=""
      />
      <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
    </Layout>
  )
}
