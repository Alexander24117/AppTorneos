import React, { useEffect } from "react"
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native"
import EquiposList from "../components/EquiposList"
import { traerEquiposs } from "../api/torneos"
import * as SecureStore from "expo-secure-store"

export default function Equipos({ navigation }) {
  const [equipos, setEquipos] = React.useState([])
  const [refreshing, setRefreshing] = React.useState(false)

  const getEquipos = async () => {
    const jwt = await SecureStore.getItemAsync("token")
    const response = await traerEquiposs(jwt)
    if (response) {
      await setEquipos(response.Teams.filter((e) => e.state !== 0))
    }
  }

  useEffect(() => {
    getEquipos()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getEquipos()
    })

    return unsubscribe
  }, [navigation])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getEquipos().then(() => setRefreshing(false))
  }, [])

  if (equipos.length === 0)
    return (
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )

  return (
    <SafeAreaView style={styles.content}>
      <EquiposList
        equipos={equipos}
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
