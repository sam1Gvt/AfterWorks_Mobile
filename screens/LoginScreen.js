import React, {useState} from "react"
import {Text, View, StyleSheet, Alert} from "react-native"
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import axiosInstance from "../config/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScene = ({navigation}) => {

    // States
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isChekingLogin, setIsChekingLogin] = useState(false);

    // API
    const connexion = async () => {

        //Début du login
        setIsChekingLogin(true);
        //Intérogation du l'API
        axiosInstance.post("login_check",
            {username: username, password: password})
            .then(async (response) => {
                    // console.log(response.data);
                    //Storage du token
                    await storeData(response.data.token, "@JWT"),
                        //Fin du login
                        setIsChekingLogin(false),
                        //Navigation sur un autre screen
                        // navigation.replace("DefTab")
                        navigation.navigate("DefTab")
                }
            )
            .catch(e => {
                console.log(e);
                setIsChekingLogin(false);
                Alert.alert("Erreur", "Mauvais crédentials");
            })


    };


    // AsyncStorage
    const storeData = async (value, key) => {
        try {
            await AsyncStorage.setItem(key, value);
            //console.log("Is stored under the key " + key + value);
        } catch (e) {
            // saving error
            console.log(e);
        }

    }

    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            // console.log(value)
            return value;
        } catch (e) {
            // error reading value
            console.log(e);
        }

    }


    // Vue
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>

            {/*login*/}
            <View style={styles.input}>
                <TextInput
                    icon="mail"
                    placeholder="Entrez votre mail"
                    keyboardType="email-address"
                    onChangeText={text => setUsername(text)}
                />

            </View>

            {/*password*/}
            <View style={styles.input}>
                <TextInput
                    icon="key"
                    placeholder="Mot de passe"
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={connexion}
                />
            </View>

            {/*Button*/}
            <View style={styles.button}>
                <Button
                    title={isChekingLogin ? "Traitement..." : "Connexion"}
                    icon={isChekingLogin ? "back-in-time" : "login"}
                    // onPress={() => console.log({username, password})}
                    onPress={connexion}

                />
            </View>

            {/*/!*Test*!/*/}
            {/*<View style={styles.button}>*/}
            {/*    <Button*/}
            {/*        title={"Test"}*/}
            {/*        onPress={async () => {*/}
            {/*            const value = await getData("@JWT");*/}
            {/*            console.log(value);*/}
            {/*        } }*/}
            {/*        // onPress={connexion}*/}
            {/*    />*/}
            {/*</View>*/}

        </View>
    )

}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: "#2E4057",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 40
    },
    input: {
        width: "100%",
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    button: {
        width: "50%",
        margin: 3,
        //borderWidth: 1
        //backgroundColor : '#2E4057',
    }
})

export default LoginScene