// AWS Database Services Configuration and Utilities
import { RDSClient, DescribeDBInstancesCommand, CreateDBInstanceCommand, ModifyDBInstanceCommand } from '@aws-sdk/client-rds';
import { DynamoDBClient, ListTablesCommand, CreateTableCommand, DescribeTableCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ElastiCacheClient, DescribeCacheClustersCommand, CreateCacheClusterCommand } from '@aws-sdk/client-elasticache';
import { DocDBClient, DescribeDBClustersCommand, CreateDBClusterCommand } from '@aws-sdk/client-docdb';
import { NeptuneClient, DescribeDBClustersCommand as NeptuneDescribeCommand } from '@aws-sdk/client-neptune';
import { TimestreamQueryClient, QueryCommand as TimestreamQueryCommand } from '@aws-sdk/client-timestream-query';
import { TimestreamWriteClient, DescribeTableCommand as TimestreamDescribeCommand } from '@aws-sdk/client-timestream-write';

// Initialize clients
const awsConfig = {
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
};

const rdsClient = new RDSClient(awsConfig);
const dynamoDBClient = new DynamoDBClient(awsConfig);
const docClient = DynamoDBDocumentClient.from(dynamoDBClient);
const elastiCacheClient = new ElastiCacheClient(awsConfig);
const docDBClient = new DocDBClient(awsConfig);
const neptuneClient = new NeptuneClient(awsConfig);
const timestreamQueryClient = new TimestreamQueryClient(awsConfig);
const timestreamWriteClient = new TimestreamWriteClient(awsConfig);

