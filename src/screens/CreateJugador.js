import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Image} from 'react-native'
import React, {useState, useEffect } from 'react'
import {useNavigation} from '@react-navigation/native';
import RegisterSchema from '../validation/Register'
import {saveJugador} from '../api/torneos'
import { useFormik } from 'formik'
import {  ScrollView } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list'
import { departamentos, ciudadesPorDepartment } from "../api/torneos";
import JWTManager from '../api/JWTManager';

const jwtManager = new JWTManager();

export default function CreateJugador(props) {
    const { onPress, title = 'Crear Participante' , navigation} = props;
    const [infoDepartment, setDataDepartment] = useState([]);
    const [infoCiudad, setDataCiudad] = useState([]);
    const [selectedDeparment, setSelectedDeparment] = React.useState("");
    const [selectedCiudad, setselectedCiudad] = React.useState("");

    
    useEffect(() => {
      const fetchData = async () => {
        const jwt = await jwtManager.getToken();
        if (!jwt) {
          return;
        }
        const response = await departamentos(jwt)
        setDataDepartment(response.Departments.map(item=>{
          return{
            key: item.id,
            value: item.name
          }
        }));
      };
      fetchData();
    }, []);
    
    useEffect(()=>{
      if (!selectedDeparment) {
        return;
      }
      const fetchMunicipios = async () => {
        const jwt = await jwtManager.getToken();
        if (!jwt) {
          return;
        }
        const response = await ciudadesPorDepartment(jwt, selectedDeparment)
        setDataCiudad(response.Cities.map(item=>{
          return{
            key: item.id,
            value: item.name
          }
        }))
      };
      fetchMunicipios()
    }, [selectedDeparment])
  
   
    const handleDepartamentoChange = (departamento) => {
      console.log(selectedDeparment,'depar selected');
      fetchMunicipios(selectedDeparment).then(data => setMunicipios(data));
    };

    const { values, isSubmitting, setFieldValue , handleSubmit} = useFormik({
        initialValues : {
            names: "",
            surnames:"",
            identificacition:"",
            cel_phone: "",
            email:"",
            date_birth: "",
            department: "",
        }, 
        onSubmit : values => {
         console.log(values);
         navigation.navigate('Navigation');
        },
    })
    values.department = selectedDeparment
    const data = infoCiudad
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

              <View style ={{ paddingVertical : 20, paddingBottom : -10, width : 320}}>
                <SelectList 
                    setSelected={(val) => setSelectedDeparment(val)} 
                    data={infoDepartment} 
                    save="key"
                    inputStyles={{marginHorizontal: 40, color:'blue', backgroundColor:'#ffff'}}
                    boxStyles={{ borderColor: 'blue',  backgroundColor:'#ffff'}}
                    search ={{placeholder : "aaaaaaaaa"}}
                    placeholder = "Departamento"
                    keyExtractor={item => item.key}
                    
               />
              </View> 
              {selectedDeparment && (
                <View style ={{ paddingVertical : 20, paddingBottom : -10,  width : 320}}>
                <SelectList 
                    setSelected={(val) => setselectedCiudad(val)} 
                    data={infoCiudad} 
                    save="key"
                    inputStyles={{marginHorizontal: 40, color:'blue', backgroundColor:'#ffff'}}
                    boxStyles={{ borderColor: 'blue', backgroundColor:'#ffff'}}
                    search ={{marginHorizontal : 40}}
                    placeholder = "Ciudad"
                    
               />
               </View>
              )}

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
        marginBottom:20,
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