import React, { useContext, useState } from "react"
import { Layout } from "../../../components/Layout"
import { BurgerNavProps, Restaurant } from "../../../types"
import { useForm, Controller } from "react-hook-form"
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Text,
} from "@ui-kitten/components"
import { DataContext } from "../../../providers/DataProvider"

const filter = (restaurant: Restaurant, query: string) =>
  restaurant.name.toLowerCase().includes(query.toLowerCase())

interface RateBurgerProps {}

export const RateBurger = ({ navigation }: BurgerNavProps<"RateBurger">) => {
  const [restaurant, setRestaurant] = useState<string | undefined>(undefined)
  const { restaurants } = useContext(DataContext)
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    restaurants
  )
  console.log(restaurants)
  const { control, handleSubmit, errors } = useForm()
  const onSubmit = (data: any) => console.log(data)

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
            style={{ width: "100%" }}
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
