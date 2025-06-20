# SoloCreatorHub AI - AWS Deployment Guide for Hybrid Database Architecture

This comprehensive guide will walk you through deploying SoloCreatorHub AI with its hybrid MongoDB and MySQL database architecture to AWS.

## Overview of Deployment Architecture

We'll use the following AWS services:
- **Amazon EC2**: For hosting the Node.js backend
- **Amazon RDS**: For the MySQL database
- **MongoDB Atlas**: For the MongoDB database (AWS-integrated)
- **AWS Amplify**: For hosting the React frontend
- **Amazon S3**: For storing media files
- **Amazon CloudFront**: For content delivery

## Prerequisites

Before you begin, make sure you have:
- An AWS account
- AWS CLI installed and configured
- Node.js and npm installed
- Git installed
- Your SoloCreatorHub AI codebase ready

## Step 1: Set Up MongoDB Atlas

1. **Create a MongoDB Atlas account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up or log in
   - Create a new project named "SoloCreatorHub"

2. **Create a cluster**:
   - Click "Build a Database"
   - Choose the "Shared" free tier for development or "Dedicated" for production
   - Select AWS as the cloud provider
   - Choose a region closest to your target users
   - Click "Create Cluster"

3. **Configure database access**:
   - Go to "Database Access" under Security
   - Click "Add New Database User"
   - Create a username and a secure password
   - Set privileges to "Read and Write to Any Database"
   - Click "Add User"

4. **Configure network access**:
   - Go to "Network Access" under Security
   - Click "Add IP Address"
   - For development, you can add your current IP or use "0.0.0.0/0" (allow access from anywhere)
   - For production, you'll add your EC2 instance's IP later
   - Click "Confirm"

