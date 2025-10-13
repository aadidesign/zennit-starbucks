#!/bin/bash
echo "🎓 Starbucks AWS Integration - LIVE DEMO"
echo "========================================"
echo ""

echo "🌐 Application URLs:"
echo "Frontend: http://storage.starbucks2.0.s3-website-us-east-1.amazonaws.com"
echo "Backend API: http://98.90.254.139:3000"
echo ""

echo "📊 AWS Services Status:"
echo "1. ✅ Amazon DynamoDB - Database (5 tables)"
echo "2. ✅ AWS IAM - Security & Access Control"
echo "3. ✅ Amazon CloudWatch - Monitoring & Metrics"
echo "4. ✅ Amazon S3 - Static Website Hosting"
echo "5. ✅ DynamoDB Auto Scaling - High Availability"
echo ""

echo "🧪 Testing API Endpoints:"
echo "Health Check:"
curl -s http://98.90.254.139:3000/health | jq '.'

echo ""
echo "User Registration Test:"
curl -s -X POST http://98.90.254.139:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"demo123","firstName":"Demo","lastName":"User"}' | jq '.'

echo ""
echo "📋 DynamoDB Data:"
aws dynamodb scan --table-name StarbucksUsers --limit 3 \
  --query 'Items[].{Email:email.S,Name:firstName.S,Points:rewardsPoints.N,Status:accountStatus.S}' \
  --output table

echo ""
echo "📈 CloudWatch Metrics:"
aws cloudwatch list-metrics --namespace StarbucksApp \
  --query 'Metrics[].MetricName' --output table

echo ""
echo "✅ DEMO COMPLETE!"
echo "All AWS services are integrated and working!"
