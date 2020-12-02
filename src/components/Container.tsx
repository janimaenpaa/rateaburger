import React from "react"
import { Layout } from "@ui-kitten/components"
import { ViewStyle } from "react-native"

interface ContainerProps {
  children?: React.ReactNode
  style?: React.CSSProperties
}

export const Container: React.FC<ContainerProps> = ({ children, style }) => {
  const styles = {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F7F9FC",
    ...style,
  } as ViewStyle
  return <Layout style={styles}>{children}</Layout>
}
