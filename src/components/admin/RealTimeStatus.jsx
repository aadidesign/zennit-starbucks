import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Clock, RefreshCw, Shield } from 'lucide-react';
import { dataValidator } from '../../lib/mockAdminServices';

const RealTimeStatus = () => {
  const [servicesStatus, setServicesStatus] = useState({
    dynamodb: { status: 'checking', lastChecked: null, error: null, dataValid: null },
    iam: { status: 'checking', lastChecked: null, error: null, dataValid: null },
    cloudwatch: { status: 'checking', lastChecked: null, error: null, dataValid: null },
    ssl: { status: 'checking', lastChecked: null, error: null, dataValid: null }
  });

  const [overallStatus, setOverallStatus] = useState('checking');

  const checkServiceHealth = async () => {
    const newStatus = { ...servicesStatus };
    let healthyServices = 0;
    let totalServices = 0;

    // Check DynamoDB
    try {
      const { dynamoDBService } = await import('../../lib/aws/databaseServices');
      const result = await dynamoDBService.listTables();
      if (result.success) {
        const validation = await dataValidator.validateServiceHealth('dynamodb', result.data);
        newStatus.dynamodb = {
          status: 'healthy',
          lastChecked: new Date().toISOString(),
          error: null,
          dataValid: validation.isValid
        };
      } else {
        newStatus.dynamodb = {
          status: 'error',
          lastChecked: new Date().toISOString(),
          error: result.error,
          dataValid: false
        };
      }
    } catch (error) {
      newStatus.dynamodb = {
        status: 'error',
        lastChecked: new Date().toISOString(),
        error: error.message,
        dataValid: false
      };
    }

    // Check IAM
    try {
      const { iamService } = await import('../../lib/aws/networkingServices');
      const result = await iamService.listUsers();
      if (result.success) {
        const validation = await dataValidator.validateServiceHealth('iam', result.data);
        newStatus.iam = {
          status: 'healthy',
          lastChecked: new Date().toISOString(),
          error: null,
          dataValid: validation.isValid
        };
      } else {
        newStatus.iam = {
          status: 'error',
          lastChecked: new Date().toISOString(),
          error: result.error,
          dataValid: false
        };
      }
    } catch (error) {
      newStatus.iam = {
        status: 'error',
        lastChecked: new Date().toISOString(),
        error: error.message,
        dataValid: false
      };
    }

    // Check CloudWatch
    try {
      const { cloudWatchService } = await import('../../lib/aws/scalabilityServices');
      const result = await cloudWatchService.listAlarms();
      if (result.success) {
        const validation = await dataValidator.validateServiceHealth('cloudwatch', result.data);
        newStatus.cloudwatch = {
          status: 'healthy',
          lastChecked: new Date().toISOString(),
          error: null,
          dataValid: validation.isValid
        };
      } else {
        newStatus.cloudwatch = {
          status: 'error',
          lastChecked: new Date().toISOString(),
          error: result.error,
          dataValid: false
        };
      }
    } catch (error) {
      newStatus.cloudwatch = {
        status: 'error',
        lastChecked: new Date().toISOString(),
        error: error.message,
        dataValid: false
      };
    }

    // SSL is always healthy (simulated)
    newStatus.ssl = {
      status: 'healthy',
      lastChecked: new Date().toISOString(),
      error: null,
      dataValid: true
    };

    // Calculate overall status
    Object.values(newStatus).forEach(service => {
      totalServices++;
      if (service.status === 'healthy') healthyServices++;
    });

    const healthPercentage = (healthyServices / totalServices) * 100;
    setOverallStatus(healthPercentage === 100 ? 'healthy' : healthPercentage > 50 ? 'warning' : 'error');

    setServicesStatus(newStatus);
  };

  useEffect(() => {
    checkServiceHealth();
    const interval = setInterval(checkServiceHealth, 15000); // Check every 15 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-400 animate-spin" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500/20 border-green-500/30 text-green-400';
      case 'error':
        return 'bg-red-500/20 border-red-500/30 text-red-400';
      default:
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
    }
  };

  const getOverallStatusColor = () => {
    switch (overallStatus) {
      case 'healthy':
        return 'bg-green-600 hover:bg-green-700';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700';
      default:
        return 'bg-red-600 hover:bg-red-700';
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-blue-400" />
          Real-Time Service Health
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        </h3>
        <button
          onClick={checkServiceHealth}
          className={`px-4 py-2 rounded-lg font-semibold text-white transition-colors ${getOverallStatusColor()}`}
        >
          {overallStatus === 'healthy' ? 'All Systems Operational' : 
           overallStatus === 'warning' ? 'Some Issues Detected' : 'Service Issues'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(servicesStatus).map(([service, status]) => (
          <div key={service} className={`rounded-lg p-4 border ${getStatusColor(status.status)}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(status.status)}
                <span className="font-semibold capitalize">{service}</span>
              </div>
              <span className="text-xs opacity-75">
                {status.lastChecked ? new Date(status.lastChecked).toLocaleTimeString() : 'Never'}
              </span>
            </div>
            <div className="text-sm">
              {status.status === 'healthy' && (
                <div>
                  <p className="text-green-300">Service is operational</p>
                  {status.dataValid !== null && (
                    <div className="flex items-center gap-1 mt-1">
                      <Shield className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-400">
                        Data {status.dataValid ? 'Valid' : 'Invalid'}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {status.status === 'error' && (
                <div>
                  <p className="text-red-300">Service error detected</p>
                  {status.error && (
                    <p className="text-xs text-red-400 mt-1 truncate">{status.error}</p>
                  )}
                </div>
              )}
              {status.status === 'checking' && 'Checking service status...'}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            Auto-checking every 15 seconds
          </span>
          <span className="text-green-400 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Live monitoring active
          </span>
        </div>
      </div>
    </div>
  );
};

export default RealTimeStatus;
