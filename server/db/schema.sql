-- This file represents the MySQL database schema for the SocialSync application
-- In a real application, this would be used to initialize the database

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Platforms table
CREATE TABLE platforms (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(255) NOT NULL
);

-- User platform connections
CREATE TABLE user_platforms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  platform_id VARCHAR(50) NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP,
  connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (platform_id) REFERENCES platforms(id) ON DELETE CASCADE,
  UNIQUE KEY user_platform (user_id, platform_id)
);

-- Posts table
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  scheduled_for TIMESTAMP NULL,
  status ENUM('draft', 'scheduled', 'published', 'failed') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Post platforms
CREATE TABLE post_platforms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  platform_id VARCHAR(50) NOT NULL,
  platform_post_id VARCHAR(255),
  status ENUM('pending', 'published', 'failed') DEFAULT 'pending',
  published_at TIMESTAMP NULL,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (platform_id) REFERENCES platforms(id) ON DELETE CASCADE
);

-- Post media
CREATE TABLE post_media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  media_type ENUM('image', 'video') NOT NULL,
  media_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- Post hashtags
CREATE TABLE post_hashtags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  hashtag VARCHAR(255) NOT NULL,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- Trending hashtags
CREATE TABLE trending_hashtags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  platform_id VARCHAR(50) NOT NULL,
  hashtag VARCHAR(255) NOT NULL,
  popularity INT NOT NULL,
  fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (platform_id) REFERENCES platforms(id) ON DELETE CASCADE
);

-- Insert default platforms
INSERT INTO platforms (id, name, icon) VALUES
('instagram', 'Instagram', 'instagram.svg'),
('instagram_reels', 'Instagram Reels', 'instagram.svg'),
('facebook', 'Facebook', 'facebook.svg'),
('tiktok', 'TikTok', 'tiktok.svg'),
('youtube', 'YouTube', 'youtube.svg'),
('youtube_shorts', 'YouTube Shorts', 'youtube.svg'),
('linkedin', 'LinkedIn', 'linkedin.svg');
