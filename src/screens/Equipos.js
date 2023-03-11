import React, { useEffect } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import EquiposList from "../components/EquiposList";
import { traerEquiposs } from "../api/torneos";
import * as SecureStore from "expo-secure-store";
export default function Equipos() {
  const [equipos, setEquipos] = React.useState([]);

  useEffect(() => {
    const getEquipos = async () => {
      const jwt = await SecureStore.getItemAsync("token");
      const response = await traerEquiposs(jwt);
      if (response) {
        await setEquipos(response.Teams);
        //console.log(equipos);
      }
    };
    getEquipos();
  }, []);

  return (
    <SafeAreaView style={styles.content}>
      <EquiposList equipos={equipos} />
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
