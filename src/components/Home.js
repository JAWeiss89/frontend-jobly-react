import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = ( {user} ) => {
    return (
    <div className="Home">
        <h1>Jobly</h1>
        <p>All the jobs in one, convenient place.</p>
        {user 
        ? <Link to="/jobs"><button>Jobs <i className="fas fa-chevron-right"></i><i className="fas fa-chevron-right"></i></button></Link>
        : <Link to="/login"><button>Log In</button></Link>
        }
        <div className="Home-skyline">
            <i className="fas fa-hotel"></i>
            <i className="fas fa-building"></i>
            <i className="far fa-building"></i>
            <i className="fas fa-warehouse"></i>
            <i className="far fa-building"></i>
            <i className="far fa-building"></i>
            <i className="fas fa-monument"></i>
            <i className="fas fa-school"></i>
            <i className="fas fa-gopuram"></i>
            <i className="fas fa-building"></i>
            <i className="fas fa-building"></i>
            <i className="far fa-hospital"></i>
            <i className="fas fa-building"></i>
            <i className="fas fa-hotel"></i>
            <i className="fas fa-church"></i>

        </div>
    </div>
    )
}
    

export default Home;
