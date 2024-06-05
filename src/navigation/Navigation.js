import React from "react"
import { Image, Button, ToastAndroid } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import TorneosScreen from "../screens/matchup/Torneos"
import EquiposScreen from "../screens/equipos/Equipos"
import JugadoresScreen from "../screens/participantes/Jugadores"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"

const Tab = createBottomTabNavigator()

export default function Navigation() {
  const navigation = useNavigation()
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen
        name="Equipos"
        component={EquiposScreen}
        options={{
          tabBarIcon: () => (
            <SimpleLineIcons name="people" size={25} color="#1d5bad" />
          ),
          headerRight: () => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("CreateEquipo")}
            >
              <Ionicons
                name="add"
                size={40}
                color="#1d5bad"
                style={{ marginRight: 10 }}
              />
            </TouchableWithoutFeedback>
          ),
        }}
      />
      <Tab.Screen
        name="Torneos"
        component={TorneosScreen}
        options={{
          tabBarLabel: "Torneos",
          tabBarIcon: () => (
            <SimpleLineIcons name="trophy" size={25} color="#1d5bad" />
          ),
          headerRight: () => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("CreateTorneos")}
            >
              <Ionicons
                name="add"
                size={40}
                color="#1d5bad"
                style={{ marginRight: 10 }}
              />
            </TouchableWithoutFeedback>
          ),
        }}
      />
      <Tab.Screen
        name="Jugadores"
        component={JugadoresScreen}
        options={{
          tabBarLabel: "Jugadores",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="run-fast" size={25} color="#1d5bad" />
          ),
          headerRight: () => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("CreateJugador")}
            >
              <Ionicons
                name="add"
                size={40}
                color="#1d5bad"
                style={{ marginRight: 10 }}
              />
            </TouchableWithoutFeedback>
          ),
        }}
      />
    </Tab.Navigator>
  )
}
