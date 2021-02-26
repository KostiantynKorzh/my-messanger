import axios from 'axios';
import Constants from "../Constants";

const API_AUTH = Constants.API_URL + '/auth';

const login = (username, password) => {
    axios.post(API_AUTH + '/login', {
        username: username,
        password: password
    }).then(() => console.log("Successfully logged in"))
        .catch(() => console.log("NOOOOOOO"))
};

export default {
    login
};