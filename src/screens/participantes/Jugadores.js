import { SafeAreaView, StyleSheet, ActivityIndicator, View } from "react-native"
import React, { useEffect } from "react"
import { traerJugadores } from "../../api/torneos"
import JugadoresList from "../../components/lists/JugadoresList"
import * as SecureStore from "expo-secure-store"

export default function Jugadores({ navigation }) {
  const [jugadores, setJugadores] = React.useState([])
  const [refreshing, setRefreshing] = React.useState(false)
  const getJugadores = async () => {
    const jwt = await SecureStore.getItemAsync("token")
    const response = await traerJugadores(jwt)
    const jugadoresActivos = response.Participants.filter(
      (jugador) => jugador.state == 1
    );
    if (response) {
      

      setJugadores(jugadoresActivos)
    }

    setJugadores(jugadoresActivos)
  }
  useEffect(() => {
    getJugadores()
  }, [])
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Llama a la función para actualizar la lista de equipos aquí
      getJugadores()
    })

    // Limpia la suscripción al desmontar el componente
    return unsubscribe
  }, [navigation])
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getJugadores().then(() => setRefreshing(false))
  }, [])
  if (jugadores.length === 0)
    return (
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  return (
    <SafeAreaView style={styles.content}>
      <JugadoresList
        jugadores={jugadores}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  content: {
    marginHorizontal: 0,
    marginTop: 30,
    backgroundColor: "#FFFFF",
  },
})
