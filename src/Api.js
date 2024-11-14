// src/api.js

// API URLs
const API_URL = 'http://localhost:5000/products';
const USER_API_URL = 'http://localhost:5000/users';
const LOGIN_API_URL = 'http://localhost:5000/login';
const SIGNUP_API_URL = 'http://localhost:5000/signup';

// ===============================
// Product API Calls
// ===============================

// Fetch products from the backend API
export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;  // Return the list of products
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Add a new product to the backend API
export const addProduct = async (product) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to add product: ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;  // Return the newly added product
  } catch (error) {
    console.error('Add product error:', error);
    throw error;
  }
};

// Delete a product from the backend API
export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    const data = await response.json();
    return data;  // Return the response data after deletion
  } catch (error) {
    console.error('Delete product error:', error);
    throw error;
  }
};

// Update an existing product in the backend API
export const updateProduct = async (productId, updatedProductData) => {
  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProductData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to update product: ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;  // Return the updated product data
  } catch (error) {
    console.error('Update product error:', error);
    throw error;
  }
};

// ===============================
// User Management API Calls
// ===============================

// Fetch users from the backend API
export const fetchUsers = async () => {
  try {
    const response = await fetch(USER_API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data;  // Return the list of users
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Add a new user to the backend API
export const addUser = async (username, password) => {
  try {
    const response = await fetch(USER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to add user: ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;  // Return the newly added user
  } catch (error) {
    console.error('Add user error:', error);
    throw error;
  }
};

// Delete a user from the backend API
export const deleteUser = async (username) => {
  try {
    const response = await fetch(`${USER_API_URL}/${username}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete user: ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;  // Return the response data after deletion
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
};

// ===============================
// Authentication API Calls
// ===============================

// User SignUp
export const signUpUser = async (username, password) => {
  try {
    const response = await fetch(SIGNUP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to sign up user: ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;  // Return the newly signed up user data
  } catch (error) {
    console.error('SignUp error:', error);
    throw error;
  }
};

// User Login
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(LOGIN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }), // Send username and password as JSON
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Login failed: ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;  // Return the token or user data after successful login
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
