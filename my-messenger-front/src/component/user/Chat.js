import React, {useEffect} from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const Chat = (props) => {

    useEffect(() => {
        connect();
    }, [])

    const connect = () => {
        let sock = new SockJS("http://localhost:8080/ws");
        const stompClient = Stomp.over(sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        console.log("Connected");
    };

    const onError = () => {
        console.log("Error")
    };

    return (
        <div>Chat {props.match.params.id}</div>
    );

};

export default Chat;