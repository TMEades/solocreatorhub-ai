import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';
import mysql from 'mysql2/promise';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Database connections
let mysqlConnection;
const initDatabases = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/solecreatorhub', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
    
    // Connect to MySQL
    mysqlConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'password',
      database: process.env.DB_NAME || 'solecreatorhub'
    });
    console.log('MySQL connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database middleware
app.use((req, res, next) => {
  req.db = {
    mysql: mysqlConnection,
    mongodb: mongoose
  };
  next();
});

// Serve static files from the React app
app.use(express.static(join(__dirname, '../dist')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'SoleCreatorHub AI server is running',
    databases: {
      mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      mysql: mysqlConnection ? 'connected' : 'disconnected'
    }
  });
});

// Database sync route - example of hybrid database usage
app.post('/api/sync', async (req, res) => {
  try {
    // Example: Get user data from MySQL (structured data)
    const [users] = await req.db.mysql.execute('SELECT id, username, email FROM users');
    
    // Example: Get content data from MongoDB (unstructured/flexible data)
    const posts = await mongoose.model('Post').find({}).limit(10);
    
    res.json({
      success: true,
      data: {
        users,
        posts
      }
    });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Fallback route - Send the React app
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

// Start server
initDatabases().then(() => {
  app.listen(PORT, () => {
    console.log(`SoleCreatorHub AI server running on port ${PORT}`);
  });
});
