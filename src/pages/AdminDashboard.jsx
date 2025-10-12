import { useState } from 'react';
import { motion } from 'framer-motion';
import DatabaseManagement from '../components/admin/DatabaseManagement';
import NetworkingManagement from '../components/admin/NetworkingManagement';
import ScalabilityMonitoring from '../components/admin/ScalabilityMonitoring';
import { Database, Network, Activity, Shield, BarChart3, Server, Cloud } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('database');

  const tabs = [
    { id: 'database', name: 'Database Services', icon: Database, color: 'blue' },
    { id: 'networking', name: 'Networking & Security', icon: Shield, color: 'green' },
    { id: 'scalability', name: 'Scalability & Monitoring', icon: Activity, color: 'purple' }
  ];

  const getTabColor = (color) => {
    const colors = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      green: 'bg-green-600 hover:bg-green-700',
      purple: 'bg-purple-600 hover:bg-purple-700'
    };
    return colors[color] || colors.blue;
  };

  const getTabBorderColor = (color) => {
    const colors = {
      blue: 'border-blue-600',
      green: 'border-green-600',
      purple: 'border-purple-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl">
                <Cloud className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">AWS Services Dashboard</h1>
                <p className="text-gray-400 text-sm mt-1">
                  Manage and monitor your AWS infrastructure
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-green-500/20 px-4 py-2 rounded-lg border border-green-500/30">
                <p className="text-green-400 text-sm font-semibold">● Live Status</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? `${getTabColor(tab.color)} text-white shadow-lg transform scale-105`
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'database' && <DatabaseManagement />}
          {activeTab === 'networking' && <NetworkingManagement />}
          {activeTab === 'scalability' && <ScalabilityMonitoring />}
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Database className="w-6 h-6 text-blue-400 mt-1" />
              <div>
                <h3 className="text-white font-semibold mb-1">Database Services</h3>
                <p className="text-gray-400 text-sm">
                  Manage RDS, DynamoDB, ElastiCache, DocumentDB, Neptune, and Timestream databases
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-green-400 mt-1" />
              <div>
                <h3 className="text-white font-semibold mb-1">Security & Networking</h3>
                <p className="text-gray-400 text-sm">
                  Configure VPC, IAM, GuardDuty, WAF, Shield, CloudFront, and Route 53
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Activity className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                <h3 className="text-white font-semibold mb-1">High Availability</h3>
                <p className="text-gray-400 text-sm">
                  Monitor Auto Scaling, Load Balancers, and CloudWatch metrics in real-time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

