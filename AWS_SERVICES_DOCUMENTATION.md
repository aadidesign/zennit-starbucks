# AWS Services Integration Documentation

## Overview

This documentation provides comprehensive information about the AWS services integration in the Starbucks Dynamic Website. The implementation includes support for Database Services, Networking & Security Services, and High Availability & Scalability Services as per cloud computing best practices.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Setup & Configuration](#setup--configuration)
3. [Database Services](#database-services)
4. [Networking & Security Services](#networking--security-services)
5. [Scalability & Monitoring](#scalability--monitoring)
6. [API Reference](#api-reference)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### System Architecture

The application implements a three-tier architecture leveraging AWS services:

```
┌─────────────────────────────────────────────────────┐
│                   Frontend Layer                     │
│            (React + Vite + Tailwind CSS)            │
│              AWS Admin Dashboard                     │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│               AWS SDK Integration                    │
│    - Database Services (RDS, DynamoDB, etc.)        │
│    - Networking (VPC, ELB, Route53, CloudFront)     │
│    - Security (IAM, GuardDuty, WAF, Shield)         │
│    - Monitoring (Auto Scaling, CloudWatch)          │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│                  AWS Cloud Services                  │
│    Multi-AZ deployment across availability zones    │
└─────────────────────────────────────────────────────┘
```

### Key Features Implemented

#### 1. Database Services (Implementation & Examination)
- **Schema Design Interface**: Visual tools for defining tables, relationships, and JSON documents
- **Data Upload/Edit Forms**: Support for automatic replication across Availability Zones
- **Query Builders**: SQL editors, key-value lookup, and graph traversal interfaces
- **Real-time Metrics**: Query execution with latency metrics display
- **Auto-scaling Monitoring**: Serverless scaling toggles and throughput monitoring

#### 2. Networking & Security Services
- **VPC Configuration**: Encrypted endpoints with TLS/SSL enforcement
- **Access Control Dashboards**: IAM policy simulators and role management
- **Threat Detection**: Real-time GuardDuty integration with anomaly alerts
- **WAF Management**: Fine-grained filtering rules and bot detection
- **DDoS Protection**: Shield integration for 24/7 infrastructure security

#### 3. High Availability & Scalability
- **Multi-AZ Deployment**: Health check simulators and automatic failover
- **Auto Scaling**: Dynamic resource adjustment based on CPU/memory thresholds
- **Load Balancing**: Traffic distribution with health monitoring
- **CloudWatch Integration**: Real-time metrics for latency, throughput, and errors
- **Cost Optimization**: Visibility into pay-per-use and savings opportunities

---

## Setup & Configuration

### Prerequisites

- Node.js 18+ and npm
- AWS Account with appropriate IAM permissions
- AWS Access Key ID and Secret Access Key

### Installation Steps

1. **Install Dependencies**

```bash
npm install
```

All required AWS SDK packages are included:
- `@aws-sdk/client-rds`
- `@aws-sdk/client-dynamodb`
- `@aws-sdk/client-elasticache`
- `@aws-sdk/client-docdb`
- `@aws-sdk/client-neptune`
- `@aws-sdk/client-ec2`
- `@aws-sdk/client-elastic-load-balancing-v2`
- `@aws-sdk/client-route-53`
- `@aws-sdk/client-cloudfront`
- `@aws-sdk/client-iam`
- `@aws-sdk/client-guardduty`
- `@aws-sdk/client-wafv2`
- `@aws-sdk/client-shield`
- `@aws-sdk/client-auto-scaling`
- `@aws-sdk/client-cloudwatch`
- `@aws-sdk/client-timestream-query`
- `@aws-sdk/client-timestream-write`

2. **Configure Environment Variables**

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your AWS credentials:

```env
VITE_AWS_ACCESS_KEY_ID=your_access_key_here
VITE_AWS_SECRET_ACCESS_KEY=your_secret_key_here
VITE_AWS_REGION=us-east-1
VITE_AWS_S3_BUCKET=your-bucket-name
```

3. **Set Up IAM Permissions**

Create an IAM user with the following policy (or use the provided permissions in `.env.example`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "rds:*",
        "dynamodb:*",
        "elasticache:*",
        "ec2:Describe*",
        "elasticloadbalancing:Describe*",
        "route53:List*",
        "cloudfront:List*",
        "iam:List*",
        "guardduty:List*",
        "wafv2:List*",
        "shield:Describe*",
        "autoscaling:Describe*",
        "cloudwatch:*"
      ],
      "Resource": "*"
    }
  ]
}
```

4. **Start Development Server**

```bash
npm run dev
```

5. **Access Admin Dashboard**

Navigate to `http://localhost:5173/admin` to access the AWS Services Dashboard.

---

## Database Services

### Supported Services

#### 1. Amazon RDS (Relational Database Service)

**Purpose**: Managed relational databases with multi-AZ support for high availability.

**Features**:
- List all RDS instances with status and configuration
- Create new RDS instances (MySQL, PostgreSQL, etc.)
- Modify instance class and storage for scaling
- View endpoint, port, and availability zone information
- Monitor backup retention and storage encryption

**Example Usage**:

```javascript
import { rdsService } from './lib/aws/databaseServices';

// List RDS instances
const instances = await rdsService.listInstances();

// Create new instance
const result = await rdsService.createInstance({
  identifier: 'my-database',
  engine: 'mysql',
  instanceClass: 'db.t3.micro',
  storage: 20,
  username: 'admin',
  password: 'SecurePass123!',
  multiAZ: true
});
```

#### 2. Amazon DynamoDB

**Purpose**: NoSQL key-value database with millisecond latency and automatic scaling.

**Features**:
- Schema designer with visual attribute definition
- Query builder with scan and query operations
- Real-time item count and table size metrics
- Pay-per-request billing mode support
- DynamoDB Streams for change data capture

**Example Usage**:

```javascript
import { dynamoDBService } from './lib/aws/databaseServices';

// Create table
await dynamoDBService.createTable({
  tableName: 'Users',
  keySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
  attributeDefinitions: [
    { AttributeName: 'userId', AttributeType: 'S' }
  ],
  billingMode: 'PAY_PER_REQUEST'
});

// Put item
await dynamoDBService.putItem('Users', {
  userId: 'user123',
  name: 'John Doe',
  email: 'john@example.com'
});

// Query data
const result = await dynamoDBService.query(
  'Users',
  'userId = :id',
  { ':id': 'user123' }
);
```

#### 3. Amazon ElastiCache

**Purpose**: In-memory caching (Redis/Memcached) for sub-millisecond latency.

**Features**:
- List cache clusters with node information
- Create Redis or Memcached clusters
- View cache node types and endpoint addresses
- Monitor cluster status and performance

#### 4. Amazon DocumentDB

**Purpose**: MongoDB-compatible document database for JSON data.

**Features**:
- List DocumentDB clusters
- Create clusters with encryption at rest
- View cluster endpoints and port configuration
- Multi-AZ support for high availability

#### 5. Amazon Neptune

**Purpose**: Graph database for connected data and social networks.

**Features**:
- List Neptune graph database clusters
- View reader and writer endpoints
- Support for Gremlin and SPARQL queries

#### 6. Amazon Timestream

**Purpose**: Time-series database for IoT and operational data.

**Features**:
- Query time-series data with SQL-like syntax
- Automatic data lifecycle management
- Built-in time-series analytics functions

---

## Networking & Security Services

### VPC (Virtual Private Cloud)

**Features**:
- Create isolated networks with custom CIDR blocks
- Configure security groups with ingress/egress rules
- View VPC endpoints and subnets
- Private link integrations for secure connectivity

**Example**:

```javascript
import { vpcService } from './lib/aws/networkingServices';

// Create VPC
const vpc = await vpcService.createVPC('10.0.0.0/16');

// Add security group rule
await vpcService.addIngressRule('sg-123456', {
  protocol: 'tcp',
  fromPort: 443,
  toPort: 443,
  cidrIp: '0.0.0.0/0'
});
```

### Elastic Load Balancing

**Features**:
- Application and Network Load Balancers
- Health check monitoring
- Multi-AZ traffic distribution
- Target group management

### Route 53

**Features**:
- DNS management with hosted zones
- Latency-based routing
- Failover routing policies
- Health checks for endpoints

### CloudFront

**Features**:
- Global CDN with edge locations
- HTTPS enforcement
- Cache behavior configuration
- Origin access identity

### IAM (Identity & Access Management)

**Features**:
- Policy simulator for testing permissions
- User and role management
- Least-privilege access enforcement
- MFA configuration

**Policy Simulator Example**:

```javascript
import { iamService } from './lib/aws/networkingServices';

// Simulate policy
const result = await iamService.simulatePolicy(
  'arn:aws:iam::123456789:user/john',
  ['s3:GetObject'],
  ['arn:aws:s3:::my-bucket/*']
);
```

### GuardDuty

**Features**:
- Real-time threat detection
- Anomaly monitoring
- Severity-based filtering (HIGH, MEDIUM, LOW)
- Integration with CloudWatch Events

### WAF (Web Application Firewall)

**Features**:
- SQL injection protection
- XSS attack prevention
- Rate limiting rules
- Geographic blocking
- Custom rule configuration

### AWS Shield

**Features**:
- DDoS protection
- Always-on detection and mitigation
- Protection status monitoring
- Cost protection for scaling

---

## Scalability & Monitoring

### Auto Scaling

**Features**:
- Scaling policy configurator with min/max/desired capacity
- CPU and memory-based triggers
- Scaling activity history
- Health check integration
- Cooldown period management

**Example**:

```javascript
import { autoScalingService } from './lib/aws/scalabilityServices';

// Update scaling group
await autoScalingService.updateScalingGroup('my-asg', {
  minSize: 2,
  maxSize: 10,
  desiredCapacity: 4
});

// Get scaling activities
const activities = await autoScalingService.getScalingActivities('my-asg');
```

### CloudWatch Monitoring

**Features**:
- Real-time metrics visualization with Recharts
- Support for EC2, RDS, DynamoDB, and Load Balancer metrics
- Custom time ranges (1h, 6h, 24h, 7d)
- Alarm creation and management
- Threshold-based notifications

**Available Metrics**:
- CPU Utilization
- Memory Usage
- Network Traffic
- Request Count
- Error Rates
- Latency

**Example**:

```javascript
import { cloudWatchService } from './lib/aws/scalabilityServices';

// Get EC2 metrics
const metrics = await cloudWatchService.getEC2Metrics(
  'i-1234567890abcdef0',
  'CPUUtilization',
  24 // hours
);

// Create alarm
await cloudWatchService.createAlarm({
  alarmName: 'HighCPU',
  metricName: 'CPUUtilization',
  namespace: 'AWS/EC2',
  threshold: 80,
  comparisonOperator: 'GreaterThanThreshold',
  evaluationPeriods: 2
});
```

### Load Balancer Health

**Features**:
- Health check status per target
- Availability zone distribution
- Target group monitoring
- Listener configuration
- Connection draining

### Multi-AZ Deployment

**Features**:
- Automatic failover testing
- Per-zone instance count
- Latency monitoring per zone
- 99.99% availability SLA tracking

---

## API Reference

### Database Services API

See `src/lib/aws/databaseServices.js` for complete API documentation.

**Key Exports**:
- `rdsService`: RDS operations
- `dynamoDBService`: DynamoDB operations
- `elastiCacheService`: ElastiCache operations
- `documentDBService`: DocumentDB operations
- `neptuneService`: Neptune operations
- `timestreamService`: Timestream operations

### Networking Services API

See `src/lib/aws/networkingServices.js` for complete API documentation.

**Key Exports**:
- `vpcService`: VPC and security group operations
- `loadBalancerService`: ELB operations
- `route53Service`: DNS operations
- `cloudFrontService`: CDN operations
- `iamService`: Identity and access management
- `guardDutyService`: Threat detection
- `wafService`: Web application firewall
- `shieldService`: DDoS protection

### Scalability Services API

See `src/lib/aws/scalabilityServices.js` for complete API documentation.

**Key Exports**:
- `autoScalingService`: Auto Scaling operations
- `cloudWatchService`: Metrics and alarms
- `healthCheckService`: Load balancer health
- `monitoringUtils`: Helper functions

### Utility Functions

See `src/lib/aws/awsUtils.js` for utility functions:
- `formatARN()`: Format AWS ARN
- `formatBytes()`: Human-readable byte formatting
- `formatTimestamp()`: Date formatting
- `timeAgo()`: Relative time calculation
- `validateAWSCredentials()`: Credential validation
- `getStatusColor()`: Status-based color classes
- `retryWithBackoff()`: Retry logic with exponential backoff

---

## Best Practices

### Security

1. **Credential Management**
   - Never commit `.env` file
   - Use IAM roles in production
   - Rotate credentials regularly
   - Enable MFA for IAM users

2. **Network Security**
   - Use VPC for resource isolation
   - Configure security groups with least privilege
   - Enable VPC Flow Logs
   - Use private subnets for databases

3. **Data Protection**
   - Enable encryption at rest (RDS, DynamoDB, S3)
   - Enable encryption in transit (TLS/SSL)
   - Use AWS KMS for key management
   - Regular backup testing

### Performance

1. **Database Optimization**
   - Use read replicas for read-heavy workloads
   - Enable DynamoDB Auto Scaling
   - Use ElastiCache for frequently accessed data
   - Implement connection pooling

2. **Networking**
   - Use CloudFront for static content
   - Enable Route 53 health checks
   - Configure appropriate TTLs
   - Use Application Load Balancer for HTTP/HTTPS

3. **Monitoring**
   - Set up CloudWatch alarms for critical metrics
   - Use CloudWatch Logs Insights
   - Enable detailed monitoring
   - Create dashboards for visualization

### Cost Optimization

1. **Right-sizing**
   - Use appropriate instance types
   - Implement auto-scaling
   - Use Spot Instances where applicable
   - Review and optimize regularly

2. **Reserved Capacity**
   - Purchase Reserved Instances for steady-state workloads
   - Use Savings Plans
   - Consider Aurora Serverless for variable workloads

3. **Data Transfer**
   - Use VPC endpoints to avoid data transfer costs
   - Optimize CloudFront cache hit ratio
   - Use S3 Transfer Acceleration selectively

---

## Troubleshooting

### Common Issues

#### 1. Authentication Errors

**Problem**: "UnrecognizedClientException" or "InvalidAccessKeyId"

**Solution**:
- Verify AWS credentials in `.env` file
- Check IAM user has necessary permissions
- Ensure credentials are not expired
- Verify region configuration

#### 2. Permission Denied

**Problem**: "AccessDeniedException"

**Solution**:
- Review IAM policies
- Attach required policies to IAM user/role
- Check resource-based policies
- Verify MFA requirements if enabled

#### 3. Network Timeout

**Problem**: Requests timing out

**Solution**:
- Check security group rules
- Verify VPC subnet configuration
- Check route table entries
- Verify internet gateway attachment

#### 4. Rate Limiting

**Problem**: "ThrottlingException"

**Solution**:
- Implement exponential backoff (use `retryWithBackoff` utility)
- Request limit increase from AWS
- Optimize query patterns
- Use batch operations where possible

#### 5. Data Not Loading

**Problem**: Dashboard showing "No resources found"

**Solution**:
- Verify AWS region matches your resources
- Check resource naming and filters
- Ensure resources exist in the account
- Review CloudTrail logs for API calls

### Debug Mode

Enable debug logging by adding to your code:

```javascript
import AWS from 'aws-sdk';
AWS.config.logger = console;
```

### Getting Help

1. **AWS Documentation**: https://docs.aws.amazon.com/
2. **AWS Support**: https://aws.amazon.com/support/
3. **AWS Forums**: https://forums.aws.amazon.com/
4. **Project Issues**: Check the repository issues page

---

## Additional Resources

### AWS Well-Architected Framework

This implementation follows AWS Well-Architected Framework principles:

1. **Operational Excellence**: CloudWatch monitoring and automated responses
2. **Security**: IAM, GuardDuty, WAF, Shield, encryption
3. **Reliability**: Multi-AZ deployment, auto-scaling, health checks
4. **Performance Efficiency**: Right-sized instances, caching, CDN
5. **Cost Optimization**: Auto-scaling, right-sizing, monitoring
6. **Sustainability**: Efficient resource usage, auto-scaling

### Example Use Cases

#### E-commerce Application
- **Database**: DynamoDB for product catalog, RDS for transactions
- **Caching**: ElastiCache for session management
- **CDN**: CloudFront for static assets
- **Scaling**: Auto Scaling based on traffic patterns

#### Content Management System
- **Database**: DocumentDB for flexible content schema
- **Storage**: S3 for media files
- **CDN**: CloudFront with custom headers
- **Search**: OpenSearch (can be added)

#### Social Network
- **Database**: Neptune for social graph, DynamoDB for user data
- **Caching**: ElastiCache for friend lists
- **Real-time**: API Gateway WebSocket (can be added)

---

## Version History

- **v1.0.0** (2025-10-12): Initial implementation with all core AWS services
  - Database Services (RDS, DynamoDB, ElastiCache, DocumentDB, Neptune, Timestream)
  - Networking & Security (VPC, ELB, Route53, CloudFront, IAM, GuardDuty, WAF, Shield)
  - Scalability & Monitoring (Auto Scaling, CloudWatch, Load Balancer Health)
  - Admin Dashboard with real-time monitoring
  - Comprehensive utility functions

---

## Contributing

When adding new AWS services or features:

1. Create service-specific file in `src/lib/aws/`
2. Export service functions following existing patterns
3. Add UI components in `src/components/admin/`
4. Update this documentation
5. Add examples and use cases
6. Test with appropriate IAM permissions

---

## License

This implementation is part of the Starbucks Dynamic Website project.

---

## Contact

For questions or support regarding AWS services integration:
- Review this documentation
- Check `.env.example` for configuration
- Consult AWS documentation
- Open an issue in the repository

---

**Last Updated**: October 12, 2025

