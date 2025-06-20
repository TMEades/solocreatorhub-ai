# SoleCreatorHub AI - Deployment Guide

This guide will walk you through deploying SoleCreatorHub AI to Netlify, step by step. This guide is designed for beginners with no prior deployment experience.

## Prerequisites

Before you start, make sure you have:

1. A GitHub account (free)
2. A Netlify account (free)
3. A MongoDB Atlas account (free tier available)
4. A MySQL database (options below)

## Step 1: Set Up Your Databases

### MongoDB Setup

1. **Create a MongoDB Atlas account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Sign up for a free account
   - Create a new project named "SoleCreatorHub"

2. **Create a cluster**:
   - Click "Build a Database"
   - Choose the FREE tier
   - Select your preferred provider (AWS, Google Cloud, or Azure)
   - Choose a region close to your users
   - Click "Create Cluster" (this may take a few minutes)

3. **Set up database access**:
   - Go to "Database Access" in the left menu
   - Click "Add New Database User"
   - Create a username and password (SAVE THESE SECURELY!)
   - Set privileges to "Read and Write to Any Database"
   - Click "Add User"

4. **Set up network access**:
   - Go to "Network Access" in the left menu
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (for simplicity)
   - Click "Confirm"

5. **Get your connection string**:
   - Go to "Databases" in the left menu
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (it looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
   - Replace `<password>` with your database user's password
   - Replace `myFirstDatabase` with `solecreatorhub`

### MySQL Setup

For MySQL, you have several options:

#### Option 1: PlanetScale (Recommended for beginners)

1. Go to [PlanetScale](https://planetscale.com/) and sign up for a free account
2. Create a new database named "solecreatorhub"
3. Follow their instructions to get your connection details

#### Option 2: Railway

1. Go to [Railway](https://railway.app/) and sign up
2. Create a new MySQL project
3. Get your connection details from the dashboard

#### Option 3: AWS RDS (More advanced)

1. Create an AWS account
2. Set up an RDS MySQL instance
3. Configure security groups to allow access

## Step 2: Push Your Code to GitHub

1. **Create a new GitHub repository**:
   - Go to [GitHub](https://github.com)
   - Click the "+" icon in the top right and select "New repository"
   - Name it "solecreatorhub-ai"
   - Make it public or private
   - Click "Create repository"

2. **Push your code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/solecreatorhub-ai.git
   git push -u origin main
   ```

## Step 3: Deploy to Netlify

1. **Sign up for Netlify**:
   - Go to [Netlify](https://www.netlify.com/)
   - Sign up for a free account (you can use your GitHub account)

2. **Create a new site**:
   - Click "New site from Git"
   - Choose "GitHub" as your Git provider
   - Authorize Netlify to access your GitHub account
   - Select your "solecreatorhub-ai" repository

3. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Show advanced" and add your environment variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `DB_HOST`: Your MySQL host
     - `DB_USER`: Your MySQL username
     - `DB_PASS`: Your MySQL password
     - `DB_NAME`: Your MySQL database name (solecreatorhub)
     - `JWT_SECRET`: A random string for JWT encryption (e.g., generate one at [randomkeygen.com](https://randomkeygen.com/))

4. **Deploy your site**:
   - Click "Deploy site"
   - Wait for the build to complete (this may take a few minutes)

5. **Set up your domain** (optional):
   - In the Netlify dashboard, go to "Domain settings"
   - Click "Add custom domain"
   - Follow the instructions to set up your domain

## Step 4: Set Up the Backend Server

For the backend server, you have several options:

### Option 1: Render (Recommended for beginners)

1. Go to [Render](https://render.com/) and sign up
2. Create a new Web Service
3. Connect your GitHub repository
4. Set the build command to `npm install`
5. Set the start command to `node server/index.js`
6. Add your environment variables (same as in Netlify)
7. Deploy the service

### Option 2: Railway

1. Go to [Railway](https://railway.app/) and sign up
2. Create a new project from your GitHub repository
3. Add your environment variables
4. Deploy the service

### Option 3: Heroku

1. Create a Heroku account
2. Create a new app
3. Connect your GitHub repository
4. Add your environment variables in the Settings tab
5. Deploy your app

## Step 5: Connect Frontend to Backend

1. **Update your API URL**:
   - Go to your Netlify dashboard
   - Go to "Site settings" > "Build & deploy" > "Environment"
   - Add a new variable: `VITE_API_URL` with the value of your backend URL (e.g., `https://your-backend.onrender.com`)

2. **Trigger a new deploy**:
   - Go to "Deploys" in your Netlify dashboard
   - Click "Trigger deploy" > "Deploy site"

## Step 6: Test Your Deployment

1. Visit your Netlify URL (e.g., `https://your-site.netlify.app`)
2. Test the basic functionality
3. Check the health endpoint: `https://your-backend-url/api/health`

## Troubleshooting

### Common Issues:

1. **Build fails on Netlify**:
   - Check your build logs for errors
   - Make sure all dependencies are in package.json
   - Verify your build command is correct

2. **Database connection issues**:
   - Check your environment variables
   - Ensure your IP whitelist includes Netlify and your backend service
   - Verify your database credentials

3. **API calls not working**:
   - Check CORS settings in your backend
   - Verify the API URL is correct
   - Check for network errors in the browser console

### Getting Help:

If you encounter issues, check:
- Netlify's documentation and forums
- MongoDB Atlas documentation
- Your database provider's support resources

## Next Steps

Once your app is deployed:

1. **Set up CI/CD**:
   - Netlify automatically deploys when you push to your main branch
   - Consider setting up preview deployments for pull requests

2. **Monitor your app**:
   - Set up logging with a service like Sentry or LogRocket
   - Monitor your database performance

3. **Optimize for production**:
   - Enable caching
   - Optimize images and assets
   - Implement lazy loading

Congratulations! You've successfully deployed SoleCreatorHub AI to production!
