# AWS Services Integration Guide

This document provides step-by-step instructions for integrating AWS services into your Starbucks website for the Cloud Computing project.

## Overview

The website is configured to use the following AWS services:

1. **Database Services** - Amazon RDS / DynamoDB
2. **Networking and Security Services** - VPC, CloudFront, Route 53, AWS WAF
3. **High Availability and Scalability Services** - Auto Scaling, Elastic Load Balancing

---

## 1. Database Services in Cloud Computing

### Option A: Amazon RDS (Relational Database Service)

**Purpose:** Store user data, orders, product information

**Setup Steps:**

1. **Create RDS Instance:**
   ```bash
   # Navigate to AWS Console > RDS
   - Click "Create database"
   - Select "PostgreSQL" or "MySQL"
   - Choose "Free tier" template
   - Set DB instance identifier: starbucks-db
   - Set Master username and password
   - Configure VPC and security groups
   - Enable "Public accessibility" for development
   ```

2. **Configure Security Group:**
   ```bash
   - Add Inbound rule: Type PostgreSQL/MySQL, Port 5432/3306
   - Source: Your IP or 0.0.0.0/0 (for testing only)
   ```

3. **Connect to Supabase (Recommended Approach):**
   - Instead of direct RDS connection, use Supabase (built on PostgreSQL)
   - Supabase provides better developer experience with real-time features
   - Get connection details from Supabase dashboard
   - Add to `.env` file

### Option B: Amazon DynamoDB (NoSQL Database)

**Purpose:** Store session data, cache, real-time data

**Setup Steps:**

1. **Create DynamoDB Table:**
   ```bash
   # AWS Console > DynamoDB > Create table
   - Table name: starbucks-products
   - Partition key: product_id (String)
   - Sort key: category (String)
   - Enable "On-demand" capacity mode
   ```

2. **Configure Access:**
   ```bash
   # Create IAM user with DynamoDB access
   - Policy: AmazonDynamoDBFullAccess
   - Generate Access Key and Secret Key
   - Add to .env file
   ```

---

## 2. Networking and Security Services

### A. Amazon VPC (Virtual Private Cloud)

**Purpose:** Isolate and secure your cloud resources

**Setup:**

1. **Create VPC:**
   ```bash
   # AWS Console > VPC > Create VPC
   - Name: starbucks-vpc
   - IPv4 CIDR block: 10.0.0.0/16
   - Create public and private subnets
   ```

2. **Configure Subnets:**
   ```
   Public Subnet: 10.0.1.0/24 (for Load Balancer)
   Private Subnet: 10.0.2.0/24 (for Database)
   ```

### B. Amazon CloudFront (CDN)

**Purpose:** Deliver content with low latency globally

**Setup:**

1. **Create CloudFront Distribution:**
   ```bash
   # AWS Console > CloudFront > Create Distribution
   - Origin Domain: your-vercel-domain.vercel.app
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Allowed HTTP Methods: GET, HEAD, OPTIONS
   - Enable Gzip compression
   ```

2. **Cache Behavior:**
   ```
   - TTL: 86400 seconds (24 hours)
   - Compress objects automatically: Yes
   ```

### C. AWS WAF (Web Application Firewall)

**Purpose:** Protect against common web exploits

**Setup:**

1. **Create Web ACL:**
   ```bash
   # AWS Console > WAF > Create web ACL
   - Associate with CloudFront distribution
   - Add AWS Managed Rules:
     * Core rule set
     * Known bad inputs
     * SQL injection prevention
   ```

### D. Amazon Route 53

**Purpose:** DNS management and routing

**Setup:**

1. **Configure Domain:**
   ```bash
   # AWS Console > Route 53 > Create Hosted Zone
   - Domain name: yourdomain.com
   - Create A record pointing to CloudFront
   ```

---

## 3. High Availability and Scalability Services

### A. Elastic Load Balancing

**Purpose:** Distribute traffic across multiple instances

**Setup:**

1. **Create Application Load Balancer:**
   ```bash
   # AWS Console > EC2 > Load Balancers > Create
   - Type: Application Load Balancer
   - Name: starbucks-alb
   - Scheme: Internet-facing
   - Add subnets (at least 2 AZs)
   - Configure security group
   ```

2. **Target Groups:**
   ```bash
   - Create target group
   - Protocol: HTTP
   - Port: 80
   - Health check path: /health
   ```

### B. Auto Scaling

