import { SafeAreaView, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { traerJugadores } from "../api/torneos";
import JugadoresList from "../components/JugadoresList";

export default function Jugadores() {
  const [jugadores, setJugadores] = React.useState([]);
  useEffect(() => {
    const getJugadores = async () => {
      const jwt = await SecureStore.getItemAsync("token");
      const response = await traerJugadores(jwt);
      if (response) {
        await setJugadores(response.Players);
      }
    };
    getJugadores();
  }, []);

  return (
    <SafeAreaView style={styles.content}>
      <JugadoresList jugadores={jugadores} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  content: {
    marginHorizontal: 0,
    marginTop: 30,
    backgroundColor: "#07162a",
  },
});
