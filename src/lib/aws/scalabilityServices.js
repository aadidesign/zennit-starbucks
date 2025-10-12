// AWS High Availability and Scalability Services Configuration and Utilities
import { AutoScalingClient, DescribeAutoScalingGroupsCommand, CreateAutoScalingGroupCommand, UpdateAutoScalingGroupCommand, DescribeScalingActivitiesCommand } from '@aws-sdk/client-auto-scaling';
import { CloudWatchClient, GetMetricStatisticsCommand, PutMetricAlarmCommand, DescribeAlarmsCommand } from '@aws-sdk/client-cloudwatch';
import { ElasticLoadBalancingV2Client, DescribeLoadBalancersCommand as ELBDescribeCommand, DescribeTargetGroupsCommand, DescribeListenersCommand } from '@aws-sdk/client-elastic-load-balancing-v2';

// Initialize clients
const awsConfig = {
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
};

const autoScalingClient = new AutoScalingClient(awsConfig);
const cloudWatchClient = new CloudWatchClient(awsConfig);
const elbClient = new ElasticLoadBalancingV2Client(awsConfig);

// ============ Auto Scaling Operations ============
export const autoScalingService = {
  // List all Auto Scaling Groups
  async listAutoScalingGroups() {
    try {
      const command = new DescribeAutoScalingGroupsCommand({});
      const response = await autoScalingClient.send(command);
      return {
        success: true,
        data: response.AutoScalingGroups.map(asg => ({
          name: asg.AutoScalingGroupName,
          minSize: asg.MinSize,
          maxSize: asg.MaxSize,
          desiredCapacity: asg.DesiredCapacity,
          defaultCooldown: asg.DefaultCooldown,
          availabilityZones: asg.AvailabilityZones,
          healthCheckType: asg.HealthCheckType,
          healthCheckGracePeriod: asg.HealthCheckGracePeriod,
          instances: asg.Instances.map(instance => ({
            instanceId: instance.InstanceId,
            availabilityZone: instance.AvailabilityZone,
            lifecycleState: instance.LifecycleState,
            healthStatus: instance.HealthStatus
          }))
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create Auto Scaling Group
  async createAutoScalingGroup(config) {
    try {
      const command = new CreateAutoScalingGroupCommand({
        AutoScalingGroupName: config.name,
        MinSize: config.minSize || 1,
        MaxSize: config.maxSize || 10,
        DesiredCapacity: config.desiredCapacity || 2,
        DefaultCooldown: config.cooldown || 300,
        HealthCheckType: config.healthCheckType || 'ELB',
        HealthCheckGracePeriod: config.healthCheckGracePeriod || 300,
        LaunchTemplate: config.launchTemplate,
        VPCZoneIdentifier: config.subnets?.join(','),
        TargetGroupARNs: config.targetGroupARNs
      });
      await autoScalingClient.send(command);
      return { success: true, message: 'Auto Scaling Group created successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Update Auto Scaling Group capacity
  async updateScalingGroup(name, config) {
    try {
      const command = new UpdateAutoScalingGroupCommand({
        AutoScalingGroupName: name,
        MinSize: config.minSize,
        MaxSize: config.maxSize,
        DesiredCapacity: config.desiredCapacity
      });
      await autoScalingClient.send(command);
      return { success: true, message: 'Auto Scaling Group updated successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get scaling activities
  async getScalingActivities(autoScalingGroupName) {
    try {
      const command = new DescribeScalingActivitiesCommand({
        AutoScalingGroupName: autoScalingGroupName,
        MaxRecords: 50
      });
      const response = await autoScalingClient.send(command);
      return {
        success: true,
        data: response.Activities.map(activity => ({
          activityId: activity.ActivityId,
          description: activity.Description,
          cause: activity.Cause,
          startTime: activity.StartTime,
          endTime: activity.EndTime,
          statusCode: activity.StatusCode,
          statusMessage: activity.StatusMessage
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ============ CloudWatch Monitoring Operations ============
export const cloudWatchService = {
  // Get metric statistics
  async getMetricStatistics(config) {
    try {
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - (config.periodHours || 1) * 60 * 60 * 1000);
      
      const command = new GetMetricStatisticsCommand({
        Namespace: config.namespace,
        MetricName: config.metricName,
        Dimensions: config.dimensions,
        StartTime: startTime,
        EndTime: endTime,
        Period: config.period || 300, // 5 minutes
        Statistics: config.statistics || ['Average', 'Maximum', 'Minimum'],
        Unit: config.unit
      });
      const response = await cloudWatchClient.send(command);
      return {
        success: true,
        data: response.Datapoints.sort((a, b) => a.Timestamp - b.Timestamp)
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get EC2 instance metrics
  async getEC2Metrics(instanceId, metricName = 'CPUUtilization', periodHours = 1) {
    return this.getMetricStatistics({
      namespace: 'AWS/EC2',
      metricName: metricName,
      dimensions: [{ Name: 'InstanceId', Value: instanceId }],
      periodHours: periodHours,
      unit: metricName === 'CPUUtilization' ? 'Percent' : undefined
    });
  },

  // Get RDS metrics
  async getRDSMetrics(dbInstanceIdentifier, metricName = 'CPUUtilization', periodHours = 1) {
    return this.getMetricStatistics({
      namespace: 'AWS/RDS',
      metricName: metricName,
      dimensions: [{ Name: 'DBInstanceIdentifier', Value: dbInstanceIdentifier }],
      periodHours: periodHours
    });
  },

  // Get DynamoDB metrics
  async getDynamoDBMetrics(tableName, metricName = 'ConsumedReadCapacityUnits', periodHours = 1) {
    return this.getMetricStatistics({
      namespace: 'AWS/DynamoDB',
      metricName: metricName,
      dimensions: [{ Name: 'TableName', Value: tableName }],
      periodHours: periodHours
    });
  },

  // Get Load Balancer metrics
  async getLoadBalancerMetrics(loadBalancerName, metricName = 'RequestCount', periodHours = 1) {
    return this.getMetricStatistics({
      namespace: 'AWS/ApplicationELB',
      metricName: metricName,
      dimensions: [{ Name: 'LoadBalancer', Value: loadBalancerName }],
      periodHours: periodHours
    });
  },

  // Create CloudWatch alarm
  async createAlarm(config) {
    try {
      const command = new PutMetricAlarmCommand({
        AlarmName: config.alarmName,
        ComparisonOperator: config.comparisonOperator || 'GreaterThanThreshold',
        EvaluationPeriods: config.evaluationPeriods || 2,
        MetricName: config.metricName,
        Namespace: config.namespace,
        Period: config.period || 300,
        Statistic: config.statistic || 'Average',
        Threshold: config.threshold,
        ActionsEnabled: true,
        AlarmActions: config.alarmActions,
        AlarmDescription: config.description,
        Dimensions: config.dimensions
      });
      await cloudWatchClient.send(command);
      return { success: true, message: 'Alarm created successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // List alarms
  async listAlarms(stateValue = null) {
    try {
      const params = stateValue ? { StateValue: stateValue } : {};
      const command = new DescribeAlarmsCommand(params);
      const response = await cloudWatchClient.send(command);
      return {
        success: true,
        data: response.MetricAlarms.map(alarm => ({
          alarmName: alarm.AlarmName,
          alarmDescription: alarm.AlarmDescription,
          stateValue: alarm.StateValue,
          stateReason: alarm.StateReason,
          metricName: alarm.MetricName,
          threshold: alarm.Threshold,
          comparisonOperator: alarm.ComparisonOperator
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ============ Load Balancer Health Check Operations ============
export const healthCheckService = {
  // List all load balancers with health status
  async listLoadBalancersWithHealth() {
    try {
      const command = new ELBDescribeCommand({});
      const response = await elbClient.send(command);
      
      const loadBalancersWithHealth = await Promise.all(
        response.LoadBalancers.map(async (lb) => {
          const targetGroupsCommand = new DescribeTargetGroupsCommand({
            LoadBalancerArn: lb.LoadBalancerArn
          });
          const targetGroupsResponse = await elbClient.send(targetGroupsCommand);
          
          return {
            name: lb.LoadBalancerName,
            arn: lb.LoadBalancerArn,
            dnsName: lb.DNSName,
            state: lb.State,
            type: lb.Type,
            scheme: lb.Scheme,
            availabilityZones: lb.AvailabilityZones,
            targetGroups: targetGroupsResponse.TargetGroups.length
          };
        })
      );
      
      return { success: true, data: loadBalancersWithHealth };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get target groups for load balancer
  async getTargetGroups(loadBalancerArn) {
    try {
      const command = new DescribeTargetGroupsCommand({
        LoadBalancerArn: loadBalancerArn
      });
      const response = await elbClient.send(command);
      return {
        success: true,
        data: response.TargetGroups.map(tg => ({
          name: tg.TargetGroupName,
          arn: tg.TargetGroupArn,
          protocol: tg.Protocol,
          port: tg.Port,
          vpcId: tg.VpcId,
          healthCheckEnabled: tg.HealthCheckEnabled,
          healthCheckPath: tg.HealthCheckPath,
          healthCheckProtocol: tg.HealthCheckProtocol
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get listeners for load balancer
  async getListeners(loadBalancerArn) {
    try {
      const command = new DescribeListenersCommand({
        LoadBalancerArn: loadBalancerArn
      });
      const response = await elbClient.send(command);
      return {
        success: true,
        data: response.Listeners.map(listener => ({
          arn: listener.ListenerArn,
          protocol: listener.Protocol,
          port: listener.Port,
          defaultActions: listener.DefaultActions
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ============ Utility Functions for Monitoring ============
export const monitoringUtils = {
  // Generate mock performance data for demonstration
  generateMockMetrics(hours = 24, dataPoints = 48) {
    const data = [];
    const now = new Date();
    const interval = (hours * 60 * 60 * 1000) / dataPoints;
    
    for (let i = dataPoints - 1; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * interval);
      data.push({
        timestamp: timestamp,
        cpuUtilization: Math.random() * 40 + 30, // 30-70%
        memoryUtilization: Math.random() * 30 + 40, // 40-70%
        networkIn: Math.random() * 1000000, // bytes
        networkOut: Math.random() * 800000, // bytes
        requestCount: Math.floor(Math.random() * 1000) + 500,
        latency: Math.random() * 100 + 50 // ms
      });
    }
    return data;
  },

  // Calculate availability percentage
  calculateAvailability(healthyCount, totalCount) {
    if (totalCount === 0) return 0;
    return ((healthyCount / totalCount) * 100).toFixed(2);
  },

  // Format bytes to human-readable format
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },

  // Calculate cost savings estimate
  calculateCostSavings(onDemandCost, reservedCost, savingsPercentage = 0.9) {
    const savings = (onDemandCost - reservedCost) * savingsPercentage;
    return {
      onDemandCost: onDemandCost.toFixed(2),
      reservedCost: reservedCost.toFixed(2),
      savings: savings.toFixed(2),
      savingsPercentage: ((savings / onDemandCost) * 100).toFixed(2)
    };
  }
};

export default {
  autoScalingService,
  cloudWatchService,
  healthCheckService,
  monitoringUtils
};

