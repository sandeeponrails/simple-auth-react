export default class Auth {
    constructor(history) {
        this.history = history;
        this.userProfile = null;
    }

    signup = ({ email, password }) => {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({ email: email, password: password })
        };
        fetch("http://localhost:3090/signup", requestOptions)
            .then(response => response.json())
            .then(data => {
                this.history.push("/");
                localStorage.setItem("access_token", data.token);
            })
            .catch(err => {
                this.history.push("/");
                alert(`Error: ${err.error}. Check console.`);
                console.log(err);
            });
    };
    login = ({ email, password }) => {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({ email: email, password: password })
        };
        fetch("http://localhost:3090/signin", requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setSession(data.token);
                this.history.push("/");
            })
            .catch(err => {
                this.history.push("/");
                alert(`Error: ${err.error}. Check console`);
                console.log(err);
            });
    };

    setSession = token => {
        localStorage.setItem("access_token", token);
    };

    isAuthenticated() {
        let storeItem = localStorage.getItem("access_token");
        return storeItem && storeItem.length > 0;
    }

    logout = () => {
        localStorage.removeItem("access_token");
        this.history.push("/");
    };
}
