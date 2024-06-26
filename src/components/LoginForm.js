import react, { useState, useEffect } from "react"
import {
  TextInput,
  Button,
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Alert,
  SafeAreaView,
  ToastAndroid
} from "react-native"
import { login } from "../api/torneos"
import { useFormik } from "formik"
import JWTManager from "../api/JWTManager"
import * as SecureStore from "expo-secure-store"

const jwtManager = new JWTManager()

export default function LoginForm(props) {
  const { onPress, title = "Login", navigation } = props
  const [username, setUsername] = useState("")
  const [token, setToken] = useState(null)
  useEffect(() => {
    const validarToken = async () => {
      const token = await jwtManager.getToken()
      if (token) {
        navigation.navigate("Navigation")
      }
    }
    // validarToken();
  }, [])

  const { values, isSubmitting, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      password: "",
      email: "",
    },

    onSubmit: async (values) => {
      try{
        const tokenService = await login(values)
        if (!(tokenService === undefined)) {
          jwtManager.setJWT(tokenService.access_token)
          SecureStore.setItemAsync("userId", tokenService.user_id.toString())
          navigation.navigate("Navigation")
        }
        else if(tokenService === undefined){
          ToastAndroid.show('Datos incorrectos', ToastAndroid.SHORT);
        }} 
        catch (error) {
          throw error
        }
    },
  })

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 300, height: 300, marginBottom: 10 }}
        source={require("../../assets/logouni.png")}
      />
      <Text style={styles.titulo}>B-Sports Movil</Text>
      <TextInput
        style={styles.textInput}
        value={values.email}
        onChangeText={(text) => setFieldValue("email", text)}
        placeholder="Email"
      />
      <TextInput
        style={styles.textInput}
        value={values.password}
        onChangeText={(text) => setFieldValue("password", text)}
        placeholder="Password"
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.text}>{title}</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 40,
    fontWeight: "bold",
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
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#074CBD",
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
})
