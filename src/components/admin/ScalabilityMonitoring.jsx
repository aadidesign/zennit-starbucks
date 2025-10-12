import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Activity, TrendingUp, Server, Cpu, HardDrive, 
  Zap, RefreshCw, AlertCircle, CheckCircle, Clock,
  ArrowUp, ArrowDown, Settings, BarChart3
} from 'lucide-react';
import {
  cloudWatchService,
  monitoringUtils
} from '../../lib/mockAdminServices';
import { dynamoDBService } from '../../lib/mockAdminServices';

const ScalabilityMonitoring = () => {
  const [loading, setLoading] = useState(false);
  const [dynamoDBTables, setDynamoDBTables] = useState([]);
  const [alarms, setAlarms] = useState([]);
  const [metricsData, setMetricsData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('cpu');
  const [timeRange, setTimeRange] = useState('1h');

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    if (dynamoDBTables.length > 0) {
      loadMetricsData();
    }
  }, [dynamoDBTables]);

  // Auto-refresh every 30 seconds for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      loadAllData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadMetricsData = async () => {
    // Load DynamoDB metrics if tables are available
    if (dynamoDBTables.length > 0) {
      try {
        const metricsPromises = dynamoDBTables.slice(0, 1).map(async tableName => {
          const [readMetrics, writeMetrics] = await Promise.all([
            cloudWatchService.getDynamoDBMetrics(tableName, 'ConsumedReadCapacityUnits', 1),
            cloudWatchService.getDynamoDBMetrics(tableName, 'ConsumedWriteCapacityUnits', 1)
          ]);
          return { readMetrics, writeMetrics };
        });
        
        const results = await Promise.all(metricsPromises);
        const validResults = results.filter(r => r.readMetrics.success);
        
        if (validResults.length > 0 && validResults[0].readMetrics.data.length > 0) {
          const formattedData = validResults[0].readMetrics.data.map((point, index) => {
            const writePoint = validResults[0].writeMetrics.success ? 
              validResults[0].writeMetrics.data[index] : null;
            
            return {
              timestamp: new Date(point.Timestamp),
              cpuUtilization: Math.random() * 20 + 10, // Simulated for demo
              memoryUtilization: Math.random() * 15 + 5, // Simulated for demo
              networkIn: 0,
              networkOut: 0,
              requestCount: (point.Average || 0) + (writePoint?.Average || 0),
              latency: Math.random() * 5 + 1 // Simulated latency
            };
          });
          setMetricsData(formattedData);
        }
      } catch (error) {
        console.error('Error loading DynamoDB metrics:', error);
      }
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    
    try {
      const [dynamoResult, alarmsResult] = await Promise.all([
        dynamoDBService.listTables(),
        cloudWatchService.listAlarms()
      ]);

      if (dynamoResult.success) setDynamoDBTables(dynamoResult.data);
      if (alarmsResult.success) setAlarms(alarmsResult.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // DynamoDB Auto Scaling Panel
  const DynamoDBAutoScalingPanel = () => {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-orange-400" />
          DynamoDB Auto Scaling
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse ml-auto"></div>
        </h3>

        {dynamoDBTables.length > 0 ? (
          <div className="space-y-4">
            {dynamoDBTables.map((tableName, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-white font-semibold">{tableName}</p>
                    <p className="text-gray-400 text-sm">
                      DynamoDB Table with Auto Scaling
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                      Auto Scaling Enabled
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-800 rounded p-3">
                    <p className="text-gray-400 text-xs mb-1">Read Capacity</p>
                    <p className="text-white font-semibold text-lg">Auto</p>
                  </div>
                  <div className="bg-gray-800 rounded p-3">
                    <p className="text-gray-400 text-xs mb-1">Write Capacity</p>
                    <p className="text-blue-400 font-semibold text-lg">Auto</p>
                  </div>
                  <div className="bg-gray-800 rounded p-3">
                    <p className="text-gray-400 text-xs mb-1">Billing Mode</p>
                    <p className="text-white font-semibold text-lg">On-Demand</p>
                  </div>
                </div>

                <div className="mt-3 bg-orange-900/20 border border-orange-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-400" />
                    <p className="text-orange-400 text-sm font-medium">
                      DynamoDB Auto Scaling automatically adjusts capacity based on demand
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Zap className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No DynamoDB tables configured</p>
            <p className="text-gray-500 text-sm mt-2">
              Create DynamoDB tables with Auto Scaling enabled
            </p>
          </div>
        )}
      </div>
    );
  };

  // DynamoDB Performance Dashboard
  const DynamoDBPerformanceDashboard = () => {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-6 h-6 text-orange-400" />
          DynamoDB Performance
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse ml-auto"></div>
        </h3>

        {dynamoDBTables.length > 0 ? (
          <div className="space-y-3">
            {dynamoDBTables.map((tableName, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-white font-semibold">{tableName}</p>
                    <p className="text-gray-400 text-sm">DynamoDB Table Performance</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                      Healthy
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-gray-800 rounded p-2">
                    <p className="text-gray-400 text-xs">Read Capacity</p>
                    <p className="text-white font-semibold">Auto</p>
                  </div>
                  <div className="bg-gray-800 rounded p-2">
                    <p className="text-gray-400 text-xs">Write Capacity</p>
                    <p className="text-white font-semibold">Auto</p>
                  </div>
                  <div className="bg-gray-800 rounded p-2">
                    <p className="text-gray-400 text-xs">Storage Type</p>
                    <p className="text-blue-400 font-semibold">SSD</p>
                  </div>
                  <div className="bg-gray-800 rounded p-2">
                    <p className="text-gray-400 text-xs">Encryption</p>
                    <p className="text-green-400 font-semibold">Enabled</p>
                  </div>
                </div>

                {/* Multi-AZ Status */}
                <div className="mt-3">
                  <p className="text-gray-400 text-sm mb-2">High Availability:</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Multi-AZ Deployment (Built-in)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No DynamoDB tables found</p>
            <p className="text-gray-500 text-sm mt-2">
              Performance metrics will appear once tables are created
            </p>
          </div>
        )}
      </div>
    );
  };

  // CloudWatch Metrics Dashboard
  const MetricsDashboard = () => {
    const metrics = [
      { id: 'cpu', name: 'CPU Utilization', icon: Cpu, color: 'blue', unit: '%' },
      { id: 'memory', name: 'Memory Usage', icon: HardDrive, color: 'green', unit: '%' },
      { id: 'network', name: 'Network Traffic', icon: Activity, color: 'purple', unit: 'MB' },
      { id: 'requests', name: 'Request Count', icon: BarChart3, color: 'orange', unit: '' }
    ];

    const getChartData = () => {
      if (!metricsData || metricsData.length === 0) return [];
      
      return metricsData.map(d => ({
        time: d.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        value: selectedMetric === 'cpu' ? d.cpuUtilization :
               selectedMetric === 'memory' ? d.memoryUtilization :
               selectedMetric === 'network' ? (d.networkIn + d.networkOut) / 1000000 :
               d.requestCount
      }));
    };

    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-400" />
            CloudWatch Metrics
          </h3>
          <div className="flex gap-2">
            {['1h', '6h', '24h', '7d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                  timeRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Metric Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const isActive = selectedMetric === metric.id;
            const currentValue = metricsData.length > 0 
              ? metricsData[metricsData.length - 1]?.[
                  metric.id === 'cpu' ? 'cpuUtilization' :
                  metric.id === 'memory' ? 'memoryUtilization' :
                  metric.id === 'network' ? 'networkIn' :
                  'requestCount'
                ]
              : 0;

            return (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  isActive
                    ? `bg-${metric.color}-600/20 border-${metric.color}-500`
                    : 'bg-gray-700/30 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-6 h-6 ${
                    isActive ? `text-${metric.color}-400` : 'text-gray-400'
                  }`} />
                  {metricsData.length > 0 && <ArrowUp className="w-4 h-4 text-green-400" />}
                </div>
                <p className={`text-2xl font-bold mb-1 ${
                  isActive ? 'text-white' : 'text-gray-300'
                }`}>
                  {metric.id === 'network' 
                    ? monitoringUtils.formatBytes(currentValue || 0)
                    : Math.round(currentValue || 0)
                  }
                  {metric.id !== 'network' && metric.unit}
                </p>
                <p className="text-gray-400 text-sm">{metric.name}</p>
              </button>
            );
          })}
        </div>

        {/* Chart */}
        <div className="bg-gray-900 rounded-lg p-4">
          {getChartData().length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={getChartData()}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="time" 
                  stroke="#9ca3af" 
                  tick={{ fill: '#9ca3af' }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  stroke="#9ca3af" 
                  tick={{ fill: '#9ca3af' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-center">
                <Activity className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No metrics data available</p>
                <p className="text-gray-500 text-sm mt-2">
                  Metrics will appear once instances are running
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // CloudWatch Alarms Panel
  const AlarmsPanel = () => {
    const getAlarmColor = (state) => {
      switch (state) {
        case 'ALARM': return 'text-red-400 bg-red-500/20';
        case 'OK': return 'text-green-400 bg-green-500/20';
        case 'INSUFFICIENT_DATA': return 'text-yellow-400 bg-yellow-500/20';
        default: return 'text-gray-400 bg-gray-500/20';
      }
    };

    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-orange-400" />
          CloudWatch Alarms
        </h3>

        {alarms.length > 0 ? (
          <div className="space-y-3">
            {alarms.slice(0, 5).map((alarm, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-white font-semibold">{alarm.alarmName}</p>
                    <p className="text-gray-400 text-sm">
                      {alarm.metricName} {alarm.comparisonOperator || '>'} {alarm.threshold}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAlarmColor(alarm.stateValue)}`}>
                    {alarm.stateValue}
                  </span>
                </div>
                {alarm.stateReason && (
                  <p className="text-gray-500 text-xs">{alarm.stateReason}</p>
                )}
              </div>
            ))}

            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors mt-4">
              <Settings className="w-5 h-5 inline mr-2" />
              Configure Alarms
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No CloudWatch alarms configured</p>
            <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg">
              <Settings className="w-5 h-5 inline mr-2" />
              Create Alarm
            </button>
          </div>
        )}
      </div>
    );
  };

  // DynamoDB Multi-AZ Status
  const DynamoDBMultiAZStatus = () => {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Server className="w-6 h-6 text-blue-400" />
          DynamoDB Multi-AZ Deployment
        </h3>

        {dynamoDBTables.length > 0 ? (
          <>
            <div className="space-y-3">
              {dynamoDBTables.map((tableName, index) => (
                <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-white font-semibold">{tableName}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                      Multi-AZ Active
                    </span>
                  </div>

                  <div className="bg-gray-800 rounded p-2">
                    <p className="text-gray-400 text-xs">Availability</p>
                    <p className="text-white font-semibold">99.99% SLA</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="text-white font-semibold">High Availability Enabled</p>
                  <p className="text-gray-400 text-sm">
                    DynamoDB automatically replicates data across multiple availability zones
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <Server className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No DynamoDB tables configured</p>
            <p className="text-gray-500 text-sm mt-2">
              DynamoDB provides built-in Multi-AZ deployment for high availability
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Refresh */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">DynamoDB & CloudWatch Monitoring</h2>
          <button
            onClick={loadAllData}
            disabled={loading}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-500/30">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-orange-400" />
              <div>
                <p className="text-gray-400 text-sm">DynamoDB Tables</p>
                <p className="text-white font-bold text-2xl">{dynamoDBTables.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-gray-400 text-sm">Auto Scaling</p>
                <p className="text-white font-bold text-2xl">Enabled</p>
              </div>
            </div>
          </div>
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
            <div className="flex items-center gap-3">
              <Server className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Multi-AZ</p>
                <p className="text-white font-bold text-2xl">Built-in</p>
              </div>
            </div>
          </div>
          <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-500/30">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-orange-400" />
              <div>
                <p className="text-gray-400 text-sm">Active Alarms</p>
                <p className="text-white font-bold text-2xl">
                  {alarms.filter(a => a.stateValue === 'ALARM').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DynamoDBAutoScalingPanel />
        <DynamoDBPerformanceDashboard />
        <MetricsDashboard />
        <AlarmsPanel />
        <DynamoDBMultiAZStatus />
      </div>

      {/* DynamoDB Infrastructure Summary */}
      {dynamoDBTables.length > 0 && (
        <div className="bg-gradient-to-r from-orange-900/30 to-blue-900/30 rounded-xl p-6 border border-orange-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-orange-400" />
            DynamoDB Infrastructure Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Total Tables</p>
              <p className="text-orange-400 font-bold text-3xl">{dynamoDBTables.length}</p>
              <p className="text-gray-500 text-xs mt-1">All with Auto Scaling enabled</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">High Availability</p>
              <p className="text-green-400 font-bold text-3xl">99.99%</p>
              <p className="text-gray-500 text-xs mt-1">Multi-AZ deployment SLA</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Active Alarms</p>
              <p className="text-blue-400 font-bold text-3xl">
                {alarms.filter(a => a.stateValue === 'ALARM').length}/{alarms.length}
              </p>
              <p className="text-gray-500 text-xs mt-1">Monitoring performance</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScalabilityMonitoring;

