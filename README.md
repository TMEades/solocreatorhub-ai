# SoloCreatorHub AI

A comprehensive social media management platform for content creators, allowing posting to multiple platforms with trending hashtag suggestions, recurring posts, and optimal time publishing.

## Features

- Multi-platform posting (Instagram, Facebook, TikTok, YouTube, LinkedIn)
- Media uploads (text, images, videos)
- Trending hashtag suggestions
- Post scheduling and recurring posts
- Auto-publishing at optimal times based on analytics
- Post history tracking
- Platform management
- Unified dashboard
- Advanced analytics

## Tech Stack

- **Frontend**: React, TypeScript, Zustand, Chart.js
- **Backend**: Node.js, Express
- **Databases**: 
  - MongoDB: For flexible content storage (posts, content library, messages)
  - MySQL: For relational data (users, scheduling, analytics)
- **Authentication**: JWT

## Hybrid Database Architecture

SoloCreatorHub AI uses a hybrid database approach to leverage the strengths of both MongoDB and MySQL:

- **MongoDB** is used for:
  - Post content and media
  - Content library items
  - Social media messages
  - AI-generated content

- **MySQL** is used for:
  - User accounts and authentication
  - Platform connections
  - Precise scheduling and recurrence patterns
  - Analytics data with time-series capabilities

This hybrid approach provides flexibility for content while maintaining strong relational integrity for user data and scheduling.

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- MySQL

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   pnpm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/solocreatorhub
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=password
   MYSQL_DATABASE=solocreatorhub
   JWT_SECRET=your_jwt_secret_key_here
   PORT=3001
   ```

### Running the Application

1. Start the development server:
   ```
   pnpm run dev
   ```
2. In a separate terminal, start the backend server:
   ```
   pnpm run server
   ```

## Project Structure

```
solocreatorhub/
├── server/                # Backend code
│   ├── config/            # Configuration files
│   ├── controllers/       # API controllers
│   ├── middleware/        # Express middleware
│   ├── models/            # Database models
│   │   ├── mongodb/       # MongoDB models
│   │   └── mysql/         # MySQL models
│   ├── routes/            # API routes
│   └── index.js           # Server entry point
├── src/                   # Frontend code
│   ├── components/        # React components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── stores/            # Zustand stores
│   ├── App.tsx            # Main App component
│   └── main.tsx           # Entry point
├── .env                   # Environment variables
└── package.json           # Project dependencies
```

## License

This project is licensed under the MIT License.
