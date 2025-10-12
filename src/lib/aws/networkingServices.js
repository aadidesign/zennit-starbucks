// AWS Networking and Security Services Configuration and Utilities
import { EC2Client, DescribeVpcsCommand, CreateVpcCommand, DescribeSecurityGroupsCommand, CreateSecurityGroupCommand, AuthorizeSecurityGroupIngressCommand } from '@aws-sdk/client-ec2';
import { ElasticLoadBalancingV2Client, DescribeLoadBalancersCommand, CreateLoadBalancerCommand, DescribeTargetHealthCommand } from '@aws-sdk/client-elastic-load-balancing-v2';
import { Route53Client, ListHostedZonesCommand, CreateHostedZoneCommand, ChangeResourceRecordSetsCommand } from '@aws-sdk/client-route-53';
import { CloudFrontClient, ListDistributionsCommand, CreateDistributionCommand, GetDistributionCommand } from '@aws-sdk/client-cloudfront';
import { IAMClient, ListUsersCommand, ListRolesCommand, CreateRoleCommand, AttachRolePolicyCommand, SimulatePrincipalPolicyCommand } from '@aws-sdk/client-iam';
import { GuardDutyClient, ListDetectorsCommand, ListFindingsCommand, GetFindingsCommand } from '@aws-sdk/client-guardduty';
import { WAFV2Client, ListWebACLsCommand, CreateWebACLCommand, GetWebACLCommand } from '@aws-sdk/client-wafv2';
import { ShieldClient, DescribeSubscriptionCommand, ListProtectionsCommand } from '@aws-sdk/client-shield';

// Initialize clients
const awsConfig = {
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
};

const ec2Client = new EC2Client(awsConfig);
const elbClient = new ElasticLoadBalancingV2Client(awsConfig);
const route53Client = new Route53Client(awsConfig);
const cloudFrontClient = new CloudFrontClient(awsConfig);
const iamClient = new IAMClient(awsConfig);
const guardDutyClient = new GuardDutyClient(awsConfig);
const wafClient = new WAFV2Client(awsConfig);
const shieldClient = new ShieldClient(awsConfig);

