import React from "react";
import { Link } from "react-router-dom";

// we use the Link component when we don't want to refresh our web page.

const NavBar = () => {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/products">Products</Link>
            </li>
            <li>
                <Link to="/posts/2018/06">Posts</Link>
            </li>
            <li>
                <Link to="/admin">Admin</Link>
            </li>
        </ul>
    );
};

export default NavBar;
