import { useNavigation, NavigationContainer } from "@react-navigation/native"
import "react-native-gesture-handler"
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native"
import Navigation from "./src/navigation/Navigation"
import { createStackNavigator } from "@react-navigation/stack"
import LoginForm from "./src/components/LoginForm"
import HomeScreen from "./src/screens/HomeScreen"
import CreateJugador from "./src/screens/CreateJugador"
import CreateInstitucion from "./src/screens/CreateInstitucion"
import CreateEquipos from "./src/screens/CreateEquipos"
import CreateTorneos from "./src/screens/CreateTorneos"
import UpdateJugador from "./src/screens/Update/UpdateJugador"
import UpdateEquipos from "./src/screens/Update/UpdateEquipos"
import Equipo from "./src/screens/Equipo"
import Jugador from "./src/screens/Jugador"
import Enfrentamientos from "./src/screens/Enfrentamientos"
import Torneo from "./src/screens/Torneo"
import MatchupDetails from "./src/screens/MatchupDetails"
const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginA"
          component={LoginForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeS"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Navigation"
          component={Navigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateJugador"
          component={CreateJugador}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateInstitucion"
          component={CreateInstitucion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateEquipo"
          component={CreateEquipos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateTorneos"
          component={CreateTorneos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateJugador"
          component={UpdateJugador}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateEquipos"
          component={UpdateEquipos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Equipo"
          component={Equipo}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Enfrentamientos"
          component={Enfrentamientos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Jugador"
          component={Jugador}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Torneo"
          component={Torneo}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="MatchupDetails"
          component={MatchupDetails}
          options={{ headerShown: true }}
        />
        {(props) => <HomeScreen {...props} extraData={someData} />}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
