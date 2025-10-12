// Mock admin services for frontend builds
// These replace the real AWS admin services to prevent build errors

export const dataValidator = {
  validateEmail: (email) => email.includes('@'),
  validatePassword: (password) => password.length >= 8,
  validatePhone: (phone) => phone.length >= 10
};

// Database Services
export const rdsService = {
  getDatabaseInstances: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'db-1', name: 'Production DB', status: 'running', type: 'MySQL' },
            { id: 'db-2', name: 'Staging DB', status: 'running', type: 'PostgreSQL' }
          ]
        });
      }, 1000);
    });
  }
};

export const dynamoDBService = {
  getTables: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { name: 'users', items: 1250, status: 'active' },
            { name: 'orders', items: 8900, status: 'active' }
          ]
        });
      }, 1000);
    });
  }
};

export const elastiCacheService = {
  getCacheClusters: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'cache-1', name: 'Redis Cache', status: 'running', type: 'Redis' }
          ]
        });
      }, 1000);
    });
  }
};

export const documentDBService = {
  getClusters: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'docdb-1', name: 'Document Store', status: 'available' }
          ]
        });
      }, 1000);
    });
  }
};

export const neptuneService = {
  getClusters: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'neptune-1', name: 'Graph DB', status: 'available' }
          ]
        });
      }, 1000);
    });
  }
};

export const timestreamService = {
  getDatabases: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'ts-1', name: 'Time Series DB', status: 'active' }
          ]
        });
      }, 1000);
    });
  }
};

// Networking Services
export const ec2Service = {
  getVPCs: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'vpc-1', name: 'Main VPC', cidr: '10.0.0.0/16', status: 'available' }
          ]
        });
      }, 1000);
    });
  }
};

export const elbService = {
  getLoadBalancers: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'elb-1', name: 'Web Load Balancer', status: 'active' }
          ]
        });
      }, 1000);
    });
  }
};

export const route53Service = {
  getHostedZones: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'zone-1', name: 'example.com', records: 5 }
          ]
        });
      }, 1000);
    });
  }
};

export const cloudFrontService = {
  getDistributions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'cf-1', domain: 'cdn.example.com', status: 'deployed' }
          ]
        });
      }, 1000);
    });
  }
};

export const iamService = {
  getUsers: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'user-1', name: 'admin', lastLogin: '2024-01-01' }
          ]
        });
      }, 1000);
    });
  }
};

export const guardDutyService = {
  getDetectors: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'gd-1', status: 'enabled', findings: 0 }
          ]
        });
      }, 1000);
    });
  }
};

export const wafService = {
  getWebACLs: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'waf-1', name: 'Web Protection', rules: 10 }
          ]
        });
      }, 1000);
    });
  }
};

export const shieldService = {
  getProtections: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'shield-1', status: 'active', attacks: 0 }
          ]
        });
      }, 1000);
    });
  }
};

// Scalability Services
export const cloudWatchService = {
  getMetrics: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            cpu: 45.2,
            memory: 67.8,
            network: 12.3
          }
        });
      }, 1000);
    });
  }
};

export const autoScalingService = {
  getGroups: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'asg-1', name: 'Web Servers', instances: 3, status: 'active' }
          ]
        });
      }, 1000);
    });
  }
};

export const monitoringUtils = {
  formatMetric: (value, unit) => `${value} ${unit}`,
  getStatusColor: (status) => status === 'active' ? 'green' : 'orange'
};
