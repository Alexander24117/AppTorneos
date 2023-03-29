import { View, Text } from "react-native";
import React from "react";
import JugadorCard from "./JugadorCard";

export default function JugadoresList(props) {
  const { jugadores } = props;
  return (
    <FlatList
      data={jugadores}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(jugador) => jugador.id.toString()}
      renderItem={(jugador) => <JugadorCard jugador={jugador} />}
      contentContainerStyle={styles.flatListContentContainer}
    />
  );
}
