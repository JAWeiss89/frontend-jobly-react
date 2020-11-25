import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyAPI {
    static async request(endpoint, paramsOrData = {}, verb = "get") {

      const token = localStorage._token;
      console.debug("API Call:", endpoint, paramsOrData, verb);

      try {
          if (token) {
            return (await axios({
                method: verb,
                url: `${BASE_URL}/${endpoint}`,
                headers: {
                    'authorization': `Bearer ${token}`
                },
                [verb === "get" ? "params" : "data"]: paramsOrData})).data;
                // axios sends query string data via the "params" key,
                // and request body data via the "data" key,
                // so the key we need depends on the HTTP verb
          } else {
            return (await axios({
                method: verb,
                url: `${BASE_URL}/${endpoint}`,
                [verb === "get" ? "params" : "data"]: paramsOrData})).data;
                // axios sends query string data via the "params" key,
                // and request body data via the "data" key,
                // so the key we need depends on the HTTP verb
          }

      }

  
      catch(err) {
        console.error("API Error:", err.response);
        let message = err.response.data.message;
        throw Array.isArray(message) ? message : [message];
      }
    }
  
    static async getCompany(handle) {
      let res = await this.request(`companies/${handle}`);
      return res.company;
    }

    static async getCompanies() {
        let res = await this.request('companies');
        return res.companies;
    }

    static async searchCompanies(name) {
        let res = await this.request('companies', {name})
        return res.companies;
    }

    static async getJobs() {
        let res = await this.request('jobs');
        return res.jobs;
    }

    static async searchJobs(title) {
        let res = await this.request('jobs', {title})
        return res.jobs;
    }

    // retrieve user instance for profile. Only same user or admin are authorized
    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    // Edit user info. Only same user or admin are authorized
    static async editUser(username, userObj) {
        let res = await this.request(`users/${username}`, userObj, 'patch');
        return res.user;
    }

    // Apply to Job. Only same user or admin are authorized
    static async applyToJob(username, jobId) {
        let res = await this.request(`users/${username}/jobs/${jobId}`, {}, 'post');
        return res.applied;
    }

    // auth API calls

    static async authenticate(credentials) {
        let res = await this.request('auth/token', credentials, 'post');
        return res.token;
    }

    // Register new user

    static async register(user) {
        let res = await this.request('auth/register', user, 'post');
        return res.token;
    }


}

export default JoblyAPI;    
