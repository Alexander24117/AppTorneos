import { useNavigation, NavigationContainer  } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Text, View, Image, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import Navigation from "./src/navigation/Navigation";
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './src/components/LoginForm';
import HomeScreen from './src/screens/HomeScreen';
import CreateJugador from './src/screens/CreateJugador';

const Stack = createStackNavigator();

export default function App() {
  
  return (
    
    <NavigationContainer>
      
      <Stack.Navigator >

        <Stack.Screen name='LoginA' component={LoginForm} options={{headerShown:false}}/>
        <Stack.Screen name='HomeS' component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Navigation' component={Navigation} options={{headerShown:false}}/>
        <Stack.Screen name='CreateJugador' component={CreateJugador} options={{headerShown:false}}/>

        {(props) => <HomeScreen {...props} extraData={someData} />}
      
      </Stack.Navigator>
      
  </NavigationContainer>
  );
}
