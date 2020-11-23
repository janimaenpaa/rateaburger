import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

export type AuthParamList = {
  Login: undefined
  Signup: undefined
}

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>
  route: RouteProp<AuthParamList, T>
}

export type AppParamList = {
  Home: undefined
  Map: undefined
  Burgers: undefined
}

export type Coordinates = {
  id: number
  latitude: number
  longitude: number
}

export type Restaurant = {
  id: string
  name: string
  address: string
  imgUrl: string | null
  coordinates: Coordinates
}

export enum Patty {
  Beef = "beef",
  Chicken = "chicken",
  Fish = "fish",
  Veggie = "veggie",
}

export enum Star {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
}

export type Review = {
  id: string
  description: string
  stars: Star
  time: Date
  user: any
  burger: Burger
}

export type Burger = {
  id: string
  name: string
  patty: Patty
  imgUrl: string
  restaurant: Restaurant
  reviews: Review[]
}
