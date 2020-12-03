import React, { useContext, useEffect, useState } from "react"
import { Container } from "../../../components/Container"
import { StyleSheet, Alert } from "react-native"
import MapView, { Marker } from "react-native-maps"
import * as Location from "expo-location"
import { DataContext } from "../../../providers/DataProvider"

interface MapProps {}

export const Map: React.FC<MapProps> = () => {
  const { restaurants } = useContext(DataContext)
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
  }, [])

  const markers = restaurants.map((restaurant) => (
    <Marker
      key={restaurant.id}
      coordinate={{
        latitude: Number(restaurant.coordinates.latitude),
        longitude: Number(restaurant.coordinates.longitude),
      }}
      title={restaurant.name}
    />
  ))

  return (
    <Container>
      <MapView style={styles.mapStyle} region={region}>
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