5. **Get your connection string**:
   - Go to "Databases" under Deployment
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (it will look like `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
   - Replace `<password>` with your database user's password
   - Replace `myFirstDatabase` with `solocreatorhub`

## Step 2: Set Up Amazon RDS for MySQL

1. **Create a MySQL database**:
   - Go to the [Amazon RDS console](https://console.aws.amazon.com/rds/)
   - Click "Create database"
   - Choose "Standard create"
   - Select "MySQL" as the engine type
   - Choose MySQL 8.0 or later
   - Under "Templates", select "Free tier" for development or "Production" for production
   - Configure basic settings:
     - **DB instance identifier**: `solocreatorhub-mysql`
     - **Master username**: Create a username (e.g., `admin`)
     - **Master password**: Create a secure password
   - For instance configuration:
     - Development: db.t2.micro (free tier)
     - Production: At least db.t3.small
   - For storage:
     - Development: 20 GB (minimum)
     - Production: 100 GB or more with provisioned IOPS
   - Under "Connectivity":
     - **Virtual Private Cloud (VPC)**: Use the default VPC
     - **Publicly accessible**: Yes (for development only)
     - **VPC security group**: Create new or use existing
   - Expand "Additional configuration" and set:
     - **Initial database name**: `solocreatorhub`
   - Click "Create database"

2. **Configure security group**:
   - Once your database is created, click on its identifier
   - Under "Connectivity & security", note the "Endpoint" and "Port"
   - Click on the VPC security group
   - Add an inbound rule:
     - **Type**: MySQL/Aurora
     - **Source**: Your IP address (for development) or the security group of your EC2 instance (for production)
   - Save rules

## Step 3: Set Up Amazon S3 for Media Storage

1. **Create an S3 bucket**:
   - Go to the [Amazon S3 console](https://console.aws.amazon.com/s3/)
   - Click "Create bucket"
   - Name your bucket (e.g., `solocreatorhub-media`)
   - Choose the region closest to your users
   - For "Block Public Access settings", uncheck "Block all public access" (since we'll need to serve media publicly)
   - Acknowledge the warning
   - Click "Create bucket"

2. **Configure CORS for the bucket**:
   - Select your bucket
   - Go to the "Permissions" tab
   - Scroll down to "Cross-origin resource sharing (CORS)"
   - Click "Edit" and paste the following configuration:
     ```json
     [
       {
         "AllowedHeaders": ["*"],
         "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
         "AllowedOrigins": ["*"],
         "ExposeHeaders": ["ETag"]
       }
     ]
     ```
   - Click "Save changes"

3. **Create an IAM user for S3 access**:
   - Go to the [IAM console](https://console.aws.amazon.com/iam/)
   - Click "Users" and then "Add user"
   - Set a username (e.g., `solocreatorhub-s3-user`)
   - Select "Programmatic access"
   - Click "Next: Permissions"
   - Click "Attach existing policies directly"
   - Search for and select "AmazonS3FullAccess" (for development) or create a custom policy with more restricted permissions for production
   - Click through to "Create user"
   - **Important**: Save the Access Key ID and Secret Access Key that are displayed

## Step 4: Set Up EC2 for Backend Hosting

1. **Launch an EC2 instance**:
   - Go to the [EC2 console](https://console.aws.amazon.com/ec2/)
   - Click "Launch instance"
   - Choose Amazon Linux 2 AMI
   - Select an instance type:
     - Development: t2.micro (free tier)
     - Production: At least t3.small
   - Configure instance details (use defaults for basic setup)
   - Add storage (at least 20 GB)
   - Add tags (optional)
   - Configure security group:
     - Add HTTP (port 80)
     - Add HTTPS (port 443)
     - Add SSH (port 22)
     - Add Custom TCP for your application port (e.g., 3001)
   - Review and launch
   - Create or select an existing key pair for SSH access
   - Launch instance

2. **Connect to your instance**:
   - Once the instance is running, click "Connect"
   - Follow the instructions to SSH into your instance

3. **Install dependencies**:
   ```bash
   sudo yum update -y
   sudo yum install -y git
   
   # Install Node.js
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   . ~/.nvm/nvm.sh
   nvm install 16
   
   # Install PM2 for process management
   npm install -g pm2
   ```

4. **Clone your repository**:
   ```bash
   git clone https://your-repository-url.git solocreatorhub
   cd solocreatorhub
   npm install
   ```

5. **Create environment file**:
   Create a `.env` file with your configuration:
   ```bash
   cat > .env << EOL
   MONGODB_URI=your_mongodb_atlas_connection_string
   MYSQL_HOST=your_rds_endpoint.rds.amazonaws.com
   MYSQL_USER=admin
   MYSQL_PASSWORD=your_mysql_password
   MYSQL_DATABASE=solocreatorhub
   JWT_SECRET=your_secure_jwt_secret
   PORT=3001
   AWS_ACCESS_KEY_ID=your_s3_access_key
   AWS_SECRET_ACCESS_KEY=your_s3_secret_key
   S3_BUCKET=solocreatorhub-media
   S3_REGION=your_s3_region
   EOL
   ```

6. **Build and start the application**:
   ```bash
   npm run build
   pm2 start server/index.js --name solocreatorhub
   pm2 startup
   pm2 save
   ```

7. **Set up Nginx as a reverse proxy**:
   ```bash
   sudo amazon-linux-extras install nginx1
   sudo systemctl start nginx
   sudo systemctl enable nginx
   
   # Configure Nginx
   sudo nano /etc/nginx/conf.d/solocreatorhub.conf
   ```
   
   Add the following configuration:
   ```nginx
   server {
       listen 80;
       server_name your_domain_or_ip;
   
       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

## Step 5: Set Up AWS Amplify for Frontend Hosting

1. **Go to the AWS Amplify console**:
   - Navigate to [AWS Amplify](https://console.aws.amazon.com/amplify/)
   - Click "New app" > "Host web app"

2. **Connect to your repository**:
   - Choose your Git provider (GitHub, BitBucket, GitLab, or AWS CodeCommit)
   - Authorize AWS Amplify to access your repository
   - Select your repository and branch

3. **Configure build settings**:
   - Amplify will auto-detect React settings, but you can customize them
   - Add environment variables:
     - `REACT_APP_API_URL`: Your EC2 instance URL or domain (e.g., `http://your-ec2-instance-ip:3001/api`)
   - Click "Next"

4. **Review and deploy**:
   - Review your settings
   - Click "Save and deploy"

5. **Access your application**:
   - Once deployment is complete, Amplify will provide a URL for your application
   - You can also configure a custom domain in the Amplify console

## Step 6: Set Up CloudFront for Content Delivery (Optional but Recommended)

1. **Create a CloudFront distribution**:
   - Go to the [CloudFront console](https://console.aws.amazon.com/cloudfront/)
   - Click "Create Distribution"
   - For "Origin Domain Name", select your S3 bucket
   - Configure settings as needed
   - Click "Create Distribution"

2. **Update your application to use CloudFront**:
   - Update your `.env` file on EC2 to include:
     ```
     CLOUDFRONT_DOMAIN=your_cloudfront_domain.cloudfront.net
     ```
   - Modify your code to use the CloudFront URL for media assets

## Step 7: Set Up a Custom Domain (Optional)

1. **Register a domain with Route 53 or use an existing domain**:
   - Go to [Route 53](https://console.aws.amazon.com/route53/)
   - Register a new domain or use an existing one

2. **Configure DNS for your EC2 instance**:
   - Create an A record pointing to your EC2 instance's IP address
   - Or set up an Elastic IP for your EC2 instance for a static IP

3. **Configure DNS for your Amplify app**:
   - In the Amplify console, go to "Domain management"
   - Add your domain and follow the instructions

## Step 8: Set Up HTTPS with Let's Encrypt

1. **Install Certbot on your EC2 instance**:
   ```bash
   sudo amazon-linux-extras install epel
   sudo yum install -y certbot python-certbot-nginx
   ```

2. **Obtain and install certificates**:
   ```bash
   sudo certbot --nginx -d your_domain.com
   ```

3. **Set up auto-renewal**:
   ```bash
   echo "0 0,12 * * * root python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew -q" | sudo tee -a /etc/crontab > /dev/null
   ```

## Step 9: Monitoring and Maintenance

1. **Set up CloudWatch for monitoring**:
   - Go to the [CloudWatch console](https://console.aws.amazon.com/cloudwatch/)
   - Create alarms for EC2 CPU usage, RDS metrics, etc.

2. **Set up automated backups**:
   - RDS: Enable automated backups in the RDS console
   - MongoDB Atlas: Configure backup policy in the Atlas console
   - S3: Enable versioning on your bucket

3. **Set up log management**:
   - Install CloudWatch agent on your EC2 instance
   - Configure it to send logs to CloudWatch

## Step 10: Security Best Practices

1. **Update security groups**:
   - Restrict access to only necessary ports and IP ranges
   - For production, remove public access to RDS and only allow access from EC2

2. **Set up AWS WAF (Web Application Firewall)**:
   - Go to the [WAF console](https://console.aws.amazon.com/wafv2/)
   - Create rules to protect against common web exploits

3. **Enable VPC for better network isolation**:
   - Create a custom VPC
   - Place RDS in a private subnet
   - Place EC2 in a public subnet
   - Use a NAT gateway for outbound internet access from private subnets

## Troubleshooting Common Issues

1. **Connection issues between EC2 and RDS**:
   - Check security groups
   - Verify that the EC2 instance has network access to RDS
   - Test connection using the MySQL client

2. **MongoDB Atlas connection issues**:
   - Check network access settings in Atlas
   - Verify connection string
   - Check if the EC2 IP is whitelisted

3. **Application not starting**:
   - Check PM2 logs: `pm2 logs solocreatorhub`
   - Check environment variables
   - Verify that all dependencies are installed

4. **Frontend not connecting to backend**:
   - Check CORS settings
   - Verify API URL in environment variables
   - Check network requests in browser developer tools

## Cost Optimization

1. **Use EC2 Reserved Instances** for long-term cost savings
2. **Scale RDS appropriately** - start small and scale up as needed
3. **Monitor S3 usage** and implement lifecycle policies
4. **Use CloudFront caching** to reduce origin requests
5. **Set up AWS Budgets** to monitor and alert on costs

## Next Steps and Scaling

1. **Implement CI/CD pipeline**:
   - Use AWS CodePipeline for automated deployments
   - Set up testing in the pipeline

2. **Set up auto-scaling**:
   - Create an EC2 Auto Scaling group
   - Use an Application Load Balancer

3. **Implement database scaling strategies**:
   - RDS: Read replicas for read-heavy workloads
   - MongoDB Atlas: Scale cluster as needed

4. **Implement a CDN for all static assets**:
   - Move frontend assets to CloudFront

5. **Set up disaster recovery**:
   - Cross-region backups
   - Failover strategies

---

By following this guide, you'll have a robust, scalable deployment of SoloCreatorHub AI on AWS, leveraging the hybrid database architecture with MongoDB Atlas and Amazon RDS.
