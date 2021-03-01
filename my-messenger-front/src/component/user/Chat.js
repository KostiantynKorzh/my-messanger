import React, {useEffect, useRef, useState} from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import UserHeader from "./UserHeader";
import {Container, Button, Form, ListGroup} from "react-bootstrap";
import ChatService from '../../service/chat-service';

let stompClient = null;

const Chat = (props) => {

    const senderId = JSON.parse(sessionStorage.getItem("user")).id;

    const [msg, setMsg] = useState('');

    const [chat, setChat] = useState([]);

    const chatEnd = useRef(null);

    useEffect(() => {
        connect();
        getAllMessages();
        scrollToLastMessage();
    }, [])

    useEffect(() => {
        getAllMessages();
        scrollToLastMessage();
    }, [chat])

    const getAllMessages = () => {
        ChatService.getChatMessages(senderId, props.match.params.id)
            .then(resp => {
                setChat(resp.data);
            });
    }

    const connect = () => {
        let sock = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        console.log("Connected");

        const subLink = "/user/" + senderId + "/queue/messages";

        stompClient.subscribe(subLink,
            function (resp) {
                console.log(resp);
                let data = JSON.parse(resp.body);
                setChat(prev => [...prev, data.content]);
            });

    };

    const onError = () => {
        console.log("Error")
    };

    const sendMessage = (msg) => {
        if (msg.trim() !== "") {
            const message = {
                senderId: senderId,
                receiverId: props.match.params.id,
                content: msg,
                timestamp: new Date()
            };

            stompClient.send("/app/chat", {}, JSON.stringify(message));
            setChat(prev => [...prev, message]);
        }
    };

    const send = (e) => {
        e.preventDefault();
        sendMessage(msg);
        setMsg('');
    }

    const scrollToLastMessage = () => {
        chatEnd.current?.scrollIntoView();
    }

    return (
        <>
            <UserHeader/>
            <div>Chat with {props.match.params.id}</div>

            <Container>
                <ListGroup style={{overflowY: "scroll", maxHeight: '70vh'}}>
                    {chat.map((message, i) => {
                        if (message.senderId == senderId) {
                            return <ListGroup.Item id={i} className="text-right">{message.content}</ListGroup.Item>
                        } else {
                            return <ListGroup.Item id={i}>{message.content}</ListGroup.Item>
                        }
                    })}
                    <div ref={chatEnd}/>
                </ListGroup>
            </Container>

            <Form>
                <Form.Group controlId="message">
                    <Form.Control type="text"
                                  placeholder="Your message"
                                  value={msg}
                                  onKeyPress={(e) => {
                                      if (e.charCode == 13) {
                                          send(e);
                                      }
                                  }}
                                  onChange={(e) => {
                                      setMsg(e.target.value);
                                  }}/>
                </Form.Group>
                <Button variant="primary"
                        onClick={(e) => send(e)}>
                    Submit
                </Button>
            </Form>
        </>
    );

};

export default Chat;