import React from "react"
import { AuthProvider } from "./src/AuthProvider"
import { Routes } from "./src/Routes"

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App
