# SoloCreatorHub AI Developer Guide

## Overview

SoloCreatorHub AI is a comprehensive social media management platform built with React, TypeScript, Node.js, and MySQL. This guide will help entry-level developers set up and run the application locally.

## System Requirements

- Node.js (v16.x or higher)
- npm (v8.x or higher) or pnpm (v7.x or higher)
- MySQL (v8.x or higher)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-organization/solocreatorhub.git
cd solocreatorhub
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory with the following variables:

```
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=solocreatorhub

# JWT Secret for Authentication
JWT_SECRET=your_jwt_secret

# API Keys for Social Media Platforms
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

INSTAGRAM_APP_ID=your_instagram_app_id
INSTAGRAM_APP_SECRET=your_instagram_app_secret

TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret

LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret

YOUTUBE_API_KEY=your_youtube_api_key

# Third-party Integration Keys
CANVA_API_KEY=your_canva_api_key
GOOGLE_DRIVE_CLIENT_ID=your_google_drive_client_id
GOOGLE_DRIVE_CLIENT_SECRET=your_google_drive_client_secret
DROPBOX_APP_KEY=your_dropbox_app_key
DROPBOX_APP_SECRET=your_dropbox_app_secret

# OpenAI API Key (for AI features)
OPENAI_API_KEY=your_openai_api_key
```

### 4. Database Setup

Create a MySQL database named `solocreatorhub` and run the SQL scripts in the `database/migrations` directory to set up the schema.

```bash
mysql -u root -p solocreatorhub < database/migrations/01_initial_schema.sql
mysql -u root -p solocreatorhub < database/migrations/02_seed_data.sql
```

### 5. Start the Development Server

```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

```
solocreatorhub/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── stores/          # State management (Zustand)
│   ├── services/        # API services
│   ├── utils/           # Utility functions
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── docs/                # Documentation
├── database/            # Database migrations and seeds
└── server/              # Backend server code (if applicable)
```

## Key Features

- Multi-platform posting (Facebook, Instagram, Twitter, LinkedIn, TikTok, YouTube)
- Media uploads (text, images, videos)
- Trending hashtag suggestions
- Post scheduling and calendar management
- Analytics dashboard
- Content library and image editor
- AI-powered caption and hashtag suggestions
- Team management with roles and permissions
- Content idea generator
- Trend tracking and alerts
- Watermarking and brand kit tools
- Third-party integrations (Canva, Google Drive, Dropbox)

## API Keys and Services

### Social Media Platforms

To use the social media integration features, you'll need to create developer accounts and obtain API keys from each platform:

1. **Facebook & Instagram**: Create a Facebook Developer account and set up a Facebook App at [developers.facebook.com](https://developers.facebook.com)
2. **Twitter**: Apply for a Twitter Developer account at [developer.twitter.com](https://developer.twitter.com)
3. **LinkedIn**: Create an app in the LinkedIn Developer Portal at [developer.linkedin.com](https://developer.linkedin.com)
4. **TikTok**: Register for TikTok Developer access at [developers.tiktok.com](https://developers.tiktok.com)
5. **YouTube**: Get an API key from the Google Developer Console at [console.developers.google.com](https://console.developers.google.com)

### Third-Party Services

1. **Canva**: Register for Canva Developer API at [developer.canva.com](https://developer.canva.com)
2. **Google Drive**: Set up a project in the Google Cloud Console at [console.cloud.google.com](https://console.cloud.google.com)
3. **Dropbox**: Create an app in the Dropbox Developer Console at [dropbox.com/developers](https://www.dropbox.com/developers)

### AI Features

For AI-powered features (caption generation, content ideas, hashtag suggestions):
- **OpenAI API**: Sign up at [openai.com](https://openai.com) and obtain an API key

## Hosting Recommendations

### Frontend Hosting Options

1. **Vercel**: Excellent for React applications with automatic deployments from GitHub
   - Free tier available
   - [vercel.com](https://vercel.com)

2. **Netlify**: Similar to Vercel with great CI/CD capabilities
   - Free tier available
   - [netlify.com](https://netlify.com)

3. **AWS Amplify**: Good option if you're using other AWS services
   - Pay-as-you-go pricing
   - [aws.amazon.com/amplify](https://aws.amazon.com/amplify)

### Backend Hosting Options

1. **Heroku**: Easy to use with good free tier for development
   - Free and paid tiers
   - [heroku.com](https://heroku.com)

2. **DigitalOcean App Platform**: Simple deployment with reasonable pricing
   - Starting at $5/month
   - [digitalocean.com/products/app-platform](https://digitalocean.com/products/app-platform)

3. **Railway**: Modern platform with simple deployment
   - Free tier available
   - [railway.app](https://railway.app)

### Database Hosting

1. **PlanetScale**: MySQL-compatible serverless database platform
   - Free tier available
   - [planetscale.com](https://planetscale.com)

2. **AWS RDS**: Managed relational database service
   - Pay-as-you-go pricing
   - [aws.amazon.com/rds](https://aws.amazon.com/rds)

3. **DigitalOcean Managed Databases**: MySQL databases with simple pricing
   - Starting at $15/month
   - [digitalocean.com/products/managed-databases](https://digitalocean.com/products/managed-databases)

## Troubleshooting

### Common Issues

1. **API Rate Limiting**: Social media platforms have rate limits. Implement proper error handling and retry mechanisms.

2. **CORS Issues**: When testing locally, you might encounter CORS problems. Use a CORS proxy or configure your backend to handle CORS properly.

3. **Environment Variables**: Ensure all required environment variables are set correctly.

4. **Database Connection**: Check database credentials and connection settings if you encounter database-related errors.

### Getting Help

- Check the project's GitHub Issues
- Consult the documentation for specific libraries or APIs
- Reach out to the development team through the project's communication channels

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
