import axios from "axios";
import host from "./host";
const axiosConfig = axios.create({
    baseURL:`${host}`,
    timeout: 10000,
    headers:{
        "Content-Type": "application/json"
    }
})
axiosConfig.interceptors.request.use(
    config=>{
        return config
    },
    error=> {return Promise.reject(error)}
)

axiosConfig.interceptors.response.use(
    config =>{
        return config
    },
    error=> {return Promise.reject(error)}

)

export default axiosConfig