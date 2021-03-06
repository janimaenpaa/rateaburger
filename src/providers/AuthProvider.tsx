import React, { useState } from "react"
import AsyncStorage from "@react-native-community/async-storage"
import { SignupData } from "../types"

type User = null | {
  email: string
  password: string
  id?: string
  firstName?: string
  lastName?: string
}

export const AuthContext = React.createContext<{
  user: User
  login: (user: User) => void
  logout: () => void
  signup: (data: SignupData) => void
  setUser: React.Dispatch<React.SetStateAction<User>>
}>({
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
  setUser: () => {},
})

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: (user: User) => {
          fetch("https://rateaburger.herokuapp.com/api/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          })
            .then((response) => response.json())
            .then((response) => {
              if (response.token) {
                console.log(response)
                setUser(response)
                AsyncStorage.setItem("user", JSON.stringify(response))
              } else {
                console.log(response)
              }
            })
            .catch((error) => console.log(error))
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
