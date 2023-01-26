import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import SafeAreaView from 'react-native-safe-area-view';
import {useNavigation} from '@react-navigation/native';
import { Formik } from 'formik';
import RegisterSchema from '../validation/Register'
import {saveJugador} from '../api/torneos'

export default function CreateJugador(props) {
    const navigation = useNavigation();
    const {navigate} = navigation;

    const [errorMessage, setErrorMessage] = useState('');
    async function _onRegister(values) {
        const {names, surnames, identificacition, cel_phone, email, date_birth} = values;
        await saveJugador(values);
        
      }

  return (
    <SafeAreaView>
        <Formik
            initialValues={{
                names: "",
                surnames:"",
                identificacition:"",
                cel_phone: "",
                email:"",
                date_birth: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={values=>{
                _onRegister(values);
            }}>
                <View>
                    <View>
                        <View>
                            <Text> Name</Text>
                            <TextInput />
                        </View>
                    </View>
                </View>
            </Formik>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create()