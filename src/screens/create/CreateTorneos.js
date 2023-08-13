import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native"
import {
  traerDeportess,
  traerTipoTorneo,
  traerInstituciones,
  traerEquiposPorInstitucion,
  calcularPartidos,
  calcularEtapaClasificatoria,
  crearTorneo,
} from "../../api/torneos"
import { SelectList } from "react-native-dropdown-select-list"
import JWTManager from "../../api/JWTManager"
const jwtManager = new JWTManager()
import MatchupList from "../matchup/MatchupList"
import * as SecureStore from "expo-secure-store"
export default function CreateTorneos(props) {
  const { navigation } = props
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
  const [numEquipos, setNumEquipos] = useState(0)
  useEffect(() => {
    setNumEquipos(equiposAgregados.length)
  }, [equiposAgregados])
  useEffect(() => {
    if (tipoTorneo == 2) {
      const fetchEtapas = async () => {
        try {
          console.log(tipoTorneo, "Tipo", numEquipos, "Equipos")
          const response = await calcularEtapaClasificatoria(jwt, numEquipos)
          const etapasData = response.data.stages.map((etapa) => ({
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
  }, [tipoTorneo, jwt, numEquipos])

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
  const eliminarImg64DeEquipos = (matchups) => {
    return matchups.map((matchup, index) => {
      const teams = matchup.map((team) => {
        const { img_64, ...rest } = team
        return rest
      })
      return { position: "", place: "", date: "", hour: "", teams }
    })
  }
  const handleCrearTorneo = async () => {
    const userId = await SecureStore.getItemAsync("userId")

    const currentDate = new Date()
    const formattedDate = `${currentDate.getFullYear()}/${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${currentDate.getDate().toString().padStart(2, "0")}`
    const initialMatchups = eliminarImg64DeEquipos(matchups)
    const torneo = {
      tournament: {
        fk_users_admin_id: parseInt(userId),
        fk_sports_id: deporteSeleccionado,
        fk_types_tournament_id: tipoTorneo,
        fk_states_tournament_id: 1,
        fk_stages_id: etapaSeleccionada,
        fk_team_id_winner: null,
        name: nombreTorneo,
        start_date: formattedDate, // Reemplaza esto con la fecha de inicio seleccionada
        end_date: null,
        state: 1,
      },
      teams_id: equiposAgregados.map((equipo) => equipo.key),
      initial_matchups: initialMatchups,
    }

    const response = await crearTorneo(jwt, torneo)
    if (response.data.status === 200) {
      console.log("Torneo creado")
      navigation.goBack()
    }
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
    <SafeAreaView>
      <ScrollView style={styles.scroll}>
        <View style={styles.container2}>
          <View style={styles.bg} />
          <Image
            style={{ width: 350, height: 300, marginBottom: 10 }}
            source={require("../../../assets/imagenTorneo.png")}
          />
        </View>
        <View style={styles.container2}>
          <Text style={styles.label}>Nombre del Torneo:</Text>
          <TextInput
            style={[styles.textInput, { borderColor: "blue" }]}
            value={nombreTorneo}
            onChangeText={(text) => setNombreTorneo(text)}
            placeholder="Nombre del torneo"
          />

          <Text style={styles.label}>Selecciona el deporte:</Text>
          <View style={{ paddingVertical: 20, paddingBottom: -10, width: 320 }}>
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
          </View>
          {deporteSeleccionado ? (
            <>
              <Text style={styles.label}>Selecciona el tipo de torneo:</Text>
              <View
                style={{ paddingVertical: 20, paddingBottom: -10, width: 320 }}
              >
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
                  TENER EN CUENTA, si es de tipo ELIMINATORIA solo se podrá
                  crear el torneo con 2, 4, 8, 16, 32 o 64 equipos.
                </Text>
              </View>
            </>
          ) : null}
          {tipoTorneo ? (
            <>
              <Text style={styles.label}>Selecciona la institución:</Text>
              <View
                style={{ paddingVertical: 20, paddingBottom: -10, width: 320 }}
              >
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
              </View>

              {institucionSeleccionada ? (
                <>
                  <Text style={styles.label}>Selecciona un equipo:</Text>
                  <View
                    style={{
                      paddingVertical: 20,
                      paddingBottom: -10,
                      width: 320,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <SelectList
                        setSelected={(val) => setEquipoSeleccionado(val)}
                        data={equiposList}
                        save="id"
                        inputStyles={{
                          marginHorizontal: 40,
                          color: "blue",
                          backgroundColor: "#ffff",
                        }}
                        boxStyles={{
                          borderColor: "blue",
                          backgroundColor: "#ffff",
                        }}
                        search={{ placeholder: "Buscar equipo..." }}
                        placeholder="Equipo"
                        keyExtractor={(item) => item.id}
                      />
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={agregarEquipo}
                      >
                        <Text style={styles.addButtonText}>Agregar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              ) : null}

              {equiposAgregados.length > 0 && (
                <>
                  <Text style={styles.label}>Equipos agregados:</Text>
                  <View style={{ width: "80%" }}>
                    <ScrollView style={styles.equiposAgregados}>
                      {equiposAgregados.map((equipo) => (
                        <View style={styles.equipoItem} key={equipo.key}>
                          <Text style={styles.equipoNombre}>
                            {equipo.value}
                          </Text>
                          <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => quitarEquipo(equipo.key)}
                          >
                            <Text style={styles.removeButtonText}>Quitar</Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                </>
              )}
            </>
          ) : null}

          <TouchableOpacity
            style={styles.button}
            onPress={calcularEnfrentamientos}
          >
            <Text style={styles.addButtonText}>Calcular enfrentamientos</Text>
          </TouchableOpacity>
          <MatchupList matchups={matchups} />
          {tipoTorneo == 2 && matchups.length > 0 ? (
            <>
              <Text style={styles.label}>Selecciona la etapa del torneo:</Text>
              <SelectList
                setSelected={(val) => setEtapaSeleccionada(val)}
                data={etapas}
                save="key"
                inputStyles={{
                  marginHorizontal: 40,
                  color: "blue",
                  backgroundColor: "#ffff",
                }}
                boxStyles={{ borderColor: "blue", backgroundColor: "#ffff" }}
                search={{ placeholder: "Buscar etapa..." }}
                placeholder="Etapa"
                keyExtractor={(item) => item.key}
              />
            </>
          ) : null}
          {(tipoTorneo == 1  || etapaSeleccionada) && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleCrearTorneo}
            >
              <Text style={styles.addButtonText}>Crear Torneo</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  container2: {
    marginTop: 40,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
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
    borderRadius: 25,
    backgroundColor: "#003d7c",
    marginLeft: 25,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
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
    backgroundColor: "#003d7c",
    borderRadius: 25,
    width: "80%",
    height: 50,
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
    marginRight: 5,
  },
  removeButton: {
    backgroundColor: "red",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  disclaimer: {
    marginTop: 10,
    fontSize: 12,
    fontStyle: "italic",
    color: "gray",
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
