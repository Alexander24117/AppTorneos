import { View, Text, ScrollView, StyleSheet } from "react-native"
import React from "react"

export default function TablaPuntos({ data }) {
  if (!data) {
    return null
  }

  // Ordenar la tabla por puntos y luego por diferencia de goles
  const sortedData = [...data].sort((a, b) => {
    if (b.points_total !== a.points_total) {
      return b.points_total - a.points_total
    }
    return (
      b.points_favor - b.points_against - (a.points_favor - a.points_against)
    )
  })
  return (
    <ScrollView>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.header]}>Pos</Text>
          <Text style={[styles.cell, styles.header]}>Equipo</Text>
          <Text style={[styles.cell, styles.header]}>PJ</Text>
          <Text style={[styles.cell, styles.header]}>PG</Text>
          <Text style={[styles.cell, styles.header]}>PE</Text>
          <Text style={[styles.cell, styles.header]}>PP</Text>
          <Text style={[styles.cell, styles.header]}>GF</Text>
          <Text style={[styles.cell, styles.header]}>GC</Text>
          <Text style={[styles.cell, styles.header]}>Dif</Text>
          <Text style={[styles.cell, styles.header]}>Pts</Text>
        </View>
        {sortedData.map((team, index) => (
          <View key={team.team_name} style={styles.row}>
            <Text style={[styles.cell, styles.position]}>{index + 1}</Text>
            <Text style={[styles.cell, styles.name]}>{team.team_name}</Text>
            <Text style={[styles.cell]}>{team.matches_played}</Text>
            <Text style={[styles.cell]}>{team.matches_won}</Text>
            <Text style={[styles.cell]}>{team.matches_tied}</Text>
            <Text style={[styles.cell]}>{team.matches_lost}</Text>
            <Text style={[styles.cell]}>{team.points_favor}</Text>
            <Text style={[styles.cell]}>{team.points_against}</Text>
            <Text style={[styles.cell]}>
              {team.points_favor - team.points_against}
            </Text>
            <Text style={[styles.cell, styles.points]}>
              {team.points_total}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cell: {
    padding: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#07162a",
  },
  header: {
    fontWeight: "bold",
  },
  position: {
    flex: 0.5,
  },
  name: {
    flex: 2,
  },
  points: {
    flex: 0.5,
  },
})
