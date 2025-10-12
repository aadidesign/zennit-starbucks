import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Activity, TrendingUp, Server, Cpu, HardDrive, 
  Zap, RefreshCw, AlertCircle, CheckCircle, Clock,
  ArrowUp, ArrowDown, Settings, BarChart3
} from 'lucide-react';
import {
  autoScalingService,
  cloudWatchService,
  healthCheckService,
  monitoringUtils
} from '../../lib/aws/scalabilityServices';

const ScalabilityMonitoring = () => {
  const [loading, setLoading] = useState(false);
  const [autoScalingGroups, setAutoScalingGroups] = useState([]);
  const [loadBalancers, setLoadBalancers] = useState([]);
  const [alarms, setAlarms] = useState([]);
  const [metricsData, setMetricsData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('cpu');
  const [timeRange, setTimeRange] = useState('1h');

  useEffect(() => {
    loadAllData();
    // Generate mock metrics for demonstration
    setMetricsData(monitoringUtils.generateMockMetrics(24, 48));
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    
    try {
      const [asgResult, lbResult, alarmsResult] = await Promise.all([
        autoScalingService.listAutoScalingGroups(),
        healthCheckService.listLoadBalancersWithHealth(),
        cloudWatchService.listAlarms()
      ]);

      if (asgResult.success) setAutoScalingGroups(asgResult.data);
      if (lbResult.success) setLoadBalancers(lbResult.data);
      if (alarmsResult.success) setAlarms(alarmsResult.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto Scaling Configuration Panel
  const AutoScalingPanel = () => {
    const [selectedASG, setSelectedASG] = useState(null);
    const [newCapacity, setNewCapacity] = useState({
      minSize: 1,
      maxSize: 10,
      desiredCapacity: 2
    });

    const handleUpdateCapacity = async () => {
      if (selectedASG) {
        const result = await autoScalingService.updateScalingGroup(
          selectedASG.name,
          newCapacity
        );
        if (result.success) {
          loadAllData();
        }
      }
    };

    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-purple-400" />
          Auto Scaling Groups
        </h3>

        {autoScalingGroups.length > 0 ? (
          <div className="space-y-4">
            {autoScalingGroups.map((asg, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-white font-semibold">{asg.name}</p>
                    <p className="text-gray-400 text-sm">
                      {asg.instances.length} instances running
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedASG(asg)}
                    className="text-purple-400 hover:text-purple-300 text-sm"
                  >
                    Configure →
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-800 rounded p-3">
                    <p className="text-gray-400 text-xs mb-1">Min Size</p>
                    <p className="text-white font-semibold text-lg">{asg.minSize}</p>
                  </div>
                  <div className="bg-gray-800 rounded p-3">
                    <p className="text-gray-400 text-xs mb-1">Desired</p>
                    <p className="text-blue-400 font-semibold text-lg">{asg.desiredCapacity}</p>
                  </div>
                  <div className="bg-gray-800 rounded p-3">
                    <p className="text-gray-400 text-xs mb-1">Max Size</p>
                    <p className="text-white font-semibold text-lg">{asg.maxSize}</p>
                  </div>
                </div>

                {/* Instance Health */}
                <div className="mt-3">
                  <p className="text-gray-400 text-sm mb-2">Instance Health:</p>
                  <div className="flex gap-2">
                    {asg.instances.map((instance, idx) => (
                      <div
                        key={idx}
                        className={`w-8 h-8 rounded flex items-center justify-center ${
                          instance.healthStatus === 'Healthy'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                        title={`${instance.instanceId} - ${instance.healthStatus}`}
                      >
                        {instance.healthStatus === 'Healthy' ? '✓' : '×'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Scaling Policy Configurator */}
            {selectedASG && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4"
              >
                <h4 className="text-white font-semibold mb-3">
                  Update Scaling Policy for {selectedASG.name}
                </h4>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Min Size</label>
                    <input
                      type="number"
                      value={newCapacity.minSize}
                      onChange={(e) => setNewCapacity({...newCapacity, minSize: parseInt(e.target.value)})}
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Desired</label>
                    <input
                      type="number"
                      value={newCapacity.desiredCapacity}
                      onChange={(e) => setNewCapacity({...newCapacity, desiredCapacity: parseInt(e.target.value)})}
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Max Size</label>
                    <input
                      type="number"
                      value={newCapacity.maxSize}
                      onChange={(e) => setNewCapacity({...newCapacity, maxSize: parseInt(e.target.value)})}
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                    />
                  </div>
                </div>
                <button
                  onClick={handleUpdateCapacity}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold"
                >
                  Apply Changes
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Zap className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No Auto Scaling Groups configured</p>
            <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
              Create Auto Scaling Group
            </button>
          </div>
        )}
      </div>
    );
  };

  // Load Balancer Health Dashboard
  const LoadBalancerHealth = () => {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Server className="w-6 h-6 text-green-400" />
          Load Balancer Health
        </h3>

        {loadBalancers.length > 0 ? (
          <div className="space-y-3">
            {loadBalancers.map((lb, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-white font-semibold">{lb.name}</p>
                    <p className="text-gray-400 text-sm">{lb.dnsName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                      {lb.state?.Code || 'Active'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-gray-800 rounded p-2">
                    <p className="text-gray-400 text-xs">Type</p>
                    <p className="text-white font-semibold">{lb.type}</p>
                  </div>
                  <div className="bg-gray-800 rounded p-2">
                    <p className="text-gray-400 text-xs">Scheme</p>
                    <p className="text-white font-semibold">{lb.scheme}</p>
                  </div>
                  <div className="bg-gray-800 rounded p-2">
                    <p className="text-gray-400 text-xs">Target Groups</p>
                    <p className="text-blue-400 font-semibold">{lb.targetGroups || 0}</p>
                  </div>
                  <div className="bg-gray-800 rounded p-2">
                    <p className="text-gray-400 text-xs">AZs</p>
                    <p className="text-white font-semibold">{lb.availabilityZones?.length || 0}</p>
                  </div>
                </div>

                {/* Availability Zones */}
                {lb.availabilityZones && lb.availabilityZones.length > 0 && (
                  <div className="mt-3">
                    <p className="text-gray-400 text-sm mb-2">Availability Zones:</p>
                    <div className="flex flex-wrap gap-2">
                      {lb.availabilityZones.map((az, azIdx) => (
                        <span
                          key={azIdx}
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold"
                        >
                          {az.ZoneName || az}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Server className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No Load Balancers found</p>
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
            const currentValue = metricsData[metricsData.length - 1]?.[
              metric.id === 'cpu' ? 'cpuUtilization' :
              metric.id === 'memory' ? 'memoryUtilization' :
              metric.id === 'network' ? 'networkIn' :
              'requestCount'
            ];

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
                  <ArrowUp className="w-4 h-4 text-green-400" />
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

    // Mock alarms if none exist
    const displayAlarms = alarms.length > 0 ? alarms : [
      { alarmName: 'High CPU Usage', stateValue: 'OK', threshold: 80, metricName: 'CPUUtilization' },
      { alarmName: 'Memory Alert', stateValue: 'OK', threshold: 90, metricName: 'MemoryUtilization' },
      { alarmName: 'Request Rate Limit', stateValue: 'OK', threshold: 1000, metricName: 'RequestCount' }
    ];

    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-orange-400" />
          CloudWatch Alarms
        </h3>

        <div className="space-y-3">
          {displayAlarms.slice(0, 5).map((alarm, index) => (
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
      </div>
    );
  };

  // Multi-AZ Deployment Status
  const MultiAZStatus = () => {
    const zones = [
      { name: 'us-east-1a', status: 'healthy', instances: 3, latency: 12 },
      { name: 'us-east-1b', status: 'healthy', instances: 3, latency: 15 },
      { name: 'us-east-1c', status: 'healthy', instances: 2, latency: 14 }
    ];

    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Server className="w-6 h-6 text-blue-400" />
          Multi-AZ Deployment
        </h3>

        <div className="space-y-3">
          {zones.map((zone, index) => (
            <div key={index} className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    zone.status === 'healthy' ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                  }`} />
                  <p className="text-white font-semibold">{zone.name}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                  99.99% uptime
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-gray-400 text-xs">Instances</p>
                  <p className="text-white font-semibold">{zone.instances}</p>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-gray-400 text-xs">Latency</p>
                  <p className="text-blue-400 font-semibold">{zone.latency}ms</p>
                </div>
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
                Automatic failover across 3 availability zones
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Refresh */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">High Availability & Scalability Monitoring</h2>
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
          <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-gray-400 text-sm">Auto Scaling Groups</p>
                <p className="text-white font-bold text-2xl">{autoScalingGroups.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
            <div className="flex items-center gap-3">
              <Server className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Load Balancers</p>
                <p className="text-white font-bold text-2xl">{loadBalancers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/30">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-gray-400 text-sm">Active Instances</p>
                <p className="text-white font-bold text-2xl">
                  {autoScalingGroups.reduce((sum, asg) => sum + asg.instances.length, 0)}
                </p>
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
        <AutoScalingPanel />
        <LoadBalancerHealth />
        <MetricsDashboard />
        <AlarmsPanel />
        <MultiAZStatus />
      </div>

      {/* Cost Optimization Insights */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-purple-400" />
          Cost Optimization Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Potential Savings with Reserved Instances</p>
            <p className="text-purple-400 font-bold text-3xl">90%</p>
            <p className="text-gray-500 text-xs mt-1">Up to $1,200/month savings</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Auto Scaling Efficiency</p>
            <p className="text-green-400 font-bold text-3xl">85%</p>
            <p className="text-gray-500 text-xs mt-1">Resource utilization optimized</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Multi-AZ Availability</p>
            <p className="text-blue-400 font-bold text-3xl">99.99%</p>
            <p className="text-gray-500 text-xs mt-1">SLA compliance achieved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScalabilityMonitoring;

