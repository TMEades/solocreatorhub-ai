# SoloCreatorHub AI - AWS Deployment Guide for Entry-Level Developers

This guide will walk you through deploying SoloCreatorHub AI on AWS. We'll use AWS Amplify for the frontend and AWS Elastic Beanstalk for the backend, with Amazon RDS for the database.

## Prerequisites

Before you begin, make sure you have:

- An AWS account
- AWS CLI installed and configured
- Node.js and npm installed
- Git installed
- Your SoloCreatorHub AI codebase ready

## Part 1: Database Setup with Amazon RDS

### 1. Create a MySQL Database

1. Log in to the AWS Management Console
2. Navigate to Amazon RDS
3. Click "Create database"
4. Select "Standard create"
5. Choose "MySQL" as the engine type
6. Under "Templates", select "Free tier" (for development)
7. Configure basic settings:
   - **DB instance identifier**: `solocreatorhub-db`
   - **Master username**: Create a username (e.g., `admin`)
   - **Master password**: Create a secure password
8. Under "Connectivity":
   - **Virtual Private Cloud (VPC)**: Use the default VPC
   - **Publicly accessible**: Yes (for development only, not recommended for production)
9. Expand "Additional configuration" and set:
   - **Initial database name**: `solocreatorhub`
10. Keep other settings as default and click "Create database"

### 2. Configure Security Group

1. Once your database is created, click on its identifier
2. Under "Connectivity & security", note the "Endpoint" and "Port"
3. Click on the VPC security group
4. Add an inbound rule:
   - **Type**: MySQL/Aurora
   - **Source**: Your IP address (for development) or the security group of your Elastic Beanstalk environment (for production)
5. Save rules

## Part 2: Backend Deployment with Elastic Beanstalk

### 1. Prepare Your Backend Code

1. Create a new file called `.ebignore` in your project root with the following content:
   ```
   node_modules
   .git
   .gitignore
   .env.local
   ```

2. Create a file named `Procfile` (no extension) in your project root:
   ```
   web: node server/index.js
   ```

3. Update your `package.json` to include a start script:
   ```json
   "scripts": {
     "start": "node server/index.js",
     "dev": "vite",
     "build": "tsc && vite build",
     "preview": "vite preview"
   }
   ```

4. Create a `.env.production` file with your production environment variables (replace with your actual values):
   ```
   JWT_SECRET=your_secure_jwt_secret_key
   PORT=8081
   DB_HOST=your-rds-endpoint.rds.amazonaws.com
   DB_USER=admin
   DB_PASS=your_database_password
   DB_NAME=solocreatorhub
   ```

### 2. Create an Elastic Beanstalk Application

1. Install the EB CLI:
   ```bash
   pip install awsebcli
   ```

2. Initialize your EB application:
   ```bash
   eb init
   ```
   - Select your region
   - Create a new application named "solocreatorhub"
   - Select "Node.js" as the platform
   - Choose the latest Node.js version
   - Set up SSH for your instances (optional)

3. Create an environment:
   ```bash
   eb create solocreatorhub-env
   ```

4. Once the environment is created, configure environment variables:
   ```bash
   eb setenv JWT_SECRET=your_secure_jwt_secret_key DB_HOST=your-rds-endpoint.rds.amazonaws.com DB_USER=admin DB_PASS=your_database_password DB_NAME=solocreatorhub
   ```

5. Deploy your application:
   ```bash
   eb deploy
   ```

6. Open your application:
   ```bash
   eb open
   ```

## Part 3: Frontend Deployment with AWS Amplify

### 1. Prepare Your Frontend Code

1. Update your API endpoint in your frontend code to point to your Elastic Beanstalk URL:
   ```javascript
   // src/services/api.ts or similar file
   const API_BASE_URL = process.env.NODE_ENV === 'production' 
     ? 'https://your-eb-environment-url.elasticbeanstalk.com/api' 
     : 'http://localhost:3001/api';
   ```

2. Build your frontend:
   ```bash
   npm run build
   ```

### 2. Deploy with AWS Amplify Console

1. Log in to the AWS Management Console
2. Navigate to AWS Amplify
3. Click "New app" > "Host web app"
4. Choose your Git provider (GitHub, BitBucket, GitLab, or AWS CodeCommit)
5. Authorize AWS Amplify to access your repository
6. Select your repository and branch
7. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
8. Add environment variables if needed
9. Click "Save and deploy"

## Part 4: Connect Everything Together

### 1. Configure CORS on Your Backend

Update your Express server to allow requests from your Amplify domain:

```javascript
// server/index.js
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-amplify-domain.amplifyapp.com' 
    : 'http://localhost:3000'
}));
```

### 2. Update Amplify Build Settings (if needed)

If your frontend needs to know the backend URL at build time:

1. Go to your Amplify app in the AWS Console
2. Navigate to "Environment variables"
3. Add a variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-eb-environment-url.elasticbeanstalk.com/api`
4. Rebuild your app

## Part 5: Setting Up a Custom Domain (Optional)

### 1. Register a Domain (if you don't have one)

1. Go to Amazon Route 53
2. Click "Registered domains" > "Register domain"
3. Follow the steps to register a domain

### 2. Configure Custom Domain for Amplify

1. In your Amplify app, go to "Domain management"
2. Click "Add domain"
3. Enter your domain name and click "Configure domain"
4. Follow the steps to verify domain ownership
5. Wait for DNS propagation (can take up to 48 hours)

### 3. Configure Custom Domain for Elastic Beanstalk (Optional)

1. Create a CNAME record in Route 53 pointing to your Elastic Beanstalk URL
2. Update your CORS settings to include your custom domain

## Part 6: Monitoring and Maintenance

### 1. Set Up CloudWatch Alarms

1. Go to CloudWatch in the AWS Console
2. Create alarms for:
   - CPU utilization
   - Memory usage
   - Error rates

### 2. Set Up Automated Backups for RDS

1. In the RDS Console, select your database
2. Go to "Maintenance & backups"
3. Configure automated backups

### 3. Implement CI/CD Pipeline

For GitHub repositories:
1. Configure Amplify to automatically deploy when you push to your main branch
2. Set up GitHub Actions for your backend deployment

## Troubleshooting Common Issues

### Database Connection Issues

1. Check your security group settings
2. Verify environment variables are correctly set
3. Test connection using a MySQL client

### Deployment Failures

1. Check Amplify build logs
2. Review Elastic Beanstalk logs:
   ```bash
   eb logs
   ```

### CORS Errors

1. Verify your CORS configuration in the backend
2. Check that your frontend is using the correct API URL

## Cost Management

To keep costs low during development:

1. Use Free Tier eligible services when possible
2. Stop RDS instances when not in use
3. Set up AWS Budgets to monitor spending

## Next Steps

Once your basic deployment is working:

1. Implement HTTPS for your Elastic Beanstalk environment
2. Set up a CI/CD pipeline for automated testing and deployment
3. Configure auto-scaling for your Elastic Beanstalk environment
4. Implement a CDN using CloudFront for better performance

## Resources

- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/)
- [Amazon RDS Documentation](https://docs.aws.amazon.com/rds/)
- [AWS Free Tier](https://aws.amazon.com/free/)

---

Remember to never commit sensitive information like API keys or database credentials to your repository. Always use environment variables or AWS Parameter Store for secrets.
