import axios from "axios";
import Constants from "../utils/Constants";
import authHeader from "../utils/auth-header";

const getAllAvailableReceivers = (id) => {
    return axios.get(Constants.API_USERS + id,
        {headers: authHeader()});
};

const getUsernameFromId = (id) => {
    return axios.get(Constants.API_USERS + 'username/' + id,
        {headers: authHeader()});
};

export default {
    getAllAvailableReceivers,
    getUsernameFromId
}