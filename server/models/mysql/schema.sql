-- MySQL Schema for SoleCreatorHub AI
-- This schema focuses on structured data like users, accounts, and relationships

-- Users table - for authentication and profile data
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  profile_image VARCHAR(255),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Social platforms table - platforms the app supports
CREATE TABLE IF NOT EXISTS platforms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  icon VARCHAR(255),
  api_version VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE
);

-- User platform connections - links users to their connected platforms
CREATE TABLE IF NOT EXISTS user_platforms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  platform_id INT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP,
  platform_user_id VARCHAR(100),
  platform_username VARCHAR(100),
  is_connected BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (platform_id) REFERENCES platforms(id) ON DELETE CASCADE
);

-- Teams table - for team management
CREATE TABLE IF NOT EXISTS teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  owner_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Team members - links users to teams
CREATE TABLE IF NOT EXISTS team_members (
  team_id INT NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  role ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (team_id, user_id),
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Subscription plans
CREATE TABLE IF NOT EXISTS plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  billing_cycle ENUM('monthly', 'yearly') DEFAULT 'monthly',
  features JSON,
  is_active BOOLEAN DEFAULT TRUE
);

-- User subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  plan_id INT NOT NULL,
  status ENUM('active', 'canceled', 'expired') DEFAULT 'active',
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES plans(id)
);

-- Insert default platforms
INSERT IGNORE INTO platforms (name, icon) VALUES
('Facebook', '/icons/facebook.svg'),
('Instagram', '/icons/instagram.svg'),
('Twitter', '/icons/twitter.svg'),
('LinkedIn', '/icons/linkedin.svg'),
('TikTok', '/icons/tiktok.svg'),
('YouTube', '/icons/youtube.svg'),
('Pinterest', '/icons/pinterest.svg');

-- Insert default plans
INSERT IGNORE INTO plans (name, description, price, features, is_active) VALUES
('Free', 'Basic features for solo creators', 0.00, '{"platforms": 2, "posts_per_month": 10, "analytics": false}', true),
('Pro', 'Advanced features for growing creators', 19.99, '{"platforms": 5, "posts_per_month": 100, "analytics": true}', true),
('Business', 'Complete solution for professional creators', 49.99, '{"platforms": "unlimited", "posts_per_month": "unlimited", "analytics": true, "team_members": 5}', true);
