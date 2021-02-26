import React from 'react';
import {Button, Container, Form} from "react-bootstrap";
import Header from "./Header";

const Signup = () => {

    return (
        <div>
            <Header/>
            <Container style={{marginTop: "50px"}}>
                <Form>
                    <Form.Group>
                        <Form.Label>Enter login</Form.Label>
                        <Form.Control type="email" placeholder="login"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Enter password</Form.Label>
                        <Form.Control type="password" placeholder="password"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Signup
                    </Button>
                </Form>
            </Container>
        </div>
    );

};

export default Signup;