import { sequelize } from '../config/db.js';
import { 
  Analytics, 
  HourlyEngagement, 
  Platform 
} from '../models/mysql/index.js';
import { Op } from 'sequelize';

// @desc    Get analytics data for a user
// @route   GET /api/analytics
// @access  Private
export const getAnalytics = async (req, res) => {
  try {
    const { platform, startDate, endDate } = req.query;
    
    // Build query
    const where = { userId: req.user.id };
    
    if (platform) {
      where.platformId = platform;
    }
    
    if (startDate || endDate) {
      where.date = {};
      
      if (startDate) {
        where.date[Op.gte] = new Date(startDate);
      }
      
      if (endDate) {
        where.date[Op.lte] = new Date(endDate);
      }
    }
    
    // Get analytics data with hourly engagement
    const analytics = await Analytics.findAll({
      where,
      include: [
        { model: HourlyEngagement },
        { model: Platform }
      ],
      order: [['date', 'ASC']]
    });
    
    // Format response
    const formattedAnalytics = analytics.map(analytic => {
      // Convert hourly engagement to map format
      const hourlyEngagement = {};
      analytic.HourlyEngagements.forEach(he => {
        hourlyEngagement[he.hour] = he.engagementValue;
      });
      
      return {
        _id: analytic.id,
        platform: analytic.platformId,
        date: analytic.date,
        engagementRate: analytic.engagementRate,
        impressions: analytic.impressions,
        reach: analytic.reach,
        followers: analytic.followers,
        likes: analytic.likes,
        comments: analytic.comments,
        shares: analytic.shares,
        hourlyEngagement,
        platformName: analytic.Platform ? analytic.Platform.name : null
      };
    });
    
    res.json(formattedAnalytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get optimal posting times
// @route   GET /api/analytics/optimal-times
// @access  Private
export const getOptimalTimes = async (req, res) => {
  try {
    const { platforms } = req.query;
    
    if (!platforms) {
      return res.status(400).json({ message: 'Platforms are required' });
    }
    
    const platformList = platforms.split(',');
    const result = {};
    
    // Get the last 30 days of data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    for (const platform of platformList) {
      // Get analytics records for this platform
      const analytics = await Analytics.findAll({
        where: {
          userId: req.user.id,
          platformId: platform,
          date: { [Op.gte]: thirtyDaysAgo }
        },
        include: [{ model: HourlyEngagement }]
      });
      
      // Aggregate hourly engagement data
      const hourlyEngagement = {};
      
      analytics.forEach(analytic => {
        analytic.HourlyEngagements.forEach(he => {
          if (!hourlyEngagement[he.hour]) {
            hourlyEngagement[he.hour] = [];
          }
          hourlyEngagement[he.hour].push(he.engagementValue);
        });
      });
      
      // Calculate average engagement for each hour
      const averageEngagement = {};
      
      Object.keys(hourlyEngagement).forEach(hour => {
        const values = hourlyEngagement[hour];
        const average = values.reduce((sum, val) => sum + val, 0) / values.length;
        averageEngagement[hour] = average;
      });
      
      // Find the top 4 hours with highest engagement
      const sortedHours = Object.keys(averageEngagement)
        .sort((a, b) => averageEngagement[b] - averageEngagement[a])
        .slice(0, 4);
      
      // Format hours as HH:MM
      const formattedTimes = sortedHours.map(hour => {
        const hourNum = parseInt(hour);
        const minutes = Math.floor(Math.random() * 4) * 15; // Random minutes: 0, 15, 30, or 45
        return `${hourNum.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      });
      
      result[platform] = formattedTimes;
    }
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Initialize analytics data (for demo purposes)
// @route   Not exposed in API
// @access  Admin only
export const initializeAnalyticsData = async (userId) => {
  try {
    const count = await Analytics.count({ where: { userId } });
    
    if (count > 0) {
      return; // Already initialized
    }
    
    const platforms = [
      'instagram',
      'facebook',
      'tiktok',
      'youtube',
      'linkedin'
    ];
    
    const transaction = await sequelize.transaction();
    
    try {
      // Generate 90 days of data for each platform
      const now = new Date();
      
      for (let i = 0; i < 90; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        for (const platform of platforms) {
          // Generate random metrics
          const engagementRate = 2 + Math.random() * 8; // 2-10%
          const impressions = 1000 + Math.floor(Math.random() * 9000); // 1000-10000
          const reach = impressions * (0.6 + Math.random() * 0.3); // 60-90% of impressions
          const followers = 500 + i * 5 + Math.floor(Math.random() * 20); // Growing over time
          const likes = Math.floor(reach * (0.05 + Math.random() * 0.15)); // 5-20% of reach
          const comments = Math.floor(likes * (0.05 + Math.random() * 0.1)); // 5-15% of likes
          const shares = Math.floor(likes * (0.02 + Math.random() * 0.08)); // 2-10% of likes
          
          // Create analytics record
          const analytics = await Analytics.create({
            userId,
            platformId: platform,
            date,
            engagementRate,
            impressions,
            reach,
            followers,
            likes,
            comments,
            shares
          }, { transaction });
          
          // Generate hourly engagement data
          for (let hour = 0; hour < 24; hour++) {
            // Create a pattern where engagement is higher during certain hours
            // based on the platform
            let baseEngagement = 0;
            
            if (platform === 'instagram') {
              // Instagram: peaks in morning and evening
              baseEngagement = hour >= 7 && hour <= 9 ? 80 : 
                              hour >= 17 && hour <= 21 ? 90 : 50;
            } else if (platform === 'facebook') {
              // Facebook: peaks mid-day and evening
              baseEngagement = hour >= 11 && hour <= 13 ? 85 : 
                              hour >= 19 && hour <= 22 ? 75 : 45;
            } else if (platform === 'tiktok') {
              // TikTok: peaks in evening
              baseEngagement = hour >= 18 && hour <= 23 ? 95 : 
                              hour >= 12 && hour <= 15 ? 70 : 40;
            } else if (platform === 'youtube') {
              // YouTube: peaks in evening
              baseEngagement = hour >= 17 && hour <= 22 ? 90 : 
                              hour >= 12 && hour <= 16 ? 65 : 35;
            } else {
              // LinkedIn: peaks during business hours
              baseEngagement = hour >= 8 && hour <= 11 ? 85 : 
                              hour >= 16 && hour <= 18 ? 80 : 30;
            }
            
            // Add some randomness
            const engagement = baseEngagement + Math.floor(Math.random() * 20) - 10;
            
            await HourlyEngagement.create({
              analyticsId: analytics.id,
              hour,
              engagementValue: engagement
            }, { transaction });
          }
        }
      }
      
      await transaction.commit();
      console.log(`Analytics data initialized for user ${userId}`);
    } catch (error) {
      await transaction.rollback();
      console.error('Error in transaction:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error initializing analytics data:', error);
  }
};
