import axios from 'axios';
import Constants from "../utils/Constants";

const login = (username, password) => {
    return axios.post(Constants.API_AUTH + 'login', {
        username: username,
        password: password
    }).then(resp => {
        if (resp.data.token) {
            sessionStorage.setItem("user", JSON.stringify(resp.data));
        }
    });
};

const logout = () => {
    sessionStorage.removeItem("user");
};

const signup = (username, password) => {
    axios.post(Constants.API_AUTH + 'signup', {
        username: username,
        password: password
    });
};

export default {
    login,
    logout,
    signup
};