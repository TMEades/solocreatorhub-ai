# SoloCreatorHub AI - Simple AWS Deployment Guide for Hybrid Database

This simplified guide walks you through deploying SoloCreatorHub AI with its MongoDB and MySQL hybrid database architecture to AWS.

## Before You Start

You'll need:
- An AWS account
- AWS CLI installed
- Node.js and npm installed
- Git installed
- Your SoloCreatorHub AI code ready

## Step 1: Set Up MongoDB Atlas

1. **Create a MongoDB Atlas account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up or log in
   - Create a new project named "SoloCreatorHub"

2. **Create a free cluster**
   - Click "Build a Database"
   - Choose "Shared" (free tier)
   - Select AWS as provider
   - Choose a region close to your users
   - Click "Create Cluster"

3. **Set up database access**
   - Go to "Database Access" → "Add New Database User"
   - Create a username and password
   - Set privileges to "Read and Write to Any Database"
   - Click "Add User"

4. **Configure network access**
   - Go to "Network Access" → "Add IP Address"
   - For development, choose "Allow Access from Anywhere"
   - Click "Confirm"

5. **Get your connection string**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Replace `myFirstDatabase` with `solocreatorhub`

## Step 2: Set Up MySQL Database with Amazon RDS

1. **Create a MySQL database**
   - Go to [Amazon RDS](https://console.aws.amazon.com/rds/)
   - Click "Create database"
   - Choose "Standard create" and select "MySQL"
   - Under "Templates", select "Free tier"
   - Set these details:
     - DB instance identifier: `solocreatorhub-mysql`
     - Username: `admin` (or choose your own)
     - Password: Create a secure password
   - Under "Connectivity", set "Publicly accessible" to "Yes"
   - Under "Additional configuration", set "Initial database name" to `solocreatorhub`
   - Click "Create database"

2. **Configure security**
   - Once created, click on your database
   - Under "Connectivity & security", click on the VPC security group
   - Click "Edit inbound rules"
   - Add a rule: Type "MySQL/Aurora", Source "Anywhere-IPv4"
   - Click "Save rules"
   - Copy the database endpoint (you'll need it later)

## Step 3: Set Up Amazon S3 for Media Storage

1. **Create an S3 bucket**
   - Go to [Amazon S3](https://console.aws.amazon.com/s3/)
   - Click "Create bucket"
   - Name it (e.g., `solocreatorhub-media`)
   - Choose your region
   - Uncheck "Block all public access"
   - Acknowledge the warning
   - Click "Create bucket"

2. **Create access keys for S3**
   - Go to [IAM](https://console.aws.amazon.com/iam/)
   - Click "Users" → "Add user"
   - Name: `solocreatorhub-s3-user`
   - Check "Programmatic access"
   - Click "Next: Permissions"
   - Click "Attach existing policies directly"
   - Search for and select "AmazonS3FullAccess"
   - Click through to create the user
   - Save the Access Key ID and Secret Access Key

## Step 4: Set Up EC2 for Backend

1. **Launch an EC2 instance**
   - Go to [EC2](https://console.aws.amazon.com/ec2/)
   - Click "Launch instance"
   - Choose "Amazon Linux 2"
   - Select "t2.micro" (free tier)
   - Click "Next" until "Configure Security Group"
   - Add these rules:
     - SSH (port 22)
     - HTTP (port 80)
     - HTTPS (port 443)
     - Custom TCP (port 3001)
   - Launch and create/select a key pair

2. **Connect to your instance**
   - Once running, click "Connect"
   - Follow instructions to SSH into your instance

3. **Install software**
   ```bash
   sudo yum update -y
   sudo yum install -y git
   
   # Install Node.js
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   . ~/.nvm/nvm.sh
   nvm install 16
   
   # Install PM2
   npm install -g pm2
   ```

4. **Deploy your application**
   ```bash
   git clone https://your-repository-url.git solocreatorhub
   cd solocreatorhub
   npm install
   ```

5. **Create environment file**
   ```bash
   nano .env
   ```
   
   Add these variables:
   ```
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
   ```

6. **Start the application**
   ```bash
   npm run build
   pm2 start server/index.js --name solocreatorhub
   pm2 startup
   pm2 save
   ```

7. **Set up Nginx**
   ```bash
   sudo amazon-linux-extras install nginx1
   sudo systemctl start nginx
   sudo systemctl enable nginx
   
   sudo nano /etc/nginx/conf.d/solocreatorhub.conf
   ```
   
   Add this configuration:
   ```
   server {
       listen 80;
       server_name your_ec2_public_ip;
   
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

## Step 5: Set Up AWS Amplify for Frontend

1. **Go to AWS Amplify**
   - Navigate to [AWS Amplify](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"

2. **Connect to your repository**
   - Choose your Git provider
   - Connect to your repository
   - Select your repository and branch

3. **Configure build settings**
   - Add this environment variable:
     - Name: `REACT_APP_API_URL`
     - Value: `http://your_ec2_public_ip/api`
   - Click "Next" and then "Save and deploy"

4. **Access your application**
   - Once deployment completes, Amplify provides a URL
   - Open this URL to access your application

## Step 6: Set Up HTTPS (Optional but Recommended)

1. **Install Certbot**
   ```bash
   sudo amazon-linux-extras install epel
   sudo yum install -y certbot python-certbot-nginx
   ```

2. **Get a certificate**
   - If you have a domain pointed to your EC2 instance:
     ```bash
     sudo certbot --nginx -d your_domain.com
     ```
   - Follow the prompts to complete setup

## Step 7: Test Everything

1. **Test backend API**
   - Open `http://your_ec2_public_ip/api/health`
   - You should see a status message

2. **Test frontend**
   - Open your Amplify app URL
   - Try to register and log in
   - Test creating posts and other features

## Step 8: Monitoring and Maintenance

1. **Set up basic monitoring**
   - Go to [CloudWatch](https://console.aws.amazon.com/cloudwatch/)
   - Create alarms for EC2 CPU usage
   - Set up an alarm for RDS database

2. **Set up database backups**
   - RDS: Enable automated backups
   - MongoDB Atlas: Configure backup policy

## Troubleshooting Common Issues

- **Can't connect to databases**
  - Check security group settings
  - Verify connection strings and credentials

- **Application not starting**
  - Check PM2 logs: `pm2 logs solocreatorhub`
  - Verify all environment variables are set correctly

- **Frontend can't connect to backend**
  - Check CORS settings in your backend code
  - Verify the API URL in Amplify environment variables

## Cost-Saving Tips

- Use Free Tier eligible services when possible
- Turn off EC2 instance when not in use during development
- Set up AWS Budget alerts to monitor spending

---

Congratulations! You've deployed SoloCreatorHub AI with its hybrid database architecture to AWS. This setup gives you a scalable, reliable foundation that can grow with your application.
