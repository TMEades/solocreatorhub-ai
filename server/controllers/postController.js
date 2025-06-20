import { sequelize } from '../config/db.js';
import { 
  ScheduledPost, 
  RecurrencePattern, 
  TrendingHashtag, 
  User 
} from '../models/mysql/index.js';
import { Post } from '../models/mongodb/index.js';
import { Op } from 'sequelize';

// Helper function to calculate next occurrence
const calculateNextOccurrence = (lastDate, recurrence) => {
  if (!recurrence || !recurrence.frequency) {
    return null;
  }
  
  const baseDate = new Date(lastDate);
  const now = new Date();
  let nextDate = new Date(baseDate);
  
  // If the last occurrence is in the future, that's our next occurrence
  if (nextDate > now) {
    return nextDate;
  }
  
  if (recurrence.frequency === 'daily') {
    // Add days based on interval
    nextDate.setDate(baseDate.getDate() + recurrence.interval);
    
    // If the calculated date is still in the past, keep adding intervals until we get a future date
    while (nextDate < now) {
      nextDate.setDate(nextDate.getDate() + recurrence.interval);
    }
  } else if (recurrence.frequency === 'weekly') {
    // Get the weekdays to post on
    const weekdays = recurrence.weekdays || [baseDate.getDay()];
    
    // Start from tomorrow
    nextDate = new Date(now);
    nextDate.setDate(nextDate.getDate() + 1);
    
    // Find the next valid weekday
    let found = false;
    for (let i = 0; i < 7 * recurrence.interval && !found; i++) {
      if (weekdays.includes(nextDate.getDay())) {
        found = true;
      } else {
        nextDate.setDate(nextDate.getDate() + 1);
      }
    }
  } else if (recurrence.frequency === 'monthly') {
    // Get the day of month to post on
    const monthDay = recurrence.monthDay || baseDate.getDate();
    
    // Start with the same day in the current month
    nextDate = new Date(now.getFullYear(), now.getMonth(), monthDay);
    
    // If that date is in the past, move to next month
    if (nextDate < now) {
      nextDate.setMonth(nextDate.getMonth() + recurrence.interval);
    }
    
    // Adjust for months with fewer days
    while (nextDate.getDate() !== monthDay) {
      nextDate = new Date(nextDate.getFullYear(), nextDate.getMonth(), 0); // Last day of previous month
      nextDate.setDate(Math.min(monthDay, nextDate.getDate()));
      nextDate.setMonth(nextDate.getMonth() + 1);
    }
  }
  
  // Check if we've reached the end condition
  if (recurrence.endType === 'on' && recurrence.endDate) {
    const endDate = new Date(recurrence.endDate);
    if (nextDate > endDate) {
      return null; // No more occurrences
    }
  } else if (recurrence.endType === 'after' && recurrence.endAfterOccurrences) {
    if (recurrence.occurrencesCount >= recurrence.endAfterOccurrences) {
      return null; // No more occurrences
    }
  }
  
  // Set the time to match the original time
  nextDate.setHours(
    baseDate.getHours(),
    baseDate.getMinutes(),
    baseDate.getSeconds(),
    baseDate.getMilliseconds()
  );
  
  return nextDate;
};

