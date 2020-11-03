import React from "react"
import * as eva from "@eva-design/eva"
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import { default as theme } from "./theme.json"
import { AuthProvider } from "./src/AuthProvider"
import { Routes } from "./src/Routes"

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ApplicationProvider>
    </>
  )
}

export default App
