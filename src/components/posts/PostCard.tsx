import { useState } from 'react'
import { Post, usePostStore } from '../../stores/postStore'

interface PostCardProps {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  const { deletePost } = usePostStore()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  
  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deletePost(post.id)
    } catch (error) {
      console.error('Failed to delete post:', error)
    } finally {
      setIsDeleting(false)
      setShowConfirmDelete(false)
    }
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }
  
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-sm text-secondary">
            {post.status === 'published' ? (
              <>
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2">
                  Published
                </span>
                {formatDate(post.createdAt)}
              </>
            ) : post.status === 'scheduled' ? (
              <>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                  Scheduled
                </span>
                {post.scheduledFor && formatDate(post.scheduledFor)}
              </>
            ) : (
              <>
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-2">
                  Failed
                </span>
                {formatDate(post.createdAt)}
              </>
            )}
          </div>
          <div className="flex flex-wrap mt-2">
            {post.platforms.map(platform => (
              <div key={platform} className="mr-2 mb-2">
                {platform === 'instagram' || platform === 'instagram_reels' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                ) : platform === 'facebook' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                ) : platform === 'tiktok' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                    <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                    <path d="M15 8v8a4 4 0 0 1-4 4"></path>
                    <line x1="15" y1="4" x2="21" y2="4"></line>
                    <line x1="21" y1="4" x2="21" y2="8"></line>
                  </svg>
                ) : platform === 'youtube' || platform === 'youtube_shorts' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <button 
            className="btn btn-outline p-2"
            onClick={() => setShowConfirmDelete(!showConfirmDelete)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
          
          {showConfirmDelete && (
            <div className="absolute right-0 top-10 bg-surface shadow-md rounded p-2 z-10 w-48">
              <button 
                className="w-full text-left p-2 text-sm text-error hover:bg-background rounded"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete post'}
              </button>
              <button 
                className="w-full text-left p-2 text-sm hover:bg-background rounded"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      
      <p className="mb-4">{post.content}</p>
      
      {post.mediaUrls.length > 0 && (
        <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {post.mediaUrls.map((url, index) => (
            <div key={index} className="aspect-square rounded overflow-hidden">
              <img src={url} alt={`Post media ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
      
      {post.hashtags.length > 0 && (
        <div className="flex flex-wrap">
          {post.hashtags.map((hashtag, index) => (
            <span key={index} className="hashtag">
              {hashtag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default PostCard
