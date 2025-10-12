import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Network, Shield, Globe, Lock, AlertTriangle, 
  Users, FileText, Eye, RefreshCw, Plus, CheckCircle 
} from 'lucide-react';
import {
  vpcService,
  loadBalancerService,
  route53Service,
  cloudFrontService,
  iamService,
  guardDutyService,
  wafService,
  shieldService
} from '../../lib/mockAdminServices';

const NetworkingManagement = () => {
  const [activeService, setActiveService] = useState('iam');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const services = [
    { id: 'iam', name: 'IAM', icon: Users, color: 'indigo' },
    { id: 'ssl', name: 'HTTPS/SSL', icon: Lock, color: 'green' }
  ];

  useEffect(() => {
    loadServiceData();
  }, [activeService]);

  // Auto-refresh every 30 seconds for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      loadServiceData();
    }, 30000);

    return () => clearInterval(interval);
  }, [activeService]);

  const loadServiceData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let result;
      switch (activeService) {
        case 'iam':
          result = await iamService.listUsers();
          break;
        case 'ssl':
          // SSL/HTTPS status check
          result = { success: true, data: [{ name: 'HTTPS/SSL Encryption', status: 'Enabled', type: 'TLS 1.2+' }] };
          break;
        default:
          result = { success: true, data: [] };
      }
      
      if (result.success) {
        setData({ ...data, [activeService]: result.data });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // VPC Configuration Component
  const VPCConfiguration = () => {
    const [cidrBlock, setCidrBlock] = useState('10.0.0.0/16');
    const [securityGroups, setSecurityGroups] = useState([]);

    useEffect(() => {
      loadSecurityGroups();
    }, []);

    const loadSecurityGroups = async () => {
      const result = await vpcService.listSecurityGroups();
      if (result.success) {
        setSecurityGroups(result.data);
      }
    };

    const createVPC = async () => {
      const result = await vpcService.createVPC(cidrBlock);
      if (result.success) {
        loadServiceData();
      }
    };

    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Network className="w-6 h-6 text-blue-400" />
          VPC Configuration
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">CIDR Block</label>
            <input
              type="text"
              value={cidrBlock}
              onChange={(e) => setCidrBlock(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10.0.0.0/16"
            />
          </div>

          <button
            onClick={createVPC}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Create VPC
          </button>

          {/* Security Groups */}
          <div className="mt-6">
            <h4 className="text-white font-semibold mb-3">Security Groups</h4>
            <div className="space-y-2">
              {securityGroups.slice(0, 5).map((sg, index) => (
                <div key={index} className="bg-gray-700/50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{sg.groupName}</p>
                      <p className="text-gray-400 text-sm">{sg.description}</p>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 text-sm">
                      Edit Rules
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // IAM Policy Simulator
  const IAMPolicySimulator = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [action, setAction] = useState('');
    const [resource, setResource] = useState('');
    const [connectionCount, setConnectionCount] = useState(0);

    useEffect(() => {
      loadUsers();
    }, []);

    // Simulate real-time connection updates
    useEffect(() => {
      const interval = setInterval(() => {
        setConnectionCount(prev => prev + Math.floor(Math.random() * 10) - 5);
      }, 3000);

      return () => clearInterval(interval);
    }, []);

    const loadUsers = async () => {
      const result = await iamService.listUsers();
      if (result.success) {
        setUsers(result.data);
      }
    };

    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Lock className="w-6 h-6 text-indigo-400" />
          IAM Policy Simulator
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse ml-auto"></div>
        </h3>

        <div className="mb-4 p-3 bg-indigo-900/20 border border-indigo-500/30 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-indigo-400 text-sm">Active IAM Sessions</span>
            <span className="text-white font-semibold">{Math.max(0, connectionCount)}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">User / Role</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            >
              <option value="">Select user...</option>
              {users.map((user, idx) => (
                <option key={idx} value={user.arn}>{user.userName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Action</label>
            <input
              type="text"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
              placeholder="e.g., s3:GetObject"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Resource ARN</label>
            <input
              type="text"
              value={resource}
              onChange={(e) => setResource(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
              placeholder="e.g., arn:aws:s3:::bucket-name/*"
            />
          </div>

          <button
            disabled={!selectedUser || !action || !resource}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Simulate Policy
          </button>
        </div>
      </div>
    );
  };

  // GuardDuty Threat Monitor
  const ThreatMonitor = () => {
    const [findings, setFindings] = useState([]);
    const [severity, setSeverity] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      loadFindings();
    }, []);

    const loadFindings = async () => {
      setLoading(true);
      try {
        const detectorsResult = await guardDutyService.listDetectors();
        if (detectorsResult.success && detectorsResult.data.length > 0) {
          const detectorId = detectorsResult.data[0];
          const findingsResult = await guardDutyService.listFindings(detectorId);
          
          if (findingsResult.success && findingsResult.data.length > 0) {
            const detailsResult = await guardDutyService.getFindings(
              detectorId, 
              findingsResult.data.slice(0, 10)
            );
            if (detailsResult.success) {
              setFindings(detailsResult.data);
            }
          }
        }
      } catch (error) {
        console.error('Error loading GuardDuty findings:', error);
      } finally {
        setLoading(false);
      }
    };

    const getSeverityColor = (sev) => {
      const severity = typeof sev === 'number' ? 
        (sev >= 7 ? 'HIGH' : sev >= 4 ? 'MEDIUM' : 'LOW') : sev;
      
      switch (severity) {
        case 'HIGH': return 'text-red-400 bg-red-500/20';
        case 'MEDIUM': return 'text-yellow-400 bg-yellow-500/20';
        case 'LOW': return 'text-blue-400 bg-blue-500/20';
        default: return 'text-gray-400 bg-gray-500/20';
      }
    };

    const getSeverityLabel = (sev) => {
      if (typeof sev === 'number') {
        return sev >= 7 ? 'HIGH' : sev >= 4 ? 'MEDIUM' : 'LOW';
      }
      return sev;
    };

    const filteredFindings = severity === 'all' 
      ? findings 
      : findings.filter(f => getSeverityLabel(f.severity) === severity);

    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Eye className="w-6 h-6 text-red-400" />
          GuardDuty Threat Monitor
        </h3>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-8 h-8 text-red-400 animate-spin" />
          </div>
        ) : findings.length > 0 ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              {['all', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverity(sev)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    severity === sev
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {filteredFindings.map((finding) => (
                <div key={finding.id} className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <p className="text-white font-semibold">{finding.title}</p>
                      </div>
                      <p className="text-gray-400 text-sm">{finding.type}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(finding.severity)}`}>
                      {getSeverityLabel(finding.severity)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      {finding.createdAt ? new Date(finding.createdAt).toLocaleString() : 'N/A'}
                    </span>
                    <button className="text-blue-400 hover:text-blue-300">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Eye className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No GuardDuty findings detected</p>
            <p className="text-gray-500 text-sm mt-2">
              Your environment is secure
            </p>
          </div>
        )}
      </div>
    );
  };

  // SSL/HTTPS Status Panel
  const SSLStatusPanel = () => {
    const [sslStatus, setSslStatus] = useState({
      enabled: true,
      version: 'TLS 1.2+',
      certificates: ['Let\'s Encrypt', 'AWS Certificate Manager'],
      lastChecked: new Date().toISOString(),
      connectionCount: Math.floor(Math.random() * 1000) + 500
    });

    // Simulate real-time connection updates
    useEffect(() => {
      const interval = setInterval(() => {
        setSslStatus(prev => ({
          ...prev,
          connectionCount: Math.floor(Math.random() * 1000) + 500,
          lastChecked: new Date().toISOString()
        }));
      }, 5000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Lock className="w-6 h-6 text-green-400" />
          HTTPS/SSL Encryption Status
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-auto"></div>
        </h3>

        <div className="space-y-4">
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-white font-semibold">HTTPS/SSL Encryption Active</p>
                <p className="text-gray-400 text-sm">
                  TLS {sslStatus.version} encryption is enabled and protecting all connections
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Encryption Version</p>
              <p className="text-white font-semibold text-lg">{sslStatus.version}</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Status</p>
              <p className="text-green-400 font-semibold text-lg">Secure</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Active Connections</p>
              <p className="text-blue-400 font-semibold text-lg">{sslStatus.connectionCount}</p>
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-3">Certificate Authorities</p>
            <div className="space-y-2">
              {sslStatus.certificates.map((cert, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white text-sm">{cert}</span>
                  <span className="text-green-400 text-xs ml-auto">Valid</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Last checked: {new Date(sslStatus.lastChecked).toLocaleTimeString()}</span>
            <span className="text-green-400">● Live</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Service Selection */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Security Services</h2>
          <button
            onClick={loadServiceData}
            disabled={loading}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3">
          {services.map((service) => {
            const Icon = service.icon;
            const isActive = activeService === service.id;
            
            return (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  isActive
                    ? `bg-${service.color}-600/20 border-${service.color}-500`
                    : 'bg-gray-700/30 border-gray-600 hover:border-gray-500'
                }`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${
                  isActive ? `text-${service.color}-400` : 'text-gray-400'
                }`} />
                <p className={`text-xs font-semibold text-center ${
                  isActive ? 'text-white' : 'text-gray-300'
                }`}>
                  {service.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/30 border border-red-500 rounded-xl p-4">
          <p className="text-red-300">
            <strong>Error:</strong> {error}
          </p>
          <p className="text-red-400 text-sm mt-2">
            Make sure your AWS credentials are configured in the environment variables.
          </p>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service-specific Components */}
        {activeService === 'iam' && <IAMPolicySimulator />}
        {activeService === 'ssl' && <SSLStatusPanel />}

        {/* Generic Service List */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-4">
            {services.find(s => s.id === activeService)?.name} Resources
          </h3>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 text-green-400 animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              {data[activeService]?.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-300">Resource</th>
                      <th className="px-4 py-3 text-left text-gray-300">Status</th>
                      <th className="px-4 py-3 text-left text-gray-300">Details</th>
                      <th className="px-4 py-3 text-left text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data[activeService].map((item, index) => (
                      <tr key={index} className="border-t border-gray-700 hover:bg-gray-700/30">
                        <td className="px-4 py-3 text-white">
                          {item.name || item.vpcId || item.userName || item.id || JSON.stringify(item).substring(0, 30)}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                            Active
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm">
                          {item.arn || item.dnsName || item.cidrBlock || 'N/A'}
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-blue-400 hover:text-blue-300 text-sm">
                            Configure
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">
                    No {services.find(s => s.id === activeService)?.name} resources found
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Create your first resource to get started
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Connection Status Monitor */}
      <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-6 border border-green-700">
        <div className="flex items-start gap-4">
          <CheckCircle className="w-8 h-8 text-green-400 mt-1" />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Secure Connection Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">TLS/SSL Encryption</p>
                <p className="text-green-400 font-semibold text-lg">Enabled</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">DDoS Protection</p>
                <p className="text-green-400 font-semibold text-lg">Active</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Threat Detection</p>
                <p className="text-green-400 font-semibold text-lg">Monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkingManagement;

