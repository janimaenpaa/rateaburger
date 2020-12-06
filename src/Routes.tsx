import React, { useState, useEffect, useContext } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { ActivityIndicator } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { Container } from "./components/Container"
import { AuthContext } from "./providers/AuthProvider"
import { AppTabs } from "./stacks/AppTabs"
import { AuthStack } from "./stacks/AuthStack"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { user, setUserFromStorage, setUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

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
