import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native"
import React, { useState, useEffect } from "react"
import {
  traerTorneoById,
  traerDeportess,
  traerTipoTorneo,
  traerTablaPuntosTorneo,
  traerEnfrentamientosPorTorneo,
} from "../api/torneos"
import JWTManager from "../api/JWTManager"
import Ionicons from "react-native-vector-icons/Ionicons"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import TablaPuntos from "./TablaPuntos"
import MatchupTable from "./MatchupTable"
const jwtManager = new JWTManager()

export default function Torneo(props) {
  const {
    navigation,
    route: { params },
  } = props
  const [torneo, setTorneo] = useState(null)
  const [deportes, setDeportes] = useState(null)
  const [tipoTorneo, setTipoTorneo] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [enfrentamientos, setEnfrentamientos] = useState(null)
  useEffect(() => {
    ;(async () => {
      try {
        const jwt = await jwtManager.getToken()
        if (!jwt) {
          return
        }

        const table = await traerTablaPuntosTorneo(jwt, params.id)
        setTableData(table.data.table)
        const enfrentamientosResponse = await traerEnfrentamientosPorTorneo(
          jwt,
          params.id
        )
        setEnfrentamientos(enfrentamientosResponse.Enfrentamientos)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [params])
  useEffect(() => {
    ;(async () => {
      try {
        const jwt = await jwtManager.getToken()
        if (!jwt) {
          return
        }
        const torneoRequest = await traerTorneoById(jwt, params.id)
        const derporteRequest = await traerDeportess(jwt)
        const [torneoResponse, derporteResponse] = await Promise.all([
          torneoRequest,
          derporteRequest,
        ])
        const deportesFiltrados = derporteResponse.sports.map((deporte) => ({
          id: deporte.id,
          name: deporte.name,
        }))
        setTorneo(torneoResponse.data.Tournament)
        setDeportes(deportesFiltrados)
        const tiposTorneoResponse = await traerTipoTorneo(
          jwt,
          torneoResponse.data.Tournament.fk_sports_id
        )

        const tiposTorneoFiltrados = tiposTorneoResponse.data.types.map(
          (tipoTorneo) => ({
            id: tipoTorneo.id,
            name: tipoTorneo.name,
          })
        )

        setTipoTorneo(tiposTorneoFiltrados)
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
          onPress={() => navigation.navigate("UpdateTorneo", { id: params.id })}
        >
          <Ionicons name="ios-pencil-outline" size={38} color="#1d5bad" />
        </TouchableWithoutFeedback>
      ),
    })
  }, [torneo])

  if (!torneo || !deportes || !tipoTorneo || !enfrentamientos) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1d5bad" />
      </View>
    )
  }
  const deporte = deportes.find((d) => d.id === torneo.fk_sports_id)
  const tipoDeTorneo = tipoTorneo.find(
    (d) => d.id === torneo.fk_types_tournament_id
  )
  return (
    <>
      <View style={styles.bg} />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{torneo.name}</Text>
          <Text style={styles.order}>Fecha de Inicio: {torneo.start_date}</Text>
          <Text style={styles.order}>{torneo.sport_name}</Text>
        </View>
        {deporte && <Text style={styles.name}>Deporte: {deporte.name}</Text>}
        {tipoDeTorneo && (
          <Text style={styles.name}>Categoria: {tipoDeTorneo.name}</Text>
        )}
        <View style={styles.spacer}></View>
        {tipoDeTorneo.name === "CLASIFICATORIA" ? (
          <TablaPuntos data={tableData} />
        ) : null}
        <MatchupTable data={enfrentamientos} />
      </SafeAreaView>
    </>
  )
}
const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 280,
    position: "absolute",
    borderBottomEndRadius: 300,
    borderBottomLeftRadius: 300,
    backgroundColor: "#07162a",
    transform: [{ scaleX: 2 }],
  },
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  content: {
    flex: 1,
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    height: "20%", // Ajusta este valor según el espacio deseado
  },
})
