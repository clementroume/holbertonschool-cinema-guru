import React, { useState } from 'react';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import Button from '../../components/general/Button';
import './auth.css';

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
  const [_switch, setSwitch] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    setSwitch(true);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setSwitch(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = _switch ? '/api/auth/login' : '/api/auth/register';
    axios.post(url, { username, password })
    .then((response) => {
      localStorage.setItem('accessToken', response.data.accessToken);
      setUserUsername(username);
      setIsLoggedIn(true);
    });
  };

  return (
      <form className="authentication" onSubmit={handleSubmit}>
        <div className="auth-buttons">
          <Button label="Sign In" onClick={handleSignIn} className={_switch ? 'active' : ''} />
          <Button label="Sign Up" onClick={handleSignUp} className={!_switch ? 'active' : ''} />
        </div>

        <div className="auth-form">
          {_switch ? (
              <Login
                  username={username}
                  password={password}
                  setUsername={setUsername}
                  setPassword={setPassword}
              />
          ) : (
              <Register
                  username={username}
                  password={password}
                  setUsername={setUsername}
                  setPassword={setPassword}
              />
          )}
        </div>
      </form>
  );
};

export default Authentication;