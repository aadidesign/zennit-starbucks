// Backend API Server - Runs in VPC Private Subnet
// This server manages admin operations securely

const express = require('express');
const cors = require('cors');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, GetCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// DynamoDB Client (accessed via VPC Endpoint - no internet charges!)
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1'
});
const docClient = DynamoDBDocumentClient.from(client);

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

