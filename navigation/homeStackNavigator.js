import {createStackNavigator} from "@react-navigation/stack";
import ListCommandScreen from "../screens/ListCommandScreen";
import DetailCommandScreen from "../screens/DetailCommandScreen";
import {MaterialIcons} from "@expo/vector-icons";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

const HomeNavigator = () => {
    return(
        <Stack.Navigator
            screenOptions={ {
                headerStyle: {
                    backgroundColor: "#2E4057"
                },
                headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold"
                },
                headerTitleAlign: "center",
        } }>
            <Stack.Screen
                name="ListCommandScreen"
                component={ListCommandScreen}
                options={
                    {
                        headerTitle: "Liste des commandes"
                    }
                }
            />
            <Stack.Screen
                name="DetailCommandScreen"
                component={DetailCommandScreen}
                options={
                    {
                        headerTitle: "Détail de la commande"
                    }
                }
            />
        </Stack.Navigator>
    )
}
export default HomeNavigator;