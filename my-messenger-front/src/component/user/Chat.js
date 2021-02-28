import React, {useEffect, useState} from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import UserHeader from "./UserHeader";
import {Button, Form} from "react-bootstrap";

let stompClient = null;

const Chat = (props) => {

    const id = JSON.parse(localStorage.getItem("user")).id;

    const [msg, setMsg] = useState('');

    useEffect(() => {
        connect();
    }, [])


    const connect = () => {
        let sock = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        console.log("Connected");

        stompClient.subscribe("/user/" + id + "/queue/messages",
            onMessageReceived);

    };

    const onMessageReceived = () => {
        console.log("onMessageReceived");
    };

    const onError = () => {
        console.log("Error")
    };

    const sendMessage = (msg) => {
        if (msg.trim() !== "") {
            const message = {
                senderId: id,
                receiverId: props.match.params.id,
                content: msg,
                timestamp: new Date()
            };

            stompClient.send("/app/chat", {}, JSON.stringify(message));
        }

    };

    return (
        <>
            <UserHeader/>
            <div>Chat with {props.match.params.id}</div>

            <Form>
                <Form.Group controlId="message">
                    <Form.Control type="text"
                                  placeholder="Your message"
                                  value={msg}
                                  onChange={(e) => {
                                      setMsg(e.target.value);
                                  }}/>
                </Form.Group>
                <Button variant="primary"
                        onClick={(e) => {
                            e.preventDefault();
                            sendMessage(msg);
                            setMsg('');
                        }}>
                    Submit
                </Button>
            </Form>
        </>
    );

};

export default Chat;