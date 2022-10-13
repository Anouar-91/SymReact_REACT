import axios from 'axios';
import jwtDecode from 'jwt-decode';

function authenticate(credentials) {
    return axios
        .post(process.env.REACT_APP_API_URL + "login_check", credentials)
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

function isAuthenticated() {
    const token = window.localStorage.getItem('authToken');
    if (token) {
        const jwtData = jwtDecode(token);
        if (jwtData.exp * 1000 > (new Date().getTime())) {
            return true;

        } else {
            return false;
        }
    } else {
        return false;
    }
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
}