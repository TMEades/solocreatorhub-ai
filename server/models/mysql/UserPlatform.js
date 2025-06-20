import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';
import User from './User.js';
import Platform from './Platform.js';

const UserPlatform = sequelize.define('UserPlatform', {
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
  accessToken: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tokenExpiresAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  connected: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'platformId']
    }
  ]
});

// Define associations
User.hasMany(UserPlatform, { foreignKey: 'userId' });
UserPlatform.belongsTo(User, { foreignKey: 'userId' });

Platform.hasMany(UserPlatform, { foreignKey: 'platformId' });
UserPlatform.belongsTo(Platform, { foreignKey: 'platformId' });

export default UserPlatform;