// ============ Amazon VPC Operations ============
export const vpcService = {
  // List all VPCs
  async listVPCs() {
    try {
      const command = new DescribeVpcsCommand({});
      const response = await ec2Client.send(command);
      return {
        success: true,
        data: response.Vpcs.map(vpc => ({
          vpcId: vpc.VpcId,
          cidrBlock: vpc.CidrBlock,
          state: vpc.State,
          isDefault: vpc.IsDefault,
          tags: vpc.Tags
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create VPC
  async createVPC(cidrBlock) {
    try {
      const command = new CreateVpcCommand({
        CidrBlock: cidrBlock || '10.0.0.0/16',
        AmazonProvidedIpv6CidrBlock: false
      });
      const response = await ec2Client.send(command);
      return { success: true, data: response.Vpc };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // List Security Groups
  async listSecurityGroups(vpcId = null) {
    try {
      const params = vpcId ? { Filters: [{ Name: 'vpc-id', Values: [vpcId] }] } : {};
      const command = new DescribeSecurityGroupsCommand(params);
      const response = await ec2Client.send(command);
      return {
        success: true,
        data: response.SecurityGroups.map(sg => ({
          groupId: sg.GroupId,
          groupName: sg.GroupName,
          description: sg.Description,
          vpcId: sg.VpcId,
          ingressRules: sg.IpPermissions,
          egressRules: sg.IpPermissionsEgress
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create Security Group
  async createSecurityGroup(config) {
    try {
      const command = new CreateSecurityGroupCommand({
        GroupName: config.groupName,
        Description: config.description,
        VpcId: config.vpcId
      });
      const response = await ec2Client.send(command);
      return { success: true, groupId: response.GroupId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Add ingress rule
  async addIngressRule(groupId, config) {
    try {
      const command = new AuthorizeSecurityGroupIngressCommand({
        GroupId: groupId,
        IpPermissions: [{
          IpProtocol: config.protocol || 'tcp',
          FromPort: config.fromPort,
          ToPort: config.toPort,
          IpRanges: [{ CidrIp: config.cidrIp || '0.0.0.0/0' }]
        }]
      });
      await ec2Client.send(command);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ============ Elastic Load Balancing Operations ============
export const loadBalancerService = {
  // List all load balancers
  async listLoadBalancers() {
    try {
      const command = new DescribeLoadBalancersCommand({});
      const response = await elbClient.send(command);
      return {
        success: true,
        data: response.LoadBalancers.map(lb => ({
          name: lb.LoadBalancerName,
          arn: lb.LoadBalancerArn,
          dnsName: lb.DNSName,
          scheme: lb.Scheme,
          type: lb.Type,
          state: lb.State,
          availabilityZones: lb.AvailabilityZones
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create load balancer
  async createLoadBalancer(config) {
    try {
      const command = new CreateLoadBalancerCommand({
        Name: config.name,
        Subnets: config.subnets,
        SecurityGroups: config.securityGroups,
        Scheme: config.scheme || 'internet-facing',
        Type: config.type || 'application',
        IpAddressType: 'ipv4'
      });
      const response = await elbClient.send(command);
      return { success: true, data: response.LoadBalancers[0] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get target health
  async getTargetHealth(targetGroupArn) {
    try {
      const command = new DescribeTargetHealthCommand({
        TargetGroupArn: targetGroupArn
      });
      const response = await elbClient.send(command);
      return {
        success: true,
        data: response.TargetHealthDescriptions.map(target => ({
          targetId: target.Target.Id,
          port: target.Target.Port,
          health: target.TargetHealth
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ============ Route 53 Operations ============
export const route53Service = {
  // List hosted zones
  async listHostedZones() {
    try {
      const command = new ListHostedZonesCommand({});
      const response = await route53Client.send(command);
      return {
        success: true,
        data: response.HostedZones.map(zone => ({
          id: zone.Id,
          name: zone.Name,
          recordCount: zone.ResourceRecordSetCount,
          privateZone: zone.Config?.PrivateZone
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create hosted zone
  async createHostedZone(domainName, isPrivate = false) {
    try {
      const command = new CreateHostedZoneCommand({
        Name: domainName,
        CallerReference: Date.now().toString(),
        HostedZoneConfig: {
          PrivateZone: isPrivate,
          Comment: `Created via admin dashboard`
        }
      });
      const response = await route53Client.send(command);
      return { success: true, data: response.HostedZone };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ============ CloudFront Operations ============
export const cloudFrontService = {
  // List distributions
  async listDistributions() {
    try {
      const command = new ListDistributionsCommand({});
      const response = await cloudFrontClient.send(command);
      return {
        success: true,
        data: response.DistributionList?.Items?.map(dist => ({
          id: dist.Id,
          domainName: dist.DomainName,
          status: dist.Status,
          enabled: dist.Enabled,
          aliases: dist.Aliases?.Items
        })) || []
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get distribution details
  async getDistribution(distributionId) {
    try {
      const command = new GetDistributionCommand({ Id: distributionId });
      const response = await cloudFrontClient.send(command);
      return { success: true, data: response.Distribution };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ============ IAM Operations ============
export const iamService = {
  // List users
  async listUsers() {
    try {
      const command = new ListUsersCommand({});
      const response = await iamClient.send(command);
      return {
        success: true,
        data: response.Users.map(user => ({
          userName: user.UserName,
          userId: user.UserId,
          arn: user.Arn,
          createDate: user.CreateDate
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // List roles
  async listRoles() {
    try {
      const command = new ListRolesCommand({});
      const response = await iamClient.send(command);
      return {
        success: true,
        data: response.Roles.map(role => ({
          roleName: role.RoleName,
          roleId: role.RoleId,
          arn: role.Arn,
          createDate: role.CreateDate
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create role
  async createRole(config) {
    try {
      const command = new CreateRoleCommand({
        RoleName: config.roleName,
        AssumeRolePolicyDocument: JSON.stringify(config.trustPolicy),
        Description: config.description
      });
      const response = await iamClient.send(command);
      return { success: true, data: response.Role };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Simulate policy
  async simulatePolicy(policySourceArn, actionNames, resourceArns) {
    try {
      const command = new SimulatePrincipalPolicyCommand({
        PolicySourceArn: policySourceArn,
        ActionNames: actionNames,
        ResourceArns: resourceArns
      });
      const response = await iamClient.send(command);
      return { success: true, data: response.EvaluationResults };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ============ GuardDuty Operations ============
export const guardDutyService = {
  // List detectors
  async listDetectors() {
    try {
      const command = new ListDetectorsCommand({});
      const response = await guardDutyClient.send(command);
      return { success: true, data: response.DetectorIds };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // List findings
  async listFindings(detectorId) {
    try {
      const command = new ListFindingsCommand({ DetectorId: detectorId });
      const response = await guardDutyClient.send(command);
      return { success: true, data: response.FindingIds };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get finding details
  async getFindings(detectorId, findingIds) {
    try {
      const command = new GetFindingsCommand({
        DetectorId: detectorId,
        FindingIds: findingIds
      });
      const response = await guardDutyClient.send(command);
      return {
        success: true,
        data: response.Findings.map(finding => ({
          id: finding.Id,
          type: finding.Type,
          severity: finding.Severity,
          title: finding.Title,
          description: finding.Description,
          createdAt: finding.CreatedAt
        }))
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ============ WAF Operations ============
export const wafService = {
  // List Web ACLs
  async listWebACLs(scope = 'REGIONAL') {
    try {
      const command = new ListWebACLsCommand({ Scope: scope });
      const response = await wafClient.send(command);
      return {
        success: true,
        data: response.WebACLs?.map(acl => ({
          id: acl.Id,
          name: acl.Name,
          arn: acl.ARN,
          description: acl.Description
        })) || []
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get Web ACL details
  async getWebACL(id, name, scope = 'REGIONAL') {
    try {
      const command = new GetWebACLCommand({ Id: id, Name: name, Scope: scope });
      const response = await wafClient.send(command);
      return { success: true, data: response.WebACL };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ============ Shield Operations ============
export const shieldService = {
  // Get subscription status
  async getSubscription() {
    try {
      const command = new DescribeSubscriptionCommand({});
      const response = await shieldClient.send(command);
      return { success: true, data: response.Subscription };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // List protections
  async listProtections() {
    try {
      const command = new ListProtectionsCommand({});
      const response = await shieldClient.send(command);
      return {
        success: true,
        data: response.Protections?.map(protection => ({
          id: protection.Id,
          name: protection.Name,
          resourceArn: protection.ResourceArn
        })) || []
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export default {
  vpcService,
  loadBalancerService,
  route53Service,
  cloudFrontService,
  iamService,
  guardDutyService,
  wafService,
  shieldService
};

