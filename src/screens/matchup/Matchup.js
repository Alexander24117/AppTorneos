import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"

export default function Matchup({ matchup }) {
  const team1 = matchup[0]
  const team2 = matchup[1]
  return (
    <View style={styles.row}>
      <View style={styles.team}>
        <Image style={styles.teamLogo} source={{ uri: `${team1.img_64}` }} />
        <Text style={styles.teamName}>{team1.team_name}</Text>
        <Text style={styles.institutionName}>{team1.institution_name}</Text>
      </View>
      <Text style={styles.vs}>vs</Text>
      <View style={styles.team}>
        <Image style={styles.teamLogo} source={{ uri: `${team2.img_64}` }} />
        <Text style={styles.teamName}>{team2.team_name}</Text>
        <Text style={styles.institutionName}>{team2.institution_name}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  team: {
    flexDirection: "column",
    alignItems: "center",
  },
  teamLogo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  teamName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  institutionName: {
    fontSize: 14,
  },
  vs: {
    fontSize: 18,
    fontWeight: "bold",
  },
})
