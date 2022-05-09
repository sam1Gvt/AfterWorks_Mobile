import React from "react"
import {Text, View, StyleSheet, Pressable} from "react-native"
import {AntDesign} from "@expo/vector-icons";

const LogoutScene = ({navigation}) => {



    return (
        <View style={styles.container}>

            <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={{fontSize:20, borderWidth: 1, padding:15}}>Je me déconnecte</Text>
            </Pressable>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default LogoutScene