import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import React, { useState, useEffect } from "react"
import { traerEquipoById, eliminarEquipo } from "../../api/torneos"
import JWTManager from "../../api/JWTManager"
import Ionicons from "react-native-vector-icons/Ionicons"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import Modal from "react-native-modal"

const jwtManager = new JWTManager()
export default function Equipo(props) {
  const {
    navigation,
    route: { params },
  } = props
  const [equipo, setEquipo] = useState(null)

  const [modalVisible, setModalVisible] = useState(false)
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const eliminar = async () => {
    try {
      const jwt = await jwtManager.getToken()
      if (!jwt) {
        return
      }
      const response = await eliminarEquipo(jwt, equipo.id)
      console.log(response)
      if (response.message == "Equipo desactivado.") {
        navigation.goBack()
      }
    } catch (error) {
      console.error(error)
      navigation.goBack()
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const jwt = await jwtManager.getToken()
        if (!jwt) {
          return
        }
        const response = await traerEquipoById(jwt, params.id)
        setEquipo(response.data.Teams)
      } catch (error) {
        navigation.goBack()
      }
    })()
  }, [params])
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("UpdateEquipos", { id: params.id })
            }
          >
            <Ionicons name="ios-pencil-outline" size={38} color="#1d5bad" />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(true)
            }}
          >
            <Ionicons name="ios-remove-outline" size={38} color="#1d5bad" />
          </TouchableWithoutFeedback>
        </View>
      ),
    })
  }, [equipo])

  if (!equipo) return null

  return (
    <>
      <View style={styles.bg} />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{equipo.name}</Text>
          <View style={styles.infoCel}>
            <Text style={styles.order}>Celular: </Text>
            <Text style={styles.order}>{equipo.cel_phone}</Text>
          </View>
        </View>
        <Text style={styles.name}>{"Email:" + equipo.email}</Text>
        <Text style={styles.name}>Partidos:</Text>
        <View style={styles.body}>
          <Text style={styles.name}>Perdidos</Text>
          <Text style={styles.name}>{equipo.matches_lost}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.name}>Ganados</Text>
          <Text style={styles.name}>{equipo.matches_won}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.name}>Empatados</Text>
          <Text style={styles.name}>{equipo.matches_tied}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.name}>Jugados</Text>
          <Text style={styles.name}>{equipo.matches_played}</Text>
        </View>

        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View style={{ backgroundColor: "white", padding: 20 }}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              ¿Está seguro que desea eliminar al jugador?
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: "red", marginRight: 10 }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await eliminar()
                  setModalVisible(false)
                }}
              >
                <Text style={{ color: "blue" }}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  )
}
const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 400,
    position: "absolute",
    borderBottomEndRadius: 300,
    borderBottomLeftRadius: 300,
    backgroundColor: "#07162a",
    transform: [{ scaleX: 2 }],
  },
  content: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 27,
  },
  order: {
    color: "#fff",
    fontWeight: "bold",
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
    width: 100,
  },
  infoCel: {
    flexDirection: "row",
  },
})
