import react from "react";
import { TextInput, Button, View, StyleSheet, Text, Image, Pressable, Alert , SafeAreaView} from "react-native";


export default function LoginForm(props) {
    const { onPress, title = 'Login' } = props;
    return (
        
        <View style ={styles.container}>
            <Image
          style={{ width: 300, height: 300, marginBottom: 10}}
          
          source={require("../../assets/logouni.png")}
        />
            <Text style = {styles.titulo} >B-Sports Movil</Text>
            <TextInput 
            style = {styles.textInput}
            placeholder="Email"/>
            <TextInput 
            style = {styles.textInput}
            placeholder="Password"/>
            <View style ={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={()=>{Alert.alert("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")}}>
                <Text style={styles.text}>{title}</Text>
            </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',   
        justifyContent: 'center',
    },
    titulo:{
        fontSize: 40,
        fontWeight: 'bold'

    },
    textInput:{
        borderWidth:1,
        borderColor:'blue',
        padding: 10 ,
        paddingStart: 25,
        width: '80%',
        height:50,
        marginTop: 20,
        borderRadius: 25,
        backgroundColor: '#fff'

    },
    button: {
        marginTop:20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#074CBD',
        borderRadius: 25,
        width: '80%',
        height: 50,
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
   
});