// Mock AWS services for frontend builds
// These replace the real AWS SDK imports to prevent build errors

export const mockDynamoDBClient = {
  send: () => Promise.resolve({}),
};

export const mockRDSClient = {
  send: () => Promise.resolve({}),
};

export const mockEC2Client = {
  send: () => Promise.resolve({}),
};

export const mockCloudWatchClient = {
  send: () => Promise.resolve({}),
};

export const mockAutoScalingClient = {
  send: () => Promise.resolve({}),
};

export const mockELBClient = {
  send: () => Promise.resolve({}),
};

export const mockRoute53Client = {
  send: () => Promise.resolve({}),
};

export const mockCloudFrontClient = {
  send: () => Promise.resolve({}),
};

export const mockIAMClient = {
  send: () => Promise.resolve({}),
};

export const mockGuardDutyClient = {
  send: () => Promise.resolve({}),
};

export const mockWAFClient = {
  send: () => Promise.resolve({}),
};

export const mockShieldClient = {
  send: () => Promise.resolve({}),
};

export const mockElastiCacheClient = {
  send: () => Promise.resolve({}),
};

export const mockDocDBClient = {
  send: () => Promise.resolve({}),
};

export const mockNeptuneClient = {
  send: () => Promise.resolve({}),
};

export const mockTimestreamQueryClient = {
  send: () => Promise.resolve({}),
};

export const mockTimestreamWriteClient = {
  send: () => Promise.resolve({}),
};

// Mock commands
export const mockCommands = {
  DescribeDBInstancesCommand: () => ({}),
  CreateDBInstanceCommand: () => ({}),
  ModifyDBInstanceCommand: () => ({}),
  ListTablesCommand: () => ({}),
  CreateTableCommand: () => ({}),
  DescribeTableCommand: () => ({}),
  PutCommand: () => ({}),
  GetCommand: () => ({}),
  QueryCommand: () => ({}),
  ScanCommand: () => ({}),
  UpdateCommand: () => ({}),
  DescribeVpcsCommand: () => ({}),
  CreateVpcCommand: () => ({}),
  DescribeSecurityGroupsCommand: () => ({}),
  CreateSecurityGroupCommand: () => ({}),
  AuthorizeSecurityGroupIngressCommand: () => ({}),
  DescribeLoadBalancersCommand: () => ({}),
  CreateLoadBalancerCommand: () => ({}),
  DescribeTargetHealthCommand: () => ({}),
  ListHostedZonesCommand: () => ({}),
  CreateHostedZoneCommand: () => ({}),
  ChangeResourceRecordSetsCommand: () => ({}),
  ListDistributionsCommand: () => ({}),
  CreateDistributionCommand: () => ({}),
  GetDistributionCommand: () => ({}),
  ListUsersCommand: () => ({}),
  ListRolesCommand: () => ({}),
  CreateRoleCommand: () => ({}),
  AttachRolePolicyCommand: () => ({}),
  SimulatePrincipalPolicyCommand: () => ({}),
  ListDetectorsCommand: () => ({}),
  ListFindingsCommand: () => ({}),
  GetFindingsCommand: () => ({}),
  ListWebACLsCommand: () => ({}),
  CreateWebACLCommand: () => ({}),
  GetWebACLCommand: () => ({}),
  DescribeSubscriptionCommand: () => ({}),
  ListProtectionsCommand: () => ({}),
  DescribeAutoScalingGroupsCommand: () => ({}),
  CreateAutoScalingGroupCommand: () => ({}),
  UpdateAutoScalingGroupCommand: () => ({}),
  DescribeScalingActivitiesCommand: () => ({}),
  GetMetricStatisticsCommand: () => ({}),
  PutMetricAlarmCommand: () => ({}),
  DescribeAlarmsCommand: () => ({}),
  DescribeTargetGroupsCommand: () => ({}),
  DescribeListenersCommand: () => ({}),
  DescribeCacheClustersCommand: () => ({}),
  CreateCacheClusterCommand: () => ({}),
  DescribeDBClustersCommand: () => ({}),
  CreateDBClusterCommand: () => ({}),
};

// Mock AWS main object
export const mockAWS = {
  DynamoDB: {
    DocumentClient: () => mockDynamoDBClient,
  },
  config: {
    update: () => {},
  },
};
