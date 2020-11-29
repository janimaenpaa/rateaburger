import React, { useEffect, useState } from "react"
import { Layout } from "../../components/Layout"
import { StyleSheet, Alert } from "react-native"
import MapView from "react-native-maps"
import * as Location from "expo-location"

interface MapProps {}

export const Map: React.FC<MapProps> = () => {
  const [region, setRegion] = useState({
    latitude: 60.169877007627676,
    longitude: 24.938366007081427,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  })

  useEffect(() => {
    getPhoneLocation()
  }, [])

  const getPhoneLocation = async () => {
    const { status } = await Location.requestPermissionsAsync()

    if (status === "granted") {
      const phoneLocation = await Location.getCurrentPositionAsync({})

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
  return (
    <Layout>
      <MapView style={styles.mapStyle} region={region} />
    </Layout>
  )
}

const styles = StyleSheet.create({
  mapStyle: {
    width: "100%",
    height: "100%",
  },
})
