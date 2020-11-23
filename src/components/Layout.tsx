import React from "react"
import { Layout as KittenUILayout } from "@ui-kitten/components"
import Constants from "expo-constants"

interface CenterProps {}

export const Layout: React.FC<CenterProps> = ({ children }) => {
  return (
    <KittenUILayout
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: Constants.statusBarHeight,
      }}
    >
      {children}
    </KittenUILayout>
  )
}
