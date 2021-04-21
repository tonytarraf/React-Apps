import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Movies App
                </Link>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <NavLink className="nav-item nav-link" to="/movies">
                            Movies
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/customers">
                            Customers
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/rentals">
                            Rentals
                        </NavLink>
                        {!user && (
                            <>
                                <NavLink className="nav-item nav-link" to="/login">
                                    Login
                                </NavLink>
                                <NavLink className="nav-item nav-link" to="/register">
                                    Register
                                </NavLink>
                            </>
                        )}
                        {user && (
                            <>
                                <NavLink className="nav-item nav-link" to="/profile">
                                    {user.name}
                                </NavLink>
                                <NavLink className="nav-item nav-link" to="/logout">
                                    Logout
                                </NavLink>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
