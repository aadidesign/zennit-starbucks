// Real-time data validation for AWS services
export const dataValidator = {
  // Validate DynamoDB table data
  validateDynamoDBTable: (table) => {
    const errors = [];
    
    if (!table.name || typeof table.name !== 'string') {
      errors.push('Invalid table name');
    }
    
    if (!table.status || !['ACTIVE', 'CREATING', 'UPDATING', 'DELETING'].includes(table.status)) {
      errors.push('Invalid table status');
    }
    
    if (typeof table.itemCount !== 'number' || table.itemCount < 0) {
      errors.push('Invalid item count');
    }
    
    if (typeof table.sizeBytes !== 'number' || table.sizeBytes < 0) {
      errors.push('Invalid table size');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Validate IAM user data
  validateIAMUser: (user) => {
    const errors = [];
    
    if (!user.userName || typeof user.userName !== 'string') {
      errors.push('Invalid username');
    }
    
    if (!user.arn || !user.arn.startsWith('arn:aws:iam::')) {
      errors.push('Invalid ARN');
    }
    
    if (!user.createDate || !(user.createDate instanceof Date)) {
      errors.push('Invalid creation date');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Validate CloudWatch alarm data
  validateCloudWatchAlarm: (alarm) => {
    const errors = [];
    
    if (!alarm.alarmName || typeof alarm.alarmName !== 'string') {
      errors.push('Invalid alarm name');
    }
    
    if (!alarm.stateValue || !['OK', 'ALARM', 'INSUFFICIENT_DATA'].includes(alarm.stateValue)) {
      errors.push('Invalid alarm state');
    }
    
    if (typeof alarm.threshold !== 'number') {
      errors.push('Invalid threshold value');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Validate SSL status data
  validateSSLStatus: (sslData) => {
    const errors = [];
    
    if (typeof sslData.enabled !== 'boolean') {
      errors.push('Invalid SSL enabled status');
    }
    
    if (!sslData.version || !sslData.version.includes('TLS')) {
      errors.push('Invalid TLS version');
    }
    
    if (!Array.isArray(sslData.certificates)) {
      errors.push('Invalid certificates array');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Real-time data freshness check
  checkDataFreshness: (timestamp, maxAgeMinutes = 5) => {
    const now = new Date();
    const dataTime = new Date(timestamp);
    const ageMinutes = (now - dataTime) / (1000 * 60);
    
    return {
      isFresh: ageMinutes <= maxAgeMinutes,
      ageMinutes: Math.round(ageMinutes),
      timestamp: dataTime
    };
  },

  // Comprehensive service health check
  validateServiceHealth: async (serviceName, data) => {
    try {
      let validationResult = { isValid: true, errors: [] };
      
      switch (serviceName) {
        case 'dynamodb':
          if (Array.isArray(data)) {
            for (const table of data) {
              const result = dataValidator.validateDynamoDBTable(table);
              if (!result.isValid) {
                validationResult.isValid = false;
                validationResult.errors.push(...result.errors);
              }
            }
          }
          break;
          
        case 'iam':
          if (Array.isArray(data)) {
            for (const user of data) {
              const result = dataValidator.validateIAMUser(user);
              if (!result.isValid) {
                validationResult.isValid = false;
                validationResult.errors.push(...result.errors);
              }
            }
          }
          break;
          
        case 'cloudwatch':
          if (Array.isArray(data)) {
            for (const alarm of data) {
              const result = dataValidator.validateCloudWatchAlarm(alarm);
              if (!result.isValid) {
                validationResult.isValid = false;
                validationResult.errors.push(...result.errors);
              }
            }
          }
          break;
          
        case 'ssl':
          validationResult = dataValidator.validateSSLStatus(data);
          break;
      }
      
      return {
        serviceName,
        ...validationResult,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        serviceName,
        isValid: false,
        errors: [`Validation error: ${error.message}`],
        timestamp: new Date().toISOString()
      };
    }
  }
};

export default dataValidator;
