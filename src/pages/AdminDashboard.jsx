import { useState } from 'react';
import RealTimeStatus from '../components/admin/RealTimeStatus';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('status');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('status')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'status'
                    ? 'border-b-2 border-green-600 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Real-Time Status
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'status' && <RealTimeStatus />}
          </div>
        </div>
      </div>
    </div>
  );
}
