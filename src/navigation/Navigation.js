import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TorneosScreen from "../screens/Torneos";
import EquiposScreen from "../screens/Equipos";
import JugadoresScreen from "../screens/Jugadores";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Equipos"
        component={EquiposScreen}
        options={{
          tabBarIcon: () => (
            <SimpleLineIcons name="people" size={25} color="#1d5bad" />
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
        }}
      />
    </Tab.Navigator>
  );
}
