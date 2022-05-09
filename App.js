import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import LoginStack from "./navigation/loginStackNavigator";

export default function App() {

  return (
      <NavigationContainer>
        <LoginStack>
        </LoginStack>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
