import { useNavigation, NavigationContainer  } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Text, View, Image, TouchableOpacity} from 'react-native';
import Navigation from "./src/navigation/Navigation";
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './src/components/LoginForm';
const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name='Login' component={LoginForm}/>
      </Stack.Navigator>
  </NavigationContainer>
  );
}