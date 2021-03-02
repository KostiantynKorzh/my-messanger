import React, {useEffect, useState} from "react";
import UserHeader from "./UserHeader";
import UserService from '../../service/user-service';
import {ListGroup, Card} from "react-bootstrap";

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
            <Card>
                <Card.Header className="text-center">vvvvvv You can chat with them vvvvvv</Card.Header>
                <ListGroup>
                    {users.map(user =>
                        <ListGroup.Item action href={`/chat/${user.id}`} className="text-center">
                            {user.username}
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
        </div>
    );

};

export default Main;