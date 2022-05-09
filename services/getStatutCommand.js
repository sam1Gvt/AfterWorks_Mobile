import axios from "../config/axios";



const getStatutCommand = (id) => {

    return axios
        .get(`/statut/command/${id}`)
        .then(response => response.data);
}


export default getStatutCommand;