import React, { useState } from "react"
import AsyncStorage from "@react-native-community/async-storage"
import { SignupData } from "../types"

type User = null | { email: string }

export const AuthContext = React.createContext<{
  user: User
  login: () => void
  logout: () => void
  signup: (data: SignupData) => void
}>({
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
})

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null)
  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => {
          const testUser = { email: "matti@abc.com" }
          setUser(testUser)
          AsyncStorage.setItem("user", JSON.stringify(testUser))
        },
        logout: () => {
          setUser(null)
          AsyncStorage.removeItem("user")
        },
        signup: (data: SignupData) => {
          fetch("https://rateaburger.herokuapp.com/api/users", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((error) => console.log(error))
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
