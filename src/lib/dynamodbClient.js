// DynamoDB Client for Frontend
// Replacement for Supabase

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Store session token in localStorage
const getToken = () => localStorage.getItem('sessionToken');
const setToken = (token) => localStorage.setItem('sessionToken', token);
const clearToken = () => localStorage.removeItem('sessionToken');

// Store user data in localStorage
const getUser = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};
const setUser = (user) => localStorage.setItem('userData', JSON.stringify(user));
const clearUser = () => localStorage.removeItem('userData');

// ============================================
// AUTHENTICATION SERVICES
// ============================================

export const authService = {
  // Sign up new user
  async signUp(email, password, userData = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          firstName: userData.firstName || '',
          lastName: userData.lastName || ''
        })
      });

      const data = await response.json();

      if (!response.ok) {
        return { data: null, error: { message: data.error || 'Signup failed' } };
      }

      // Store session token and user data
      setToken(data.session.token);
      setUser(data.user);

      return { data: { user: data.user, session: data.session }, error: null };
    } catch (error) {
      return { data: null, error: { message: error.message } };
    }
  },

  // Sign in existing user
  async signIn(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return { data: null, error: { message: data.error || 'Sign in failed' } };
      }

      // Store session token and user data
      setToken(data.session.token);
      setUser(data.user);

      return { data: { user: data.user, session: data.session }, error: null };
    } catch (error) {
      return { data: null, error: { message: error.message } };
    }
  },

  // Sign out
  async signOut() {
    try {
      const user = getUser();
      if (user) {
        await fetch(`${API_BASE_URL}/api/auth/signout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.userId })
        });
      }

      // Clear local storage
      clearToken();
      clearUser();

      return { error: null };
    } catch (error) {
      return { error: { message: error.message } };
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const token = getToken();
      if (!token) return null;

      const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        clearToken();
        clearUser();
        return null;
      }

      const data = await response.json();
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Password reset (placeholder - requires email service)
  async resetPassword(email) {
    console.log('Password reset for:', email);
    return { 
      data: { message: 'Password reset feature coming soon' }, 
      error: null 
    };
  }
};

// ============================================
// DATABASE SERVICES
// ============================================

export const dbService = {
  // Get all products
  async getProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      const data = await response.json();

      if (!response.ok) {
        return { data: null, error: { message: data.error } };
      }

      return { data: data.products, error: null };
    } catch (error) {
      return { data: null, error: { message: error.message } };
    }
  },

  // Get product by ID
  async getProductById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
      const data = await response.json();

      if (!response.ok) {
        return { data: null, error: { message: data.error } };
      }

      return { data: data.product, error: null };
    } catch (error) {
      return { data: null, error: { message: error.message } };
    }
  },

  // Create order
  async createOrder(orderData) {
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (!response.ok) {
        return { data: null, error: { message: data.error } };
      }

      return { data: data.order, error: null };
    } catch (error) {
      return { data: null, error: { message: error.message } };
    }
  },

  // Get user orders
  async getUserOrders(userId) {
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/api/orders/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();

      if (!response.ok) {
        return { data: null, error: { message: data.error } };
      }

      return { data: data.orders, error: null };
    } catch (error) {
      return { data: null, error: { message: error.message } };
    }
  },

  // Add to favorites
  async addToFavorites(userId, productId) {
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/api/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, productId })
      });

      const data = await response.json();

      if (!response.ok) {
        return { data: null, error: { message: data.error } };
      }

      return { data: data.favorite, error: null };
    } catch (error) {
      return { data: null, error: { message: error.message } };
    }
  },

  // Get user favorites
  async getUserFavorites(userId) {
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/api/favorites/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();

      if (!response.ok) {
        return { data: null, error: { message: data.error } };
      }

      return { data: data.favorites, error: null };
    } catch (error) {
      return { data: null, error: { message: error.message } };
    }
  },

  // Remove from favorites
  async removeFromFavorites(favoriteId) {
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/api/favorites/${favoriteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();

      if (!response.ok) {
        return { data: null, error: { message: data.error } };
      }

      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: error.message } };
    }
  }
};

// Export helpers
export { getToken, setToken, clearToken, getUser, setUser, clearUser };

export default {
  auth: authService,
  db: dbService
};

