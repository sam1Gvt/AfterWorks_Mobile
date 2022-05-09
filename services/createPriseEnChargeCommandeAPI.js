import axios from "../config/axios";

const createPriseEnChargeCommandeAPI = (idCommande, username, libelleStatut) => {

    return axios
        .post ("/createPriseEnChargeCommande", {
            "idCommande": idCommande,
            "username": username,
            "statutCommande": libelleStatut

        })
        .then()
}
export default createPriseEnChargeCommandeAPI;