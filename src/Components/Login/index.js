import React, { useState , useContext } from 'react';
import './.css'; // Import the CSS file
import logo from './glc_logo.png'; // Import the company logo image
import axios from 'axios';
import { AppContext } from "../Context";

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(AppContext);

  const handleSubmit = async () => {
    const url = process.env.REACT_APP_HOST + '/user/login'
    console.log(url);
    const data = {
      email: username,
      password: password,
    };
    const resp = await axios.post(url,data);
    if(resp.data.Message == "Success"){

      loginUser(resp.data);

      window.location.reload();
    }
    // Clear the form
    setUsername('');
    setPassword('');
  };

  return (
    <div className="container">
      <div className="login-box">
        <img className="logo" src={logo} alt="Company Logo" />
        <h2>Login</h2>
          <div className="input-group">
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e)=>{setUsername(e.target.value)}}
            />
          </div>
          <div className="input-group">
          <label htmlFor="password">
               {/* Password icon */}
            </label>
            <input
              
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          <button onClick={handleSubmit}>Login</button>

      </div>
    </div>
  );
}

export default Login;