// @desc    Get all posts for a user
// @route   GET /api/posts
// @access  Private
export const getPosts = async (req, res) => {
  try {
    const { status, platform, page = 1, limit = 20 } = req.query;
    
    // Build query
    const query = { userId: req.user.id };
    
    if (status) {
      query.status = status;
    }
    
    if (platform) {
      query.platforms = platform;
    }
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Get posts from MongoDB
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await Post.countDocuments(query);
    
    // If posts have scheduledPostId, get the scheduling details from MySQL
    const scheduledPostIds = posts
      .filter(post => post.scheduledPostId)
      .map(post => post.scheduledPostId);
    
    let scheduledPosts = [];
    let recurrencePatterns = [];
    
    if (scheduledPostIds.length > 0) {
      scheduledPosts = await ScheduledPost.findAll({
        where: { id: { [Op.in]: scheduledPostIds } },
        include: [{ model: RecurrencePattern }]
      });
    }
    
    // Map scheduled details to posts
    const postsWithScheduleDetails = posts.map(post => {
      const postObj = post.toObject();
      
      if (post.scheduledPostId) {
        const scheduledPost = scheduledPosts.find(sp => sp.id === post.scheduledPostId);
        
        if (scheduledPost) {
          postObj.scheduledFor = scheduledPost.scheduledFor;
          
          if (scheduledPost.RecurrencePattern) {
            postObj.recurrence = {
              enabled: true,
              frequency: scheduledPost.RecurrencePattern.frequency,
              interval: scheduledPost.RecurrencePattern.interval,
              weekdays: scheduledPost.RecurrencePattern.weekdays,
              monthDay: scheduledPost.RecurrencePattern.monthDay,
              endDate: scheduledPost.RecurrencePattern.endDate,
              endAfterOccurrences: scheduledPost.RecurrencePattern.endAfterOccurrences,
              endType: scheduledPost.RecurrencePattern.endType
            };
            
            // If there's a next occurrence scheduled
            if (scheduledPost.nextOccurrenceId) {
              const nextOccurrence = scheduledPosts.find(sp => sp.id === scheduledPost.nextOccurrenceId);
              if (nextOccurrence) {
                postObj.nextOccurrence = nextOccurrence.scheduledFor;
              }
            }
          }
        }
      }
      
      return postObj;
    });
    
    res.json({
      posts: postsWithScheduleDetails,
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single post
// @route   GET /api/posts/:id
// @access  Private
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Get scheduling details if available
    let postObj = post.toObject();
    
    if (post.scheduledPostId) {
      const scheduledPost = await ScheduledPost.findByPk(post.scheduledPostId, {
        include: [{ model: RecurrencePattern }]
      });
      
      if (scheduledPost) {
        postObj.scheduledFor = scheduledPost.scheduledFor;
        
        if (scheduledPost.RecurrencePattern) {
          postObj.recurrence = {
            enabled: true,
            frequency: scheduledPost.RecurrencePattern.frequency,
            interval: scheduledPost.RecurrencePattern.interval,
            weekdays: scheduledPost.RecurrencePattern.weekdays,
            monthDay: scheduledPost.RecurrencePattern.monthDay,
            endDate: scheduledPost.RecurrencePattern.endDate,
            endAfterOccurrences: scheduledPost.RecurrencePattern.endAfterOccurrences,
            endType: scheduledPost.RecurrencePattern.endType
          };
          
          // If there's a next occurrence scheduled
          if (scheduledPost.nextOccurrenceId) {
            const nextOccurrence = await ScheduledPost.findByPk(scheduledPost.nextOccurrenceId);
            if (nextOccurrence) {
              postObj.nextOccurrence = nextOccurrence.scheduledFor;
            }
          }
        }
      }
    }
    
    res.json(postObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const {
      content,
      platforms,
      hashtags,
      mediaUrls,
      scheduledFor,
      recurrence
    } = req.body;
    
    // Validate required fields
    if (!content || !platforms || platforms.length === 0) {
      return res.status(400).json({ message: 'Content and at least one platform are required' });
    }
    
    // Determine post status
    let status = 'draft';
    if (scheduledFor) {
      status = 'scheduled';
    }
    
    // Create post in MongoDB
    const post = new Post({
      userId: req.user.id,
      content,
      platforms,
      hashtags: hashtags || [],
      mediaUrls: mediaUrls || [],
      status
    });
    
    await post.save();
    
    // If scheduled, create a record in MySQL
    if (scheduledFor) {
      const scheduledDate = new Date(scheduledFor);
      
      const scheduledPost = await ScheduledPost.create({
        userId: req.user.id,
        mongoPostId: post._id.toString(),
        scheduledFor: scheduledDate,
        status: 'scheduled',
        isRecurring: recurrence && recurrence.enabled
      }, { transaction });
      
      // Update the MongoDB post with the scheduledPostId
      post.scheduledPostId = scheduledPost.id;
      await post.save();
      
      // If recurring, create recurrence pattern
      if (recurrence && recurrence.enabled) {
        await RecurrencePattern.create({
          scheduledPostId: scheduledPost.id,
          frequency: recurrence.frequency,
          interval: recurrence.interval || 1,
          weekdays: recurrence.weekdays,
          monthDay: recurrence.monthDay,
          endDate: recurrence.endDate,
          endAfterOccurrences: recurrence.endAfterOccurrences,
          endType: recurrence.endType || 'never',
          occurrencesCount: 0
        }, { transaction });
        
        // Calculate and schedule the next occurrence
        const nextOccurrenceDate = calculateNextOccurrence(scheduledDate, recurrence);
        
        if (nextOccurrenceDate) {
          const nextOccurrence = await ScheduledPost.create({
            userId: req.user.id,
            mongoPostId: post._id.toString(),
            scheduledFor: nextOccurrenceDate,
            status: 'scheduled',
            isRecurring: true,
            recurringParentId: scheduledPost.id
          }, { transaction });
          
          // Update the parent with the next occurrence ID
          scheduledPost.nextOccurrenceId = nextOccurrence.id;
          await scheduledPost.save({ transaction });
        }
      }
    }
    
    await transaction.commit();
    
    // Return the post with scheduling details
    const postObj = post.toObject();
    
    if (scheduledFor) {
      postObj.scheduledFor = scheduledFor;
      
      if (recurrence && recurrence.enabled) {
        postObj.recurrence = recurrence;
        
        // Calculate next occurrence for the response
        const nextOccurrenceDate = calculateNextOccurrence(scheduledFor, recurrence);
        if (nextOccurrenceDate) {
          postObj.nextOccurrence = nextOccurrenceDate;
        }
      }
    }
    
    res.status(201).json(postObj);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Don't allow updates to published posts
    if (post.status === 'published') {
      return res.status(400).json({ message: 'Cannot update a published post' });
    }
    
    const {
      content,
      platforms,
      hashtags,
      mediaUrls,
      scheduledFor,
      recurrence
    } = req.body;
    
    // Update MongoDB post
    if (content) post.content = content;
    if (platforms) post.platforms = platforms;
    if (hashtags) post.hashtags = hashtags;
    if (mediaUrls) post.mediaUrls = mediaUrls;
    
    // Handle scheduling changes
    if (scheduledFor) {
      const scheduledDate = new Date(scheduledFor);
      
      // If already scheduled, update the scheduled post
      if (post.scheduledPostId) {
        const scheduledPost = await ScheduledPost.findByPk(post.scheduledPostId, {
          include: [{ model: RecurrencePattern }],
          transaction
        });
        
        if (scheduledPost) {
          scheduledPost.scheduledFor = scheduledDate;
          await scheduledPost.save({ transaction });
          
          // Update recurrence if provided
          if (recurrence) {
            if (scheduledPost.RecurrencePattern) {
              // Update existing recurrence pattern
              const pattern = scheduledPost.RecurrencePattern;
              pattern.frequency = recurrence.frequency;
              pattern.interval = recurrence.interval || 1;
              pattern.weekdays = recurrence.weekdays;
              pattern.monthDay = recurrence.monthDay;
              pattern.endDate = recurrence.endDate;
              pattern.endAfterOccurrences = recurrence.endAfterOccurrences;
              pattern.endType = recurrence.endType || 'never';
              
              await pattern.save({ transaction });
            } else if (recurrence.enabled) {
              // Create new recurrence pattern
              await RecurrencePattern.create({
                scheduledPostId: scheduledPost.id,
                frequency: recurrence.frequency,
                interval: recurrence.interval || 1,
                weekdays: recurrence.weekdays,
                monthDay: recurrence.monthDay,
                endDate: recurrence.endDate,
                endAfterOccurrences: recurrence.endAfterOccurrences,
                endType: recurrence.endType || 'never',
                occurrencesCount: 0
              }, { transaction });
              
              scheduledPost.isRecurring = true;
              await scheduledPost.save({ transaction });
            }
            
            // If recurrence is disabled, remove pattern
            if (!recurrence.enabled && scheduledPost.RecurrencePattern) {
              await scheduledPost.RecurrencePattern.destroy({ transaction });
              scheduledPost.isRecurring = false;
              await scheduledPost.save({ transaction });
            }
            
            // Update next occurrence if needed
            if (recurrence.enabled) {
              // Delete any existing next occurrence
              if (scheduledPost.nextOccurrenceId) {
                await ScheduledPost.destroy({
                  where: { id: scheduledPost.nextOccurrenceId },
                  transaction
                });
                scheduledPost.nextOccurrenceId = null;
              }
              
              // Calculate and schedule the next occurrence
              const nextOccurrenceDate = calculateNextOccurrence(scheduledDate, recurrence);
              
              if (nextOccurrenceDate) {
                const nextOccurrence = await ScheduledPost.create({
                  userId: req.user.id,
                  mongoPostId: post._id.toString(),
                  scheduledFor: nextOccurrenceDate,
                  status: 'scheduled',
                  isRecurring: true,
                  recurringParentId: scheduledPost.id
                }, { transaction });
                
                scheduledPost.nextOccurrenceId = nextOccurrence.id;
                await scheduledPost.save({ transaction });
              }
            }
          }
        }
      } else {
        // Create new scheduled post
        const scheduledPost = await ScheduledPost.create({
          userId: req.user.id,
          mongoPostId: post._id.toString(),
          scheduledFor: scheduledDate,
          status: 'scheduled',
          isRecurring: recurrence && recurrence.enabled
        }, { transaction });
        
        post.scheduledPostId = scheduledPost.id;
        post.status = 'scheduled';
        
        // If recurring, create recurrence pattern
        if (recurrence && recurrence.enabled) {
          await RecurrencePattern.create({
            scheduledPostId: scheduledPost.id,
            frequency: recurrence.frequency,
            interval: recurrence.interval || 1,
            weekdays: recurrence.weekdays,
            monthDay: recurrence.monthDay,
            endDate: recurrence.endDate,
            endAfterOccurrences: recurrence.endAfterOccurrences,
            endType: recurrence.endType || 'never',
            occurrencesCount: 0
          }, { transaction });
          
          // Calculate and schedule the next occurrence
          const nextOccurrenceDate = calculateNextOccurrence(scheduledDate, recurrence);
          
          if (nextOccurrenceDate) {
            const nextOccurrence = await ScheduledPost.create({
              userId: req.user.id,
              mongoPostId: post._id.toString(),
              scheduledFor: nextOccurrenceDate,
              status: 'scheduled',
              isRecurring: true,
              recurringParentId: scheduledPost.id
            }, { transaction });
            
            scheduledPost.nextOccurrenceId = nextOccurrence.id;
            await scheduledPost.save({ transaction });
          }
        }
      }
    }
    
    await post.save();
    await transaction.commit();
    
    // Return the updated post with scheduling details
    const updatedPost = await Post.findById(post._id);
    let postObj = updatedPost.toObject();
    
    if (updatedPost.scheduledPostId) {
      const scheduledPost = await ScheduledPost.findByPk(updatedPost.scheduledPostId, {
        include: [{ model: RecurrencePattern }]
      });
      
      if (scheduledPost) {
        postObj.scheduledFor = scheduledPost.scheduledFor;
        
        if (scheduledPost.RecurrencePattern) {
          postObj.recurrence = {
            enabled: true,
            frequency: scheduledPost.RecurrencePattern.frequency,
            interval: scheduledPost.RecurrencePattern.interval,
            weekdays: scheduledPost.RecurrencePattern.weekdays,
            monthDay: scheduledPost.RecurrencePattern.monthDay,
            endDate: scheduledPost.RecurrencePattern.endDate,
            endAfterOccurrences: scheduledPost.RecurrencePattern.endAfterOccurrences,
            endType: scheduledPost.RecurrencePattern.endType
          };
          
          // If there's a next occurrence scheduled
          if (scheduledPost.nextOccurrenceId) {
            const nextOccurrence = await ScheduledPost.findByPk(scheduledPost.nextOccurrenceId);
            if (nextOccurrence) {
              postObj.nextOccurrence = nextOccurrence.scheduledFor;
            }
          }
        }
      }
    }
    
    res.json(postObj);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // If scheduled, delete all related MySQL records
    if (post.scheduledPostId) {
      // Find the scheduled post
      const scheduledPost = await ScheduledPost.findByPk(post.scheduledPostId, {
        transaction
      });
      
      if (scheduledPost) {
        // Delete recurrence pattern if exists
        await RecurrencePattern.destroy({
          where: { scheduledPostId: scheduledPost.id },
          transaction
        });
        
        // Delete all related occurrences
        if (scheduledPost.isRecurring) {
          await ScheduledPost.destroy({
            where: { 
              [Op.or]: [
                { recurringParentId: scheduledPost.id },
                { id: scheduledPost.id }
              ]
            },
            transaction
          });
        } else {
          // Delete just this scheduled post
          await scheduledPost.destroy({ transaction });
        }
      }
    }
    
    // Delete the MongoDB post
    await post.deleteOne();
    
    await transaction.commit();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get trending hashtags for a platform
// @route   GET /api/hashtags/trending
// @access  Private
export const getTrendingHashtags = async (req, res) => {
  try {
    const { platform } = req.query;
    
    if (!platform) {
      return res.status(400).json({ message: 'Platform is required' });
    }
    
    const hashtags = await TrendingHashtag.findAll({
      where: { platformId: platform },
      order: [['popularity', 'DESC']],
      limit: 20
    });
    
    // Format response
    const formattedHashtags = hashtags.map(hashtag => ({
      _id: hashtag.id,
      platform: hashtag.platformId,
      hashtag: hashtag.hashtag,
      popularity: hashtag.popularity
    }));
    
    res.json(formattedHashtags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Initialize trending hashtags (for demo purposes)
// @route   Not exposed in API
// @access  Admin only
export const initializeTrendingHashtags = async () => {
  try {
    const count = await TrendingHashtag.count();
    
    if (count > 0) {
      return; // Already initialized
    }
    
    const platforms = [
      'instagram',
      'instagram_reels',
      'facebook',
      'tiktok',
      'youtube',
      'youtube_shorts',
      'linkedin'
    ];
    
    const hashtagsByPlatform = {
      instagram: [
        { hashtag: '#photography', popularity: 95 },
        { hashtag: '#instagood', popularity: 92 },
        { hashtag: '#fashion', popularity: 88 },
        { hashtag: '#photooftheday', popularity: 85 },
        { hashtag: '#art', popularity: 82 },
        { hashtag: '#beautiful', popularity: 80 },
        { hashtag: '#nature', popularity: 78 },
        { hashtag: '#happy', popularity: 75 },
        { hashtag: '#travel', popularity: 72 },
        { hashtag: '#picoftheday', popularity: 70 }
      ],
      instagram_reels: [
        { hashtag: '#reels', popularity: 95 },
        { hashtag: '#reelsinstagram', popularity: 92 },
        { hashtag: '#reelsvideo', popularity: 88 },
        { hashtag: '#reelitfeelit', popularity: 85 },
        { hashtag: '#reelkarofeelkaro', popularity: 82 },
        { hashtag: '#instareels', popularity: 80 },
        { hashtag: '#reelsindia', popularity: 78 },
        { hashtag: '#trending', popularity: 75 },
        { hashtag: '#viral', popularity: 72 },
        { hashtag: '#dance', popularity: 70 }
      ],
      facebook: [
        { hashtag: '#throwbackthursday', popularity: 95 },
        { hashtag: '#motivationmonday', popularity: 92 },
        { hashtag: '#wcw', popularity: 88 },
        { hashtag: '#mcm', popularity: 85 },
        { hashtag: '#tbt', popularity: 82 },
        { hashtag: '#fbf', popularity: 80 },
        { hashtag: '#fridayfeeling', popularity: 78 },
        { hashtag: '#sundayfunday', popularity: 75 },
        { hashtag: '#mondaymotivation', popularity: 72 },
        { hashtag: '#tuesdaythoughts', popularity: 70 }
      ],
      tiktok: [
        { hashtag: '#fyp', popularity: 95 },
        { hashtag: '#foryoupage', popularity: 92 },
        { hashtag: '#tiktok', popularity: 88 },
        { hashtag: '#viral', popularity: 85 },
        { hashtag: '#trending', popularity: 82 },
        { hashtag: '#duet', popularity: 80 },
        { hashtag: '#comedy', popularity: 78 },
        { hashtag: '#dance', popularity: 75 },
        { hashtag: '#funny', popularity: 72 },
        { hashtag: '#stitch', popularity: 70 }
      ],
      youtube: [
        { hashtag: '#tutorial', popularity: 95 },
        { hashtag: '#vlog', popularity: 92 },
        { hashtag: '#review', popularity: 88 },
        { hashtag: '#gaming', popularity: 85 },
        { hashtag: '#howto', popularity: 82 },
        { hashtag: '#music', popularity: 80 },
        { hashtag: '#unboxing', popularity: 78 },
        { hashtag: '#challenge', popularity: 75 },
        { hashtag: '#shorts', popularity: 72 },
        { hashtag: '#podcast', popularity: 70 }
      ],
      youtube_shorts: [
        { hashtag: '#shorts', popularity: 95 },
        { hashtag: '#youtubeshorts', popularity: 92 },
        { hashtag: '#shortvideo', popularity: 88 },
        { hashtag: '#viral', popularity: 85 },
        { hashtag: '#trending', popularity: 82 },
        { hashtag: '#shortsfeed', popularity: 80 },
        { hashtag: '#shortsyoutube', popularity: 78 },
        { hashtag: '#shortsvideo', popularity: 75 },
        { hashtag: '#shortsfeedvideo', popularity: 72 },
        { hashtag: '#shortsvideos', popularity: 70 }
      ],
      linkedin: [
        { hashtag: '#leadership', popularity: 95 },
        { hashtag: '#business', popularity: 92 },
        { hashtag: '#innovation', popularity: 88 },
        { hashtag: '#marketing', popularity: 85 },
        { hashtag: '#entrepreneurship', popularity: 82 },
        { hashtag: '#technology', popularity: 80 },
        { hashtag: '#management', popularity: 78 },
        { hashtag: '#hr', popularity: 75 },
        { hashtag: '#careers', popularity: 72 },
        { hashtag: '#jobsearch', popularity: 70 }
      ]
    };
    
    for (const platform of platforms) {
      const platformHashtags = hashtagsByPlatform[platform] || [];
      
      for (const { hashtag, popularity } of platformHashtags) {
        await TrendingHashtag.create({
          platformId: platform,
          hashtag,
          popularity
        });
      }
    }
    
    console.log('Trending hashtags initialized');
  } catch (error) {
    console.error('Error initializing trending hashtags:', error);
  }
};
