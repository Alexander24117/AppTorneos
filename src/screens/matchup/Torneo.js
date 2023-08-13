import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native"
import React, { useState, useEffect } from "react"
import {
  traerTorneoById,
  traerDeportess,
  traerTipoTorneo,
  traerTablaPuntosTorneo,
  traerEnfrentamientosPorTorneo,
  traerEquipoById,
} from "../../api/torneos"
import JWTManager from "../../api/JWTManager"
import Ionicons from "react-native-vector-icons/Ionicons"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import TablaPuntos from "../matchup/TablaPuntos"
import MatchupTable from "../matchup/MatchupTable"
const jwtManager = new JWTManager()

export default function Torneo(props) {
  const {
    navigation,
    route: { params },
  } = props
  
  const [jwt, setJwt] = useState(null)
  const [torneo, setTorneo] = useState(null)
  //console.log('torneo: ', torneo);
  const [idTeamWinner,setIdTeamWinner] = useState(null)
  const [teamWinner, setTeamWinner] = useState(null)
  const [estado, setEstado] = useState("")
  const [deportes, setDeportes] = useState(null)
  const [tipoTorneo, setTipoTorneo] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [enfrentamientos, setEnfrentamientos] = useState(null)
  const [selectedMatchup, setSelectedMatchup] = useState(null)
  const [contador, setContador] = useState(0)
  useEffect(() => {
    ;(async () => {
      try {
        const jwt = await jwtManager.getToken()
        setJwt(jwt)
        if (!jwt) {
          return
        }

        const table = await traerTablaPuntosTorneo(jwt, params.id)
        setTableData(table.data.table)
        setContador(contador + 1)
        const enfrentamientosResponse = await traerEnfrentamientosPorTorneo(
          jwt,
          params.id
        )
        setEnfrentamientos(enfrentamientosResponse.Enfrentamientos)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])
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
        setEstado(params.estado)
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
        if (torneoResponse.data.Tournament.fk_team_id_winner) {
          const equipoGanadorResponse = await traerEquipoById(
            jwt,
            torneoResponse.data.Tournament.fk_team_id_winner
          );
          //console.log(equipoGanadorResponse.data.Teams);
          setTeamWinner(equipoGanadorResponse.data.Teams); 
         //console.log(teamWinner);// Configura el equipo ganador en el estado
        }
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
          onPress={() => navigation.navigate("UpdateTorneos", { id: params.id })}
        >
          <Ionicons
            name="ios-pencil-outline"
            size={38}
            style={{ color: "#1d5bad", marginRight: 10 }}
          />
        </TouchableWithoutFeedback>
      ),
    })
  }, [torneo])

  if (!torneo || !deportes || !tipoTorneo || !enfrentamientos) {
    //console.log(contador, "contador")
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
  const handleMatchupPress = (matchup) => {
    navigation.navigate("MatchupDetails", { jwt: jwt, matchup: matchup, tournament: params.id})
  }
  return (
    <>
      <View style={styles.bg} />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{torneo.name}</Text>
          <Text style={styles.order}>Fecha de Inicio: {torneo.start_date}</Text>
          <Text style={styles.name}>{estado}</Text>
        </View>
        {deporte && <Text style={styles.name}>Deporte: {deporte.name}</Text>}
        {tipoDeTorneo && (
          <Text style={styles.name}>Categoria: {tipoDeTorneo.name}</Text>
        )}
        {teamWinner!==null &&(
          <Text style={styles.name}>Ganador: {teamWinner.name}</Text>
        )}
        <View style={styles.spacer}></View>
        {tipoDeTorneo.name === "CLASIFICATORIA" ? (
          <TablaPuntos data={tableData} />
        ) : null}
        <MatchupTable
          data={enfrentamientos}
          onMatchupPress={handleMatchupPress}
        />

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
  matchup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  team: {
    alignItems: "center",
  },
  teamLogo: {
    width: 50,
    height: 50,
  },
  vsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
})
