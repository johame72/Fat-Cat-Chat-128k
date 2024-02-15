// src\SignInForm.js

// In a component file
import React, { useState } from 'react';
import { signIn } from './auth';

const SignInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const user = await signIn(username, password);
      // Handle successful sign-in (e.g., redirect to a protected route)
    } catch (error) {
      // Handle sign-in errors (e.g., show an error message)
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignInForm;
