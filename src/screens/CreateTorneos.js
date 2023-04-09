import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import {
  traerDeportess,
  traerTipoTorneo,
  traerInstituciones,
  traerEquiposPorInstitucion,
  calcularPartidos,
  crearTorneo,
} from "../api/torneos"
import { SelectList } from "react-native-dropdown-select-list"
import JWTManager from "../api/JWTManager"
const jwtManager = new JWTManager()
import MatchupList from "./MatchupList"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import Ionicons from "react-native-vector-icons/Ionicons"
export default function CreateTorneos() {
  const [jwt, setJwt] = useState("")
  const [nombreTorneo, setNombreTorneo] = useState("")
  const [deporteSeleccionado, setDeporteSeleccionado] = useState("")
  const [tipoTorneo, setTipoTorneo] = useState("")
  const [deportes, setDeportes] = useState([])
  const [tiposTorneos, setTiposTorneos] = useState([])
  const [institucionSeleccionada, setInstitucionSeleccionada] = useState(null)
  const [equipos, setEquipos] = useState([])
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null)
  const [equiposAgregados, setEquiposAgregados] = useState([])
  const [institucionesList, setInstitucionesList] = useState([])
  const [equiposList, setEquiposList] = useState([])
  const [matchups, setMatchups] = useState([])
  const [etapas, setEtapas] = useState([])
  const [etapaSeleccionada, setEtapaSeleccionada] = useState(null)
  useEffect(() => {
    if (tipoTorneoSeleccionado === "clasificatoria") {
      const fetchEtapas = async () => {
        try {
          const response = await calcularEtapaClasificatoria(jwt, numEquipos)
          const etapasData = response.stages.map((etapa) => ({
            key: etapa.id,
            value: etapa.name,
          }))
          setEtapas(etapasData)
        } catch (error) {
          console.log(error)
        }
      }
      fetchEtapas()
    }
  }, [tipoTorneoSeleccionado, jwt, numEquipos])

  const calcularEnfrentamientos = async () => {
    const response = await calcularPartidos(
      jwt,
      tipoTorneo,
      equiposAgregados.map((e) => e.key)
    )
    // const modifiedMatchups = response.data.data.matchups.map((matchup) => {
    //   return [
    //     {
    //       team_id: matchup[0].team_id,
    //       team_name: matchup[0].team_name,
    //       institution_id: matchup[0].institution_id,
    //       institution_name: matchup[0].institution_name,
    //       img_64: "", // Puedes mantener la clave pero dejarla vacía
    //     },
    //     {
    //       team_id: matchup[1].team_id,
    //       team_name: matchup[1].team_name,
    //       institution_id: matchup[1].institution_id,
    //       institution_name: matchup[1].institution_name,
    //       img_64: "", // Puedes mantener la clave pero dejarla vacía
    //     },
    //   ]
    // })

    setMatchups(response.data.data.matchups)
  }
  useEffect(() => {
    async function fetchData() {
      const instituciones = await traerInstituciones(jwt)
      if (instituciones.status === 200) {
        setInstitucionesList(
          instituciones.Institutions.map((inst) => ({
            key: inst.id,
            value: inst.name,
          }))
        )
      }
    }
    fetchData()
  }, [])
  useEffect(() => {
    async function fetchData() {
      if (institucionSeleccionada) {
        const equipos = await traerEquiposPorInstitucion(
          jwt,
          institucionSeleccionada,
          equiposAgregados
        )
        if (equipos.status === 200) {
          setEquiposList(
            equipos.data.Teams.map((equipo) => ({
              key: equipo.team_id,
              value: equipo.team_name,
            }))
          )
        }
      }
    }
    fetchData()
  }, [institucionSeleccionada, equiposAgregados])

  const handleInstitucionSeleccionada = (val) => {
    setInstitucionSeleccionada(val)
    traerEquiposPorInstitucion(jwt, val, equiposAgregados)
      .then((data) => {
        setEquipos(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const agregarEquipo = () => {
    if (equipoSeleccionado) {
      const equipo = equiposList.find((e) => e.key === equipoSeleccionado)
      setEquiposAgregados([...equiposAgregados, equipo])
      const equiposRestantes = equiposList.filter(
        (e) => e.key !== equipoSeleccionado
      )
      setEquipos(equiposRestantes)
      setEquipoSeleccionado(null)
    }
  }

  const quitarEquipo = (id) => {
    const equipo = equiposAgregados.find((e) => e.key === id)
    setEquipos([...equipos, equipo])
    const nuevosEquiposAgregados = equiposAgregados.filter((e) => e.key !== id)
    setEquiposAgregados(nuevosEquiposAgregados)
  }

  const obtenerDeportes = async () => {
    const token = await jwtManager.getToken()
    setJwt(token)
    const deportesData = await traerDeportess(token)
    if (deportesData.status === 200) {
      setDeportes(deportesData.sports)
    }
  }
  const obtenerTipoTorneos = async (tipoTorneo) => {
    const tiposTorneoData = await traerTipoTorneo(jwt, tipoTorneo)
    if (tiposTorneoData.data.status === 200) {
      setTiposTorneos(tiposTorneoData.data.types)
    }
  }
  useEffect(() => {
    obtenerDeportes()
  }, [])
  const handleDeporteSeleccionado = (itemValue) => {
    setDeporteSeleccionado(itemValue)
    obtenerTipoTorneos(itemValue)
  }
  const deportesList = deportes.map((deporte) => ({
    key: deporte.id,
    value: deporte.name,
  }))

  const tiposTorneosList = tiposTorneos.map((tipo) => ({
    key: tipo.id,
    value: tipo.name,
  }))

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del Torneo:</Text>
      <TextInput
        style={[styles.input, { borderColor: "blue" }]}
        value={nombreTorneo}
        onChangeText={(text) => setNombreTorneo(text)}
        placeholder="Nombre del torneo"
      />

      <Text style={styles.label}>Selecciona el deporte:</Text>
      <SelectList
        setSelected={(val) => handleDeporteSeleccionado(val)}
        data={deportesList}
        save="id"
        inputStyles={{
          marginHorizontal: 40,
          color: "blue",
          backgroundColor: "#ffff",
        }}
        boxStyles={{ borderColor: "blue", backgroundColor: "#ffff" }}
        search={{ placeholder: "Buscar deporte..." }}
        placeholder="Deporte"
        keyExtractor={(item) => item.id}
      />

      {deporteSeleccionado ? (
        <>
          <Text style={styles.label}>Selecciona el tipo de torneo:</Text>
          <SelectList
            setSelected={(val) => setTipoTorneo(val)}
            data={tiposTorneosList}
            save="id"
            inputStyles={{
              marginHorizontal: 40,
              color: "blue",
              backgroundColor: "#ffff",
            }}
            boxStyles={{ borderColor: "blue", backgroundColor: "#ffff" }}
            search={{ placeholder: "Buscar tipo de torneo..." }}
            placeholder="Tipo de torneo"
            keyExtractor={(item) => item.id}
          />
          <Text style={styles.disclaimer}>
            TENER EN CUENTA, si es de tipo ELIMINATORIA solo se podrá crear el
            torneo con 2, 4, 8, 16, 32 o 64 equipos.
          </Text>
        </>
      ) : null}
      {tipoTorneo ? (
        <>
          <Text style={styles.label}>Selecciona la institución:</Text>
          <SelectList
            setSelected={(val) => handleInstitucionSeleccionada(val)}
            data={institucionesList}
            save="id"
            inputStyles={{
              marginHorizontal: 40,
              color: "blue",
              backgroundColor: "#ffff",
            }}
            boxStyles={{ borderColor: "blue", backgroundColor: "#ffff" }}
            search={{ placeholder: "Buscar institución..." }}
            placeholder="Institución"
            keyExtractor={(item) => item.id}
          />

          {institucionSeleccionada ? (
            <>
              <Text style={styles.label}>Selecciona un equipo:</Text>
              <SelectList
                setSelected={(val) => setEquipoSeleccionado(val)}
                data={equiposList}
                save="id"
                inputStyles={{
                  marginHorizontal: 40,
                  color: "blue",
                  backgroundColor: "#ffff",
                }}
                boxStyles={{ borderColor: "blue", backgroundColor: "#ffff" }}
                search={{ placeholder: "Buscar equipo..." }}
                placeholder="Equipo"
                keyExtractor={(item) => item.id}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={agregarEquipo}
              >
                <Text style={styles.addButtonText}>Agregar equipo</Text>
              </TouchableOpacity>
            </>
          ) : null}

          {equiposAgregados.length > 0 && (
            <>
              <Text style={styles.label}>Equipos agregados:</Text>
              <ScrollView style={styles.equiposAgregados}>
                {equiposAgregados.map((equipo) => (
                  <View style={styles.equipoItem} key={equipo.key}>
                    <Text style={styles.equipoNombre}>{equipo.value}</Text>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => quitarEquipo(equipo.key)}
                    >
                      <Text style={styles.removeButtonText}>Quitar</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </>
          )}
        </>
      ) : null}

      <TouchableOpacity
        style={styles.addButton}
        onPress={calcularEnfrentamientos}
      >
        <Text style={styles.addButtonText}>Calcular enfrentamientos</Text>
      </TouchableOpacity>
      <MatchupList matchups={matchups} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  selectList: {
    width: "100%",
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  equiposAgregados: {
    marginHorizontal: 40,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 5,
    maxHeight: 150,
  },
  equipoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "blue",
  },
  equipoNombre: {
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: "red",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
})
