import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';
import Platform from './Platform.js';

const TrendingHashtag = sequelize.define('TrendingHashtag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  platformId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Platform,
      key: 'id'
    }
  },
  hashtag: {
    type: DataTypes.STRING,
    allowNull: false
  },
  popularity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['platformId', 'hashtag']
    },
    {
      fields: ['platformId', 'popularity']
    }
  ]
});

// Define associations
Platform.hasMany(TrendingHashtag, { foreignKey: 'platformId' });
TrendingHashtag.belongsTo(Platform, { foreignKey: 'platformId' });

export default TrendingHashtag;
