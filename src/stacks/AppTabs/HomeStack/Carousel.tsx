import React, { useContext, useEffect, useState } from "react"
import { Layout, List } from "@ui-kitten/components"
import { DataContext } from "../../../providers/DataProvider"
import { Burger } from "../../../types"
import { ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { TouchableHighlight as TouchableWithoutHighlight, TouchableOpacity } from "react-native-gesture-handler"

interface CarouselProps {}

export const Carousel: React.FC<CarouselProps> = () => {
  const [sortedBurgers, setSortedBurgers] = useState<Burger[] | null>(null)
  const { burgers } = useContext(DataContext)
  const navigation = useNavigation()

  useEffect(() => {
    const sortBurgersByDate = [...burgers].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    setSortedBurgers(sortBurgersByDate)
  }, [])

  const renderItem = ({ item }: { item: Burger }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Burger", item)}
    >
      <ImageBackground
        key={item.id}
        resizeMode="cover"
        source={{ uri: item.imgUrl }}
        style={{ width: 180, height: 180, margin: 8 }}
        imageStyle={{ borderRadius: 6 }}
      ></ImageBackground>
    </TouchableOpacity>
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
