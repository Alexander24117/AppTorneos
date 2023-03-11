import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { traerEquipoById } from "../api/torneos";
import JWTManager from "../api/JWTManager";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const jwtManager = new JWTManager();
export default function Equipo(props) {
  const {
    navigation,
    route: { params },
  } = props;
  const [equipo, setEquipo] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const jwt = await jwtManager.getToken();
        if (!jwt) {
          return;
        }
        const response = await traerEquipoById(jwt, params.id);
        console.log(response.data.Teams);
        setEquipo(response.data.Teams);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("UpdateEquipos", { id: params.id })
          }
        >
          <Ionicons name="ios-pencil-outline" size={38} color="#1d5bad" />
        </TouchableWithoutFeedback>
      ),
    });
  }, [equipo]);

  if (!equipo) return null;

  return (
    <>
      <View style={styles.bg} />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{equipo.name}</Text>
          <Text style={styles.order}>{equipo.cel_phone}</Text>
        </View>
        <Text style={styles.name}>{"Email:" + equipo.email}</Text>
        <Text style={styles.name}>Partidos:</Text>
        <View style={styles.body}>
          <Text style={styles.name}>Perdidos</Text>
          <Text style={styles.name}>{equipo.matches_lost}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.name}>Ganados</Text>
          <Text style={styles.name}>{equipo.matches_won}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.name}>Empatados</Text>
          <Text style={styles.name}>{equipo.matches_tied}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.name}>Jugados</Text>
          <Text style={styles.name}>{equipo.matches_played}</Text>
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 400,
    position: "absolute",
    borderBottomEndRadius: 300,
    borderBottomLeftRadius: 300,
    backgroundColor: "#07162a",
    transform: [{ scaleX: 2 }],
  },
  content: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 27,
  },
  order: {
    color: "#fff",
    fontWeight: "bold",
  },
});
