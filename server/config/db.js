import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection
export const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// MySQL connection with Sequelize
export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export const connectMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected');
    
    // Sync all models
    // Note: In production, you would use migrations instead
    await sequelize.sync({ alter: true });
    console.log('MySQL models synchronized');
    
    return sequelize;
  } catch (error) {
    console.error(`Error connecting to MySQL: ${error.message}`);
    process.exit(1);
  }
};

// Connect to both databases
export const connectDatabases = async () => {
  try {
    const mongoConn = await connectMongoDB();
    const mysqlConn = await connectMySQL();
    
    return { mongoConn, mysqlConn };
  } catch (error) {
    console.error(`Error connecting to databases: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabases;
