#!/usr/bin/env node
/**
 * AWS DynamoDB Tables Setup Script
 * This script creates the required DynamoDB tables for the Starbucks application
 * 
 * Usage: node scripts/setup-aws-tables.js
 */

import { DynamoDBClient, CreateTableCommand, DescribeTableCommand, waitUntilTableExists } from '@aws-sdk/client-dynamodb';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

// Configuration
const REGION = process.env.VITE_AWS_REGION || 'us-east-1';
const ACCESS_KEY_ID = process.env.VITE_AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.VITE_AWS_SECRET_ACCESS_KEY;

// Validate credentials
if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY || ACCESS_KEY_ID === 'AKIAIOSFODNN7EXAMPLE') {
  console.error('❌ ERROR: AWS credentials not configured!');
  console.error('');
  console.error('Please follow these steps:');
  console.error('1. Copy env.template to .env');
  console.error('2. Update .env with your real AWS credentials');
  console.error('3. Get credentials from: https://console.aws.amazon.com/iam/');
  console.error('');
  process.exit(1);
}

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
  }
});

console.log('🚀 AWS DynamoDB Tables Setup');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`📍 Region: ${REGION}`);
console.log(`🔑 Access Key: ${ACCESS_KEY_ID.substring(0, 8)}...`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

/**
 * Check if table exists
 */
async function tableExists(tableName) {
  try {
    const command = new DescribeTableCommand({ TableName: tableName });
    await client.send(command);
    return true;
  } catch (error) {
    if (error.name === 'ResourceNotFoundException') {
      return false;
    }
    throw error;
  }
}

/**
 * Create StarbucksUsers table
 */
async function createUsersTable() {
  const tableName = 'StarbucksUsers';
  
  console.log(`📋 Checking table: ${tableName}...`);
  
  if (await tableExists(tableName)) {
    console.log(`✅ Table ${tableName} already exists\n`);
    return;
  }
  
  console.log(`🔨 Creating table: ${tableName}...`);
  
  const command = new CreateTableCommand({
    TableName: tableName,
    AttributeDefinitions: [
      { AttributeName: 'userId', AttributeType: 'S' },
      { AttributeName: 'email', AttributeType: 'S' }
    ],
    KeySchema: [
      { AttributeName: 'userId', KeyType: 'HASH' }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'EmailIndex',
        KeySchema: [
          { AttributeName: 'email', KeyType: 'HASH' }
        ],
        Projection: {
          ProjectionType: 'ALL'
        }
      }
    ],
    BillingMode: 'PAY_PER_REQUEST',
    StreamSpecification: {
      StreamEnabled: true,
      StreamViewType: 'NEW_AND_OLD_IMAGES'
    },
    Tags: [
      { Key: 'Application', Value: 'Starbucks' },
      { Key: 'Environment', Value: 'Production' },
      { Key: 'ManagedBy', Value: 'StarbucksApp' }
    ]
  });
  
  try {
    const response = await client.send(command);
    console.log(`⏳ Waiting for table to be active...`);
    await waitUntilTableExists({ client, maxWaitTime: 120 }, { TableName: tableName });
    console.log(`✅ Table ${tableName} created successfully!`);
    console.log(`   - Primary Key: userId (String)`);
    console.log(`   - Global Secondary Index: EmailIndex on email`);
    console.log(`   - Billing Mode: Pay-per-request`);
    console.log(`   - Streams: Enabled\n`);
  } catch (error) {
    console.error(`❌ Error creating ${tableName}:`, error.message);
    throw error;
  }
}

/**
 * Create StarbucksMessages table
 */
async function createMessagesTable() {
  const tableName = 'StarbucksMessages';
  
  console.log(`📋 Checking table: ${tableName}...`);
  
  if (await tableExists(tableName)) {
    console.log(`✅ Table ${tableName} already exists\n`);
    return;
  }
  
  console.log(`🔨 Creating table: ${tableName}...`);
  
  const command = new CreateTableCommand({
    TableName: tableName,
    AttributeDefinitions: [
      { AttributeName: 'messageId', AttributeType: 'S' }
    ],
    KeySchema: [
      { AttributeName: 'messageId', KeyType: 'HASH' }
    ],
    BillingMode: 'PAY_PER_REQUEST',
    StreamSpecification: {
      StreamEnabled: true,
      StreamViewType: 'NEW_AND_OLD_IMAGES'
    },
    Tags: [
      { Key: 'Application', Value: 'Starbucks' },
      { Key: 'Environment', Value: 'Production' },
      { Key: 'ManagedBy', Value: 'StarbucksApp' }
    ]
  });
  
  try {
    const response = await client.send(command);
    console.log(`⏳ Waiting for table to be active...`);
    await waitUntilTableExists({ client, maxWaitTime: 120 }, { TableName: tableName });
    console.log(`✅ Table ${tableName} created successfully!`);
    console.log(`   - Primary Key: messageId (String)`);
    console.log(`   - Billing Mode: Pay-per-request`);
    console.log(`   - Streams: Enabled\n`);
  } catch (error) {
    console.error(`❌ Error creating ${tableName}:`, error.message);
    throw error;
  }
}

/**
 * Main setup function
 */
async function setupTables() {
  try {
    await createUsersTable();
    await createMessagesTable();
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 SUCCESS! All DynamoDB tables are ready!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📊 View your tables:');
    console.log(`   https://console.aws.amazon.com/dynamodb/home?region=${REGION}#tables:`);
    console.log('');
    console.log('🚀 Next steps:');
    console.log('   1. Run: npm run dev');
    console.log('   2. Test user registration');
    console.log('   3. Test contact form');
    console.log('   4. Check Database Management page\n');
    
  } catch (error) {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌ SETUP FAILED');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('Error:', error.message);
    console.error('');
    
    if (error.name === 'UnrecognizedClientException' || error.message.includes('credentials')) {
      console.error('💡 This looks like a credentials issue. Please check:');
      console.error('   1. Your .env file has correct AWS credentials');
      console.error('   2. The credentials are valid and not expired');
      console.error('   3. Your IAM user has DynamoDB permissions');
    } else if (error.name === 'AccessDeniedException') {
      console.error('💡 Permission denied. Your IAM user needs:');
      console.error('   - dynamodb:CreateTable');
      console.error('   - dynamodb:DescribeTable');
      console.error('   - dynamodb:TagResource');
    }
    
    console.error('');
    process.exit(1);
  }
}

// Run setup
setupTables();

