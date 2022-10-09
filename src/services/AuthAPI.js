import axios from 'axios';
import jwtDecode from 'jwt-decode';

function authenticate(credentials) {
    return axios
        .post("http://127.0.0.1:8000/api/login_check", credentials)
        .then(response => {
            // je stock mon token dans le local storage
            const token = response.data.token;
            window.localStorage.setItem('authToken', token)
            axios.defaults.headers["Authorization"] = "Bearer " + token;
            return token;
        })
}

function logout(){
    window.localStorage.removeItem('authToken');
    delete  axios.defaults.headers["Authorization"];
}

function setup(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const {exp} = jwtDecode(token);
        if(exp * 1000 > new Date().getTime()){
            axios.defaults.headers["Authorization"] = "Bearer " + token;
        }else{
            logout();
        }
    }else{
        logout();
    }
}

export default {
    authenticate,
    logout,
    setup
}