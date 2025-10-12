// AWS Utility Functions for Common Operations

/**
 * Format AWS ARN into a readable name
 * @param {string} arn - AWS ARN
 * @returns {string} - Formatted name
 */
export const formatARN = (arn) => {
  if (!arn) return 'N/A';
  const parts = arn.split(':');
  return parts[parts.length - 1] || arn;
};

/**
 * Parse AWS region from ARN
 * @param {string} arn - AWS ARN
 * @returns {string} - Region code
 */
export const getRegionFromARN = (arn) => {
  if (!arn) return 'unknown';
  const parts = arn.split(':');
  return parts[3] || 'unknown';
};

/**
 * Format bytes to human-readable format
 * @param {number} bytes - Bytes value
 * @param {number} decimals - Decimal places
 * @returns {string} - Formatted string
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Format timestamp to readable date
 * @param {Date|string} timestamp - Date or ISO string
 * @returns {string} - Formatted date
 */
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Calculate time ago from timestamp
 * @param {Date|string} timestamp - Date or ISO string
 * @returns {string} - Time ago string
 */
export const timeAgo = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = new Date(timestamp);
  const seconds = Math.floor((new Date() - date) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
};

/**
 * Validate AWS credentials
 * @returns {boolean} - True if credentials are configured
 */
export const validateAWSCredentials = () => {
  const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
  const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
  const region = import.meta.env.VITE_AWS_REGION;
  
  return !!(accessKeyId && secretAccessKey && region);
};

/**
 * Get AWS configuration status
 * @returns {object} - Configuration status object
 */
export const getAWSConfigStatus = () => {
  return {
    hasAccessKey: !!import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    hasSecretKey: !!import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    region: import.meta.env.VITE_AWS_REGION || 'Not configured',
    isConfigured: validateAWSCredentials()
  };
};

/**
 * Format currency
 * @param {number} amount - Amount in dollars
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

/**
 * Calculate percentage
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @returns {number} - Percentage
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(2);
};

/**
 * Generate random ID
 * @returns {string} - Random ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Parse DynamoDB table name from ARN
 * @param {string} tableArn - DynamoDB table ARN
 * @returns {string} - Table name
 */
export const parseTableName = (tableArn) => {
  if (!tableArn) return '';
  const match = tableArn.match(/table\/([^/]+)/);
  return match ? match[1] : tableArn;
};

/**
 * Get status color class
 * @param {string} status - Status string
 * @returns {string} - Tailwind color class
 */
export const getStatusColor = (status) => {
  const statusLower = (status || '').toLowerCase();
  
  if (statusLower.includes('active') || statusLower.includes('available') || 
      statusLower.includes('healthy') || statusLower.includes('ok')) {
    return 'bg-green-500/20 text-green-400';
  }
  
  if (statusLower.includes('creating') || statusLower.includes('pending') || 
      statusLower.includes('modifying')) {
    return 'bg-yellow-500/20 text-yellow-400';
  }
  
  if (statusLower.includes('error') || statusLower.includes('failed') || 
      statusLower.includes('alarm') || statusLower.includes('unhealthy')) {
    return 'bg-red-500/20 text-red-400';
  }
  
  return 'bg-gray-500/20 text-gray-400';
};

/**
 * Truncate string
 * @param {string} str - String to truncate
 * @param {number} length - Max length
 * @returns {string} - Truncated string
 */
export const truncate = (str, length = 50) => {
  if (!str || str.length <= length) return str;
  return str.substring(0, length) + '...';
};

/**
 * Deep clone object
 * @param {object} obj - Object to clone
 * @returns {object} - Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Retry async function with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Initial delay in ms
 * @returns {Promise} - Result of the function
 */
export const retryWithBackoff = async (fn, maxRetries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (maxRetries <= 0) {
      throw error;
    }
    
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryWithBackoff(fn, maxRetries - 1, delay * 2);
  }
};

/**
 * Group array by key
 * @param {Array} array - Array to group
 * @param {string} key - Key to group by
 * @returns {object} - Grouped object
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Generate color from string (consistent)
 * @param {string} str - Input string
 * @returns {string} - Hex color code
 */
export const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const color = Math.floor(Math.abs((Math.sin(hash) * 16777215) % 1) * 16777215);
  return '#' + color.toString(16).padStart(6, '0');
};

/**
 * Parse query string
 * @param {string} queryString - Query string
 * @returns {object} - Parsed object
 */
export const parseQueryString = (queryString) => {
  const params = new URLSearchParams(queryString);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};

/**
 * Build query string
 * @param {object} params - Parameters object
 * @returns {string} - Query string
 */
export const buildQueryString = (params) => {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};

export default {
  formatARN,
  getRegionFromARN,
  formatBytes,
  formatTimestamp,
  timeAgo,
  validateAWSCredentials,
  getAWSConfigStatus,
  formatCurrency,
  calculatePercentage,
  generateId,
  parseTableName,
  getStatusColor,
  truncate,
  deepClone,
  retryWithBackoff,
  groupBy,
  debounce,
  stringToColor,
  parseQueryString,
  buildQueryString
};

