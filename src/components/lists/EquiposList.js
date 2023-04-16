import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native"
import React from "react"
import EquipoCard from "../cards/EquipoCard"

export default function EquiposList(props) {
  const { equipos } = props
  return (
    <FlatList
      data={equipos}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(equipo) => equipo.id.toString()}
      renderItem={(equipo) => <EquipoCard equipo={equipo} />}
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
