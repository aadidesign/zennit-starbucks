// AWS SDK Configuration for advanced features
// This is optional and only needed if you want to use AWS services directly

// Use mocks for frontend builds to prevent import errors
const isFrontend = typeof window !== 'undefined';

let AWS;
if (isFrontend) {
  // Import mocks for frontend
  AWS = require('./mockAWS').mockAWS;
} else {
  // Import real AWS SDK for backend
  AWS = require('aws-sdk');
}

// Configure AWS SDK
AWS.config.update({
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
});

// S3 Configuration for file uploads
export const s3 = new AWS.S3({
  params: { Bucket: import.meta.env.VITE_AWS_S3_BUCKET }
});

// CloudFront Configuration for CDN
export const cloudFront = new AWS.CloudFront();

// DynamoDB Configuration for NoSQL database
export const dynamoDB = new AWS.DynamoDB.DocumentClient();

// AWS Services Integration Functions
export const awsService = {
  // Upload file to S3
  async uploadToS3(file, folder = 'uploads') {
    const params = {
      Bucket: import.meta.env.VITE_AWS_S3_BUCKET,
      Key: `${folder}/${Date.now()}-${file.name}`,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read'
    };

    try {
      const data = await s3.upload(params).promise();
      return { success: true, url: data.Location };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get file from S3
  async getFromS3(key) {
    const params = {
      Bucket: import.meta.env.VITE_AWS_S3_BUCKET,
      Key: key
    };

    try {
      const data = await s3.getObject(params).promise();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Delete file from S3
  async deleteFromS3(key) {
    const params = {
      Bucket: import.meta.env.VITE_AWS_S3_BUCKET,
      Key: key
    };

    try {
      await s3.deleteObject(params).promise();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export default { s3, cloudFront, dynamoDB, awsService };

