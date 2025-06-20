# SoloCreatorHub AI - Digital Ocean Deployment Guide

This guide walks you through deploying SoloCreatorHub AI with its hybrid database architecture to Digital Ocean, which offers a simpler and potentially more cost-effective alternative to AWS.

## Why Digital Ocean?

- Simpler pricing model
- Lower entry cost
- Easier management for small to medium applications
- Good performance for the price

## Prerequisites

- A Digital Ocean account
- Basic familiarity with Linux commands
- Your SoloCreatorHub AI codebase

## Step 1: Set Up MongoDB Atlas

1. **Create a MongoDB Atlas account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up or log in
   - Create a new project named "SoloCreatorHub"

2. **Create a cluster**
   - Click "Build a Database"
   - Choose "Shared" (free tier)
   - Select a cloud provider and region close to where you'll deploy your Digital Ocean Droplet
   - Click "Create Cluster"

3. **Configure database access**
   - Go to "Database Access" → "Add New Database User"
   - Create a username and password
   - Set privileges to "Read and Write to Any Database"
   - Click "Add User"

4. **Configure network access**
   - Go to "Network Access" → "Add IP Address"
   - For now, choose "Allow Access from Anywhere" (we'll update this later)
   - Click "Confirm"

5. **Get your connection string**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Replace `myFirstDatabase` with `solocreatorhub`

## Step 2: Set Up MySQL Database on Digital Ocean

1. **Create a MySQL database cluster**
   - Go to [Digital Ocean](https://cloud.digitalocean.com/)
   - Click "Create" → "Databases"
   - Select "MySQL"
   - Choose a plan:
     - For development: Basic plan ($15/month)
     - For production: Standard plan ($30/month or higher)
   - Select a datacenter region close to your users
   - Choose a name (e.g., `solocreatorhub-mysql`)
   - Click "Create Database Cluster"

2. **Configure database**
   - Once created, click on your database
   - Under "Connection Details", note the connection information
   - Under "Users & Databases", create a new database named `solocreatorhub`
   - Note the default user credentials or create a new user

3. **Configure firewall rules**
   - Under "Settings" → "Trusted Sources"
   - For now, add "All IPv4" (we'll update this later)
   - Click "Save"

## Step 3: Create a Digital Ocean Droplet for the Application

1. **Create a Droplet**
   - Click "Create" → "Droplets"
   - Choose an image: Ubuntu 20.04 LTS
   - Choose a plan:
     - For development: Basic Shared CPU ($5-$10/month)
     - For production: Regular Shared CPU ($15/month or higher)
   - Choose a datacenter region (same as your MySQL database)
   - Add your SSH key or create a password
   - Choose a hostname (e.g., `solocreatorhub-app`)
   - Click "Create Droplet"

2. **Connect to your Droplet**
   - Use SSH to connect to your Droplet:
     ```bash
     ssh root@your_droplet_ip
     ```

3. **Install required software**
   ```bash
   # Update system
   apt update && apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
   apt-get install -y nodejs
   
   # Install Git
   apt-get install -y git
   
   # Install PM2
   npm install -g pm2
   
   # Install Nginx
   apt-get install -y nginx
   ```

## Step 4: Deploy Your Application

1. **Clone your repository**
   ```bash
   git clone https://your-repository-url.git /var/www/solocreatorhub
   cd /var/www/solocreatorhub
   npm install
   ```

2. **Create environment file**
   ```bash
   nano .env
   ```
   
   Add these variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   MYSQL_HOST=your_digitalocean_mysql_host
   MYSQL_USER=your_mysql_user
   MYSQL_PASSWORD=your_mysql_password
   MYSQL_DATABASE=solocreatorhub
   JWT_SECRET=your_secure_jwt_secret
   PORT=3001
   ```

3. **Build and start the application**
   ```bash
   npm run build
   pm2 start server/index.js --name solocreatorhub
   pm2 startup
   pm2 save
   ```

4. **Configure Nginx**
   ```bash
   nano /etc/nginx/sites-available/solocreatorhub
   ```
   
   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name your_droplet_ip;
   
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
   
   Enable the site:
   ```bash
   ln -s /etc/nginx/sites-available/solocreatorhub /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

## Step 5: Set Up Digital Ocean Spaces for Media Storage

1. **Create a Space**
   - Click "Create" → "Spaces"
   - Choose a datacenter region
   - Name your Space (e.g., `solocreatorhub-media`)
   - Choose "Restrict File Listing"
   - Click "Create Space"

2. **Create access keys**
   - Go to "API" → "Tokens/Keys" → "Spaces access keys"
   - Click "Generate New Key"
   - Give it a name
   - Copy both the access key and secret key

3. **Update your application to use Spaces**
   - Add these variables to your `.env` file:
     ```
     DO_SPACES_ENDPOINT=your_region.digitaloceanspaces.com
     DO_SPACES_KEY=your_spaces_access_key
     DO_SPACES_SECRET=your_spaces_secret_key
     DO_SPACES_BUCKET=solocreatorhub-media
     ```

## Step 6: Set Up a Domain Name (Optional)

1. **Add a domain in Digital Ocean**
   - Go to "Networking" → "Domains"
   - Add your domain or create a new one

2. **Create DNS records**
   - Create an A record pointing to your Droplet's IP address
   - Create CNAME records for any subdomains

3. **Update Nginx configuration**
   ```bash
   nano /etc/nginx/sites-available/solocreatorhub
   ```
   
   Update the server_name:
   ```nginx
   server_name your_domain.com www.your_domain.com;
   ```
   
   Restart Nginx:
   ```bash
   systemctl restart nginx
   ```

## Step 7: Set Up HTTPS with Let's Encrypt

1. **Install Certbot**
   ```bash
   apt-get install -y certbot python3-certbot-nginx
   ```

2. **Obtain and install certificates**
   ```bash
   certbot --nginx -d your_domain.com -d www.your_domain.com
   ```

3. **Set up auto-renewal**
   ```bash
   certbot renew --dry-run
   ```

## Step 8: Update Security Settings

1. **Update MongoDB Atlas network access**
   - Go back to MongoDB Atlas
   - Under "Network Access", remove "Allow Access from Anywhere"
   - Add your Droplet's IP address

2. **Update MySQL trusted sources**
   - Go to your Digital Ocean MySQL database
   - Under "Settings" → "Trusted Sources"
   - Remove "All IPv4"
   - Add your Droplet's IP address

3. **Set up a basic firewall on your Droplet**
   ```bash
   ufw allow OpenSSH
   ufw allow 'Nginx Full'
   ufw enable
   ```

## Step 9: Set Up Monitoring

1. **Enable Digital Ocean Monitoring**
   - Go to your Droplet
   - Under "Monitoring", click "Install Agent"
   - Follow the instructions

2. **Set up alerts**
   - Under "Monitoring", click "Create Alert Policy"
   - Set up alerts for CPU, memory, and disk usage

## Step 10: Set Up Backups

1. **Enable Droplet backups**
   - Go to your Droplet
   - Under "Backups", click "Enable Backups"

2. **Set up MongoDB Atlas backups**
   - In MongoDB Atlas, configure backup policy

3. **Set up MySQL database backups**
   - Digital Ocean MySQL includes automatic backups

## Troubleshooting Common Issues

- **Application not starting**
  - Check PM2 logs: `pm2 logs solocreatorhub`
  - Verify environment variables

- **Database connection issues**
  - Check network access settings
  - Verify connection strings

- **Nginx not serving the application**
  - Check Nginx error logs: `cat /var/log/nginx/error.log`
  - Verify Nginx configuration: `nginx -t`

## Cost Optimization

- Use the smallest Droplet that meets your needs
- Scale up only when necessary
- Use the Basic MySQL plan for development
- Monitor your usage and adjust resources accordingly

---

This Digital Ocean deployment provides a cost-effective alternative to AWS while still offering good performance and reliability for SoloCreatorHub AI with its hybrid database architecture.
