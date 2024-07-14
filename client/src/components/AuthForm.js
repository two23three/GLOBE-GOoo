import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const AuthForm = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      <h1>Welcome</h1>
      {showLogin ? (
        <div>
          <Login />
          <p>Don't have an account? <button onClick={toggleForm}>Sign Up</button></p>
        </div>
      ) : (
        <div>
          <Signup />
          <p>Already have an account? <button onClick={toggleForm}>Login</button></p>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
