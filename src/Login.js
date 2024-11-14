import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Login = ({ setActiveUser, addUser }) => { // addUser is passed as a prop here
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem(username));

    if (storedUser && storedUser.password === password) {
      setActiveUser(username); // Set active user after login
      alert('Login successful!');
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      alert('Invalid username or password.');
    }
  };

  // Handle Sign-Up
  const handleSignUp = () => {
    if (localStorage.getItem(username)) {
      alert('Username already exists. Please choose another one.');
    } else {
      // Add new user to localStorage
      localStorage.setItem(username, JSON.stringify({ password }));

      // Call addUser to update the list of users in the parent component
      addUser({ username, password });

      alert('Sign-up successful!');
      setActiveUser(username); // Set active user after successful signup
      navigate('/dashboard'); // Redirect to dashboard
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          isSignUp ? handleSignUp() : handleLogin();
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>

      {/* Toggle between Login and Sign-Up */}
      <p>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? ' Login' : ' Sign Up'}
        </span>
      </p>
    </div>
  );
};

export default Login;
