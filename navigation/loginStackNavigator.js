import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import NavigationBar from "./navigationBar";



const Stack = createNativeStackNavigator();


const LoginStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={ {
                headerShown : false
            } }
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="DefTab"
                component={NavigationBar}

            />

        </Stack.Navigator>


    )
}

export default LoginStack;