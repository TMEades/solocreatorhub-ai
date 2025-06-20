import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';
import User from './User.js';

const ScheduledPost = sequelize.define('ScheduledPost', {
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
  mongoPostId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  scheduledFor: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'processing', 'published', 'failed'),
    defaultValue: 'scheduled'
  },
  isRecurring: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  recurringParentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'ScheduledPosts',
      key: 'id'
    }
  },
  nextOccurrenceId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['userId']
    },
    {
      fields: ['scheduledFor']
    },
    {
      fields: ['status']
    },
    {
      fields: ['mongoPostId']
    }
  ]
});

// Define associations
User.hasMany(ScheduledPost, { foreignKey: 'userId' });
ScheduledPost.belongsTo(User, { foreignKey: 'userId' });

// Self-reference for recurring posts
ScheduledPost.hasOne(ScheduledPost, { 
  as: 'nextOccurrence', 
  foreignKey: 'recurringParentId' 
});
ScheduledPost.belongsTo(ScheduledPost, { 
  as: 'recurringParent', 
  foreignKey: 'recurringParentId' 
});

export default ScheduledPost;
