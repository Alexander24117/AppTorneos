
import { ScrollView } from "react-native-gesture-handler";
import { SelectList } from "react-native-dropdown-select-list";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Pressable,
  Image,
  Alert,
  Linking,
  Button
} from "react-native";
import { Formik } from "formik";

import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { crearEquipo, traerInstituciones } from "../api/torneos";
import JWTManager from "../api/JWTManager";
import * as ImagePicker from "expo-image-picker";



export default function Enfrentamientos(props){
  const {
    onPress,
    title = "Enviar Resultados",
    title2 = "Finalizar Enfrentamiento",
    navigation,
  } = props;
  const teamIndex1 = 0;
  const teamIndex2 = 1;
  const formSchema = {
    initialValues:{
      matchups_id:"",
      place: "",
      date:"",
      hour:"",
      teams: {
        0:{
          id_matchups_tournaments_teams: "",
          points:"",
          penalties_points:""
        },
        1:{
          id_matchups_tournaments_teams:"",
          points:"",
          penalties_points:""
        }
      }
    }, onSubmit: values=>{
      console.log(values);
    }
  }; return(
  <Formik 
  initialValues={formSchema.initialValues}
  onSubmit={formSchema.onSubmit}
  validationSchema={formSchema.validationSchema}>
  

{({ handleChange, handleBlur, handleSubmit, values, errors }) => (
    
    <>
    <SafeAreaView>
      <ScrollView style={styles.scroll}>
      <View  style={styles.container}  >
      <View style={styles.bg} />
      <Image
            style={{ width: 350, height: 300, marginBottom: 10 }}
            source={require("../../assets/logojugadores.png")}
          />
      </View>
    <View  style={styles.container}  >
      <Text style={styles.titulo}>Digite los datos del enfrentamiento</Text>

      <TextInput      
        style={styles.textInput}
        onChangeText={handleChange('place')}
        value={values.place}
        placeholder="Lugar"
      />

      <TextInput
        style={styles.textInput}
        onChangeText={handleChange('date')}
        value={values.date}
        placeholder="fecha"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={handleChange('hour')}
        value={values.hour}
        placeholder="Hora"
      />

      
      <Text style={styles.tituloE}>Equipo 1</Text>
      <View style ={styles.DPoints}>
      <TextInput
        style={styles.textInputPoints}
        onChangeText={handleChange('teams.0.points')}
        value={values.teams[teamIndex1].points}
        placeholder="Puntos"
      />
      <TextInput
        style={styles.textInputPoints}
        onChangeText={handleChange('teams.0.penalties_points')}
        value={values.teams[teamIndex1].penalties_points}
        placeholder="Penaltis"
      />
      </View>
      <View
      style={styles.separador}
        />

      <Text style={styles.tituloE}>Equipo 2</Text>
      <View style ={styles.DPoints}>
      <TextInput
        style={styles.textInputPoints}
        onChangeText={handleChange('teams.1.points')}
        value={values.teams[teamIndex2].points}
        placeholder="Puntos"
      />

      <TextInput
        style={styles.textInputPoints}
        onChangeText={handleChange('teams.1.penalties_points')}
        value={values.teams[teamIndex2].penalties_points}
        placeholder="Penaltis"
      />
      </View>

      
      <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.text}>{title}</Text>
          </Pressable>

      <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.text}>{title2}</Text>
      </Pressable>
    </View>
    </ScrollView>
    </SafeAreaView>
    </>
  )}
  </Formik>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom:10,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "blue",
    padding: 10,
    paddingStart: 25,
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#003d7c",
    borderRadius: 25,
    width: "80%",
    height: 50,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  titulo: {
    fontSize: 20,
    marginTop: 20,
  },
  scroll: {
    marginHorizontal: 0.1,
  },
  FotoButton: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  VS: {
    fontSize: 40,
    marginTop: 10,
  },
  tituloE: {
    fontSize: 40,
    marginTop: 10,
  },
  separador:{
    height: 1,
    borderBottomColor: '#FF0000',
    marginVertical: 10,
  },
  DPoints: {
    flexDirection:'row',
  },
  textInputPoints: {
    borderWidth: 1,
    borderColor: "blue",
    padding: 10,
    paddingStart: 25,
    width: "40%",
    height: 50,
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: "#fff",
    marginRight: 10
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
});
