import React from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../config';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img 
            src={APP_CONFIG.logoUrl} 
            alt={APP_CONFIG.name} 
            className="h-8 w-8"
            onError={(e) => {
              // Fallback if logo doesn't exist yet
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32';
            }}
          />
          <h1 className="text-xl font-bold">{APP_CONFIG.name}</h1>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-indigo-200 transition-colors">Dashboard</Link>
          <Link to="/posts" className="hover:text-indigo-200 transition-colors">Posts</Link>
          <Link to="/analytics" className="hover:text-indigo-200 transition-colors">Analytics</Link>
          <Link to="/hashtags" className="hover:text-indigo-200 transition-colors">Hashtags</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="bg-white text-indigo-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors">
            New Post
          </button>
          <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center">
            <span className="text-xs font-bold">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
