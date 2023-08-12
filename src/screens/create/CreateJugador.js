import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Pressable,
  Image,
  TouchableOpacity,
  ToastAndroid
} from "react-native"
import React, { useState, useEffect } from "react"
import {
  crearParticipantes,
  traerEquipoByInsti,
  departamentos,
  ciudadesPorDepartment,
  traerInstituciones,
} from "../../api/torneos"
import { useFormik } from "formik"
import { ScrollView } from "react-native-gesture-handler"
import { SelectList } from "react-native-dropdown-select-list"
import JWTManager from "../../api/JWTManager"
import * as SecureStore from "expo-secure-store"
import * as ImagePicker from "expo-image-picker"
import DateTimePicker from "@react-native-community/datetimepicker"

const jwtManager = new JWTManager()

export default function CreateJugador(props) {
  const {
    onPress,
    title = "Crear Participante",
    title2 = "Seleccionar Foto",
    navigation,
  } = props
  const [infoDepartment, setDataDepartment] = useState([])
  const [infoCiudad, setDataCiudad] = useState([])
  const [selectedDeparment, setSelectedDeparment] = React.useState("")
  const [selectedCiudad, setselectedCiudad] = React.useState("")
  const [image, setImage] = useState(null)

  const [infoEquipos, setDataEquipo] = useState([])
  const [selectedEquipo, setSelectedEquipo] = React.useState("")

  const [infoInstitution, setDataInsti] = useState([])
  const [selectedInsti, setSelectedInsti] = React.useState("")

  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const jwt = await jwtManager.getToken()
      if (!jwt) {
        return
      }
      const response = await departamentos(jwt)
      setDataDepartment(
        response.Departments.map((item) => {
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
    if (!selectedDeparment) {
      return
    }
    const fetchMunicipios = async () => {
      const jwt = await jwtManager.getToken()
      if (!jwt) {
        return
      }
      const response = await ciudadesPorDepartment(jwt, selectedDeparment)
      setDataCiudad(
        response.Cities.map((item) => {
          return {
            key: item.id,
            value: item.name,
          }
        })
      )
    }
    fetchMunicipios()
  }, [selectedDeparment])

  useEffect(() => {
    const traerInsti = async () => {
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
    traerInsti()
  }, [])

  useEffect(() => {
    const traerEquipo = async () => {
      const jwt = await jwtManager.getToken()
      if (!jwt) {
        return
      }
      const response = await traerEquipoByInsti(jwt, selectedInsti)
      setDataEquipo(
        response.data.teams.map((item) => {
          return {
            key: item.team_id,
            value: item.institution_team,
          }
        })
      )
    }
    traerEquipo()
  }, [selectedInsti])

  const handleDepartamentoChange = (departamento) => {
    console.log(selectedDeparment, "depar selected")
    fetchMunicipios(selectedDeparment).then((data) => setMunicipios(data))
  }

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
        values.image_64 = "data:image/png;base64," + result.assets[0].base64
      } else {
        values.image_64 = null
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShowDatePicker(Platform.OS === "ios")
    setDate(currentDate)
  }

  const { values, isSubmitting, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      names: "",
      surnames: "",
      fk_departments_id: "",
      fk_cities_id: "",
      identification: "",
      cel_phone: "",
      email: "",
      date_birth: "",
      team_id: "",
      image_64: "",
      state: 1,
    },
    onSubmit: async (values) => {
      const token = await SecureStore.getItemAsync("token")
      crearParticipantes(token, values)
      ToastAndroid.show('Se Creo el participante', ToastAndroid.SHORT);
    },
  })
  values.fk_departments_id = selectedDeparment
  values.fk_cities_id = selectedCiudad
  values.team_id = selectedEquipo
  values.date_birth = date
  const data = infoCiudad
  return (
    <SafeAreaView>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.bg} />
          <Image
            style={{ width: 350, height: 300, marginBottom: 10 }}
            source={require("../../../assets/logojugadores.png")}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.titulo}>Digite los datos del participante</Text>
          <TextInput
            style={styles.textInput}
            value={values.names}
            onChangeText={(text) => setFieldValue("names", text)}
            placeholder="Nombres"
          />
          <TextInput
            style={styles.textInput}
            value={values.surnames}
            onChangeText={(text) => setFieldValue("surnames", text)}
            placeholder="Apellidos"
          />
          <TextInput
            style={styles.textInput}
            value={values.identification}
            onChangeText={(text) => setFieldValue("identification", text)}
            placeholder="Codigo"
          />
          <TextInput
            style={styles.textInput}
            value={values.cel_phone}
            onChangeText={(text) => setFieldValue("cel_phone", text)}
            placeholder="Telefono"
          />
          <TextInput
            style={styles.textInput}
            value={values.email}
            onChangeText={(text) => setFieldValue("email", text)}
            placeholder="Email"
          />

          {/* <TextInput
            style={styles.textInput}
            value={values.date_birth}
            onChangeText={(text) => setFieldValue("date_birth", text)}
            placeholder="Fecha Nacimiento"
          /> */}

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Fecha de nacimiento:</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.textInputDate}>
                {date.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                placeholderText="AAA"
                onChange={onDateChange}
              />
            )}
          </View>

          <View style={{ paddingVertical: 20, paddingBottom: -10, width: 320 }}>
            <SelectList
              setSelected={(val) => setSelectedDeparment(val)}
              data={infoDepartment}
              save="key"
              inputStyles={{
                marginHorizontal: 40,
                color: "blue",
                backgroundColor: "#ffff",
              }}
              boxStyles={{ borderColor: "blue", backgroundColor: "#ffff" }}
              search={{ placeholder: "aaaaaaaaa" }}
              placeholder="Departamento"
              keyExtractor={(item) => item.key}
            />
          </View>
          {selectedDeparment && (
            <View
              style={{ paddingVertical: 20, paddingBottom: -10, width: 320 }}
            >
              <SelectList
                setSelected={(val) => setselectedCiudad(val)}
                data={infoCiudad}
                save="key"
                inputStyles={{
                  marginHorizontal: 40,
                  color: "blue",
                  backgroundColor: "#ffff",
                }}
                boxStyles={{ borderColor: "blue", backgroundColor: "#ffff" }}
                search={{ marginHorizontal: 40 }}
                placeholder="Ciudad"
              />

              <View
                style={{ paddingVertical: 20, paddingBottom: -10, width: 320 }}
              >
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
                  keyExtractor={(item) => item.key}
                />
              </View>
              <View
                style={{ paddingVertical: 20, paddingBottom: -10, width: 320 }}
              >
                <SelectList
                  setSelected={(val) => setSelectedEquipo(val)}
                  data={infoEquipos}
                  save="key"
                  inputStyles={{
                    marginHorizontal: 40,
                    color: "blue",
                    backgroundColor: "#ffff",
                  }}
                  boxStyles={{ borderColor: "blue", backgroundColor: "#ffff" }}
                  search={{ placeholder: "aaaaaaaaa" }}
                  placeholder="Equipo"
                  keyExtractor={(item) => item.key}
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
            </View>
          )}

          <Pressable style={styles.button} onPress={handleSubmit}>
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
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
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
    backgroundColor: "#003d7c",
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
    fontWeight: "bold",
  },
  scroll: {
    marginHorizontal: 0.1,
    borderRadius: 4,
    color: "blue",
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
  textInputDate: {
    borderWidth: 1,
    borderColor: "blue",
    padding: 10,
    paddingStart: 25,
    width: 110,
    height: 50,
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    marginTop: 15,
    fontSize: 15,
    width: 100,
    color: "gray",
  },
})
