import React, {useEffect, useState} from "react";
import {View, Text, Button, StyleSheet, ScrollView} from "react-native"
import axios from "axios"
import {format} from "date-fns";
import detailCommandAPI from "../services/detailCommandAPI";
import listcommandsAPI from "../services/listcommandsAPI";
import SelectDropdown from "react-native-select-dropdown";
import {FontAwesome} from "@expo/vector-icons";
import updateCommandAPI from "../services/updateCommandAPI";
import getPriseEnChargeCommandeAPI from "../services/getPriseEnChargeCommandeAPI";


const DetailCommandScreen = ({route}) => {

    const {command} = route.params;
    //const {ListStatuts} = route.params;


    const[produits, setProduits] = useState([]);
    const[priseEnChargeCommande, setPriseEnChargeCommande] = useState([])
    //const[statuts, setStatuts] = useState(ListStatuts)


    const fetchProduits = async () => {
        try {
            const _produits = await detailCommandAPI(command.idCommande);
            setProduits(_produits);
        } catch (error){
            console.log(error);
        }
    }
    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchProduits()
    }, [])

    const fetchPriseEnChargeCommande = async () => {
        try {
            const _priseEnChargeCommande = await getPriseEnChargeCommandeAPI(command.idCommande);
            setPriseEnChargeCommande(_priseEnChargeCommande);
        } catch (error){
            console.log(error);
        }
    }
    // [] : executer useEffect au chargement de la page !
    useEffect(() => {
        fetchPriseEnChargeCommande()
    }, [])


    //console.log(produits)

    return (

        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.titre}> Commande n°{command.idCommande} </Text>

            <View style={styles.infosBlock}>
                <Text style={{fontWeight:"bold", fontSize:15}}>Informations</Text>
                <Text style={styles.infosRow}>Date de la commande : {format(new Date(command.dateCommande.replace(/ /g, "T")), "dd/MM/yyyy HH:mm")}</Text>
                <Text style={styles.infosRowTable}>Table : {command.noTable}</Text>
                {/*<Text style={styles.infosRow}>Statut actuel : {command.libelleStatut}</Text>*/}
                <Text style={styles.infosRow}>-----------------------------------------</Text>


                <Text style={{fontWeight:"bold", fontSize:15, marginTop:15}}>Détail de la commande</Text>
                {produits.map((produit) => {
                    return (
                        <View style={styles.blockProduits} key={produit.idProduitCommande} >
                            <Text style={styles.infosProduit}>Produit : {produit.libelleProduit}</Text>
                            <Text style={styles.infosProduits}>Quantité : {produit.quantiteProduit}</Text>
                            <Text style={styles.infosProduits} >Prix : {produit.prixHt}</Text>
                            <Text style={styles.infosProduits}>TVA : {produit.montantTva}</Text>
                            <Text style={styles.infosProduits}>Déclinaison du produit : {produit.libelleDeclinaison}</Text>
                        </View>
                    )
                })
                }


                <Text style={styles.infosRow}>-----------------------------------------</Text>

                <Text style={{fontWeight:"bold", fontSize:15, marginTop:15}}>Prise en charge de la commande</Text>

                {priseEnChargeCommande.map((infos) => {
                    return (
                        <View style={styles.blockProduits} key={infos.idPriseEnCharge}>
                            <Text style={styles.infosProduits}>Personnel : {infos.username}</Text>
                            <Text style={styles.infosProduits}>Statut : {infos.statutCommande}</Text>
                        </View>
                    )
                })
                }
               {/* <SelectDropdown
                    data={TabLibelleStatuts}

                    onSelect={(index) => {
                        updateCommand(command.idCommande, findIdStatutWithLibelleStatut(index))
                    }}
                    defaultButtonText={command.libelleStatut}

                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    //dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}

                />*/}
            </View>

            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        marginBottom: 15
        //justifyContent: "center",
        //alignItems: "center",
    },
    titre: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 30
    },
    infosBlock: {
        marginTop : 50,
        marginLeft: 35,
        width: '75%'
    },
    infosRow : {
        fontSize:15,

    },
    infosRowTable : {
        fontSize:15,
        color:"red"

    },
    infosProduits: {
        fontSize:15,

    },
    infosProduit: {
        fontSize:15,
        color: "green"
    },
    blockProduits: {
        marginTop: 15,
        marginBottom : 10
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

})


export default DetailCommandScreen