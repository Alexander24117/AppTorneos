import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native"
import React from "react"
import TorneoCard from "./../cards/TorneoCard"

export default function TorneosList(props) {
  const { torneos } = props
  return (
    <FlatList
      data={torneos}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(torneo) => torneo.id.toString()}
      renderItem={(torneo) => <TorneoCard torneo={torneo} />}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
        />
      }
      contentContainerStyle={styles.flatListContentContainer}
    />
  )
}
const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
  },
})
