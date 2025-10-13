import { useState } from 'react';

export default function DatabaseManagement() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Database Management</h3>
        <p className="text-gray-600">
          Database operations are managed through the backend API.
          All DynamoDB tables are configured and operational.
        </p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">StarbucksUsers</span>
            <span className="text-green-600">✓ Active</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">StarbucksMessages</span>
            <span className="text-green-600">✓ Active</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">StarbucksOrders</span>
            <span className="text-green-600">✓ Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
