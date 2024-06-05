import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function JugadorCard(props) {
  const { jugador } = props;
  const navigation = useNavigation();
  const irJugador = () => {
    navigation.navigate("Jugador", { id: jugador.item.id });
  };
  return (
    <TouchableWithoutFeedback onPress={irJugador}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={styles.bgStyles}>
            <Text style={styles.name}>
              {jugador.item.names + " " + jugador.item.surnames}
            </Text>
          </View>
          <View>
            <Text style={styles.text}>{"Email: " + jugador.item.email}"</Text>
            <Text style={styles.text}>
              {"Telefono: " + jugador.item.cel_phone}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: "80%",
  },
  spacing: {
    flex: 1,
    padding: 2,
  },
  bgStyles: {
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  name: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 0,
    textAlign: "center",
  },
  text: {
    color: "black",
    fontWeight: "normal",
    fontSize: 13,
    paddingTop: 0,
    textAlign: "left",
  },
});
