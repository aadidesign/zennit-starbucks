import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, RefreshCw, Plus, Activity, HardDrive, 
  Zap, FileJson, GitBranch, Clock, Search, Filter 
} from 'lucide-react';
import { 
  rdsService, 
  dynamoDBService, 
  elastiCacheService, 
  documentDBService, 
  neptuneService,
  timestreamService 
} from '../../lib/aws/databaseServices';

const DatabaseManagement = () => {
  const [activeService, setActiveService] = useState('rds');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [error, setError] = useState(null);

  const services = [
    { id: 'rds', name: 'Amazon RDS', icon: Database, color: 'blue' },
    { id: 'dynamodb', name: 'DynamoDB', icon: Zap, color: 'orange' },
    { id: 'elasticache', name: 'ElastiCache', icon: Activity, color: 'red' },
    { id: 'documentdb', name: 'DocumentDB', icon: FileJson, color: 'green' },
    { id: 'neptune', name: 'Neptune', icon: GitBranch, color: 'purple' },
    { id: 'timestream', name: 'Timestream', icon: Clock, color: 'indigo' }
  ];

  useEffect(() => {
    loadServiceData();
  }, [activeService]);

  const loadServiceData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let result;
      switch (activeService) {
        case 'rds':
          result = await rdsService.listInstances();
          break;
        case 'dynamodb':
          result = await dynamoDBService.listTables();
          break;
        case 'elasticache':
          result = await elastiCacheService.listClusters();
          break;
        case 'documentdb':
          result = await documentDBService.listClusters();
          break;
        case 'neptune':
          result = await neptuneService.listClusters();
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

  // Schema Designer Component
  const SchemaDesigner = () => {
    const [tableName, setTableName] = useState('');
    const [attributes, setAttributes] = useState([{ name: '', type: 'S' }]);

    const addAttribute = () => {
      setAttributes([...attributes, { name: '', type: 'S' }]);
    };

    const handleCreateTable = async () => {
      if (activeService === 'dynamodb') {
        const config = {
          tableName,
          keySchema: [{ AttributeName: attributes[0].name, KeyType: 'HASH' }],
          attributeDefinitions: attributes.map(attr => ({
            AttributeName: attr.name,
            AttributeType: attr.type
          }))
        };
        const result = await dynamoDBService.createTable(config);
        if (result.success) {
          setShowCreateModal(false);
          loadServiceData();
        }
      }
    };

    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Schema Designer</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Table Name</label>
            <input
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter table name"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Attributes</label>
            {attributes.map((attr, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={attr.name}
                  onChange={(e) => {
                    const newAttrs = [...attributes];
                    newAttrs[index].name = e.target.value;
                    setAttributes(newAttrs);
                  }}
                  className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
                  placeholder="Attribute name"
                />
                <select
                  value={attr.type}
                  onChange={(e) => {
                    const newAttrs = [...attributes];
                    newAttrs[index].type = e.target.value;
                    setAttributes(newAttrs);
                  }}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
                >
                  <option value="S">String</option>
                  <option value="N">Number</option>
                  <option value="B">Binary</option>
                </select>
              </div>
            ))}
            <button
              onClick={addAttribute}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              + Add Attribute
            </button>
          </div>

          <button
            onClick={handleCreateTable}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Create Table
          </button>
        </div>
      </div>
    );
  };

  // Query Builder Component
  const QueryBuilder = () => {
    const [queryType, setQueryType] = useState('scan');
    const [selectedTable, setSelectedTable] = useState('');
    const [keyCondition, setKeyCondition] = useState('');
    const [queryResults, setQueryResults] = useState(null);

    const executeQuery = async () => {
      if (activeService === 'dynamodb') {
        let result;
        if (queryType === 'scan') {
          result = await dynamoDBService.scanTable(selectedTable);
        } else {
          // Implement query logic
          result = { success: true, data: [] };
        }
        setQueryResults(result);
      }
    };

    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Search className="w-6 h-6 text-blue-400" />
          Query Builder
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Query Type</label>
              <select
                value={queryType}
                onChange={(e) => setQueryType(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
              >
                <option value="scan">Scan</option>
                <option value="query">Query</option>
                <option value="getItem">Get Item</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Table</label>
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
              >
                <option value="">Select table...</option>
                {Array.isArray(data[activeService]) && data[activeService].map((table, idx) => (
                  <option key={idx} value={table}>{table}</option>
                ))}
              </select>
            </div>
          </div>

          {queryType === 'query' && (
            <div>
              <label className="block text-gray-300 mb-2">Key Condition Expression</label>
              <input
                type="text"
                value={keyCondition}
                onChange={(e) => setKeyCondition(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
                placeholder="e.g., id = :id"
              />
            </div>
          )}

          <button
            onClick={executeQuery}
            disabled={!selectedTable}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Execute Query
          </button>

          {queryResults && (
            <div className="mt-4 bg-gray-900 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">
                Results ({queryResults.count || 0} items)
              </h4>
              <div className="max-h-64 overflow-auto">
                <pre className="text-gray-300 text-sm">
                  {JSON.stringify(queryResults.data, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Service Selection */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Database Services</h2>
          <button
            onClick={loadServiceData}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
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
                <Icon className={`w-8 h-8 mx-auto mb-2 ${
                  isActive ? `text-${service.color}-400` : 'text-gray-400'
                }`} />
                <p className={`text-sm font-semibold text-center ${
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
        {/* Schema Designer / Data Upload */}
        {activeService === 'dynamodb' ? <SchemaDesigner /> : (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Data Upload & Management</h3>
            <p className="text-gray-400 mb-4">
              Upload data, configure replication, and manage backups for {services.find(s => s.id === activeService)?.name}
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
              <Plus className="w-5 h-5 inline mr-2" />
              Create New Instance
            </button>
          </div>
        )}

        {/* Query Builder */}
        {activeService === 'dynamodb' && <QueryBuilder />}

        {/* Monitoring Dashboard */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-4">
            {services.find(s => s.id === activeService)?.name} Instances
          </h3>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              {data[activeService]?.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-300">Name</th>
                      <th className="px-4 py-3 text-left text-gray-300">Status</th>
                      <th className="px-4 py-3 text-left text-gray-300">Engine/Type</th>
                      <th className="px-4 py-3 text-left text-gray-300">Endpoint</th>
                      <th className="px-4 py-3 text-left text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data[activeService].map((item, index) => (
                      <tr key={index} className="border-t border-gray-700 hover:bg-gray-700/30">
                        <td className="px-4 py-3 text-white">
                          {item.identifier || item.id || item.name || item}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                            {item.status || 'Active'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-300">
                          {item.engine || item.nodeType || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm">
                          {item.endpoint || item.Endpoint || 'N/A'}
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-blue-400 hover:text-blue-300 text-sm">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12">
                  <Database className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">
                    No {services.find(s => s.id === activeService)?.name} instances found
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Create your first instance to get started
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatabaseManagement;

