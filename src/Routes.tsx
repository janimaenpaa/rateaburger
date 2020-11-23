import React, { useState, useEffect, useContext } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { ActivityIndicator } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { Layout } from "./components/Layout"
import { AuthContext } from "./providers/AuthProvider"
import { AppTabs } from "./stacks/AppTabs"
import { AuthStack } from "./stacks/AuthStack"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { user, login } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((user) => {
        console.log(user)
        if (user) {
          //do something
          login()
          setLoading(false)
        } else {
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  if (loading) {
    return (
      <Layout>
        <ActivityIndicator size="large" />
      </Layout>
    )
  }

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  )
}
