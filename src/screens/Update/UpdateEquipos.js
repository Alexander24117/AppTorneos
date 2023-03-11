import { useFormik } from "formik";
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
} from "react-native";
import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { ActuEquipo, traerInstituciones } from "../../api/torneos";
import JWTManager from "../../api/JWTManager";
import * as ImagePicker from "expo-image-picker";

const jwtManager = new JWTManager();
export default function UpdateEquipos(props) {
  const {
    onPress,
    title = "Actualizar Equipo",
    title2 = "Seleccionar Foto",
    navigation,
  } = props;
  const [selectedInsti, setSelectedInsti] = React.useState("");
  const [infoInstitution, setDataInsti] = useState([]);
  const [image, setImage] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const jwt = await jwtManager.getToken();
      if (!jwt) {
        return;
      }
      const response = await traerInstituciones(jwt);
      setDataInsti(
        response.Institutions.map((item) => {
          return {
            key: item.id,
            value: item.name,
          };
        })
      );
    };
    fetchData();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        values.image_64 = "data:image/png;base64," + result.assets[0].base64;
      } else {
        values.image_64 = null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { values, isSubmitting, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      fk_institutions_id: "",
      cel_phone: "",
      landline: "",
      email: "",
      date_birth: "",
      matches_played: 0,
      matches_won: 0,
      matches_tied: 0,
      matches_lost: 0,
      state: 1,
      image_64: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const token = await SecureStore.getItemAsync("token");
      crearEquipo(token, values);
    },
  });
  values.fk_institutions_id = selectedInsti;
  return (
    <SafeAreaView>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Image
            style={{ width: 350, height: 300, marginBottom: 10 }}
            source={require("../../../assets/logojugadores.png")}
          />

          <Text style={styles.titulo}>Digite los datos</Text>

          <TextInput
            style={styles.textInput}
            value={values.name}
            onChangeText={(text) => setFieldValue("name", text)}
            placeholder="Nombre del equipo"
          />

          <TextInput
            style={styles.textInput}
            value={values.cel_phone}
            onChangeText={(text) => setFieldValue("cel_phone", text)}
            placeholder="Telefono"
          />

          <TextInput
            style={styles.textInput}
            value={values.landline}
            onChangeText={(text) => setFieldValue("landline", text)}
            placeholder="landline"
          />

          <TextInput
            style={styles.textInput}
            value={values.email}
            onChangeText={(text) => setFieldValue("email", text)}
            placeholder="Email"
          />
          <TextInput
            style={styles.textInput}
            value={values.date_birth}
            onChangeText={(text) => setFieldValue("date_birth", text)}
            placeholder="Fecha de nacimiento"
          />

          <View style={{ paddingVertical: 20, paddingBottom: -10, width: 320 }}>
            <SelectList
              setSelected={(val) => setSelectedInsti(val)}
              data={infoInstitution}
              save="key"
              inputStyles={{
                marginHorizontal: 40,
                color: "blue",
                backgroundColor: "#ffff",
              }}
              boxStyles={{ borderColor: "blue", backgroundColor: "#ffff" }}
              search={{ placeholder: "aaaaaaaaa" }}
              placeholder="Institucion"
            />
          </View>

          <View style={styles.FotoButton}>
            <Pressable style={styles.button} onPress={pickImage}>
              <Text style={styles.text}>{title2}</Text>
            </Pressable>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200, borderRadius: 20 }}
              />
            )}
          </View>

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.text}>{title}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
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
    marginBottom: 20,
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
  titulo: {
    fontSize: 20,
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
});
