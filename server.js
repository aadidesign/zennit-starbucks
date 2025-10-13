import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { CloudWatchClient, PutMetricDataCommand } from '@aws-sdk/client-cloudwatch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const client = new DynamoDBClient({
  region: process.env.VITE_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY
  }
});
const docClient = DynamoDBDocumentClient.from(client);

const cloudWatch = new CloudWatchClient({
  region: process.env.VITE_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY
  }
});

async function sendMetric(metricName, value, unit = 'Count') {
  try {
    const command = new PutMetricDataCommand({
      Namespace: 'StarbucksApp',
      MetricData: [{ MetricName: metricName, Value: value, Unit: unit, Timestamp: new Date() }]
    });
    await cloudWatch.send(command);
  } catch (error) {
    console.error('Error sending metric:', error);
  }
}

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'starbucks-api',
    timestamp: new Date().toISOString(),
    aws_region: process.env.VITE_AWS_REGION || 'us-east-1'
  });
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ success: false, error: 'All required fields must be provided' });
    }
    const checkCommand = new QueryCommand({
      TableName: 'StarbucksUsers',
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email.toLowerCase() }
    });
    const existingUser = await docClient.send(checkCommand);
    if (existingUser.Items && existingUser.Items.length > 0) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    const userId = 'user_' + crypto.randomBytes(16).toString('hex');
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const user = {
      userId, email: email.toLowerCase(), firstName, lastName, phone: phone || '',
      passwordHash: hash, passwordSalt: salt, sessionToken, rewardsPoints: 0,
      accountStatus: 'active', createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(), lastLogin: new Date().toISOString(),
      favoriteOrders: [], preferences: { notifications: true, newsletter: true }
    };
    const putCommand = new PutCommand({
      TableName: 'StarbucksUsers',
      Item: user,
      ConditionExpression: 'attribute_not_exists(userId)'
    });
    await docClient.send(putCommand);
    await sendMetric('UserRegistrations', 1);
    const { passwordHash, passwordSalt, ...userResponse } = user;
    res.json({
      success: true,
      data: userResponse,
      message: 'User registered successfully',
      token: sessionToken
    });
  } catch (error) {
    console.error('Signup error:', error);
    await sendMetric('SignupErrors', 1);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password required' });
    }
    const queryCommand = new QueryCommand({
      TableName: 'StarbucksUsers',
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email.toLowerCase() }
    });
    const result = await docClient.send(queryCommand);
    if (!result.Items || result.Items.length === 0) {
      await sendMetric('SigninFailures', 1);
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const user = result.Items[0];
    const verifyHash = crypto.pbkdf2Sync(password, user.passwordSalt, 1000, 64, 'sha512').toString('hex');
    if (user.passwordHash !== verifyHash) {
      await sendMetric('SigninFailures', 1);
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    if (user.accountStatus !== 'active') {
      return res.status(401).json({ success: false, error: 'Account not active' });
    }
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const updateCommand = new UpdateCommand({
      TableName: 'StarbucksUsers',
      Key: { userId: user.userId },
      UpdateExpression: 'SET sessionToken = :token, lastLogin = :lastLogin, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':token': sessionToken,
        ':lastLogin': new Date().toISOString(),
        ':updatedAt': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW'
    });
    const updatedResult = await docClient.send(updateCommand);
    const { passwordHash, passwordSalt, ...userResponse } = updatedResult.Attributes;
    await sendMetric('UserSignins', 1);
    res.json({
      success: true,
      data: userResponse,
      message: 'Signed in successfully',
      token: sessionToken
    });
  } catch (error) {
    console.error('Signin error:', error);
    await sendMetric('SigninErrors', 1);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'All required fields must be provided' });
    }
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const timestamp = new Date().toISOString();
    const contactMessage = {
      messageId, firstName, lastName, email: email.toLowerCase(), phone: phone || '',
      subject, message, status: 'new', createdAt: timestamp, updatedAt: timestamp,
      respondedAt: null, assignedTo: null, priority: 'normal', tags: []
    };
    const command = new PutCommand({
      TableName: 'StarbucksMessages',
      Item: contactMessage
    });
    await docClient.send(command);
    await sendMetric('ContactFormSubmissions', 1);
    res.json({ 
      success: true, 
      data: contactMessage,
      message: 'Message sent successfully!' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    await sendMetric('ContactFormErrors', 1);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Starbucks API Server running on http://0.0.0.0:${PORT}`);
  console.log(`🔐 AWS Region: ${process.env.VITE_AWS_REGION || 'us-east-1'}`);
  console.log(`✅ Health Check: http://localhost:${PORT}/health`);
});
