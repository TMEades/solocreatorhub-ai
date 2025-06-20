import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePostStore, Post } from '../stores/postStore'
import PostCard from '../components/posts/PostCard'

const Dashboard = () => {
  const { posts, fetchPosts, isLoading } = usePostStore()
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    scheduled: 0,
    platforms: {} as Record<string, number>
  })
  
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])
  
  useEffect(() => {
    if (posts.length > 0) {
      const published = posts.filter(post => post.status === 'published').length
      const scheduled = posts.filter(post => post.status === 'scheduled').length
      
      const platformCounts: Record<string, number> = {}
      posts.forEach(post => {
        post.platforms.forEach(platform => {
          platformCounts[platform] = (platformCounts[platform] || 0) + 1
        })
      })
      
      setStats({
        total: posts.length,
        published,
        scheduled,
        platforms: platformCounts
      })
    }
  }, [posts])
  
  const recentPosts = posts.slice(0, 3)
  
  return (
    <div className="container page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link to="/create-post" className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create Post
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="text-lg font-bold mb-1">{stats.total}</div>
          <div className="text-secondary">Total Posts</div>
        </div>
        <div className="card">
          <div className="text-lg font-bold mb-1">{stats.published}</div>
          <div className="text-secondary">Published Posts</div>
        </div>
        <div className="card">
          <div className="text-lg font-bold mb-1">{stats.scheduled}</div>
          <div className="text-secondary">Scheduled Posts</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Recent Posts</h2>
            <Link to="/post-history" className="text-sm text-primary">View all</Link>
          </div>
          
          {isLoading ? (
            <div className="card text-center p-8">
              <div className="spinner mx-auto"></div>
              <p className="mt-4">Loading posts...</p>
            </div>
          ) : recentPosts.length > 0 ? (
            recentPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="card text-center p-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-tertiary">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <h3 className="text-lg font-medium mb-2">No posts yet</h3>
              <p className="text-secondary mb-4">Create your first post to get started</p>
              <Link to="/create-post" className="btn btn-primary">Create Post</Link>
            </div>
          )}
        </div>
        
        <div>
          <div className="card">
            <h2 className="text-lg font-bold mb-4">Platform Activity</h2>
            
            {Object.keys(stats.platforms).length > 0 ? (
              <div>
                {Object.entries(stats.platforms).map(([platform, count]) => (
                  <div key={platform} className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {platform === 'instagram' || platform === 'instagram_reels' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500 mr-2">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      ) : platform === 'facebook' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mr-2">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      ) : platform === 'tiktok' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black mr-2">
                          <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                          <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                          <path d="M15 8v8a4 4 0 0 1-4 4"></path>
                          <line x1="15" y1="4" x2="21" y2="4"></line>
                          <line x1="21" y1="4" x2="21" y2="8"></line>
                        </svg>
                      ) : platform === 'youtube' || platform === 'youtube_shorts' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 mr-2">
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700 mr-2">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      )}
                      <span>{getPlatformName(platform)}</span>
                    </div>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-secondary">No platform activity yet</p>
              </div>
            )}
          </div>
          
          <div className="card mt-6">
            <h2 className="text-lg font-bold mb-4">Quick Tips</h2>
            <ul className="space-y-3">
              <li className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 flex-shrink-0">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                <span className="text-sm">Use trending hashtags to increase your reach</span>
              </li>
              <li className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 flex-shrink-0">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                <span className="text-sm">Schedule posts for optimal engagement times</span>
              </li>
              <li className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 flex-shrink-0">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                <span className="text-sm">Include visual content for higher engagement</span>
              </li>
              <li className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 flex-shrink-0">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                <span className="text-sm">Tailor content for each platform's audience</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function getPlatformName(platformId: string): string {
  const platforms: Record<string, string> = {
    instagram: 'Instagram',
    instagram_reels: 'Instagram Reels',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    youtube_shorts: 'YouTube Shorts',
    linkedin: 'LinkedIn'
  }
  
  return platforms[platformId] || platformId
}

export default Dashboard
