import { useState } from 'react';

export default function ScalabilityMonitoring() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Scalability Monitoring</h3>
        <p className="text-gray-600">
          Auto-scaling is configured for DynamoDB tables and monitored via CloudWatch.
        </p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">DynamoDB Auto Scaling</span>
            <span className="text-green-600">✓ Active</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">CloudWatch Metrics</span>
            <span className="text-green-600">✓ Monitoring</span>
          </div>
        </div>
      </div>
    </div>
  );
}
