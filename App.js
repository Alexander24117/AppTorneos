import { useNavigation, NavigationContainer  } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Text, View, Image, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import Navigation from "./src/navigation/Navigation";
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './src/components/LoginForm';
const Stack = createStackNavigator();

export default function App() {
  
  return (
    
    <NavigationContainer>
      
      <Stack.Navigator >

        <Stack.Screen name='LoginA' component={LoginForm} options={{headerShown:false}}/>
      
      </Stack.Navigator>
      
  </NavigationContainer>
  );
}
