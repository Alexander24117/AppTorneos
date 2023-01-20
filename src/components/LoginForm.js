import react from "react";
import { TextInput, Button, View} from "react-native";

export default function LoginForm() {
    return (
        <View>
            <TextInput placeholder="Email"/>
            <TextInput placeholder="Password"/>
            <Button title="LOGIN" onPress={()=> console.log("enviado")}/>
        </View>
    );
}