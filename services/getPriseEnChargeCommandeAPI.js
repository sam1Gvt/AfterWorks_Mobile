import axios from "../config/axios";



const getPriseEnChargeCommande = (idCommand) => {

    return axios
        .get(`/priseEnChargeCommande/${idCommand}`)
        .then(response => response.data);
}


export default getPriseEnChargeCommande;