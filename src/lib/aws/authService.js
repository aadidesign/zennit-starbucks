// AWS DynamoDB Authentication Service
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
});

const docClient = DynamoDBDocumentClient.from(client);

const USERS_TABLE = 'StarbucksUsers';
const MESSAGES_TABLE = 'StarbucksMessages';

// ============ User Authentication Functions ============

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Object} - Result with success status
 */
export const registerUser = async (userData) => {
  try {
    const { email, password, firstName, lastName, phone } = userData;
    
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser.success && existingUser.data) {
      return { 
        success: false, 
        error: 'User with this email already exists' 
      };
    }

    // Hash password (in production, use bcrypt or similar)
    const hashedPassword = btoa(password); // Base64 encoding (use proper hashing in production)

    const userId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const timestamp = new Date().toISOString();

    const user = {
      userId,
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      phone: phone || '',
      createdAt: timestamp,
      updatedAt: timestamp,
      lastLogin: null,
      accountStatus: 'active',
      rewardsPoints: 0,
      favoriteOrders: [],
      preferences: {
        notifications: true,
        newsletter: true
      }
    };

    const command = new PutCommand({
      TableName: USERS_TABLE,
      Item: user,
      ConditionExpression: 'attribute_not_exists(userId)'
    });

    await docClient.send(command);

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    
    return { 
      success: true, 
      data: userWithoutPassword,
      message: 'User registered successfully' 
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to register user' 
    };
  }
};

/**
 * Sign in a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} - Result with user data or error
 */
export const signInUser = async (email, password) => {
  try {
    const userResult = await getUserByEmail(email);
    
    if (!userResult.success || !userResult.data) {
      return { 
        success: false, 
        error: 'Invalid email or password' 
      };
    }

    const user = userResult.data;

    // Verify password (in production, use bcrypt.compare)
    const hashedPassword = btoa(password);
    if (user.password !== hashedPassword) {
      return { 
        success: false, 
        error: 'Invalid email or password' 
      };
    }

    // Check account status
    if (user.accountStatus !== 'active') {
      return { 
        success: false, 
        error: 'Account is not active' 
      };
    }

    // Update last login
    await updateLastLogin(user.userId);

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    
    return { 
      success: true, 
      data: userWithoutPassword,
      message: 'Signed in successfully' 
    };
  } catch (error) {
    console.error('Sign in error:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to sign in' 
    };
  }
};

/**
 * Get user by email
 * @param {string} email - User email
 * @returns {Object} - Result with user data
 */
export const getUserByEmail = async (email) => {
  try {
    const command = new QueryCommand({
      TableName: USERS_TABLE,
      IndexName: 'EmailIndex', // Requires GSI on email field
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email.toLowerCase()
      }
    });

    const response = await docClient.send(command);
    
    if (response.Items && response.Items.length > 0) {
      return { success: true, data: response.Items[0] };
    }
    
    return { success: true, data: null };
  } catch (error) {
    // If index doesn't exist, fall back to scan (not recommended for production)
    console.warn('Email index not found, using scan as fallback');
    return await getUserByEmailScan(email);
  }
};

/**
 * Fallback method to get user by email using scan
 * @param {string} email - User email
 * @returns {Object} - Result with user data
 */
