import React, {useState, useEffect} from 'react';
import JoblyAPI from './JoblyAPI';
import CompanyCard from './CompanyCard';
import './styles/Companies.css';

const Companies = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const [searchField, setSearchField] = useState("");

    const handleChange = (e) => {
        setSearchField(e.target.value);
    } 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (searchField==='') {
            setSearchField(' ');
        }
        const name = searchField;
        const foundCompanies = await JoblyAPI.searchCompanies(name);
        setCompanies(foundCompanies)
    }

    useEffect(() => {
        async function getCompanies() {
            let companies = await JoblyAPI.getCompanies();
            setCompanies(companies);
            setIsLoading(false);
        }
        getCompanies();
    }, []);

    if (isLoading) {
        return <p>Loading ...</p>
    }

    return (
        <div className="Companies-page">
            <form onSubmit={handleSubmit} className="search-form">
                <input type="text" value={searchField} placeholder="Search companies.." onChange={handleChange} />
                <button>Search</button>
            </form>
            <div className="Companies" >
                {companies.map(company => (
                    <CompanyCard handle={company.handle} name={company.name} description={company.description} key={company.handle}/>
                ))}
            </div>
        </div>

    )
}

export default Companies;