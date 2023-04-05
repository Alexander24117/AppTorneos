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
import { ScrollView } from "react-native-gesture-handler"
import { SelectList } from "react-native-dropdown-select-list"
import { departamentos, ciudades, traerJugadorById, ActuJugador } from "../../api/torneos"
import JWTManager from "../../api/JWTManager"
import * as ImagePicker from "expo-image-picker";

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
  const [infoCiudad, setDataCiudad] = useState(null)
  const [selected, setSelected] = React.useState("")
  const [selectedCiudad, setselectedCiudad] = React.useState("")
  const [image, setImage] = useState(null);
  let [jugador, setJugador] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const jwt = await jwtManager.getToken()
      if (!jwt) {
        return
      }
      const response = await departamentos(jwt)
      setData(
        response.Departments.map((item) => {
          return {
            key: item.id,
            value: item.name,
          }
        })
      )
      const responseCiudad = await ciudades(jwt)
      setDataCiudad(
        responseCiudad.Cities.map((item) => {
          return {
            key: item.id,
            value: item.name,
            idDepa: item.fk_departments_id,
          }
        })
      )
    }
    fetchData()
  }, [])
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
        image_64: response.data.Participants.image_path
      })
      console.log(response.data.Participants)
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

  const onChangeName = (value) => {
    setJugador({ ...jugador, names: value });
  };

  const onChangeSurName = (value) => {
    setJugador({ ...jugador, surnames: value });
  };

  const onChangePhone = (value) => {
    setJugador({ ...jugador, cel_phone: value });
  };

  const onChangeEmail = (value) => {
    setJugador({ ...jugador, email: value });
  };

  const onChangeIdentification = (value) => {
    setJugador({ ...jugador, identification: value });
  };
  
  const onChangeDateBirth = (value) => {
    setJugador({ ...jugador, date_birth: value });
  };

  const onChangeImage = (value) => {
    setJugador({ ...jugador, image_64: value });
  };

  const updateData = async ()=> {
    const jwt = await jwtManager.getToken();
      if (!jwt) {
        return;
      }
      console.log(jugador);
      const response = ActuJugador(jwt, jugador)
     console.log(jugador);
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

          <Text style={styles.titulo}>Digite los datos</Text>
          <TextInput
            style={styles.textInput}
            value={jugador.names}
            onChangeText={(text) => onChangeName("names", text)}
            placeholder="Nombres"
          />
          <TextInput
            style={styles.textInput}
            value={jugador.surnames}
            onChangeText={(text) => onChangeSurName("surnames", text)}
            placeholder="Apellidos"
          />
          <TextInput
            style={styles.textInput}
            value={jugador.identification}
            onChangeText={(text) => onChangeIdentification("identification", text)}
            placeholder="identificacion"
          />
          <TextInput
            style={styles.textInput}
            value={jugador.cel_phone}
            onChangeText={(text) => onChangePhone("cel_phone", text)}
            placeholder="Telefono"
          />
          <TextInput
            style={styles.textInput}
            value={jugador.email}
            onChangeText={(text) => onChangeEmail("email", text)}
            placeholder="Email"
          />

          <TextInput
            style={styles.textInput}
            value={jugador.date_birth}
            onChangeText={(text) => onChangeDateBirth("date_birth", text)}
            placeholder="Fecha Nacimiento"
          />

          <View style={{ paddingVertical: 20, paddingBottom: -10, width: 320 }}>
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={listdepartamentos}
              save="key"
              inputStyles={{
                marginHorizontal: 40,
                color: "blue",
                backgroundColor: "#ffff",
              }}
              boxStyles={{ borderColor: "blue", backgroundColor: "#ffff" }}
              search={{ placeholder: "aaaaaaaaa" }}
              placeholder="Departamento"
            />
          </View>

          <View style={{ paddingVertical: 20, paddingBottom: -10, width: 320 }}>
            <SelectList
              setSelected={(val) => setselectedCiudad(val)}
              data={data}
              save="value"
              inputStyles={{
                marginHorizontal: 40,
                color: "blue",
                backgroundColor: "#ffff",
              }}
              boxStyles={{ borderColor: "blue", backgroundColor: "#ffff" }}
              search={{ marginHorizontal: 40 }}
              placeholder="Ciudad"
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
})
