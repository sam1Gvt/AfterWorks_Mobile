import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import LogoutScreen from "../screens/LogoutScreen";
import {MaterialIcons} from '@expo/vector-icons';
import homeStackNavigator from './homeStackNavigator';
import {Entypo} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


const DefTabNavigator = () => {
    return (
        <Tab.Navigator

            initialRouteName="homeStackNavigator"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#2E4057",
                    borderRadius: 15,
                    fontWeight: "bold",
                    marginBottom: 10,
                    marginHorizontal: 10
                },
                tabBarActiveTintColor: "coral",
                tabBarInactiveTintColor: "white"
            }}

        >
            <Tab.Screen
                name="homeStackNavigator"
                component={homeStackNavigator}

                options={{
                    headerShown : false,
                    tabBarLabel: "Les commandes",
                    tabBarIcon: ({focused, color}) =>
                        <MaterialIcons name="list" size={focused ? 28 : 20} color={color}/>

                }}

            />

            <Tab.Screen
                name="Logout"
                component={LogoutScreen}
                options={{
                    headerTitle: "Déconnexion",
                    tabBarLabel: "Déconnexion",
                    headerStyle: {
                        backgroundColor: "#2E4057"
                    },
                    headerTitleStyle: {
                        color: "white",
                        fontWeight: "bold"
                    },
                    headerTitleAlign: "center",
                    tabBarIcon: ({focused, color}) =>
                        <MaterialIcons name="logout" size={focused ? 28 : 20} color={color}/>

                }}
            />
        </Tab.Navigator>
    )
}


export default DefTabNavigator;