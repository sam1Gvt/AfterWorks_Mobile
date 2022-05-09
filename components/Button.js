import React, {useState} from "react";
import {Pressable,StyleSheet,Text} from "react-native";
import { Entypo as Icon } from '@expo/vector-icons';

const Button = ({title, icon, ...otherProps}) => {

    const [pressed, setPressed] = useState(false);

    return(
        <Pressable
            style={{
                backgroundColor: pressed ?  "#4169e1" :"#2E4057",
                borderRadius : 25,
                borderWidth : 2,
                alignItems : "center",
                justifyContent : "center"
            }}
            {...otherProps}
            onPressIn={()=>setPressed(true)}
            onPressOut={()=>setPressed(false)}
        >

            <Text style={styles.text}>
                <Icon name={icon} size={20}  />
                {" "}{title}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor:  "#2E4057",
        borderRadius : 20,
        borderWidth : 2,
        borderColor: "#000FFF",
        alignItems : "center",
        justifyContent : "center",

    },
    text: {
        color:'#FFFFFF',
        fontSize : 25
    }
})

export default Button
