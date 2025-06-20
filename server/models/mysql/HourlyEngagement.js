import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';
import Analytics from './Analytics.js';

const HourlyEngagement = sequelize.define('HourlyEngagement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  analyticsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Analytics,
      key: 'id'
    }
  },
  hour: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 23
    }
  },
  engagementValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['analyticsId', 'hour']
    }
  ]
});

// Define associations
Analytics.hasMany(HourlyEngagement, { foreignKey: 'analyticsId' });
HourlyEngagement.belongsTo(Analytics, { foreignKey: 'analyticsId' });

export default HourlyEngagement;
