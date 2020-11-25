import React, {useState, useEffect } from 'react';
import Nav from './Nav';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Jobs from './Jobs';
import Companies from './Companies';
import Company from './Company';
import Profile from './Profile';
import JoblyAPI from '../JoblyAPI';
import MessageBox from './MessageBox';


import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import '../styles/App.css';



function App() {

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const flashMessage = (message) => {
    setMessage(message);
    setTimeout(()=>{
      setMessage(null);
    }, 4000);
  }

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      if(localStorage._token && localStorage.username) {
        let foundUser = await JoblyAPI.getUser(localStorage.username);
        setUser(foundUser);
      }
    }
    checkIfLoggedIn();

  }, [])


  return (
    <div className="App">
      <BrowserRouter >
        <Nav  user={user} setUser={setUser}/>
        <MessageBox message={message} />
        <Switch>
          <Route exact path="/">
              <Home user={user}/>
          </Route>
          <Route exact path="/login">
              <Login flashMessage={flashMessage} setUser={setUser}/>
          </Route>
          <Route exact path="/signup">
              <Signup flashMessage={flashMessage} setUser={setUser} />
          </Route>
          <Route exact path="/jobs">
              {user 
              ? <Jobs user={user}/>
              : < Redirect to="/" />}
          </Route>
          <Route exact path="/companies">
              {user 
              ? <Companies />
              : < Redirect to="/" />}
          </Route>
          <Route exact path="/companies/:handle">
              {user
              ? <Company user={user} />
              : <Redirect to="/" />}
          </Route>
          <Route exact path="/profile">
              {user
              ? <Profile user={user} setUser={setUser}/>
              : <Redirect to="/" />}
          </Route>
          <Route>
              <h1>Oh no 404</h1>
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
