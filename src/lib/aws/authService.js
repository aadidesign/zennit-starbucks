const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Registration failed');
  if (data.token) {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.data));
  }
  return data;
};

export const signInUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Sign in failed');
  if (data.token) {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.data));
  }
  return data;
};

export const saveContactMessage = async (messageData) => {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messageData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to send message');
  return data;
};

export const signOutUser = async () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  return { success: true };
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Session management functions
export const getSession = () => {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');
  
  if (token && user) {
    return {
      token,
      user: JSON.parse(user),
      isAuthenticated: true
    };
  }
  
  return {
    token: null,
    user: null,
    isAuthenticated: false
  };
};

export const saveSession = (token, userData) => {
  if (token) {
    localStorage.setItem('authToken', token);
  }
  if (userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  }
};

export const clearSession = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};
