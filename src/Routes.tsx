import React, { useState, useEffect, useContext } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { ActivityIndicator } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { Container } from "./components/Container"
import { AuthContext } from "./providers/AuthProvider"
import { AppTabs } from "./stacks/AppTabs"
import { AuthStack } from "./stacks/AuthStack"
import { SplashScreen } from "./components/SplashScreen"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { user,  setUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [splashScreen, setSplashScreen] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setSplashScreen(false)
    }, 3000)
  })

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((user) => {
        if (user) {
          setUser(JSON.parse(user))
          console.log(user)
          setLoading(false)
        } else {
          setLoading(false)
        }
      })
      .catch((error) => console.log(error))
  }, [])

  if (splashScreen) return <SplashScreen />

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    )
  }

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  )
}
