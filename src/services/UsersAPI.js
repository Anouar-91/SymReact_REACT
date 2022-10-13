import axios from "axios";

function register(user){
    return axios.post('process.env.REACT_APP_API_URL + "users', user);
}

export default {
    register
}