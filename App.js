import { useNavigation, NavigationContainer } from "@react-navigation/native"
import "react-native-gesture-handler"

import Navigation from "./src/navigation/Navigation"
import { createStackNavigator } from "@react-navigation/stack"
import LoginForm from "./src/components/LoginForm"
import CreateJugador from "./src/screens/create/CreateJugador"
import CreateInstitucion from "./src/screens/create/CreateInstitucion"
import CreateEquipos from "./src/screens/create/CreateEquipos"
import CreateTorneos from "./src/screens/create/CreateTorneos"
import UpdateJugador from "./src/screens/update/UpdateJugador"
import UpdateEquipos from "./src/screens/update/UpdateEquipos"
import UpdateTorneos from "./src/screens/update/UpdateTorneos"
import Equipo from "./src/screens/equipos/Equipo"
import Jugador from "./src/screens/participantes/Jugador"
import Enfrentamientos from "./src/screens/matchup/Enfrentamientos"
import Torneo from "./src/screens/matchup/Torneo"
import MatchupDetails from "./src/screens/matchup/MatchupDetails"
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
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="CreateEquipo"
          component={CreateEquipos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateTorneos"
          component={CreateTorneos}
          options={{ headerShown: true }}
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
          name="UpdateTorneos"
          component={UpdateTorneos}
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
