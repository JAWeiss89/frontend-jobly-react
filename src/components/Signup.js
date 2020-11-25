import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import JoblyAPI from '../JoblyAPI';
import '../styles/Signup.css';

const Signup = ( {flashMessage, setUser}) => {

    const history = useHistory();

    const initialState = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    }
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const {name, value } = e.target;
        setFormData( formData => ({
            ...formData, [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await JoblyAPI.register(formData);
            localStorage._token = token;
            localStorage.username = formData.username;
            let foundUser = await JoblyAPI.getUser(localStorage.username);
            setUser(foundUser);
            history.push("/");
        } catch (e) {
            console.log({e});
            flashMessage("Could not register. Please try again.");
        }
    }


    return (
        <div className="Signup">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" onChange={handleChange}/>
                <label htmlFor="password">Password (min length of 5 chars) :</label>
                <input type="password" name="password" id="password" onChange={handleChange}/>
                <label htmlFor="firstName">First Name: </label>
                <input type="text" name="firstName" id="firstName" onChange={handleChange}/>
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" name="lastName" id="lastName" onChange={handleChange}/>
                <label htmlFor="emai">Email (min length of 6 chars) :</label>
                <input type="text" name="email" id="email" onChange={handleChange}/>
                <button>Sign Up!</button>
                <p className="Signup-login">Already have an account? <Link to="/login">Login!</Link></p>
            </form>
        </div>

    )
}

export default Signup;