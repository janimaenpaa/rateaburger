import React, { useContext } from "react"
import { Layout, List, Text } from "@ui-kitten/components"
import { DataContext } from "../../../providers/DataProvider"
import { Burger } from "../../../types"
import { ImageBackground } from "react-native"

interface CarouselProps {}

export const Carousel = () => {
  const { burgers } = useContext(DataContext)
  const latestBurgers = burgers.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  console.log(burgers)
  console.log({ sortedBurger: latestBurgers })

  const renderItem = ({ item }: { item: Burger }) => (
    <ImageBackground
      resizeMode="cover"
      source={{ uri: item.imgUrl }}
      style={{ width: 180, height: 180, margin: 8 }}
      imageStyle={{ borderRadius: 6 }}
    ></ImageBackground>
  )
  return (
    <Layout>
      <List
        data={latestBurgers}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Layout>
  )
}
