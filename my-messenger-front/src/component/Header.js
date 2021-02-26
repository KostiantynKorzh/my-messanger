import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import AuthService from '../service/auth-service';

const Header = () => {

    return (
        <Navbar bg="light">
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
                <Nav.Link href="/"
                          onClick={() => {
                              AuthService.logout();
                          }}>Logout</Nav.Link>
            </Nav>
        </Navbar>
    );

};

export default Header;