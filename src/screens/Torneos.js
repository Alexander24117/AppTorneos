import React, { useEffect } from "react"
import { SafeAreaView, Text, StyleSheet } from "react-native"
import { traerTorneos } from "../api/torneos"
import * as SecureStore from "expo-secure-store"
import TorneosList from "../components/TorneosList"
export default function Torneos() {
  const [torneos, setTorneos] = React.useState([])
  useEffect(() => {
    const getTorneos = async () => {
      const jwt = await SecureStore.getItemAsync("token")
      const response = await traerTorneos(jwt)
      if (response) {
        await setTorneos(response.Torneos)
      }
    }
    getTorneos()
  }, [])

  return (
    <SafeAreaView style={styles.content}>
      <TorneosList torneos={torneos} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  content: {
    marginHorizontal: 0,
    marginTop: 30,
  },
})
