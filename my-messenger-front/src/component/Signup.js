import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import Header from "./Header";
import AuthService from "../service/auth-service";

const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <Header/>
            <Container style={{marginTop: "50px"}}>
                <Form>
                    <Form.Group>
                        <Form.Label>Enter login</Form.Label>
                        <Form.Control type="text" placeholder="login"
                                      onChange={(e) => {
                                          setUsername(e.target.value)
                                      }}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Enter password</Form.Label>
                        <Form.Control type="password" placeholder="password"
                                      onChange={(e) => {
                                          setPassword(e.target.value)
                                      }}/>
                    </Form.Group>
                    <Button variant="primary" type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                AuthService.signup(username, password);
                            }}>
                        Signup
                    </Button>
                </Form>
            </Container>
        </div>
    );

};

export default Signup;