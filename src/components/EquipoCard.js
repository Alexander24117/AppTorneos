import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function EquipoCard(props) {
  const { equipo } = props;
  const navigation = useNavigation();
  const irEquipo = () => {
    navigation.navigate("Equipo", { id: equipo.item.id });
  };
  return (
    <TouchableWithoutFeedback onPress={irEquipo}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={styles.bgStyles}>
            <Text style={styles.name}>{equipo.item.name}</Text>
            <Text style={styles.text}>Partidos:</Text>
            <View>
              <Text style={styles.text}>
                {"Perdidos: " + equipo.item.matches_lost}
              </Text>
              <Text style={styles.text}>
                {"Ganados: " + equipo.item.matches_won}
              </Text>
              <Text style={styles.text}>
                {"Empatados: " + equipo.item.matches_tied}
              </Text>
              <Text style={styles.text}>
                {"Jugados: " + equipo.item.matches_played}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 100,
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
