import axios from 'axios';
import Constants from "../Constants";

const API_AUTH = Constants.API_URL + '/auth';

const login = (username, password) => {
    return axios.post(API_AUTH + '/login', {
        username: username,
        password: password
    }).then(resp => {
        if (resp.data.token) {
            localStorage.setItem("user", JSON.stringify(resp.data));
        }
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

const signup = (username, password) => {
    axios.post(API_AUTH + '/signup', {
        username: username,
        password: password
    });
};

export default {
    login,
    logout,
    signup
};