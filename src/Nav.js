import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
    render() {
        const { isAuthenticated, logout } = this.props.auth;
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/public">Public</Link>
                    </li>
                    {isAuthenticated() && (
                        <li>
                            <Link to="/private">Private</Link>
                        </li>
                    )}
                    {isAuthenticated() ? (
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    ) : (
                        <li>
                            <Link to="/Signup">Signup</Link>
                        </li>
                    )}
                </ul>
            </nav>
        );
    }
}

export default Nav;
