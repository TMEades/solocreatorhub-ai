import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';

const Platform = sequelize.define('Platform', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

export default Platform;
