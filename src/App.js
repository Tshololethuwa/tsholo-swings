import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Use Navigate for redirection
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';
import StockManagement from './StockManagement';
import Login from './Login';
import './App.css';

function App() {
  const [activeUser, setActiveUser] = useState(null); // Manage the logged-in user
  const [users, setUsers] = useState([]); // State for users

  // Function to add a new user
  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    // Optionally, make a POST request to add the user to a backend
  };

  return (
    <Router>
      <Routes>
        {/* Default route is Login, only accessible if user is not logged in */}
        <Route path="/" element={activeUser ? <Navigate to="/dashboard" /> : <Login setActiveUser={setActiveUser} addUser={addUser} />} />

        {/* Protected routes that require the user to be logged in */}
        <Route
          path="/dashboard"
          element={activeUser ? <Dashboard activeUser={activeUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/UserManagement"
          element={activeUser ? <UserManagement users={users} /> : <Navigate to="/" />}
        />
        <Route
          path="/ProductManagement"
          element={activeUser ? <ProductManagement /> : <Navigate to="/" />}
        />
        <Route
          path="/StockManagement"
          element={activeUser ? <StockManagement /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
