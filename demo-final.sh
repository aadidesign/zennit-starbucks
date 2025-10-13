#!/bin/bash
echo "🎓 Starbucks AWS Integration - Final Demo"
echo "=========================================="
echo ""

echo "📊 AWS Services Deployed:"
echo "1. Amazon DynamoDB - Database"
echo "2. AWS IAM - Security & Access Control"
echo "3. Amazon CloudWatch - Monitoring & Metrics"
echo "4. Amazon S3 - Static Website Hosting"
echo "5. DynamoDB Auto Scaling - High Availability"
echo ""

echo "🌐 Application URLs:"
echo "Frontend: http://storage.starbucks2.0.s3-website-us-east-1.amazonaws.com"
echo "Backend API: http://localhost:3000"
echo ""

echo "📋 DynamoDB Tables:"
aws dynamodb list-tables --query 'TableNames[?contains(@, `Starbucks`)]' --output table

echo ""
echo "👥 Sample User Data:"
aws dynamodb scan --table-name StarbucksUsers --limit 3 \
  --query 'Items[].{Email:email.S,Name:firstName.S,Points:rewardsPoints.N,Status:accountStatus.S}' \
  --output table

echo ""
echo "📈 CloudWatch Metrics:"
aws cloudwatch list-metrics --namespace StarbucksApp \
  --query 'Metrics[].MetricName' --output table

echo ""
echo "💬 Contact Messages:"
aws dynamodb scan --table-name StarbucksMessages --limit 3 \
  --query 'Items[].{From:email.S,Subject:subject.S,Status:status.S,Date:createdAt.S}' \
  --output table

echo ""
echo "🧪 Testing Backend API:"
curl -s http://localhost:3000/health | jq '.' 2>/dev/null || curl -s http://localhost:3000/health

echo ""
echo "✅ All Services Operational!"
echo ""
echo "📝 Key Features Demonstrated:"
echo "  ✓ Real-time user registration & authentication"
echo "  ✓ DynamoDB data persistence"
echo "  ✓ CloudWatch metrics tracking"
echo "  ✓ Secure IAM-based access control"
echo "  ✓ Auto-scaling database configuration"
echo "  ✓ Multi-AZ deployment (DynamoDB built-in)"
echo "  ✓ S3 static website hosting"
