import React from 'react';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';
import './auth.css';

const Login = ({ username, password, setUsername, setPassword }) => {
  return (
      <>
        <h2>Sign in with your account</h2>
        <Input label="Username:" type="text" value={username} setValue={setUsername} icon={faUser} />
        <Input label="Password:" type="password" value={password} setValue={setPassword} icon={faKey} />
        <div className="submit-container">
          <Button label="Sign In" className="submit-button" icon={faKey} />
        </div>
      </>
  );
};

export default Login;