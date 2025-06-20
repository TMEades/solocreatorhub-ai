import { Platform, UserPlatform } from '../models/mysql/index.js';
import { Op } from 'sequelize';

// @desc    Get all platforms
// @route   GET /api/platforms
// @access  Private
export const getPlatforms = async (req, res) => {
  try {
    const platforms = await Platform.findAll({
      order: [['name', 'ASC']]
    });
    
    // Get user's connected platforms
    const userPlatforms = await UserPlatform.findAll({
      where: { userId: req.user.id }
    });
    
    const connectedPlatformIds = userPlatforms.map(up => up.platformId);
    
    // Format response with connection status
    const formattedPlatforms = platforms.map(platform => ({
      id: platform.id,
      name: platform.name,
      icon: platform.icon,
      connected: connectedPlatformIds.includes(platform.id)
    }));
    
    res.json(formattedPlatforms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Connect a platform
// @route   POST /api/platforms/connect
// @access  Private
export const connectPlatform = async (req, res) => {
  try {
    const { platformId, accessToken, refreshToken, tokenExpiresAt } = req.body;
    
    // Check if platform exists
    const platform = await Platform.findByPk(platformId);
    if (!platform) {
      return res.status(404).json({ message: 'Platform not found' });
    }
    
    // Check if already connected
    let userPlatform = await UserPlatform.findOne({
      where: {
        userId: req.user.id,
        platformId
      }
    });
    
    if (userPlatform) {
      // Update existing connection
      userPlatform.accessToken = accessToken;
      if (refreshToken) userPlatform.refreshToken = refreshToken;
      if (tokenExpiresAt) userPlatform.tokenExpiresAt = tokenExpiresAt;
      userPlatform.connected = true;
      
      await userPlatform.save();
    } else {
      // Create new connection
      userPlatform = await UserPlatform.create({
        userId: req.user.id,
        platformId,
        accessToken,
        refreshToken,
        tokenExpiresAt,
        connected: true
      });
    }
    
    res.status(201).json({
      id: platform.id,
      name: platform.name,
      icon: platform.icon,
      connected: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Disconnect a platform
// @route   POST /api/platforms/disconnect
// @access  Private
export const disconnectPlatform = async (req, res) => {
  try {
    const { platformId } = req.body;
    
    // Find and update the connection
    const userPlatform = await UserPlatform.findOne({
      where: {
        userId: req.user.id,
        platformId
      }
    });
    
    if (!userPlatform) {
      return res.status(404).json({ message: 'Platform connection not found' });
    }
    
    // Option 1: Delete the connection
    await userPlatform.destroy();
    
    // Option 2: Mark as disconnected but keep tokens
    // userPlatform.connected = false;
    // await userPlatform.save();
    
    res.json({ message: 'Platform disconnected successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Initialize default platforms
// @route   POST /api/platforms/init
// @access  Admin only (not exposed in API)
export const initializePlatforms = async () => {
  try {
    const defaultPlatforms = [
      { id: 'instagram', name: 'Instagram', icon: 'instagram.svg' },
      { id: 'instagram_reels', name: 'Instagram Reels', icon: 'instagram.svg' },
      { id: 'facebook', name: 'Facebook', icon: 'facebook.svg' },
      { id: 'tiktok', name: 'TikTok', icon: 'tiktok.svg' },
      { id: 'youtube', name: 'YouTube', icon: 'youtube.svg' },
      { id: 'youtube_shorts', name: 'YouTube Shorts', icon: 'youtube.svg' },
      { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin.svg' }
    ];
    
    // Check if platforms already exist
    const count = await Platform.count();
    
    if (count === 0) {
      for (const platform of defaultPlatforms) {
        await Platform.findOrCreate({
          where: { id: platform.id },
          defaults: platform
        });
      }
      console.log('Default platforms initialized');
    }
  } catch (error) {
    console.error('Error initializing platforms:', error);
  }
};
