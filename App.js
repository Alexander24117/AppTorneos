import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import LoginForm from './components/LoginForm';

export default function App() {
  return (
    <View style={styles.container}>
      <Banner/>
      <LoginForm/>
    </View>
  );
}
const Banner = () => {
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
   
      <Image
        source={require('./assets/logo.png')}
        style={{ width: 200, height: 200 }}
      />
  
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#700',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
