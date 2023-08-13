import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"

export default function TorneoCard(props) {
  const { torneo } = props
  
  const navigation = useNavigation()
  const irTorneo = () => {
    navigation.navigate("Torneo", { id: torneo.item.id, estado: torneo.item.state_name })
  }
  return (
    <TouchableWithoutFeedback onPress={irTorneo}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={styles.bgStyles}>
            <Text style={styles.name}>{torneo.item.tournaments_name}</Text>
            <Text style={styles.text}>Deporte: {torneo.item.sport_name}</Text>
            <Text style={styles.text}>Estado: {torneo.item.state_name}</Text>
            <Text style={styles.text}>
              Tipo de Torneo: {torneo.item.type_name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
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
    textAlign: "center",
  },
  text: {
    color: "black",
    fontSize: 12,
    textAlign: "center",
  },
})
