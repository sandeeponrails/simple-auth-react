import React from "react";

class Signup extends React.Component {
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    signup = () => {
        this.props.auth.signup(this.state);
    };
    render() {
        return (
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
                <button onClick={this.signup}>Signup</button>
            </div>
        );
    }
}
export default Signup;
