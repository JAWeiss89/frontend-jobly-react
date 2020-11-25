import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import JoblyAPI from '../JoblyAPI';
import '../styles/Jobs.css';

const Jobs = ( {user} ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState(null);
    const [searchField, setSearchField] = useState("");

    const handleChange = (e) => {
        setSearchField(e.target.value);
    } 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (searchField==='') {
            setSearchField(' ');
        }
        const title = searchField;
        const foundJobs = await JoblyAPI.searchJobs(title);
        setJobs(foundJobs);
    }

    useEffect(() => {
        async function getJobs() {
            let jobs = await JoblyAPI.getJobs();
            setJobs(jobs);
            setIsLoading(false);
        }
        getJobs();
    }, []);
    if (isLoading) {
        return <p>Loading ...</p>
    }
    return (
        <div className="Jobs-page">
            <form onSubmit={handleSubmit} className="search-form">
                <input type="text" value={searchField} placeholder="Search jobs.." onChange={handleChange} />
                <button>Search</button>
            </form>
            <div className="Jobs">
                {jobs.map((job) => (
                    <JobCard id={job.id} title={job.title} salary={job.salary} companyHandle={job.companyHandle} user={user} key={job.id} />
                ))}
            </div>
        </div>

    )
}

export default Jobs;