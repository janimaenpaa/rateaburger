import React, { useContext, useEffect, useState } from "react"
import { Layout, List, Text } from "@ui-kitten/components"
import { DataContext } from "../../../providers/DataProvider"
import { Burger } from "../../../types"
import { ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"

interface CarouselProps {}

export const Carousel: React.FC<CarouselProps> = () => {
  const [sortedBurgers, setSortedBurgers] = useState<Burger[] | null>(null)
  const { burgers } = useContext(DataContext)
  const navigation = useNavigation()

  useEffect(() => {
    const sortBurgersByDateAndShow4Latest = [...burgers]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4)

    setSortedBurgers(sortBurgersByDateAndShow4Latest)
  }, [burgers])

  const renderItem = ({ item }: { item: Burger }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Burger", item)}>
      <ImageBackground
        key={item.id}
        resizeMode="cover"
        source={{ uri: item.imgUrl }}
        style={{
          width: 180,
          height: 180,
          margin: 8,
          justifyContent: "flex-end",
        }}
        imageStyle={{ borderRadius: 6 }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: "#000000a0",
            padding: 10,
            borderRadius: 6,
          }}
        >
          {item.name}
        </Text>
      </ImageBackground>
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
