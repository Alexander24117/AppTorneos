import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import React from "react"

export default function MatchupTable({ data, onMatchupPress }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        {data.map((matchup, index) => (
          <TouchableOpacity key={index} onPress={() => onMatchupPress(matchup)}>
            <View style={styles.matchup}>
              <View style={styles.matchupInfoContainer}>
                <Text style={styles.matchupInfo}>Fecha: {matchup.date}</Text>
                <Text style={styles.matchupInfo}>Hora: {matchup.hour}</Text>
                <Text style={styles.matchupInfo}>Lugar: {matchup.place}</Text>
              </View>

              {matchup.teams.map((team, idx) => (
                <View key={idx} style={styles.team}>
                  <Text style={styles.teamInfo}>
                    {team.name} - {team.institution_name}
                  </Text>
                </View>
              ))}

              <View style={styles.matchupStatusContainer}>
                <Text style={styles.matchupInfo}>Estado: {matchup.status}</Text>
                <Text style={styles.matchupInfo}>
                  Etapa: {matchup.stage_name}
                </Text>
              </View>

              {matchup.teams.map((team, idx) => (
                <View key={idx} style={styles.team}>
                  {team.is_winner && (
                    <Text style={styles.winnerInfo}>Ganador: {team.name}</Text>
                  )}
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  matchup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  team: {
    flexDirection: "column",
  },
  matchupInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
  },
  matchupStatusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    width: "100%",
  },
  teamInfo: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  winnerInfo: {
    fontSize: 12,
    fontWeight: "bold",
    color: "green",
    marginTop: 5,
  },
  matchupInfo: {
    fontSize: 12,
    fontWeight: "bold",
  },
})
