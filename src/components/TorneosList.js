import { View, Text, FlatList, StyleSheet } from "react-native"
import React from "react"
import TorneoCard from "./TorneoCard"

export default function TorneosList(props) {
  const { torneos } = props
  return (
    <FlatList
      data={torneos}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(torneo) => torneo.id.toString()}
      renderItem={(torneo) => <TorneoCard torneo={torneo} />}
      contentContainerStyle={styles.flatListContentContainer}
    />
  )
}
const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
  },
})
