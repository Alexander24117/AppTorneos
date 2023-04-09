import { View, Text, SafeAreaView, StyleSheet , TouchableOpacity} from "react-native"
import React, { useState, useEffect } from "react"
import { traerJugadorById, eliminarJugador } from "../api/torneos"
import JWTManager from "../api/JWTManager"
import Ionicons from "react-native-vector-icons/Ionicons"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import Modal from 'react-native-modal';
const jwtManager = new JWTManager()

export default function Jugador(props) {
  const {
    navigation,
    route: { params },
  } = props
  const [jugador, setJugador] = useState(null)

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const eliminar = async() => {
    try {
        const jwt = await jwtManager.getToken()
        if (!jwt) {
          return
        }
        const response = await eliminarJugador(jwt, jugador.id)
        console.log(response);
        if(response.message == "Participante desactivado."){
          navigation.goBack()
        }
      } catch (error) {
        console.error(error)
        navigation.goBack()
      }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const jwt = await jwtManager.getToken()
        if (!jwt) {
          return
        }
        const response = await traerJugadorById(jwt, params.id)
        setJugador(response.data.Participants)
      } catch (error) {
        console.error(error)
        navigation.goBack()
      }
    })()
  }, [params])
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableWithoutFeedback
  //         onPress={() =>
  //           navigation.navigate("UpdateJugador", { id: params.id })
  //         }
  //       >
  //         <Ionicons name="ios-pencil-outline" size={38} color="#1d5bad" style={{ marginRight : 10}} />
  //       </TouchableWithoutFeedback>
  //     ),
  //   })
  // }, [jugador])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("UpdateJugador", { id: params.id })}
          >
            <Ionicons name="ios-pencil-outline" size={38} color="#1d5bad" />
          </TouchableWithoutFeedback>
  
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Ionicons name="ios-remove-outline" size={38} color="#1d5bad" />
          </TouchableWithoutFeedback>
        </View>
      ),
    });
  }, [jugador]);
  if (!jugador) return null
  return (
    <>
      <View style={styles.bg} />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.infocontainer}>
          <Text style={styles.name}>Nombre:</Text>  
          <Text style={styles.name}> {jugador.names}</Text>
          </View>
          <View style={styles.infocontainer}>
          <Text style={styles.name}>Apellido:</Text>  
          <Text style={styles.name}> {jugador.surnames}</Text> 
          </View>
          <View style={styles.infocontainer}>
          <Text style={styles.name}>Email:</Text>  
          <Text style={styles.name}> {jugador.email}</Text>
          </View>
          <View style={styles.infocontainer}>
          <Text style={styles.name}>Celular:</Text>  
          <Text style={styles.name}> {jugador.cel_phone}</Text>
          </View>
          <View style={styles.infocontainer}>
          <Text style={styles.name}>identificacion:</Text>  
          <Text style={styles.name}> {jugador.identification}</Text>
          </View>
        </View>

        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              ¿Está seguro que desea eliminar al jugador?
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: 'red', marginRight: 10 }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={async() => {
                 await eliminar();
                setModalVisible(false);
              }}>
                <Text style={{ color: 'blue' }}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  )
}
const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 400,
    position: "absolute",
    borderBottomEndRadius: 300,
    borderBottomLeftRadius: 300,
    backgroundColor: "#07162a",
    transform: [{ scaleX: 2 }],
  },
  content: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 27,
  },
  order: {
    color: "#fff",
    fontWeight: "bold",
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
    width: 100, 
  },
  infocontainer:{
    flexDirection: "row"
  },
  container: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
})