// ============ Amazon RDS Operations ============
export const rdsService = {
  // List all RDS instances
  async listInstances() {
    try {
      const command = new DescribeDBInstancesCommand({});
      const response = await rdsClient.send(command);
      return {
        success: true,
        data: response.DBInstances.map(instance => ({
          identifier: instance.DBInstanceIdentifier,
          engine: instance.Engine,
          status: instance.DBInstanceStatus,
          endpoint: instance.Endpoint?.Address,
          port: instance.Endpoint?.Port,
          storage: instance.AllocatedStorage,
          instanceClass: instance.DBInstanceClass,
          multiAZ: instance.MultiAZ,
          availabilityZone: instance.AvailabilityZone
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create new RDS instance
  async createInstance(config) {
    try {
      const command = new CreateDBInstanceCommand({
        DBInstanceIdentifier: config.identifier,
        DBInstanceClass: config.instanceClass || 'db.t3.micro',
        Engine: config.engine || 'mysql',
        MasterUsername: config.username,
        MasterUserPassword: config.password,
        AllocatedStorage: config.storage || 20,
        MultiAZ: config.multiAZ || false,
        BackupRetentionPeriod: config.backupRetention || 7,
        StorageEncrypted: true
      });
      const response = await rdsClient.send(command);
      return { success: true, data: response.DBInstance };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Modify RDS instance (for scaling)
  async modifyInstance(identifier, config) {
    try {
      const command = new ModifyDBInstanceCommand({
        DBInstanceIdentifier: identifier,
        DBInstanceClass: config.instanceClass,
        AllocatedStorage: config.storage,
        ApplyImmediately: config.applyImmediately || false
      });
      const response = await rdsClient.send(command);
      return { success: true, data: response.DBInstance };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ============ Amazon DynamoDB Operations ============
export const dynamoDBService = {
  // List all tables
  async listTables() {
    try {
      const command = new ListTablesCommand({});
      const response = await dynamoDBClient.send(command);
      return { success: true, data: response.TableNames };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create table with schema
  async createTable(config) {
    try {
      const command = new CreateTableCommand({
        TableName: config.tableName,
        KeySchema: config.keySchema,
        AttributeDefinitions: config.attributeDefinitions,
        BillingMode: config.billingMode || 'PAY_PER_REQUEST',
        StreamSpecification: {
          StreamEnabled: true,
          StreamViewType: 'NEW_AND_OLD_IMAGES'
        }
      });
      const response = await dynamoDBClient.send(command);
      return { success: true, data: response.TableDescription };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Describe table (get metrics)
  async describeTable(tableName) {
    try {
      const command = new DescribeTableCommand({ TableName: tableName });
      const response = await dynamoDBClient.send(command);
      return {
        success: true,
        data: {
          name: response.Table.TableName,
          status: response.Table.TableStatus,
          itemCount: response.Table.ItemCount,
          sizeBytes: response.Table.TableSizeBytes,
          throughput: response.Table.ProvisionedThroughput,
          billing: response.Table.BillingModeSummary,
          creationDateTime: response.Table.CreationDateTime,
          lastUpdateDateTime: response.Table.LatestStreamLabel,
          globalSecondaryIndexes: response.Table.GlobalSecondaryIndexes?.length || 0,
          localSecondaryIndexes: response.Table.LocalSecondaryIndexes?.length || 0
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get table metrics from CloudWatch
  async getTableMetrics(tableName, metricName = 'ConsumedReadCapacityUnits', periodHours = 1) {
    try {
      const { CloudWatchClient, GetMetricStatisticsCommand } = await import('@aws-sdk/client-cloudwatch');
      const cloudWatchClient = new CloudWatchClient({
        region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
        credentials: {
          accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
          secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
        }
      });

      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - (periodHours * 60 * 60 * 1000));
      
      const command = new GetMetricStatisticsCommand({
        Namespace: 'AWS/DynamoDB',
        MetricName: metricName,
        Dimensions: [{ Name: 'TableName', Value: tableName }],
        StartTime: startTime,
        EndTime: endTime,
        Period: 300, // 5 minutes
        Statistics: ['Average', 'Maximum', 'Minimum'],
        Unit: 'Count'
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

  // Put item
  async putItem(tableName, item) {
    try {
      const command = new PutCommand({
        TableName: tableName,
        Item: item
      });
      await docClient.send(command);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get item
  async getItem(tableName, key) {
    try {
      const command = new GetCommand({
        TableName: tableName,
        Key: key
      });
      const response = await docClient.send(command);
      return { success: true, data: response.Item };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Query with conditions
  async query(tableName, keyConditionExpression, expressionAttributeValues) {
    try {
      const command = new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: keyConditionExpression,
        ExpressionAttributeValues: expressionAttributeValues
      });
      const response = await docClient.send(command);
      return { success: true, data: response.Items, count: response.Count };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Scan table
  async scanTable(tableName, limit = 100) {
    try {
      const command = new ScanCommand({
        TableName: tableName,
        Limit: limit
      });
      const response = await docClient.send(command);
      return { success: true, data: response.Items, count: response.Count };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ============ Amazon ElastiCache Operations ============
export const elastiCacheService = {
  // List cache clusters
  async listClusters() {
    try {
      const command = new DescribeCacheClustersCommand({});
      const response = await elastiCacheClient.send(command);
      return {
        success: true,
        data: response.CacheClusters.map(cluster => ({
          id: cluster.CacheClusterId,
          engine: cluster.Engine,
          status: cluster.CacheClusterStatus,
          nodeType: cluster.CacheNodeType,
          numNodes: cluster.NumCacheNodes,
          endpoint: cluster.CacheNodes?.[0]?.Endpoint
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create cache cluster
  async createCluster(config) {
    try {
      const command = new CreateCacheClusterCommand({
        CacheClusterId: config.clusterId,
        Engine: config.engine || 'redis',
        CacheNodeType: config.nodeType || 'cache.t3.micro',
        NumCacheNodes: config.numNodes || 1,
        AutoMinorVersionUpgrade: true
      });
      const response = await elastiCacheClient.send(command);
      return { success: true, data: response.CacheCluster };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ============ Amazon DocumentDB Operations ============
export const documentDBService = {
  // List DocumentDB clusters
  async listClusters() {
    try {
      const command = new DescribeDBClustersCommand({});
      const response = await docDBClient.send(command);
      return {
        success: true,
        data: response.DBClusters.map(cluster => ({
          identifier: cluster.DBClusterIdentifier,
          engine: cluster.Engine,
          status: cluster.Status,
          endpoint: cluster.Endpoint,
          port: cluster.Port,
          multiAZ: cluster.MultiAZ
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create DocumentDB cluster
  async createCluster(config) {
    try {
      const command = new CreateDBClusterCommand({
        DBClusterIdentifier: config.identifier,
        Engine: 'docdb',
        MasterUsername: config.username,
        MasterUserPassword: config.password,
        StorageEncrypted: true
      });
      const response = await docDBClient.send(command);
      return { success: true, data: response.DBCluster };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ============ Amazon Neptune Operations ============
export const neptuneService = {
  // List Neptune clusters
  async listClusters() {
    try {
      const command = new NeptuneDescribeCommand({});
      const response = await neptuneClient.send(command);
      return {
        success: true,
        data: response.DBClusters.map(cluster => ({
          identifier: cluster.DBClusterIdentifier,
          engine: cluster.Engine,
          status: cluster.Status,
          endpoint: cluster.Endpoint,
          readerEndpoint: cluster.ReaderEndpoint
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ============ Amazon Timestream Operations ============
export const timestreamService = {
  // Query time-series data
  async queryData(query) {
    try {
      const command = new TimestreamQueryCommand({
        QueryString: query
      });
      const response = await timestreamQueryClient.send(command);
      return { success: true, data: response.Rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export default {
  rdsService,
  dynamoDBService,
  elastiCacheService,
  documentDBService,
  neptuneService,
  timestreamService
};

