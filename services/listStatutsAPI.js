import axios from "../config/axios";



const getListStatuts = () => {

    return axios
        .get(`/statuts`)
        .then(response => response.data);
}


export default getListStatuts;