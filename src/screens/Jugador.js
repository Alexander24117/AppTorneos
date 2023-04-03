import { View, Text, SafeAreaView, StyleSheet } from "react-native"
import React, { useState, useEffect } from "react"
import { traerJugadorById } from "../api/torneos"
import JWTManager from "../api/JWTManager"
import Ionicons from "react-native-vector-icons/Ionicons"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
const jwtManager = new JWTManager()

export default function Jugador(props) {
  const {
    navigation,
    route: { params },
  } = props
  const [jugador, setJugador] = useState(null)
  useEffect(() => {
    ;(async () => {
      try {
        const jwt = await jwtManager.getToken()
        if (!jwt) {
          return
        }
        const response = await traerJugadorById(jwt, params.id)
        setJugador(response.data.Participants)
      } catch (error) {
        console.error(error)
        navigation.goBack()
      }
    })()
  }, [params])
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("UpdateJugador", { id: params.id })
          }
        >
          <Ionicons name="ios-pencil-outline" size={38} color="#1d5bad" />
        </TouchableWithoutFeedback>
      ),
    })
  }, [jugador])
  if (!jugador) return null
  return (
    <>
      <View style={styles.bg} />
      <SafeAreaView style={styles.content}>
        <View style={styles.content}>
          <Text style={styles.name}> {jugador.surnames}</Text>
          <Text style={styles.name}> {jugador.names}</Text>
          <Text style={styles.name}> {jugador.email}</Text>
          <Text style={styles.name}> {jugador.cel_phone}</Text>
          <Text style={styles.name}> {jugador.identification}</Text>
        </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
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
})
