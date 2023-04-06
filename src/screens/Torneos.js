import React, { useEffect } from "react"
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  RefreshControl,
} from "react-native"
import { traerTorneos } from "../api/torneos"
import * as SecureStore from "expo-secure-store"
import TorneosList from "../components/TorneosList"
export default function Torneos({ navigation }) {
  const [torneos, setTorneos] = React.useState([])
  const [refreshing, setRefreshing] = React.useState(false)
  const getTorneos = async () => {
    const jwt = await SecureStore.getItemAsync("token")
    const response = await traerTorneos(jwt)
    if (response) {
      await setTorneos(response.Torneos)
    }
  }
  getTorneos()
  useEffect(() => {
    getTorneos()
  }, [])
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTorneos()
    })

    // Limpia la suscripción al desmontar el componente
    return unsubscribe
  }, [navigation])
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getTorneos().then(() => setRefreshing(false))
  }, [])
  if (torneos.length === 0)
    return (
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  return (
    <SafeAreaView style={styles.content}>
      <TorneosList
        torneos={torneos}
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
  },
})
