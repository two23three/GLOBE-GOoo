import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signin', {
        email: signInEmail,
        password: signInPassword,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      history.push('/dashboard');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', {
        email: signUpEmail,
        password: signUpPassword,
        confirmPassword: signUpConfirmPassword,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      history.push('/dashboard');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <h1>Profile</h1>
      <form onSubmit={handleSignIn}>
        <h2>Sign In</h2>
        <label>Email:</label>
        <input
          type="email"
          value={signInEmail}
          onChange={(e) => setSignInEmail(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={signInPassword}
          onChange={(e) => setSignInPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Sign In</button>
      </form>
      <form onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <label>Email:</label>
        <input
          type="email"
          value={signUpEmail}
          onChange={(e) => setSignUpEmail(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={signUpPassword}
          onChange={(e) => setSignUpPassword(e.target.value)}
          required
        />
        <br />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={signUpConfirmPassword}
          onChange={(e) => setSignUpConfirmPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Profile;