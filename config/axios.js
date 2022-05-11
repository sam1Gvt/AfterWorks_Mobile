import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create(
    {
        //"baseURL": "http://192.168.1.46:8000/api/"
        "baseURL": "http://172.20.10.9:8000/api/"
    }
);




axiosInstance.interceptors.request.use(async (request) => {
    // Recuperer le token dans le localStorage

    const token = await AsyncStorage.getItem("@JWT")
    if(token){
        request.headers.Authorization = `Bearer ${token}`
    }
    return request

    }
)


export default axiosInstance;

// demander si il faut un bouton refresh
// voir key dans page detail

