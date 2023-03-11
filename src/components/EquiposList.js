import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import EquipoCard from "./EquipoCard";

export default function EquiposList(props) {
  const { equipos } = props;
  return (
    <FlatList
      data={equipos}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(equipo) => equipo.id.toString()}
      renderItem={(equipo) => <EquipoCard equipo={equipo} />}
      contentContainerStyle={styles.flatListContentContainer}
    />
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
  },
});
