import React, { useContext, useEffect, useState } from "react"
import { Layout, List } from "@ui-kitten/components"
import { DataContext } from "../../../providers/DataProvider"
import { Burger } from "../../../types"
import { ImageBackground } from "react-native"

interface CarouselProps {}

export const Carousel: React.FC<CarouselProps> = () => {
  const [sortedBurgers, setSortedBurgers] = useState<Burger[] | null>(null)
  const { burgers } = useContext(DataContext)

  useEffect(() => {
    const sortBurgersByDate = [...burgers].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    setSortedBurgers(sortBurgersByDate)
  }, [])

  const renderItem = ({ item }: { item: Burger }) => (
    <ImageBackground
      key={item.id}
      resizeMode="cover"
      source={{ uri: item.imgUrl }}
      style={{ width: 180, height: 180, margin: 8 }}
      imageStyle={{ borderRadius: 6 }}
    ></ImageBackground>
  )

  if (!sortedBurgers) return <Layout></Layout>

  return (
    <Layout>
      <List
        data={sortedBurgers}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Layout>
  )
}