const getUserByEmailScan = async (email) => {
  try {
    const { ScanCommand } = await import('@aws-sdk/lib-dynamodb');
    const command = new ScanCommand({
      TableName: USERS_TABLE,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email.toLowerCase()
      }
    });

    const response = await docClient.send(command);
    
    if (response.Items && response.Items.length > 0) {
      return { success: true, data: response.Items[0] };
    }
    
    return { success: true, data: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Update user's last login timestamp
 * @param {string} userId - User ID
 * @returns {Object} - Result
 */
const updateLastLogin = async (userId) => {
  try {
    const command = new UpdateCommand({
      TableName: USERS_TABLE,
      Key: { userId },
      UpdateExpression: 'SET lastLogin = :timestamp',
      ExpressionAttributeValues: {
        ':timestamp': new Date().toISOString()
      }
    });

    await docClient.send(command);
    return { success: true };
  } catch (error) {
    console.error('Update last login error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user profile by userId
 * @param {string} userId - User ID
 * @returns {Object} - Result with user data
 */
export const getUserProfile = async (userId) => {
  try {
    const command = new GetCommand({
      TableName: USERS_TABLE,
      Key: { userId }
    });

    const response = await docClient.send(command);
    
    if (response.Item) {
      const { password: _, ...userWithoutPassword } = response.Item;
      return { success: true, data: userWithoutPassword };
    }
    
    return { success: false, error: 'User not found' };
  } catch (error) {
    console.error('Get user profile error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} updates - Fields to update
 * @returns {Object} - Result
 */
export const updateUserProfile = async (userId, updates) => {
  try {
    const allowedFields = ['firstName', 'lastName', 'phone', 'preferences'];
    const updateExpressions = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};

    Object.keys(updates).forEach((key) => {
      if (allowedFields.includes(key)) {
        updateExpressions.push(`#${key} = :${key}`);
        expressionAttributeValues[`:${key}`] = updates[key];
        expressionAttributeNames[`#${key}`] = key;
      }
    });

    if (updateExpressions.length === 0) {
      return { success: false, error: 'No valid fields to update' };
    }

    updateExpressions.push('#updatedAt = :updatedAt');
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();
    expressionAttributeNames['#updatedAt'] = 'updatedAt';

    const command = new UpdateCommand({
      TableName: USERS_TABLE,
      Key: { userId },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
      ReturnValues: 'ALL_NEW'
    });

    const response = await docClient.send(command);
    const { password: _, ...userWithoutPassword } = response.Attributes;
    
    return { success: true, data: userWithoutPassword };
  } catch (error) {
    console.error('Update user profile error:', error);
    return { success: false, error: error.message };
  }
};

// ============ Contact Messages Functions ============

/**
 * Save contact message to DynamoDB
 * @param {Object} messageData - Message data
 * @returns {Object} - Result with success status
 */
export const saveContactMessage = async (messageData) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = messageData;

    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const timestamp = new Date().toISOString();

    const contactMessage = {
      messageId,
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone: phone || '',
      subject,
      message,
      status: 'new',
      createdAt: timestamp,
      updatedAt: timestamp,
      respondedAt: null,
      assignedTo: null,
      priority: 'normal',
      tags: []
    };

    const command = new PutCommand({
      TableName: MESSAGES_TABLE,
      Item: contactMessage
    });

    await docClient.send(command);
    
    return { 
      success: true, 
      data: contactMessage,
      message: 'Message sent successfully. We will get back to you soon!' 
    };
  } catch (error) {
    console.error('Save message error:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send message' 
    };
  }
};

/**
 * Get all messages (for admin)
 * @param {string} status - Filter by status (optional)
 * @returns {Object} - Result with messages array
 */
export const getAllMessages = async (status = null) => {
  try {
    const { ScanCommand } = await import('@aws-sdk/lib-dynamodb');
    
    const params = {
      TableName: MESSAGES_TABLE
    };

    if (status) {
      params.FilterExpression = 'status = :status';
      params.ExpressionAttributeValues = { ':status': status };
    }

    const command = new ScanCommand(params);
    const response = await docClient.send(command);
    
    return { 
      success: true, 
      data: response.Items || [],
      count: response.Count || 0 
    };
  } catch (error) {
    console.error('Get messages error:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

/**
 * Get message by ID
 * @param {string} messageId - Message ID
 * @returns {Object} - Result with message data
 */
export const getMessageById = async (messageId) => {
  try {
    const command = new GetCommand({
      TableName: MESSAGES_TABLE,
      Key: { messageId }
    });

    const response = await docClient.send(command);
    
    if (response.Item) {
      return { success: true, data: response.Item };
    }
    
    return { success: false, error: 'Message not found' };
  } catch (error) {
    console.error('Get message error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update message status
 * @param {string} messageId - Message ID
 * @param {string} newStatus - New status
 * @returns {Object} - Result
 */
export const updateMessageStatus = async (messageId, newStatus) => {
  try {
    const command = new UpdateCommand({
      TableName: MESSAGES_TABLE,
      Key: { messageId },
      UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':status': newStatus,
        ':updatedAt': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW'
    });

    const response = await docClient.send(command);
    return { success: true, data: response.Attributes };
  } catch (error) {
    console.error('Update message status error:', error);
    return { success: false, error: error.message };
  }
};

// ============ Session Management (Local Storage) ============

/**
 * Save user session to local storage
 * @param {Object} userData - User data
 */
export const saveSession = (userData) => {
  try {
    localStorage.setItem('starbucksUser', JSON.stringify(userData));
    localStorage.setItem('starbucksSession', Date.now().toString());
  } catch (error) {
    console.error('Save session error:', error);
  }
};

/**
 * Get current session
 * @returns {Object|null} - User data or null
 */
export const getSession = () => {
  try {
    const user = localStorage.getItem('starbucksUser');
    const sessionTime = localStorage.getItem('starbucksSession');
    
    if (!user || !sessionTime) return null;
    
    // Check if session is older than 24 hours
    const hoursSinceLogin = (Date.now() - parseInt(sessionTime)) / (1000 * 60 * 60);
    if (hoursSinceLogin > 24) {
      clearSession();
      return null;
    }
    
    return JSON.parse(user);
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
};

/**
 * Clear user session
 */
export const clearSession = () => {
  try {
    localStorage.removeItem('starbucksUser');
    localStorage.removeItem('starbucksSession');
  } catch (error) {
    console.error('Clear session error:', error);
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} - True if authenticated
 */
export const isAuthenticated = () => {
  return getSession() !== null;
};

export default {
  registerUser,
  signInUser,
  getUserByEmail,
  getUserProfile,
  updateUserProfile,
  saveContactMessage,
  getAllMessages,
  getMessageById,
  updateMessageStatus,
  saveSession,
  getSession,
  clearSession,
  isAuthenticated
};

