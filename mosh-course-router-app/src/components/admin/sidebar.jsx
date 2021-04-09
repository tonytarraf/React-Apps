import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <ul>
            <li key="posts">
                <Link to="/admin/posts">Posts</Link>
            </li>
            <li key="users">
                <Link to="/admin/users">Users</Link>
            </li>
        </ul>
    );
};

export default Sidebar;
