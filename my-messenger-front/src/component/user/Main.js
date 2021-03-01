import React, {useEffect, useState} from "react";
import UserHeader from "./UserHeader";
import UserService from '../../service/user-service';
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient = null;

const Main = () => {

    const [users, setUsers] = useState([]);

    const id = JSON.parse(sessionStorage.getItem("user")).id;

    useEffect(() => {
        UserService.getAllAvailableReceivers(id)
            .then((resp) => {
                setUsers(resp.data);
            })
    }, [])

    return (
        <div>
            <UserHeader/>
            {users.map(user =>
                <div>
                    <a href={`/chat/${user.id}`}>{user.username}</a>
                </div>
            )}
        </div>
    );

};

export default Main;