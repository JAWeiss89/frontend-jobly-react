import React, {useState} from 'react';
import JoblyAPI from '../JoblyAPI';
import {useHistory} from 'react-router-dom';
import '../styles/Profile.css';

const Profile = ( {user, setUser} ) => {

    const history = useHistory();

    const initialState = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
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
        console.log({formData});
        const updatedUser = await JoblyAPI.editUser(user.username, formData);
        console.log({updatedUser});
        setUser(updatedUser);
        console.log('User was updated!');
        history.push("/");
    }




    return (
        <div className="Profile">
            <h2>Edit profile.</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name: </label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
                <button>Update Profile</button>
            </form>
        </div>
    )
}

export default Profile;