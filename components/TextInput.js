import React from "react";
import {View, TextInput as RNTextInput, StyleSheet} from "react-native";
import {Entypo as Icon} from '@expo/vector-icons';

const TextInput = ({icon, ...otherProps}) => {
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Icon
                    name={icon}
                    size={18}
                    color={"#223a4b"}
                />
            </View>
            <View style={styles.input} >
                <RNTextInput
                    {...otherProps}
                />
            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#223a4b",
        borderRadius: 20,
        borderWidth: 1
    },
    icon: {
        padding: 10
    },
    input: {
        flex: 1
    }
})

export default TextInput;