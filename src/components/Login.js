import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import JoblyAPI from '../JoblyAPI';
import '../styles/Login.css';

const Login = ( {setUser, flashMessage} ) => {
    const [usernameField, setUsernameField] = useState("");
    const [passwordField, setPasswordField] = useState("");

    const handleUsernameChange = (event) => {
        setUsernameField(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPasswordField(event.target.value);
    }
    const history = useHistory();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const credentials = {username: usernameField, password: passwordField};
        try {
            const token = await JoblyAPI.authenticate(credentials);
            localStorage._token = token;
            localStorage.username = usernameField;
            let foundUser = await JoblyAPI.getUser(localStorage.username);
            setUser(foundUser);
            history.push("/");
        } catch (e) {
            flashMessage("Could not authenticate. Please try again.");
            setPasswordField("");
        }
    }


    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" onChange={handleUsernameChange} value={usernameField} id="username" name="username" />
                <label htmlFor="password">Password:</label>
                <input type="password" onChange={handlePasswordChange} value={passwordField} id="password" name="password" />
                <button>Submit</button>
                <p className="Login-signup">New to Jobly? <Link to="/signup">Sign Up!</Link></p>
            </form>
        </div>

    )
}

export default Login;