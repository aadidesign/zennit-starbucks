// Backend API Server - Runs in VPC Private Subnet
// This server manages admin operations securely

const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, GetCommand, UpdateCommand, DeleteCommand, PutCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// DynamoDB Client (accessed via VPC Endpoint - no internet charges!)
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1'
});
const docClient = DynamoDBDocumentClient.from(client);

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Hash password with salt
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

// Verify password
function verifyPassword(password, salt, hash) {
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

// Generate session token
function generateSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Generate user ID
function generateUserId() {
  return 'user_' + crypto.randomBytes(16).toString('hex');
}

// ============================================
// AUTHENTICATION ENDPOINTS
// ============================================

// Sign Up - Create new user
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    // Check if user already exists
    const checkCommand = new QueryCommand({
      TableName: 'StarbucksUsers',
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email }
    });

    const existingUser = await docClient.send(checkCommand);
    if (existingUser.Items && existingUser.Items.length > 0) {
      return res.status(400).json({ success: false, error: 'User already exists with this email' });
    }

    // Hash password
    const { salt, hash } = hashPassword(password);
    const userId = generateUserId();
    const sessionToken = generateSessionToken();

    // Create user
    const user = {
      userId,
      email,
      firstName: firstName || '',
      lastName: lastName || '',
      passwordHash: hash,
      passwordSalt: salt,
      sessionToken,
      rewardsPoints: 0,
      accountStatus: 'active',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    const putCommand = new PutCommand({
      TableName: 'StarbucksUsers',
      Item: user
    });

    await docClient.send(putCommand);

    // Return user without sensitive data
    const { passwordHash, passwordSalt, ...userResponse } = user;
    
    res.json({
      success: true,
      user: userResponse,
      session: { token: sessionToken }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Sign In - User login
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    // Get user by email
    const queryCommand = new QueryCommand({
      TableName: 'StarbucksUsers',
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email }
    });

    const result = await docClient.send(queryCommand);
    
    if (!result.Items || result.Items.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const user = result.Items[0];

    // Verify password
    if (!verifyPassword(password, user.passwordSalt, user.passwordHash)) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    // Generate new session token
    const sessionToken = generateSessionToken();

    // Update last login and session token
    const updateCommand = new UpdateCommand({
      TableName: 'StarbucksUsers',
      Key: { userId: user.userId },
      UpdateExpression: 'SET sessionToken = :token, lastLogin = :lastLogin',
      ExpressionAttributeValues: {
        ':token': sessionToken,
        ':lastLogin': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW'
    });

    const updatedResult = await docClient.send(updateCommand);
    const { passwordHash, passwordSalt, ...userResponse } = updatedResult.Attributes;

    res.json({
      success: true,
      user: userResponse,
      session: { token: sessionToken }
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Sign Out - User logout
app.post('/api/auth/signout', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID required' });
    }

    // Clear session token
    const updateCommand = new UpdateCommand({
      TableName: 'StarbucksUsers',
      Key: { userId },
      UpdateExpression: 'REMOVE sessionToken',
      ReturnValues: 'NONE'
    });

    await docClient.send(updateCommand);

    res.json({ success: true, message: 'Signed out successfully' });
  } catch (error) {
    console.error('Signout error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Current User - Verify session
app.get('/api/auth/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    // Query user by session token
    const queryCommand = new QueryCommand({
      TableName: 'StarbucksUsers',
      IndexName: 'SessionTokenIndex',
      KeyConditionExpression: 'sessionToken = :token',
      ExpressionAttributeValues: { ':token': token }
    });

    const result = await docClient.send(queryCommand);

    if (!result.Items || result.Items.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid or expired session' });
    }

    const user = result.Items[0];
    const { passwordHash, passwordSalt, ...userResponse } = user;

    res.json({ success: true, user: userResponse });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// PRODUCTS ENDPOINTS
// ============================================

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const command = new ScanCommand({
      TableName: 'StarbucksProducts'
    });
    
    const result = await docClient.send(command);
    
    res.json({
      success: true,
      products: result.Items || [],
      count: result.Count || 0
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const command = new GetCommand({
      TableName: 'StarbucksProducts',
      Key: { productId: req.params.id }
    });
    
    const result = await docClient.send(command);
    
    if (!result.Item) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.json({
      success: true,
      product: result.Item
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// ORDERS ENDPOINTS
// ============================================

// Create order
app.post('/api/orders', async (req, res) => {
  try {
    const { userId, items, total } = req.body;

    const orderId = 'order_' + crypto.randomBytes(16).toString('hex');
    
    const order = {
      orderId,
      userId,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const command = new PutCommand({
      TableName: 'StarbucksOrders',
      Item: order
    });

    await docClient.send(command);

    res.json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get user orders
app.get('/api/orders/user/:userId', async (req, res) => {
  try {
    const command = new QueryCommand({
      TableName: 'StarbucksOrders',
      IndexName: 'UserIdIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': req.params.userId },
      ScanIndexForward: false // Sort by newest first
    });

    const result = await docClient.send(command);

    res.json({
      success: true,
      orders: result.Items || [],
      count: result.Count || 0
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// FAVORITES ENDPOINTS
// ============================================

// Add to favorites
app.post('/api/favorites', async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const favoriteId = `${userId}_${productId}`;

    const favorite = {
      favoriteId,
      userId,
      productId,
      createdAt: new Date().toISOString()
    };

    const command = new PutCommand({
      TableName: 'StarbucksFavorites',
      Item: favorite
    });

    await docClient.send(command);

    res.json({ success: true, favorite });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get user favorites
app.get('/api/favorites/user/:userId', async (req, res) => {
  try {
    const command = new QueryCommand({
      TableName: 'StarbucksFavorites',
      IndexName: 'UserIdIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': req.params.userId }
    });

    const result = await docClient.send(command);

    res.json({
      success: true,
      favorites: result.Items || [],
      count: result.Count || 0
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Remove from favorites
app.delete('/api/favorites/:favoriteId', async (req, res) => {
  try {
    const command = new DeleteCommand({
      TableName: 'StarbucksFavorites',
      Key: { favoriteId: req.params.favoriteId }
    });

    await docClient.send(command);

    res.json({ success: true, message: 'Favorite removed' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// ADMIN ENDPOINTS - Contact Messages
// ============================================

// Get all contact messages
app.get('/api/admin/messages', async (req, res) => {
  try {
    const command = new ScanCommand({
      TableName: 'StarbucksMessages'
    });
    
    const result = await docClient.send(command);
    
    res.json({
      success: true,
      messages: result.Items,
      count: result.Count
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single message by ID
app.get('/api/admin/messages/:id', async (req, res) => {
  try {
    const command = new GetCommand({
      TableName: 'StarbucksMessages',
      Key: { messageId: req.params.id }
    });
    
    const result = await docClient.send(command);
    
    if (!result.Item) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }
    
    res.json({
      success: true,
      message: result.Item
    });
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update message status
app.put('/api/admin/messages/:id/status', async (req, res) => {
  try {
    const { status } = req.body; // 'new', 'read', 'responded', 'closed'
    
    const command = new UpdateCommand({
      TableName: 'StarbucksMessages',
      Key: { messageId: req.params.id },
      UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':status': status,
        ':updatedAt': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW'
    });
    
    const result = await docClient.send(command);
    
    res.json({
      success: true,
      message: result.Attributes
    });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// ADMIN ENDPOINTS - Users
// ============================================

// Get all users
app.get('/api/admin/users', async (req, res) => {
  try {
    const command = new ScanCommand({
      TableName: 'StarbucksUsers',
      ProjectionExpression: 'userId, email, firstName, lastName, createdAt, lastLogin, rewardsPoints, accountStatus'
    });
    
    const result = await docClient.send(command);
    
    res.json({
      success: true,
      users: result.Items,
      count: result.Count
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single user
app.get('/api/admin/users/:id', async (req, res) => {
  try {
    const command = new GetCommand({
      TableName: 'StarbucksUsers',
      Key: { userId: req.params.id }
    });
    
    const result = await docClient.send(command);
    
    if (!result.Item) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = result.Item;
    
    res.json({
      success: true,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update user rewards points
app.put('/api/admin/users/:id/rewards', async (req, res) => {
  try {
    const { points, action } = req.body; // action: 'add' or 'subtract'
    
    const updateExpression = action === 'add' 
      ? 'ADD rewardsPoints :points'
      : 'ADD rewardsPoints :points';
    
    const command = new UpdateCommand({
      TableName: 'StarbucksUsers',
      Key: { userId: req.params.id },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: {
        ':points': action === 'add' ? points : -points
      },
      ReturnValues: 'ALL_NEW'
    });
    
    const result = await docClient.send(command);
    
    res.json({
      success: true,
      user: result.Attributes
    });
  } catch (error) {
    console.error('Error updating rewards:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update user account status
app.put('/api/admin/users/:id/status', async (req, res) => {
  try {
    const { status } = req.body; // 'active', 'suspended', 'deleted'
    
    const command = new UpdateCommand({
      TableName: 'StarbucksUsers',
      Key: { userId: req.params.id },
      UpdateExpression: 'SET accountStatus = :status, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':status': status,
        ':updatedAt': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW'
    });
    
    const result = await docClient.send(command);
    
    res.json({
      success: true,
      user: result.Attributes
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// ANALYTICS ENDPOINTS
// ============================================

// Get dashboard statistics
app.get('/api/admin/stats', async (req, res) => {
  try {
    // Get user count
    const usersCommand = new ScanCommand({
      TableName: 'StarbucksUsers',
      Select: 'COUNT'
    });
    const usersResult = await docClient.send(usersCommand);
    
    // Get message count
    const messagesCommand = new ScanCommand({
      TableName: 'StarbucksMessages',
      Select: 'COUNT'
    });
    const messagesResult = await docClient.send(messagesCommand);
    
    // Get new messages count
    const newMessagesCommand = new ScanCommand({
      TableName: 'StarbucksMessages',
      FilterExpression: '#status = :status',
      ExpressionAttributeNames: { '#status': 'status' },
      ExpressionAttributeValues: { ':status': 'new' },
      Select: 'COUNT'
    });
    const newMessagesResult = await docClient.send(newMessagesCommand);
    
    res.json({
      success: true,
      stats: {
        totalUsers: usersResult.Count,
        totalMessages: messagesResult.Count,
        newMessages: newMessagesResult.Count,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// HEALTH CHECK
// ============================================

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'starbucks-admin-api',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Admin API Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 VPC Mode: Private Subnet`);
  console.log(`✅ Health Check: http://localhost:${PORT}/health`);
});

