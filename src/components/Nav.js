import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styles/Nav.css'

const Nav = ( { user, setUser} ) => {
    const history = useHistory();
    const logout = () => {
        localStorage.clear();
        setUser(null);
        history.push("/");
    }
    return (
        <div className="Nav">
            <div className="Nav-home">
                <Link to="/">Jobly<i className="fas fa-briefcase"></i></Link>
            </div>
            {user 
            ? <div className="Nav-links">
                <Link to="/companies">Companies</Link>
                <Link to="/jobs">Jobs</Link>
                <Link to="/profile">Profile</Link>
                <Link onClick={logout} to="/">Logout @{user.username}</Link>
              </div>
            : <div className="Nav-links">
                <Link to="/login">Login</Link>
              </div>}
        </div>
    )
}

export default Nav;