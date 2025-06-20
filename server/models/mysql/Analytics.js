import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';
import User from './User.js';
import Platform from './Platform.js';

const Analytics = sequelize.define('Analytics', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  platformId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Platform,
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  engagementRate: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  impressions: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  reach: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  followers: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  comments: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  shares: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'platformId', 'date']
    },
    {
      fields: ['userId', 'platformId']
    },
    {
      fields: ['date']
    }
  ]
});

// Define associations
User.hasMany(Analytics, { foreignKey: 'userId' });
Analytics.belongsTo(User, { foreignKey: 'userId' });

Platform.hasMany(Analytics, { foreignKey: 'platformId' });
Analytics.belongsTo(Platform, { foreignKey: 'platformId' });

export default Analytics;
