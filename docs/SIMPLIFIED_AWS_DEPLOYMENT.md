# SoloCreatorHub AI - Simple Step-by-Step AWS Deployment Guide

This simplified guide breaks down the process of deploying SoloCreatorHub AI to AWS into clear, manageable steps.

## Before You Start

1. Create an AWS account if you don't have one
2. Install these tools on your computer:
   - AWS CLI: [Download here](https://aws.amazon.com/cli/)
   - Node.js and npm: [Download here](https://nodejs.org/)
   - Git: [Download here](https://git-scm.com/downloads)

## Step 1: Set Up Your Database

1. **Create a MySQL Database**
   - Go to [AWS Console](https://console.aws.amazon.com/)
   - Search for "RDS" and click on it
   - Click the orange "Create database" button
   - Choose "Standard create" and select "MySQL"
   - Under "Templates", select "Free tier"
   - Fill in these settings:
     - DB instance identifier: `solocreatorhub-db`
     - Username: `admin` (or choose your own)
     - Password: Create a secure password (write it down!)
   - Under "Connectivity", make sure "Publicly accessible" is set to "Yes"
   - Under "Additional configuration", set "Initial database name" to `solocreatorhub`
   - Click "Create database" and wait (this takes about 5-10 minutes)

2. **Set Up Database Security**
   - Once created, click on your new database from the list
   - Under "Connectivity & security", find and click on the VPC security group
   - Click "Edit inbound rules"
   - Click "Add rule"
   - Set Type to "MySQL/Aurora", Source to "Anywhere-IPv4"
   - Click "Save rules"
   - Go back to your database page and copy the "Endpoint" (you'll need this later)

## Step 2: Prepare Your Code

1. **Update Your Project Files**
   - Open your project folder
   - Create a file named `.ebignore` with this content:
     ```
     node_modules
     .git
     .gitignore
     .env.local
     ```
   
   - Create a file named `Procfile` (no file extension) with this content:
     ```
     web: node server/index.js
     ```
   
   - Update your `package.json` to include a start script:
     ```json
     "scripts": {
       "start": "node server/index.js",
       "dev": "vite",
       "build": "tsc && vite build",
       "preview": "vite preview"
     }
     ```
   
   - Create a file named `.env.production` with this content (replace with your values):
     ```
     JWT_SECRET=choose_a_random_secure_string
     PORT=8081
     DB_HOST=your-database-endpoint-from-earlier.rds.amazonaws.com
     DB_USER=admin
     DB_PASS=your_database_password
     DB_NAME=solocreatorhub
     ```

## Step 3: Deploy Your Backend

1. **Set Up Elastic Beanstalk CLI**
   - Open your terminal/command prompt
   - Run: `pip install awsebcli`
   - In your project folder, run: `eb init`
   - Select your region (choose the one closest to you)
   - Enter "solocreatorhub" as the application name
   - Select "Node.js" as the platform
   - Choose the latest Node.js version
   - When asked about SSH, choose "Yes" if you want to access your server directly

2. **Create and Deploy Your Environment**
   - Run: `eb create solocreatorhub-env`
   - Wait for the environment to be created (10-15 minutes)
   - Once created, run this command (replace with your actual values):
     ```
     eb setenv JWT_SECRET=your_secure_string DB_HOST=your-database-endpoint.rds.amazonaws.com DB_USER=admin DB_PASS=your_password DB_NAME=solocreatorhub
     ```
   - Run: `eb deploy`
   - Run: `eb open` to see your backend running
   - Copy the URL from your browser (you'll need it for the next step)

## Step 4: Update Your Frontend Code

1. **Point Your Frontend to Your Backend**
   - Find your API configuration file (usually in `src/services/api.ts` or similar)
   - Update it to use your Elastic Beanstalk URL:
     ```javascript
     const API_BASE_URL = process.env.NODE_ENV === 'production' 
       ? 'https://your-eb-environment-url.elasticbeanstalk.com/api' 
       : 'http://localhost:3001/api';
     ```
   - Build your frontend: `npm run build`

## Step 5: Deploy Your Frontend

1. **Set Up AWS Amplify**
   - Go to [AWS Console](https://console.aws.amazon.com/)
   - Search for "Amplify" and click on it
   - Click "New app" > "Host web app"
   - Choose your Git provider (GitHub, BitBucket, etc.)
   - Connect to your repository and select your branch
   - On the "Configure build settings" page, keep the defaults
   - Click "Advanced settings" and add this environment variable:
     - Name: `VITE_API_URL`
     - Value: `https://your-eb-environment-url.elasticbeanstalk.com/api`
   - Click "Save and deploy"
   - Wait for the deployment to complete (5-10 minutes)
   - Click the generated URL to see your app running

## Step 6: Connect Everything Together

1. **Update Your Backend for CORS**
   - Open your `server/index.js` file
   - Update the CORS configuration:
     ```javascript
     app.use(cors({
       origin: process.env.NODE_ENV === 'production' 
         ? 'https://your-amplify-app-url.amplifyapp.com' 
         : 'http://localhost:3000'
     }));
     ```
   - Commit and push your changes
   - Run: `eb deploy` to update your backend

## Step 7: Test Everything

1. **Verify Your Deployment**
   - Open your Amplify app URL
   - Test all features of your application
   - Make sure the frontend can communicate with the backend
   - Test user registration and login if applicable
   - Test any database operations

## Step 8: Set Up Monitoring (Optional but Recommended)

1. **Create Basic Alarms**
   - Go to [AWS Console](https://console.aws.amazon.com/)
   - Search for "CloudWatch" and click on it
   - Click "Alarms" > "Create alarm"
   - Click "Select metric"
   - Choose "EC2" > "By Instance" > Select your Elastic Beanstalk instance
   - Select "CPUUtilization"
   - Set a threshold (e.g., Greater than 80%)
   - Create an SNS topic and add your email
   - Give your alarm a name and click "Create alarm"

## Step 9: Set Up Database Backups (Optional but Recommended)

1. **Configure Automated Backups**
   - Go to [AWS Console](https://console.aws.amazon.com/)
   - Search for "RDS" and click on it
   - Select your database
   - Click "Modify"
   - Under "Backup", set "Backup retention period" to 7 days
   - Click "Continue" and then "Modify DB Instance"

## Troubleshooting Common Issues

- **Can't connect to the database:**
  - Check your security group settings
  - Verify your database endpoint and credentials

- **Backend deployment fails:**
  - Check your logs: `eb logs`
  - Make sure your Node.js version is compatible

- **Frontend can't connect to backend:**
  - Check your API URL configuration
  - Verify CORS settings in your backend

- **Website shows error or blank page:**
  - Check Amplify build logs
  - Verify your build commands are correct

## Cost-Saving Tips

- Use Free Tier eligible services when possible
- Stop your RDS instance when not in use
- Set up AWS Budget alerts to monitor spending

---

Congratulations! You've successfully deployed SoloCreatorHub AI to AWS. This setup gives you a scalable, reliable foundation that can grow with your application.
