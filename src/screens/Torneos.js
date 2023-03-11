import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function Torneos() {
  return (
    <SafeAreaView style={styles.content}>
      <Text>Torneos</Text>
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
