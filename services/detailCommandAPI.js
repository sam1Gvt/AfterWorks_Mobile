import axios from "../config/axios";



const getDetailCommand = (idCommand) => {

    return axios
        .get(`/detailCommande/${idCommand}`)
        .then(response => response.data);
}


export default getDetailCommand;