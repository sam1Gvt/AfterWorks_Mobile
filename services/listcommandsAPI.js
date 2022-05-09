import axios from "../config/axios";



const getListCommand = () => {

    return axios
        .get(`/commandes`)
        .then(response => response.data);
}


export default {getListCommand};