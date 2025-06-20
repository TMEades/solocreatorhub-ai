import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePostStore, Post } from '../stores/postStore'
import PostCard from '../components/posts/PostCard'

const PostHistory = () => {
  const { posts, fetchPosts, isLoading } = usePostStore()
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [platformFilter, setplatformFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])
  
  useEffect(() => {
    let filtered = [...posts]
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => post.status === statusFilter)
    }
    
    if (platformFilter !== 'all') {
      filtered = filtered.filter(post => post.platforms.includes(platformFilter))
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        post => 
          post.content.toLowerCase().includes(term) || 
          post.hashtags.some(hashtag => hashtag.toLowerCase().includes(term))
      )
    }
    
    setFilteredPosts(filtered)
  }, [posts, statusFilter, platformFilter, searchTerm])
  
  const platforms = [
    { id: 'all', name: 'All Platforms' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'instagram_reels', name: 'Instagram Reels' },
    { id: 'facebook', name: 'Facebook' },
    { id: 'tiktok', name: 'TikTok' },
    { id: 'youtube', name: 'YouTube' },
    { id: 'youtube_shorts', name: 'YouTube Shorts' }
  ]
  
  const statuses = [
    { id: 'all', name: 'All Status' },
    { id: 'published', name: 'Published' },
    { id: 'scheduled', name: 'Scheduled' },
    { id: 'failed', name: 'Failed' }
  ]
  
  return (
    <div className="container page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Post History</h1>
        <Link to="/create-post" className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create Post
        </Link>
      </div>
      
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="form-label">Search</label>
            <input
              type="text"
              id="search"
              className="form-input"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="platform" className="form-label">Platform</label>
            <select
              id="platform"
              className="form-input"
              value={platformFilter}
              onChange={(e) => setplatformFilter(e.target.value)}
            >
              {platforms.map(platform => (
                <option key={platform.id} value={platform.id}>
                  {platform.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="status" className="form-label">Status</label>
            <select
              id="status"
              className="form-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="card text-center p-8">
          <div className="spinner mx-auto"></div>
          <p className="mt-4">Loading posts...</p>
        </div>
      ) : filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      ) : (
        <div className="card text-center p-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-tertiary">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h3 className="text-lg font-medium mb-2">No posts found</h3>
          <p className="text-secondary mb-4">
            {searchTerm || statusFilter !== 'all' || platformFilter !== 'all'
              ? 'Try adjusting your filters to see more results'
              : 'Create your first post to get started'}
          </p>
          {searchTerm || statusFilter !== 'all' || platformFilter !== 'all' ? (
            <button 
              className="btn btn-outline"
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('all')
                setplatformFilter('all')
              }}
            >
              Clear Filters
            </button>
          ) : (
            <Link to="/create-post" className="btn btn-primary">Create Post</Link>
          )}
        </div>
      )}
    </div>
  )
}

export default PostHistory
