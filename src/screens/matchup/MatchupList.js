import { View, ScrollView, StyleSheet } from "react-native"
import React from "react"
import Matchup from "../matchup/Matchup"
export default function MatchupList({ matchups }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.table}>
        {matchups.map((matchup, index) => (
          <Matchup key={index} matchup={matchup} />
        ))}
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  table: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
})
