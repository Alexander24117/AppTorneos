import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native"
import React from "react"
import JugadorCard from "./../cards/JugadorCard"

export default function JugadoresList(props) {
  const { jugadores } = props
  return (
    <FlatList
      data={jugadores}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(jugador) => jugador.id.toString()}
      renderItem={(jugador) => <JugadorCard jugador={jugador} />}
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
