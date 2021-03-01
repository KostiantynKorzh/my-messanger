import axios from 'axios';
import Constants from "../utils/Constants";
import authHeader from "../utils/auth-header";

const getChatMessages = (senderId, receiverId) => {
    return axios.get(Constants.API_CHAT + senderId + '/' + receiverId,
        {headers: authHeader()});
};

export default {
    getChatMessages
}