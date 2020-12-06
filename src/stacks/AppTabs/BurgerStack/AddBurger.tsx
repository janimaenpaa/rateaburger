import React, { useContext, useEffect, useState } from "react"
import { BurgerNavProps, Patty } from "../../../types"
import { useForm, Controller } from "react-hook-form"
import { Image, KeyboardAvoidingView, StyleSheet } from "react-native"
import { Button, Input, Layout, Text } from "@ui-kitten/components"
import { Container } from "../../../components/Container"
import { DataContext } from "../../../providers/DataProvider"
import { Picker } from "@react-native-picker/picker"
import * as ImagePicker from "expo-image-picker"

export const AddBurger = ({ navigation }: BurgerNavProps<"AddBurger">) => {
  const { restaurants, refetch } = useContext(DataContext)
  const [image, setImage] = useState<any>(null)
  const [uploadedImgUrl, setUploadedImgUrl] = useState<string | null>("")
  const { control, handleSubmit, errors } = useForm()

  const noImg =
    "https://rateaburger.s3.eu-north-1.amazonaws.com/7164666a-a1f0-494a-a9c0-bb669f2d0195"

  useEffect(() => {
    ;async () => {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!")
      }
    }
  }, [])
  const onSubmit = (data: any) => {
    const imgUrl = uploadedImgUrl?.length === 0 ? noImg : uploadedImgUrl

    const burger = { ...data, imgUrl: imgUrl }
    console.log(burger)

    fetch("https://rateaburger.herokuapp.com/api/burgers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(burger),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        refetch()
      })
      .then(() => navigation.goBack())
      .catch((error) => console.log(error))
  }

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
      const formData = new FormData()

      const randomName = Math.floor(Math.random() * 1000000)

      formData.append("file", {
        uri: result.uri,
        type: "image/jpeg",
        name: String(randomName + ".jpg"),
      })

      console.log(formData)

      fetch("https://rateaburger.herokuapp.com/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setUploadedImgUrl(json.imgUrl)
        })
        .catch((error) => console.log(error))
    }
  }
  return (
    <Container>
      <Layout style={styles.layout}>
        <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={150}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Input
                style={styles.input}
                label="Burger"
                placeholder="Burger name here..."
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="name"
            defaultValue=""
            rules={{ required: true }}
          />
          {errors.name && (
            <Text style={{ marginBottom: 10 }} status="danger">
              Burger name is required.
            </Text>
          )}

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Input
                style={styles.input}
                label="Description"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="description"
            defaultValue=""
            rules={{ required: true }}
          />
          {errors.description && (
            <Text style={{ marginBottom: 10 }} status="danger">
              Description is required.
            </Text>
          )}

          <Text style={{ marginBottom: 3 }} category="c2" appearance="hint">
            Patty
          </Text>
          <Controller
            control={control}
            render={({ onChange, value, ref }) => (
              <Layout style={styles.select}>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  ref={ref}
                >
                  <Picker.Item label="Beef" value="beef" />
                  <Picker.Item label="Chicken" value="chicken" />
                  <Picker.Item label="Fish" value="fish" />
                  <Picker.Item label="Veggie" value="veggie" />
                </Picker>
              </Layout>
            )}
            name="patty"
            defaultValue="beef"
            rules={{ required: true }}
          />
          {errors.patty && (
            <Text style={{ marginBottom: 10 }} status="danger">
              Patty is required.
            </Text>
          )}

          <Text style={{ marginBottom: 3 }} category="c2" appearance="hint">
            Restaurant
          </Text>
          <Controller
            control={control}
            render={({ onChange, value, ref }) => (
              <Layout style={styles.select}>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  ref={ref}
                >
                  {restaurants.map((restaurant) => (
                    <Picker.Item
                      key={restaurant.id}
                      label={restaurant.name}
                      value={restaurant.name}
                    />
                  ))}
                </Picker>
              </Layout>
            )}
            name="restaurant"
            defaultValue={restaurants[0].name || ""}
            rules={{ required: true }}
          />
          {errors.restaurant && (
            <Text style={{ marginBottom: 10 }} status="danger">
              Restaurant is required.
            </Text>
          )}
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Image source={{ uri: noImg }} style={styles.image} />
          )}
          <Button status="info" onPress={handleImageUpload}>
            Add Image
          </Button>

          <Button style={styles.button} onPress={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </KeyboardAvoidingView>
      </Layout>
    </Container>
  )
}

const styles = StyleSheet.create({
  layout: {
    margin: 20,
    backgroundColor: "#F7F9FC",
  },
  select: {
    borderWidth: 1,
    borderColor: "#ebeff5",
    borderRadius: 4,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  button: {
    marginTop: 10,
  },
})
