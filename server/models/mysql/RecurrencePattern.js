import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';
import ScheduledPost from './ScheduledPost.js';

const RecurrencePattern = sequelize.define('RecurrencePattern', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  scheduledPostId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ScheduledPost,
      key: 'id'
    }
  },
  frequency: {
    type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'custom'),
    allowNull: false
  },
  interval: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  weekdays: {
    type: DataTypes.JSON,
    allowNull: true,
    validate: {
      isValidWeekdays(value) {
        if (this.frequency === 'weekly' && (!value || value.length === 0)) {
          throw new Error('Weekdays are required for weekly recurrence');
        }
      }
    }
  },
  monthDay: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 31,
      isValidMonthDay(value) {
        if (this.frequency === 'monthly' && !value) {
          throw new Error('Month day is required for monthly recurrence');
        }
      }
    }
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endAfterOccurrences: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1
    }
  },
  endType: {
    type: DataTypes.ENUM('never', 'after', 'on'),
    defaultValue: 'never'
  },
  occurrencesCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true
});

// Define associations
ScheduledPost.hasOne(RecurrencePattern, { foreignKey: 'scheduledPostId' });
RecurrencePattern.belongsTo(ScheduledPost, { foreignKey: 'scheduledPostId' });

export default RecurrencePattern;
