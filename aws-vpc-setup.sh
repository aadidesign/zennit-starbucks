#!/bin/bash
# AWS VPC Setup for Starbucks Admin Backend

# 1. Create VPC
echo "Creating VPC..."
VPC_ID=$(aws ec2 create-vpc \
  --cidr-block 10.0.0.0/16 \
  --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=starbucks-vpc}]' \
  --query 'Vpc.VpcId' \
  --output text)
echo "VPC Created: $VPC_ID"

# 2. Create Internet Gateway
echo "Creating Internet Gateway..."
IGW_ID=$(aws ec2 create-internet-gateway \
  --tag-specifications 'ResourceType=internet-gateway,Tags=[{Key=Name,Value=starbucks-igw}]' \
  --query 'InternetGateway.InternetGatewayId' \
  --output text)
aws ec2 attach-internet-gateway --vpc-id $VPC_ID --internet-gateway-id $IGW_ID
echo "Internet Gateway Created: $IGW_ID"

# 3. Create Public Subnet (for Load Balancer)
echo "Creating Public Subnet..."
PUBLIC_SUBNET_ID=$(aws ec2 create-subnet \
  --vpc-id $VPC_ID \
  --cidr-block 10.0.1.0/24 \
  --availability-zone us-east-1a \
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=starbucks-public-subnet}]' \
  --query 'Subnet.SubnetId' \
  --output text)
echo "Public Subnet Created: $PUBLIC_SUBNET_ID"

# 4. Create Private Subnet (for Backend API)
echo "Creating Private Subnet..."
PRIVATE_SUBNET_ID=$(aws ec2 create-subnet \
  --vpc-id $VPC_ID \
  --cidr-block 10.0.11.0/24 \
  --availability-zone us-east-1a \
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=starbucks-private-subnet}]' \
  --query 'Subnet.SubnetId' \
  --output text)
echo "Private Subnet Created: $PRIVATE_SUBNET_ID"

# 5. Create Route Table for Public Subnet
echo "Creating Public Route Table..."
PUBLIC_RT_ID=$(aws ec2 create-route-table \
  --vpc-id $VPC_ID \
  --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=starbucks-public-rt}]' \
  --query 'RouteTable.RouteTableId' \
  --output text)
aws ec2 create-route --route-table-id $PUBLIC_RT_ID --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW_ID
aws ec2 associate-route-table --route-table-id $PUBLIC_RT_ID --subnet-id $PUBLIC_SUBNET_ID
echo "Public Route Table Created: $PUBLIC_RT_ID"

# 6. Create Security Group for Backend API
echo "Creating Security Group..."
API_SG_ID=$(aws ec2 create-security-group \
  --group-name starbucks-api-sg \
  --description "Security group for Starbucks API" \
  --vpc-id $VPC_ID \
  --query 'GroupId' \
  --output text)
aws ec2 authorize-security-group-ingress \
  --group-id $API_SG_ID \
  --protocol tcp \
  --port 3000 \
  --source-group $API_SG_ID
echo "Security Group Created: $API_SG_ID"

echo "========================"
echo "VPC Setup Complete!"
echo "========================"
echo "VPC ID: $VPC_ID"
echo "Public Subnet: $PUBLIC_SUBNET_ID"
echo "Private Subnet: $PRIVATE_SUBNET_ID"
echo "Security Group: $API_SG_ID"

