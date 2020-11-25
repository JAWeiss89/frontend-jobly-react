import React from 'react';
import {Link} from 'react-router-dom';
import JoblyAPI from './JoblyAPI';
import './styles/JobCard.css';

const JobCard = ( {id, title, salary, companyHandle, user} ) => {
    const handleApply = async () => {
        const applied = await JoblyAPI.applyToJob(user.username, id);
        console.log({applied});
    }

    return (
        <div className="JobCard">
            
            <h4>{title}</h4>
            <p className="JobCard-req">Req. ID: {id}</p>
            <p>Salary: {salary}</p>
            <Link to={`/companies/${companyHandle}`}>
                <p className="JobCard-company">Company: {companyHandle}</p>
            </Link>
            {user.applications.includes(id)
            ?<div className="JobCard-applied"><i className="far fa-check-circle"></i>Applied.</div>
            :<button className="JobCard-apply" onClick={handleApply}>Apply!</button>}
            
        </div>
    )
}

export default JobCard;