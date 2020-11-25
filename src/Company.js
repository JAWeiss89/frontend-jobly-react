import React, {useState, useEffect} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import JoblyAPI from './JoblyAPI';
import JobCard from './JobCard';
import './styles/Company.css';



const Company = ( {user} ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState(null);

    const {handle} = useParams();

    useEffect(() => {
        async function getCompany() {
            let company = await JoblyAPI.getCompany(handle);
            setCompany(company);
            setIsLoading(false);
        }
        getCompany();
    }, [handle]);
    
    if (isLoading) {
        return <p>Loading ...</p>
    }

    return (
        <div className="Company">
            <h2>{company.name}</h2>
            <h3 className="Company-description">{company.description}</h3>
            {company.jobs.length !== 0
            ? <>
                <h3 className="Company-jobs-header">Jobs:</h3>
                <div className="Company-jobs">
                    {company.jobs.map((job)=> (
                        < JobCard key={job.id} id={job.id} title={job.title} salary={job.salary} user={user}/>
                    ))}
                </div>
              </>
            :<p>This company currently doesn't have any job postings. Check back soon!</p>
            }
        </div>
    )
}

export default Company;