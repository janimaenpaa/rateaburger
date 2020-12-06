import React, { useContext, useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Alert, StyleSheet, Image, KeyboardAvoidingView } from "react-native"
import { Text, Input, Button, Layout } from "@ui-kitten/components"
import { Container } from "../../../components/Container"
import { RestaurantNavProps } from "../../../types"
import * as ImagePicker from "expo-image-picker"
import { DataContext } from "../../../providers/DataProvider"

declare global {
  interface FormDataValue {
    uri: string
    name: string
    type: string
  }

  interface FormData {
    append(name: string, value: FormDataValue, fileName?: string): void
    set(name: string, value: FormDataValue, fileName?: string): void
  }
}

export const AddRestaurant = ({
  navigation,
}: RestaurantNavProps<"AddRestaurant">) => {
  const { refetch } = useContext(DataContext)
  const [image, setImage] = useState<any>(null)
  const [uploadedImgUrl, setUploadedImgUrl] = useState<string | null>("")
  const { control, handleSubmit, errors } = useForm()

  const noImg =
    "https://rateaburger.s3.eu-north-1.amazonaws.com/7164666a-a1f0-494a-a9c0-bb669f2d0195"

  const onSubmit = (data: any) => {
    const imgUrl = uploadedImgUrl?.length === 0 ? noImg : uploadedImgUrl

    const restaurant = { ...data, imgUrl: imgUrl }
    console.log(restaurant)

    fetch("https://rateaburger.herokuapp.com/api/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurant),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log({ response: json })
        refetch()
      })
      .then(() => navigation.goBack())
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    ;async () => {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!")
      }
    }
  }, [])

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
                label="Restaurant name"
                placeholder="Restaurant name..."
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="name"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.name && <Text>Restaurant name is required.</Text>}
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Input
                label="Description"
                placeholder="Description..."
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="description"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.description && <Text>Restaurant name is required.</Text>}
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Input
                label="Address"
                placeholder="Streetname 123..."
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="address"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.address && <Text>Restaurant name is required.</Text>}
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
  button: {
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
  },
  layout: {
    margin: 20,
    backgroundColor: "#F7F9FC",
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
})
