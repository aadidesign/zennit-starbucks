// Frontend-safe authentication service
// This version works without AWS SDK imports for frontend builds

// Mock AWS services for frontend builds
const mockAWS = {
  DynamoDB: {
    DocumentClient: () => ({
      send: () => Promise.resolve({}),
    }),
  },
  config: {
    update: () => {},
  },
};

// Mock DynamoDB client
const mockDynamoDBClient = {
  send: () => Promise.resolve({}),
};

const mockDocClient = {
  send: () => Promise.resolve({}),
};

const USERS_TABLE = 'StarbucksUsers';
const MESSAGES_TABLE = 'StarbucksMessages';

// ============ User Authentication Functions ============

export const registerUser = async (userData) => {
  try {
    // Mock registration for frontend
    console.log('Mock registration for user:', userData.email);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful registration
    return {
      success: true,
      message: 'Registration successful! Please check your email for verification.',
      userId: 'mock-user-' + Date.now(),
      user: {
        id: 'mock-user-' + Date.now(),
        ...userData,
        createdAt: new Date().toISOString(),
        verified: false
      }
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'Registration failed. Please try again.',
      error: error.message
    };
  }
};

export const signInUser = async (email, password) => {
  try {
    // Mock sign in for frontend
    console.log('Mock sign in for user:', email);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful sign in
    return {
      success: true,
      message: 'Sign in successful!',
      user: {
        id: 'mock-user-123',
        email: email,
        firstName: 'John',
        lastName: 'Doe',
        verified: true
      },
      token: 'mock-jwt-token-' + Date.now()
    };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      success: false,
      message: 'Sign in failed. Please check your credentials.',
      error: error.message
    };
  }
};

export const saveSession = (userData) => {
  try {
    // Save to localStorage for frontend
    localStorage.setItem('starbucks_user', JSON.stringify(userData));
    localStorage.setItem('starbucks_session', JSON.stringify({
      token: userData.token || 'mock-token',
      timestamp: Date.now()
    }));
    return { success: true };
  } catch (error) {
    console.error('Save session error:', error);
    return { success: false, error: error.message };
  }
};

export const getSession = () => {
  try {
    const user = localStorage.getItem('starbucks_user');
    const session = localStorage.getItem('starbucks_session');
    
    if (user && session) {
      return {
        user: JSON.parse(user),
        session: JSON.parse(session)
      };
    }
    return null;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
};

export const clearSession = () => {
  try {
    localStorage.removeItem('starbucks_user');
    localStorage.removeItem('starbucks_session');
    return { success: true };
  } catch (error) {
    console.error('Clear session error:', error);
    return { success: false, error: error.message };
  }
};

export const saveContactMessage = async (messageData) => {
  try {
    // Mock contact message save for frontend
    console.log('Mock contact message save:', messageData);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      messageId: 'mock-message-' + Date.now()
    };
  } catch (error) {
    console.error('Contact message error:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again.',
      error: error.message
    };
  }
};

export const logoutUser = async () => {
  try {
    clearSession();
    return {
      success: true,
      message: 'Logged out successfully'
    };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      message: 'Logout failed',
      error: error.message
    };
  }
};

export const validateEmail = async (email) => {
  try {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    return {
      success: true,
      valid: isValid,
      message: isValid ? 'Email is valid' : 'Please enter a valid email address'
    };
  } catch (error) {
    return {
      success: false,
      valid: false,
      error: error.message
    };
  }
};

export const resetPassword = async (email) => {
  try {
    // Mock password reset for frontend
    console.log('Mock password reset for:', email);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Password reset email sent! Please check your inbox.'
    };
  } catch (error) {
    console.error('Password reset error:', error);
    return {
      success: false,
      message: 'Failed to send reset email. Please try again.',
      error: error.message
    };
  }
};
