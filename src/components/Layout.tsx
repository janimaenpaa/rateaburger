import React from "react"
import { Layout as KittenUILayout } from "@ui-kitten/components"

interface CenterProps {}

export const Layout: React.FC<CenterProps> = ({ children }) => {
  return (
    <KittenUILayout
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      {children}
    </KittenUILayout>
  )
}
