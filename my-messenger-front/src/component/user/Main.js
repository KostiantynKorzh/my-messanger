import React, {useEffect, useState} from "react";
import UserHeader from "./UserHeader";
import UserService from '../../service/user-service';

const Main = () => {

    const [users, setUsers] = useState([]);

    const id = JSON.parse(localStorage.getItem("user")).id;

    useEffect(() => {
        UserService.getAllAvailableReceivers(id)
            .then((resp) => {
                setUsers(resp.data);
            })
    }, [])

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