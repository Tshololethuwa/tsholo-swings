import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser, deleteUser } from './Api';  // Import the API functions

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  // Fetch users when the component mounts
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError('Failed to load users');
      }
    };
    loadUsers();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submit to add a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      if (!newUser.username || !newUser.password) {
        setError('Both username and password are required!');
        return;
      }
      const addedUser = await addUser(newUser.username, newUser.password);
      setUsers((prevUsers) => [...prevUsers, addedUser]);  // Update user list
      setNewUser({ username: '', password: '' });  // Clear input fields
      setError('');
    } catch (err) {
      setError('Failed to add user');
    }
  };

  // Handle delete user
  const handleDeleteUser = async (username) => {
    try {
      await deleteUser(username);
      setUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));  // Remove user from list
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div>
      <h2>User Management</h2>

      {/* Display error messages */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Users Table */}
      <div>
        <h3>Users List</h3>
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.username)} style={{ color: 'red' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New User Form */}
      <div>
        <h3>Add New User</h3>
        <form onSubmit={handleAddUser}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default UserManagement;
