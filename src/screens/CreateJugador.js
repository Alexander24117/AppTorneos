import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Image} from 'react-native'
import React, {useState} from 'react'
import {useNavigation} from '@react-navigation/native';
import RegisterSchema from '../validation/Register'
import {saveJugador} from '../api/torneos'
import { useFormik } from 'formik'
import { ScrollView } from 'react-native-gesture-handler';



export default function CreateJugador(props) {
    const { onPress, title = 'Crear Participante' , navigation} = props;
    const { values, isSubmitting, setFieldValue , handleSubmit} = useFormik({
        initialValues : {
            names: "",
            surnames:"",
            identificacition:"",
            cel_phone: "",
            email:"",
            date_birth: "",
        }, 
        onSubmit : values => {
         console.log(values);
         navigation.navigate('Navigation');
        },
    })

  return (
    <SafeAreaView>

        <ScrollView style = {styles.scroll}>
        <View style = {styles.container}>

        <Image
          style={{ width: 350, height: 300, marginBottom: 10}}
          
          source={require("../../assets/logojugadores.png")}
        />
       
        <Text style = {styles.titulo} >Digite los datos</Text>
        <TextInput 
                style = {styles.textInput}
                value = {values.names} onChangeText = {text => setFieldValue('names', text)}
                placeholder="Nombres"
                />
                <TextInput 
                style = {styles.textInput}
                value = {values.surnames} onChangeText = {text => setFieldValue('surnames', text)}
                placeholder="Apellidos"
                />
                <TextInput 
                style = {styles.textInput}
                value = {values.identificacition} onChangeText = {text => setFieldValue('identificacition', text)}
                placeholder="Codigo"
                />
                <TextInput 
                style = {styles.textInput}
                value = {values.cel_phone} onChangeText = {text => setFieldValue('cel_phone', text)}
                placeholder="Telefono"
                />
                <TextInput 
                style = {styles.textInput}
                value = {values.email} onChangeText = {text => setFieldValue('email', text)}
                placeholder="Email"
                />
                  <TextInput 
                style = {styles.textInput}
                value = {values.date_birth} onChangeText = {text => setFieldValue('date_birth', text)}
                placeholder="Fecha Nacimiento"
                />

                <TextInput 
                style = {styles.textInput}
                value = {values.date_birth} onChangeText = {text => setFieldValue('date_birth', text)}
                placeholder="Fecha Nacimiento"
                />

                <TextInput 
                style = {styles.textInput}
                value = {values.date_birth} onChangeText = {text => setFieldValue('date_birth', text)}
                placeholder="Fecha Nacimiento"
                />

            <Pressable style={styles.button} 
            onPress={handleSubmit}>
            <Text style={styles.text}>{title}</Text>
           </Pressable>
                </View>
              </ScrollView>
       

    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
    container:{
        marginTop: 40,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',   
        justifyContent: 'center',
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
      titulo:{
        fontSize: 20,
    },
    scroll:{
      marginHorizontal: 0.1,

    }
})