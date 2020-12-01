import React from "react"
import { Layout as KittenUILayout } from "@ui-kitten/components"
import Constants from "expo-constants"
import { StyleProp, ViewStyle } from "react-native"

interface LayoutProps {
  children?: React.ReactNode
  style?: React.CSSProperties
}

export const Layout: React.FC<LayoutProps> = ({ children, style }) => {
  const styles = {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F7F9FC",
    ...style,
  } as ViewStyle
  return <KittenUILayout style={styles}>{children}</KittenUILayout>
}
