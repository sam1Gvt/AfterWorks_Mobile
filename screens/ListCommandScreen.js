import React, {useEffect, useState} from "react"
import {Text, View, StyleSheet, FlatList, Pressable, Alert, RefreshControl} from "react-native"
import listcommandsAPI from "../services/listcommandsAPI";
import DetailCommandScreen from "./DetailCommandScreen";
import {AntDesign, FontAwesome} from '@expo/vector-icons';
import getListStatuts from "../services/listStatutsAPI";
import SelectDropdown from "react-native-select-dropdown";
import updateCommandAPI from "../services/updateCommandAPI";
import CreatePriseEnChargeCommandeAPI from "../services/createPriseEnChargeCommandeAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import getStatutCommand from "../services/getStatutCommand";




const ListCommandScreen = ({navigation}) => {

    const[commands, setCommands] = useState([]);
    const[statuts, setStatuts] = useState([]);




    const listStatutAeffacerSiSelectionner = ["Refusé", "Client parti : avant livraison", "Client parti : après livraison", "Rupture de stock", "Réclamation", "Commande terminée"]

/*    const associationStatut =
        {"Accepté" : "Refusé", "En préparation" : "En attente de livraison","En attente de livraison" : "Livrée salle (attente paiement)",
            "Livrée salle (attente paiement)": "Commande terminée"};*/

    const [refreshing, setRefreshing] = React.useState(false);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchCommands();
        setRefreshing(false)
    }, []);




    const ordreEtat = ["En attente","Accepté", "En préparation", "En attente de livraison", "Livrée salle (attente paiement)", "Commande terminée"]

    const updateCommand =  async (idCommand, idStatut, nomStatut) => {
        try{
            // Premierement voir l'etat de la commande en bdd au cas ou celui ci ai bouger (autre serveur)
            let statutCommandeEnBDD = await getStatutCommand(idCommand.idCommande)
            statutCommandeEnBDD = statutCommandeEnBDD[0]["libelleStatut"]

            // Si statut en bdd est dans liste a effacer alors ne pas faire de modif
            if(!listStatutAeffacerSiSelectionner.includes(statutCommandeEnBDD)){
                // si le statut choisi est un statut apres le statut choisi
                // ainsi impossible de passer de En preparation a accepte par exemple
                let indexStatutCommandeEnBDD = ordreEtat.indexOf(statutCommandeEnBDD);
                let indexStatutChoisi = ordreEtat.indexOf(nomStatut)
                if(indexStatutChoisi > indexStatutCommandeEnBDD){
                    // Faire la MAJ du statut
                    await updateCommandAPI(idCommand.idCommande, idStatut)
                    getEmailInToken().then(res => {
                        createPriseEnCharge(idCommand.idCommande, res, nomStatut)
                    });
                  
                    checkIfItemIsInDeleteList(nomStatut, idCommand)
                    Alert.alert("Commande mise à jour avec succès")

                }
                else{
                    Alert.alert("Erreur", "Impossible de revenir en arrière dans les statuts")
                }

            }
            else{
                Alert.alert("Erreur", "La commande n'est plus traitée");
            }


        }
        catch(error){
            console.log(error)
        }
    }

    const fetchCommands = async () => {
        try {
            const _commands = await listcommandsAPI.getListCommand();
            setCommands(_commands);
        } catch (error){
            console.log(error);
        }
    }


    const fetchStatuts = async () => {
        try {
            const _statuts = await getListStatuts();
            setStatuts(_statuts);
        } catch (error){
            console.log(error);
        }
    }



    const createPriseEnCharge =  async (idCommand, username, libelleStatut) => {
        try{
            //console.log(username, libelleStatut, idCommand)
            await CreatePriseEnChargeCommandeAPI(idCommand, username, libelleStatut)
        }
        catch(error){
            console.log(error)
        }
    }


    // [] : executer useEffect au chargement de la page !
   useEffect(() => {
       fetchCommands()
    }, [])

    useEffect(() => {
        fetchStatuts()
    }, [])

    // Transformer le tableau d'obets en un simple tableau pour le composant SelectDropDown
    let arrayStatuts = [];
    arrayStatuts = statuts.map(function (obj) {
        return [obj.libelleStatut, obj.idStatut];
    });

    // Extraire du tableau ci dessus le libelle

    let TabLibelleStatuts = []
        for(var row of arrayStatuts){
            TabLibelleStatuts.push(row[0])
        }

    const findIdStatutWithLibelleStatut = (libelleStatutRechercher) => {
        for(var row of arrayStatuts){
            if(row[0] === libelleStatutRechercher){
                // retourner l'id de se libeller
                return row[1]
            }
        }
    }

    const checkIfItemIsInDeleteList = (itemSelect, objetCommandTransmis) => {
        // check si l'item selectionner dans la liste deroulante est present dans le tableau listStatutAeffacerSiSelectionner
        for(let item of listStatutAeffacerSiSelectionner){
            if(item == itemSelect){
                // modifier le state de commands (supprimer l'objet si l'objet transmis est celui ci)
                setCommands(commands.filter((o) => objetCommandTransmis !== o));

            }
        }
    }

    const getEmailInToken = async () => {
        try {
            const payload = jwtDecode(await AsyncStorage.getItem("@JWT"));
            const username = payload.username;
            //console.log(username)
            return username

        } catch (e) {
            console.log(e);
        }

    }

    const renderItem = ({ item }) => (
        <>
            <View style={styles.container}>
                <View style={styles.rowInfos}>
                    <Text style={{marginVertical:3}}>
                        Commande n°{item.idCommande} - Table n°{item.noTable}
                    </Text>

                    <Pressable style={styles.iconSetting}  onPress={() => navigation.navigate("DetailCommandScreen", {command: item})}>
                        <AntDesign name="setting" size={25} color="black" />
                    </Pressable>


                </View>

                <SelectDropdown
                    data={TabLibelleStatuts}

                    onSelect={(index) => {
                        updateCommand(item, findIdStatutWithLibelleStatut(index),index)
                        // Pour suivre quel est le personnel qui change les etats


                    }}

                    defaultButtonText={item.libelleStatut}

                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    //dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                    key={item.idCommande}

                />

            </View>
        </>

    );



    return (
        <>
            <View>
                <FlatList
                    data={commands}
                    renderItem={({item}) => (
                        renderItem({item})
                    )}
                    keyExtractor={item => item.idCommande}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 15,
        padding: 15,
        backgroundColor: "coral",
        borderRadius: 20,
        marginRight:30,
        marginLeft:30,
        height:100,

    },
    rowInfos:{
        flexDirection:"row",
        marginBottom: 6
    },
    iconSetting:{
        position: "absolute",  right:0
    },

    dropdown1BtnStyle: {
        width: '100%',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
        marginBottom:15
    },
    dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},

});

export default ListCommandScreen;