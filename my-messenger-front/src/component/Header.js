import React from 'react';
import {Nav, Navbar} from "react-bootstrap";

const Header = () => {

    return (
        <Navbar bg="light">
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
            </Nav>
        </Navbar>
    );

};

export default Header;