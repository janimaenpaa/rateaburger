import React from "react"
import { Icon, Layout } from "@ui-kitten/components"
import { StyleSheet } from "react-native"

interface StarsProps {
  value: number
}

const Star = () => <Icon style={styles.icon} fill="#FFD75E" name="star" />

export const Stars: React.FC<StarsProps> = ({ value }) => {
  return (
    <Layout style={styles.row}>
      {[...Array(value)].map((star, index) => (
        <Star key={index} />
      ))}
    </Layout>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
  row: {
    flexDirection: "row",
  },
})
