import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import {
  actualizarEnfrentamiento,
  finalizarEnfrentamiento,
} from "../api/torneos"

export default function MatchupDetails({ route, navigation }) {
  const { jwt, matchup } = route.params
  const [place, setPlace] = useState(matchup.place)
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [hour, setTime] = useState(new Date())
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [points, setPoints] = useState(
    matchup.teams.map((team) => ({
      id_matchups_tournaments_teams: team.matchups_tournaments_teams_id,
      points: team.points || "",
      penalties_points: team.penalties_points || "",
    }))
  )
  const updateMatchup = async () => {
    const updatedData = {
      matchups_id: matchup.matchups_id,
      place,
      date,
      hour,
      teams: points.reduce((acc, team, index) => {
        acc[index] = team
        return acc
      }, {}),
    }
    // Llama a la función updateMatchup con los nuevos datos actualizados.

    try {
      const response = await actualizarEnfrentamiento(jwt, updatedData)
      if (response.status === 200) {
        navigation.goBack()
      }
    } catch (error) {
      console.error("Error al actualizar el enfrentamiento:", error)
    }
  }
  const finalizarMatchup = async () => {
    const enfrentamiento = {
      tournament_id: matchup.fk_tournaments_id, // Asegúrate de que este es el ID correcto del torneo
      matchups_id: matchup.matchups_id,
      teams: points.reduce((acc, team, index) => {
        acc[index] = team
        return acc
      }, {}),
    }

    // Llama a la función finalizarEnfrentamientoAPI con los datos necesarios.
    console.log(enfrentamiento)

    try {
      // Asegúrate de llamar a la función que actualiza la API aquí.
      // Por ejemplo: await finalizarEnfrentamientoAPI(jwt, enfrentamiento);
      const response = await finalizarEnfrentamiento(jwt, enfrentamiento)
      if (response.status === 200) {
        navigation.goBack()
      }
    } catch (error) {
      console.error("Error al finalizar el enfrentamiento:", error)
    }
  }

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShowDatePicker(Platform.OS === "ios")
    setDate(currentDate)
  }

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || hour
    setShowTimePicker(Platform.OS === "ios")
    setTime(currentTime)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.header}>Detalles del enfrentamiento</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Lugar:</Text>
            <TextInput
              style={styles.input}
              value={place}
              onChangeText={(text) => setPlace(text)}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Fecha:</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.input}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Hora:</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <Text style={styles.input}>{hour.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={hour}
                mode="time"
                display="default"
                onChange={onTimeChange}
              />
            )}
          </View>
          {matchup.teams.map((team, index) => (
            <View key={index} style={styles.teamContainer}>
              <Text style={styles.teamName}>{team.name}</Text>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Puntos:</Text>
                <TextInput
                  style={styles.input}
                  value={points[index].points}
                  onChangeText={(text) =>
                    setPoints((prevState) => {
                      const newPoints = [...prevState]
                      newPoints[index].points = text
                      return newPoints
                    })
                  }
                />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Puntos por penales:</Text>
                <TextInput
                  style={styles.input}
                  value={points[index].penalties_points}
                  onChangeText={(text) =>
                    setPoints((prevState) => {
                      const newPoints = [...prevState]
                      newPoints[index].penalties_points = text
                      return newPoints
                    })
                  }
                />
                <Text style={styles.disclaimer}>
                  * Si aplica, ingrese los penales.
                </Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.button} onPress={updateMatchup}>
            <Text style={styles.buttonText}>Actualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red", marginTop: 10 }]}
            onPress={finalizarMatchup}
          >
            <Text style={styles.buttonText}>Finalizar enfrentamiento</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    width: 120,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    flex: 1,
  },
  teamContainer: {
    marginBottom: 20,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0069D9",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  disclaimer: {
    fontSize: 12,
    fontStyle: "italic",
    color: "gray",
    marginLeft: 5,
  },
})
