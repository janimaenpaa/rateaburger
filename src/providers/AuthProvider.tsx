import React, { useState } from "react"
import AsyncStorage from "@react-native-community/async-storage"

type User = null | { email: string }

export const AuthContext = React.createContext<{
  user: User
  login: () => void
  logout: () => void
}>({
  user: null,
  login: () => {},
  logout: () => {},
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
