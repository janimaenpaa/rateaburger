import React from "react"
import * as eva from "@eva-design/eva"
import { ApplicationProvider } from "@ui-kitten/components"
import { default as theme } from "./theme.json"
import { AuthProvider } from "./src/AuthProvider"
import { Routes } from "./src/Routes"

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ApplicationProvider>
  )
}

export default App
