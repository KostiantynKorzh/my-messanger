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
        connect();
    }, [])


    const connect = () => {
        let sock = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        console.log("Connected");

        const subLink = "/user/" + id + "/queue/messages";

        console.log(subLink);

        stompClient.subscribe(subLink,
            onMessageReceived);

    };

    const onMessageReceived = () => {
        console.log("onMessageReceived");
    };

    const onError = () => {
        console.log("Error")
    };


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