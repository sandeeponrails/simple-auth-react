import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
    state = {
        email: "",
        password: ""
    };
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    signup = () => {
        this.props.auth.signup(this.state);
    };
    login = () => {
        this.props.auth.login(this.state);
    };
    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                <h1>Home</h1>
                {isAuthenticated() ? (
                    <Link to="/profile">View profile</Link>
                ) : (
                    <div>
                        <form>
                            Email:{" "}
                            <input
                                type="text"
                                name="email"
                                onChange={this.handleChange}
                            />
                            password:{" "}
                            <input
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                            />
                        </form>
                        <button onClick={this.login}>Log In</button>
                    </div>
                )}
            </div>
        );
    }
}

export default Home;
