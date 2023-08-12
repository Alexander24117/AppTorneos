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
import { ScrollView } from "react-native-gesture-handler"
import { SelectList } from "react-native-dropdown-select-list"
import { departamentos, ciudades, traerJugadorById, ActuJugador, ciudadesPorDepartment,} from "../../api/torneos"
import JWTManager from "../../api/JWTManager"
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker"

const jwtManager = new JWTManager()

export default function UpdateJugador(props) {
  const {
    onPress,
    title = "Actualizar Participante",
    title2 = "Seleccionar Foto",
    navigation,
    route: { params },
  } = props
  const [info, setData] = useState(null)
  const [infoDepartment, setDataDepartment] = useState([])
  const [infoCiudad, setDataCiudad] = useState([])
  const [image, setImage] = useState(null);

  const [selectedDeparment, setSelectedDeparment] = React.useState("")
  const [selectedCiudad, setselectedCiudad] = React.useState("")

  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  let [jugador, setJugador] = useState({});
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const jwt = await jwtManager.getToken()
  //     if (!jwt) {
  //       return
  //     }
  //     const response = await departamentos(jwt)
  //     setData(
  //       response.Departments.map((item) => {
  //         return {
  //           key: item.id,
  //           value: item.name,
  //         }
  //       })
  //     )
  //     const responseCiudad = await ciudades(jwt)
  //     setDataCiudad(
  //       responseCiudad.Cities.map((item) => {
  //         return {
  //           key: item.id,
  //           value: item.name,
  //           idDepa: item.fk_departments_id,
  //         }
  //       })
  //     )
  //   }
  //   fetchData()
  // }, [])
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

  const handleDepartamentoChange = (departamento) => {
    console.log(selectedDeparment, "depar selected")
    fetchMunicipios(selectedDeparment).then((data) => setMunicipios(data))
  }

  useEffect(() => {
    const fetchJugador = async () => {
      const jwt = await jwtManager.getToken()
      if (!jwt) {
        return
      }
      const response = await traerJugadorById(jwt, params.id)
      
      setJugador({
        id: response.data.Participants.id,
        names: response.data.Participants.names,
        surnames: response.data.Participants.surnames,
        fk_departments_id: response.data.Participants.fk_departments_id,
        fk_cities_id: response.data.Participants.fk_cities_id,
        identification: response.data.Participants.identification,
        cel_phone: response.data.Participants.cel_phone,
        email: response.data.Participants.email,
        date_birth: response.data.Participants.date_birth,
        state: response.data.Participants.state,
        image_64: ""
      })
      // console.log(response.data.Participants)
    }
    fetchJugador()
  }, [params])

  const listdepartamentos = info

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        onChangeImage("data:image/png;base64," + result.assets[0].base64)
      } else {
        jugador.image_64 = null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const onChangeName = (value) => {
  //   setJugador({ ...jugador, names: value });
  // };

  // const onChangeSurName = (value) => {
  //   setJugador({ ...jugador, surnames: value });
  // };

  // const onChangePhone = (value) => {
  //   setJugador({ ...jugador, cel_phone: value });
  // };

  // const onChangeEmail = (value) => {
  //   setJugador({ ...jugador, email: value });
  // };

  // const onChangeIdentification = (value) => {
  //   setJugador({ ...jugador, identification: value });
  // };
  
  // const onChangeDateBirth = (value) => {
  //   setJugador({ ...jugador, date_birth: value });
  // };

  // const onChangeImage = (value) => {
  //   setJugador({ ...jugador, image_64: value });
  // };

  const onChangeField = (field, value) => {
    setJugador((jugador) => ({
      ...jugador,
      [field]: value,
    }));
  };

  const updateData = async ()=> {
    const jwt = await jwtManager.getToken();
      if (!jwt) {
        return;
      }
      console.log(jugador);
      const response = ActuJugador(jwt, jugador)
      console.log(response)
     ToastAndroid.show('Se Actualizó el participante', ToastAndroid.SHORT);

 }

 const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShowDatePicker(Platform.OS === "ios")
    setDate(currentDate)


    setJugador({ ...jugador, date_birth: currentDate });
  }

  const data = infoCiudad
  return (
    <SafeAreaView>
      <ScrollView style={styles.scroll}>
      <View  style={styles.container}  >
      <View style={styles.bg} />
      <Image
            style={{ width: 350, height: 300, marginBottom: 10 }}
            source={require("../../../assets/logojugadores.png")}
          />
      </View>
    <View  style={styles.container}  >

    <TextInput
  style={styles.textInput}
  value={jugador.names}
  onChangeText={(text) => onChangeField("names", text)}
  placeholder="Nombres"
/>
<TextInput
  style={styles.textInput}
  value={jugador.surnames}
  onChangeText={(text) => onChangeField("surnames", text)}
  placeholder="Apellidos"
/>
<TextInput
  style={styles.textInput}
  value={jugador.identification}
  onChangeText={(text) => onChangeField("identification", text)}
  placeholder="Identificación"
/>
<TextInput
  style={styles.textInput}
  value={jugador.cel_phone}
  onChangeText={(text) => onChangeField("cel_phone", text)}
  placeholder="Teléfono"
/>
<TextInput
  style={styles.textInput}
  value={jugador.email}
  onChangeText={(text) => onChangeField("email", text)}
  placeholder="Email"
/>

          {/* <TextInput
            style={styles.textInput}
            value={jugador.date_birth}
            onChangeText={(text) => onChangeDateBirth("date_birth", text)}
            placeholder="Fecha Nacimiento"
          /> */}
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Fecha de nacimiento:</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.textInputDate}>{date.toLocaleDateString()}</Text>
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
          </View>)}

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
    marginBottom:20,
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
    marginTop:15,
    fontSize: 15,
    width: 100,
    color:"gray"
  },
})
