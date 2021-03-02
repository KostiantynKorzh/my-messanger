import React, {useEffect, useRef, useState} from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import UserHeader from "./UserHeader";
import {Container, Button, Form, ListGroup} from "react-bootstrap";
import ChatService from '../../service/chat-service';
import UserService from '../../service/user-service';
import Message from "./Message";

let stompClient = null;

const Chat = (props) => {

    const senderId = JSON.parse(sessionStorage.getItem("user")).id;

    const [msg, setMsg] = useState('');

    const [chat, setChat] = useState([]);

    const chatEnd = useRef(null);

    const [newMsgSent, setNewMsgSent] = useState(false);

    const [username, setUsername] = useState('');

    useEffect(() => {
        connect();
        getAllMessages()
            .then(() => scrollToLastMessage());
        UserService.getUsernameFromId(props.match.params.id)
            .then(resp => {
                setUsername(resp.data);
            });

    }, [])

    useEffect(() => {
        if (newMsgSent) {
            getAllMessages()
                .then(() => scrollToLastMessage());
            setNewMsgSent(false);
        }
    }, [newMsgSent])

    const getAllMessages = () => {
        return ChatService.getChatMessages(senderId, props.match.params.id)
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
                setNewMsgSent(true);
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
            setNewMsgSent(true);
        }
    };

    const send = (e) => {
        e.preventDefault();
        sendMessage(msg);
        setMsg('');
    }

    const scrollToLastMessage = () => {
        chatEnd.current?.scrollIntoView({behavior: "smooth"});
    }

    return (
        <>
            <UserHeader/>
            <div>Chat with {username}</div>
            <div style={{
                // backgroundColor: '#a8f1ff',
            }}>
                <Container>
                    <ListGroup
                        style={{
                            display: 'block',
                            overflowY: "scroll",
                            height: '70vh',
                        }}>
                        {chat.map((message, i) => {
                            if (message.senderId == senderId) {
                                return <ListGroup.Item id={i} className="text-right"
                                                       style={{
                                                           width: '65%',
                                                           float: 'right',
                                                           border: 'none',
                                                           borderRadius: '4px',
                                                           margin: '5px',
                                                       }}>
                                    <Message message={{
                                        content: message.content,
                                        timestamp: message.timestamp,
                                        backgroundColor: '#a8ffb7'
                                    }}/>
                                </ListGroup.Item>
                            } else {
                                return <ListGroup.Item id={i}
                                                       style={{
                                                           width: '65%',
                                                           float: 'left',
                                                           border: 'none',
                                                           borderRadius: '4px',
                                                           margin: '5px',
                                                       }}>
                                    <Message message={{
                                        content: message.content,
                                        timestamp: message.timestamp,
                                        backgroundColor: '#ccffa8'
                                    }}/>
                                </ListGroup.Item>
                            }
                        })}
                        <div ref={chatEnd} style={{float: 'left',}}/>
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
            </div>
        </>
    )
        ;

};

export default Chat;