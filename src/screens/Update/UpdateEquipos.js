import { ScrollView } from "react-native-gesture-handler"
import { SelectList } from "react-native-dropdown-select-list"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native"
import React, { useState, useEffect } from "react"
import {
  ActuEquipo,
  traerInstituciones,
  traerEquipoById,
} from "../../api/torneos"
import JWTManager from "../../api/JWTManager"
import * as ImagePicker from "expo-image-picker"

const jwtManager = new JWTManager()
export default function UpdateEquipos(props) {
  const {
    onPress,
    title = "Actualizar Equipo",
    title2 = "Seleccionar Foto",
    navigation,
    route: { params },
  } = props
  const [selectedInsti, setSelectedInsti] = React.useState("")
  const [infoInstitution, setDataInsti] = useState([])
  const [image, setImage] = useState(null)
  let [equipo, setEquipo] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const jwt = await jwtManager.getToken()
      if (!jwt) {
        return
      }
      const response = await traerInstituciones(jwt)
      setDataInsti(
        response.Institutions.map((item) => {
          return {
            key: item.id,
            value: item.name,
          }
        })
      )
    }
    fetchData()
  }, [])
  useEffect(() => {
    const traerEquipo = async () => {
      const jwt = await jwtManager.getToken()
      if (!jwt) {
        return
      }
      const response = await traerEquipoById(jwt, params.id)
      console.log(response.data.Teams)
      setEquipo({
        id: response.data.Teams.id,
        name: response.data.Teams.name,
        fk_institutions_id: response.data.Teams.fk_institutions_id,
        cel_phone: response.data.Teams.cel_phone,
        landline: response.data.Teams.landline,
        email: response.data.Teams.email,
        matches_played: response.data.Teams.matches_played,
        matches_won: response.data.Teams.matches_won,
        matches_tied: response.data.Teams.matches_tied,
        matches_lost: response.data.Teams.matches_lost,
        image_64: response.data.Teams.image_path,
      })
    }
    traerEquipo()
  }, [])
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      })
      if (!result.canceled) {
        setImage(result.assets[0].uri)
        onChangeImage("data:image/png;base64," + result.assets[0].base64)
      } else {
        equipo.image_64 = null
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onChangeName = (value) => {
    setEquipo({ ...equipo, name: value })
  }

  const onChangePhone = (value) => {
    setEquipo({ ...equipo, cel_phone: value })
  }

  const onChangeLandline = (value) => {
    setEquipo({ ...equipo, landline: value })
  }

  const onChangeEmail = (value) => {
    setEquipo({ ...equipo, email: value })
  }

  const onChangeImage = (value) => {
    setEquipo({ ...equipo, image_64: value })
  }

  const updateData = async () => {
    const jwt = await jwtManager.getToken()
    if (!jwt) {
      return
    }
    console.log(equipo)
    const response = ActuEquipo(jwt, equipo)
    console.log(equipo)
  }

  // const { values, isSubmitting, setFieldValue, handleSubmit } = useFormik({
  //   initialValues: {
  //     name: "",
  //     fk_institutions_id: "",
  //     cel_phone: "",
  //     landline: "",
  //     email: "",
  //     matches_played: 0,
  //     matches_won: 0,
  //     matches_tied: 0,
  //     matches_lost: 0,
  //     state: 1,
  //     image_64: "",
  //   },
  //   onSubmit: async (values) => {
  //     console.log(values);
  //     //const token = await SecureStore.getItemAsync("token");
  //     //crearEquipo(token, values);
  //   },
  // });
  equipo.fk_institutions_id = selectedInsti
  return (
    <SafeAreaView>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.bg} />
          <Image
            style={{ width: 350, height: 300, marginBottom: 10 }}
            source={require("../../../assets/equipo.png")}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.titulo}>Digite los datos</Text>

          <TextInput
            style={styles.textInput}
            value={equipo.name}
            onChangeText={(value) => onChangeName(value)}
            placeholder="Nombre"
          />

          <TextInput
            style={styles.textInput}
            value={equipo.cel_phone}
            onChangeText={(value) => onChangePhone(value)}
            placeholder="Telefono"
          />

          <TextInput
            style={styles.textInput}
            value={equipo.landline}
            onChangeText={(value) => onChangeLandline(value)}
            placeholder="landline"
          />

          <TextInput
            style={styles.textInput}
            value={equipo.email}
            onChangeText={(value) => onChangeEmail(value)}
            placeholder="Email"
          />

          <View style={{ paddingVertical: 20, paddingBottom: -10, width: 320 }}>
            <SelectList
              setSelected={(val) => setSelectedInsti(val)}
              data={infoInstitution}
              save="key"
              inputStyles={{
                marginHorizontal: 40,
                color: "blue",
                backgroundColor: "#ffff",
              }}
              boxStyles={{ borderColor: "blue", backgroundColor: "#ffff" }}
              search={{ placeholder: "aaaaaaaaa" }}
              placeholder="Institucion"
            />
          </View>

          <View style={styles.FotoButton}>
            <Pressable style={styles.button} onPress={pickImage}>
              <Text style={styles.text}>{title2}</Text>
            </Pressable>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200, borderRadius: 20 }}
              />
            )}
          </View>

          <Pressable style={styles.button} onPress={updateData}>
            <Text style={styles.text}>{title}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 30,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "blue",
    padding: 10,
    paddingStart: 25,
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#074CBD",
    borderRadius: 25,
    width: "80%",
    height: 50,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  titulo: {
    fontSize: 20,
  },
  scroll: {
    marginHorizontal: 0.1,
  },
  FotoButton: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bg: {
    width: "100%",
    height: 400,
    position: "absolute",
    borderBottomEndRadius: 300,
    borderBottomLeftRadius: 300,
    backgroundColor: "#003d7c",
    transform: [{ scaleX: 2 }],
  },
})
