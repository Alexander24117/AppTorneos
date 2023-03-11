import { SafeAreaView, Text, StyleSheet } from "react-native";
import React from "react";

export default function Jugadores() {
  return (
    <SafeAreaView style={styles.content}>
      <Text>Jugadores</Text>
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
