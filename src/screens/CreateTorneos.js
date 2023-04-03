import { useFormik } from 'formik'
import { ScrollView } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list'
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Image} from 'react-native'
import React, {useState, useEffect} from 'react'
import * as SecureStore from 'expo-secure-store';
import { crearEquipo, traerEquipos } from "../api/torneos";
import JWTManager from '../api/JWTManager';

const jwtManager = new JWTManager();
export default function CreateTorneos(props) {
    const { onPress, title = 'Crear Torneo' , navigation} = props;
    
    const [selectedSport, setSelectedSport] = React.useState("");
    const dataSport = [
      {key:'1', value:'consumir servicio'},
    ]
    const [selectedTorneo, setSelectedTorneo] = React.useState("");
    const dataTorneo = [
      {key:'1', value:'consumir servicio'},
    ]
    const [selectedEstadoT, setSelectedEstadoT] = React.useState("");
    const dataEstado = [
      {key:'1', value:'Activo'},
      {key:'0', value:'Inactivo'},
    ]

    useEffect(() => {
      const fetchData = async () => {
        const jwt = await jwtManager.getToken();
        if (!jwt) {
          return;
        }
        const response = await traerEquipos(jwt)
        setDataInsti(response.Sports.map(item=>{
          return{
            key: item.id,
            value: item.name
          }
        }));
      };
      fetchData();
    }, []);


    const { values, isSubmitting, setFieldValue , handleSubmit} = useFormik({
        initialValues : {
            fk_users_admin_id: "",
            fk_sports_id: 1,
            fk_types_tournament_id: 1,
            fk_states_tournament_id: 2,
            fk_stages_id: 4,
            fk_team_id_winner: 1,
            name: "",
            start_date: "",
            end_date: "",
        }, 
        onSubmit : values => {
         console.log(values);
            //navigation.navigate('Navigation');
        },
    })

  return (
    <SafeAreaView>

        <ScrollView style = {styles.scroll}>
        <View  style={styles.container}  >
      <View style={styles.bg} />
      <Image
            style={{ width: 350, height: 300, marginBottom: 10 }}
            source={require("../../assets/logojugadores.png")}
          />
      </View>
    <View  style={styles.container}  > 
       
        <Text style = {styles.titulo} >Digite los datos</Text>
        <TextInput 
                style = {styles.textInput}
                value = {values.name} onChangeText = {text => setFieldValue('name', text)}
                placeholder="Nombre del torneo"
                />

                <TextInput 
                style = {styles.textInput}
                value = {values.start_date} onChangeText = {text => setFieldValue('start_date', text)}
                placeholder="Fecha de inicio"
                />
                <TextInput 
                style = {styles.textInput}
                value = {values.end_date} onChangeText = {text => setFieldValue('end_date', text)}
                placeholder="Fecha de Finalizacion"
                />

                <View style ={{ paddingVertical : 20, paddingBottom : -10, width : 320}}>
                <SelectList 
                    setSelected={(val) => setSelectedAdmin(val)} 
                    data={dataAdmin} 
                    save="value"
                    inputStyles={{marginHorizontal: 40, color:'blue', backgroundColor:'#ffff'}}
                    boxStyles={{ borderColor: 'blue',  backgroundColor:'#ffff'}}
                    search ={{placeholder : "aaaaaaaaa"}}
                    placeholder = "Administrador"
               />
                </View> 

                <View style ={{ paddingVertical : 20, paddingBottom : -10,  width : 320}}>
                <SelectList 
                    setSelected={(val) => setSelectedSport(val)} 
                    data={dataSport} 
                    save="value"
                    inputStyles={{marginHorizontal: 40, color:'blue', backgroundColor:'#ffff'}}
                    boxStyles={{ borderColor: 'blue', backgroundColor:'#ffff'}}
                    search ={{marginHorizontal : 40}}
                    placeholder = "Deporte"    
                />
                </View> 

                <View style ={{ paddingVertical : 20, paddingBottom : -10,  width : 320}}>
                <SelectList 
                    setSelected={(val) =>setSelectedTorneo(val)} 
                    data={dataTorneo} 
                    save="value"
                    inputStyles={{marginHorizontal: 40, color:'blue', backgroundColor:'#ffff'}}
                    boxStyles={{ borderColor: 'blue', backgroundColor:'#ffff'}}
                    search ={{marginHorizontal : 40}}
                    placeholder = "Tipo de torneo" 
               />
                  </View> 

                <View style ={{ paddingVertical : 20, paddingBottom : -10,  width : 320}}>
                <SelectList 
                    setSelected={(val) => setSelectedEstadoT(val)} 
                    data={dataEstado} 
                    save="value"
                    inputStyles={{marginHorizontal: 40, color:'blue', backgroundColor:'#ffff'}}
                    boxStyles={{ borderColor: 'blue', backgroundColor:'#ffff'}}
                    search ={{marginHorizontal : 40}}
                    placeholder = "Estado del torneo"    
               />
                </View>

                

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
        marginBottom:10,
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

    },
    bg: {
      width: "100%",
      height: 400,
      position: "absolute",
      borderBottomEndRadius: 300,
      borderBottomLeftRadius: 300,
      backgroundColor: "#003d7c",
      transform: [{ scaleX: 2 }],
    },
})