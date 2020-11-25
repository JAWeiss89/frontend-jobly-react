import React from 'react';
import { Link } from 'react-router-dom';
import './styles/CompanyCard.css';

const CompanyCard = ( {handle, name, description} ) => {
    return (
        <div className="CompanyCard" >
            <Link to={`/companies/${handle}`}>
                <h4>{name}</h4>
            </Link>
            <div className="CompanyCard-description">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default CompanyCard;