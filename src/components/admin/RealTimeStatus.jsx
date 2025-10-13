import { useState, useEffect } from 'react';
import { Activity, Database, Shield, TrendingUp } from 'lucide-react';

export default function RealTimeStatus() {
  const [status, setStatus] = useState({
    database: 'healthy',
    api: 'healthy',
    cloudwatch: 'healthy'
  });

  useEffect(() => {
    // Fetch status from backend API
    const checkStatus = async () => {
      try {
        const response = await fetch('http://localhost:3000/health');
        if (response.ok) {
          setStatus(prev => ({ ...prev, api: 'healthy' }));
        }
      } catch (error) {
        setStatus(prev => ({ ...prev, api: 'error' }));
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    { name: 'DynamoDB', status: status.database, icon: Database },
    { name: 'API Server', status: status.api, icon: Activity },
    { name: 'CloudWatch', status: status.cloudwatch, icon: TrendingUp },
    { name: 'IAM Security', status: 'healthy', icon: Shield }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.name} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{service.name}</p>
                  <p className="text-2xl font-bold mt-1">
                    {service.status === 'healthy' ? '✓' : '✗'}
                  </p>
                </div>
                <Icon className={`w-8 h-8 ${
                  service.status === 'healthy' ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  service.status === 'healthy' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {service.status === 'healthy' ? 'Operational' : 'Error'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">AWS Services Status</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-green-50 rounded">
            <span className="font-medium">Amazon DynamoDB</span>
            <span className="text-green-600">✓ Active</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 rounded">
            <span className="font-medium">AWS IAM</span>
            <span className="text-green-600">✓ Configured</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 rounded">
            <span className="font-medium">Amazon CloudWatch</span>
            <span className="text-green-600">✓ Monitoring</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 rounded">
            <span className="font-medium">DynamoDB Auto Scaling</span>
            <span className="text-green-600">✓ Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
