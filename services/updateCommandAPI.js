import axios from "../config/axios";


const updateCommand = (idCommand, idStatut) => {

    return axios
        .put (`/updateCommande/${idCommand}`, {
            "idStatut":idStatut
        })
        .then()
}

export default updateCommand;