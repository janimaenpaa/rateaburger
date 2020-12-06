import React, { useContext, useEffect, useState } from "react"
import { Container } from "../../../components/Container"
import { StyleSheet, Alert } from "react-native"
import MapView, { Callout, Marker } from "react-native-maps"
import * as Location from "expo-location"
import { DataContext } from "../../../providers/DataProvider"
import { Layout, Text } from "@ui-kitten/components"
import { MapNavProps, Restaurant } from "../../../types"
import { Stars } from "../../../components/Stars"
import { restaurantRating } from "../../../utils"

export const Map = ({ navigation }: MapNavProps<"Map">) => {
  const { restaurants, loading } = useContext(DataContext)
  const [region, setRegion] = useState({
    latitude: 60.169877007627676,
    longitude: 24.938366007081427,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  })

  const getPhoneLocation = async () => {
    const { status } = await Location.requestPermissionsAsync()

    if (status === "granted") {
      const phoneLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      })

      const result = {
        ...region,
        latitude: phoneLocation.coords.latitude,
        longitude: phoneLocation.coords.longitude,
      }

      setRegion(result)
    } else {
      Alert.alert("No permission to access phone location")
    }
  }

  useEffect(() => {
    getPhoneLocation()
    console.log(restaurants)
  }, [])

  const markers = restaurants.map((restaurant: Restaurant) => (
    <Marker
      key={`${restaurant.id}${Date.now()}`}
      coordinate={{
        latitude: Number(restaurant.coordinates.latitude),
        longitude: Number(restaurant.coordinates.longitude),
      }}
      title={restaurant.name}
    >
      <Callout onPress={() => navigation.navigate("Restaurant", restaurant)}>
        <Layout style={{ backgroundColor: "#fff", padding: 10 }}>
          <Text style={{ fontWeight: "bold" }}>{restaurant.name}</Text>
          <Text>{restaurant.burgers.length} burgers</Text>
          <Stars value={restaurantRating(restaurant)} />
        </Layout>
      </Callout>
    </Marker>
  ))

  if (loading) {
    return (
      <Container style={{ alignItems: "center" }}>
        <Text>Loading...</Text>
      </Container>
    )
  }

  return (
    <Container>
      <MapView style={styles.mapStyle} showsUserLocation region={region}>
        {markers}
      </MapView>
    </Container>
  )
}

const styles = StyleSheet.create({
  mapStyle: {
    width: "100%",
    height: "100%",
  },
})