**Purpose:** Automatically adjust capacity based on demand

**Setup:**

1. **Create Launch Template:**
   ```bash
   # AWS Console > EC2 > Launch Templates
   - AMI: Amazon Linux 2
   - Instance type: t2.micro (free tier)
   - User data script to install Node.js
   ```

2. **Create Auto Scaling Group:**
   ```bash
   # AWS Console > Auto Scaling Groups
   - Name: starbucks-asg
   - Launch template: Select created template
   - Min capacity: 2
   - Desired capacity: 2
   - Max capacity: 4
   - Associate with Load Balancer
   ```

3. **Scaling Policies:**
   ```bash
   # Target tracking scaling
   - Metric: Average CPU utilization
   - Target value: 70%
   ```

### C. Amazon S3 (Storage & Static Hosting)

**Purpose:** Store images, assets, and backups

**Setup:**

1. **Create S3 Bucket:**
   ```bash
   # AWS Console > S3 > Create bucket
   - Bucket name: starbucks-assets-{unique-id}
   - Region: us-east-1
   - Enable versioning
   - Configure CORS for web access
   ```

2. **Bucket Policy:**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::starbucks-assets-{unique-id}/*"
       }
     ]
   }
   ```

---

## Integration with Vercel Deployment

### Environment Variables

Add these to your Vercel project:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key

# AWS (Optional - for advanced features)
VITE_AWS_REGION=us-east-1
VITE_AWS_ACCESS_KEY_ID=your_access_key
VITE_AWS_SECRET_ACCESS_KEY=your_secret_key
VITE_AWS_S3_BUCKET=your_bucket_name
```

### Vercel + CloudFront Setup

1. Deploy to Vercel first
2. Get Vercel deployment URL
3. Configure CloudFront with Vercel as origin
4. Update DNS to point to CloudFront

---

## Architecture Diagram

```
┌─────────────┐
│   Route 53  │ (DNS Management)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ CloudFront  │ (CDN - Global Content Delivery)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│     WAF     │ (Security - SQL Injection Protection)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│     ALB     │ (Load Balancer)
└──────┬──────┘
       │
       ├────────────────┬────────────────┐
       ▼                ▼                ▼
┌──────────┐     ┌──────────┐     ┌──────────┐
│  EC2 #1  │     │  EC2 #2  │     │  EC2 #3  │
│ (Auto    │     │ (Auto    │     │ (Auto    │
│ Scaling) │     │ Scaling) │     │ Scaling) │
└────┬─────┘     └────┬─────┘     └────┬─────┘
     │                │                │
     └────────┬───────┴────────────────┘
              ▼
     ┌────────────────┐
     │   Supabase /   │
     │   RDS          │ (Database)
     └────────────────┘
              │
              ▼
     ┌────────────────┐
     │   S3 Bucket    │ (Static Assets)
     └────────────────┘
```

---

## Cost Optimization Tips

1. **Use Free Tier:**
   - RDS: 750 hours/month
   - EC2: 750 hours/month
   - S3: 5GB storage
   - CloudFront: 50GB data transfer

2. **Use Supabase Free Tier:**
   - 500MB database
   - 1GB file storage
   - 50,000 monthly active users

3. **Enable Auto-Scaling:**
   - Scale down during low traffic
   - Use spot instances for non-critical workloads

---

## Security Best Practices

1. **IAM Roles:**
   - Use least privilege access
   - Rotate credentials regularly
   - Use IAM roles instead of access keys

2. **Network Security:**
   - Use VPC for resource isolation
   - Configure security groups properly
   - Enable encryption at rest and in transit

3. **Monitoring:**
   - Enable CloudWatch logs
   - Set up billing alerts
   - Monitor for unusual activity

---

## Testing Checklist

- [ ] Database connection works
- [ ] CloudFront serves content correctly
- [ ] Load balancer distributes traffic
- [ ] Auto-scaling triggers work
- [ ] Security groups configured
- [ ] SSL/TLS certificates installed
- [ ] Backups configured
- [ ] Monitoring and alerts set up

---

## Support Resources

- AWS Free Tier: https://aws.amazon.com/free/
- Supabase Documentation: https://supabase.com/docs
- Vercel Documentation: https://vercel.com/docs
- AWS Well-Architected Framework: https://aws.amazon.com/architecture/well-architected/

---

**Created for Cloud Computing Project**
**Developer: Aadi**

