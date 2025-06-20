import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface ContentIdea {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: string
  isFavorite: boolean
  isGenerated: boolean
}

interface Category {
  id: string
  name: string
  count: number
}

const ContentIdeas = () => {
  const [ideas, setIdeas] = useState<ContentIdea[]>([])
  const [filteredIdeas, setFilteredIdeas] = useState<ContentIdea[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [promptInput, setPromptInput] = useState('')
  const [showPromptInput, setShowPromptInput] = useState(false)
  
  const categories: Category[] = [
    { id: 'all', name: 'All Ideas', count: 0 },
    { id: 'educational', name: 'Educational', count: 0 },
    { id: 'entertainment', name: 'Entertainment', count: 0 },
    { id: 'promotional', name: 'Promotional', count: 0 },
    { id: 'behindTheScenes', name: 'Behind the Scenes', count: 0 },
    { id: 'userGenerated', name: 'User Generated', count: 0 },
    { id: 'trending', name: 'Trending', count: 0 }
  ]
  
  useEffect(() => {
    // Simulate loading content ideas
    setIsLoading(true)
    
    setTimeout(() => {
      const mockIdeas: ContentIdea[] = [
        {
          id: '1',
          title: 'Day in the Life',
          description: 'Show your audience what a typical day looks like at your company. Highlight team members, workspace, and daily activities.',
          category: 'behindTheScenes',
          tags: ['company culture', 'team', 'workplace'],
          difficulty: 'easy',
          estimatedTime: '2-3 hours',
          isFavorite: false,
          isGenerated: false
        },
        {
          id: '2',
          title: 'Product Tutorial',
          description: 'Create a step-by-step guide showing how to use your product or service. Focus on solving common pain points.',
          category: 'educational',
          tags: ['tutorial', 'how-to', 'product'],
          difficulty: 'medium',
          estimatedTime: '3-4 hours',
          isFavorite: true,
          isGenerated: false
        },
        {
          id: '3',
          title: 'Customer Success Story',
          description: 'Highlight a customer who achieved great results with your product. Include before/after metrics and testimonials.',
          category: 'promotional',
          tags: ['testimonial', 'case study', 'success'],
          difficulty: 'medium',
          estimatedTime: '4-6 hours',
          isFavorite: false,
          isGenerated: false
        },
        {
          id: '4',
          title: 'Industry Trend Analysis',
          description: 'Analyze a current trend in your industry and provide your expert perspective on what it means for your audience.',
          category: 'educational',
          tags: ['trends', 'analysis', 'industry'],
          difficulty: 'hard',
          estimatedTime: '5-7 hours',
          isFavorite: false,
          isGenerated: false
        },
        {
          id: '5',
          title: 'Behind-the-Scenes Product Development',
          description: 'Show the process of developing your latest product or feature. Include challenges and how you overcame them.',
          category: 'behindTheScenes',
          tags: ['product development', 'innovation', 'process'],
          difficulty: 'medium',
          estimatedTime: '3-5 hours',
          isFavorite: true,
          isGenerated: false
        },
        {
          id: '6',
          title: 'User-Generated Content Compilation',
          description: 'Curate and showcase content created by your customers or followers. Highlight creative uses of your product.',
          category: 'userGenerated',
          tags: ['UGC', 'community', 'engagement'],
          difficulty: 'easy',
          estimatedTime: '2-3 hours',
          isFavorite: false,
          isGenerated: false
        },
        {
          id: '7',
          title: 'Quick Tips Series',
          description: 'Create a series of short posts or videos sharing quick tips related to your industry or product.',
          category: 'educational',
          tags: ['tips', 'series', 'quick'],
          difficulty: 'easy',
          estimatedTime: '1-2 hours',
          isFavorite: false,
          isGenerated: false
        },
        {
          id: '8',
          title: 'Team Member Spotlight',
          description: 'Feature different team members and their roles, expertise, and personal interests to humanize your brand.',
          category: 'behindTheScenes',
          tags: ['team', 'spotlight', 'people'],
          difficulty: 'easy',
          estimatedTime: '1-2 hours',
          isFavorite: false,
          isGenerated: false
        },
        {
          id: '9',
          title: 'Seasonal Campaign',
          description: 'Create content tied to upcoming holidays or seasons relevant to your audience and product.',
          category: 'promotional',
          tags: ['seasonal', 'holiday', 'campaign'],
          difficulty: 'medium',
          estimatedTime: '4-6 hours',
          isFavorite: false,
          isGenerated: false
        },
        {
          id: '10',
          title: 'Trending Challenge Participation',
          description: 'Participate in a trending social media challenge and put your brand\'s unique spin on it.',
          category: 'trending',
          tags: ['challenge', 'trend', 'viral'],
          difficulty: 'medium',
          estimatedTime: '2-4 hours',
          isFavorite: false,
          isGenerated: false
        }
      ]
      
      setIdeas(mockIdeas)
      setFilteredIdeas(mockIdeas)
      setIsLoading(false)
      
      // Update category counts
      categories.forEach(category => {
        if (category.id === 'all') {
          category.count = mockIdeas.length
        } else {
          category.count = mockIdeas.filter(idea => idea.category === category.id).length
        }
      })
    }, 1500)
  }, [])
  
  useEffect(() => {
    // Filter ideas based on search query, category, and difficulty
    let filtered = [...ideas]
    
    if (searchQuery) {
      filtered = filtered.filter(idea => 
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }
    
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(idea => idea.category === selectedCategory)
    }
    
    if (selectedDifficulty) {
      filtered = filtered.filter(idea => idea.difficulty === selectedDifficulty)
    }
    
    setFilteredIdeas(filtered)
  }, [ideas, searchQuery, selectedCategory, selectedDifficulty])
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }
  
  const handleDifficultySelect = (difficulty: string | null) => {
    setSelectedDifficulty(difficulty)
  }
  
  const toggleFavorite = (ideaId: string) => {
    setIdeas(ideas.map(idea => 
      idea.id === ideaId ? { ...idea, isFavorite: !idea.isFavorite } : idea
    ))
  }
  
  const generateIdeas = () => {
    setIsGenerating(true)
    setShowPromptInput(false)
    
    // Simulate AI generating content ideas
    setTimeout(() => {
      const prompt = promptInput.trim() || 'content ideas for social media'
      
      const generatedIdeas: ContentIdea[] = [
        {
          id: Date.now().toString(),
          title: `${prompt.includes('video') ? 'Video Series' : 'Blog Series'}: Industry Expert Interviews`,
          description: `Create a ${prompt.includes('video') ? 'video' : 'content'} series interviewing experts in your field about ${promptInput || 'current trends and challenges'}. This builds authority and provides valuable insights to your audience.`,
          category: 'educational',
          tags: ['interview', 'expert', 'series'],
          difficulty: 'medium',
          estimatedTime: '4-6 hours',
          isFavorite: false,
          isGenerated: true
        },
        {
          id: (Date.now() + 1).toString(),
          title: `${prompt.includes('product') ? 'Product Comparison' : 'Industry Comparison'}: Us vs. Them`,
          description: `Create a fair, balanced comparison between your ${prompt.includes('product') ? 'product' : 'service'} and alternatives. Highlight your unique strengths while being honest about areas where others might excel.`,
          category: 'promotional',
          tags: ['comparison', 'analysis', 'education'],
          difficulty: 'hard',
          estimatedTime: '5-7 hours',
          isFavorite: false,
          isGenerated: true
        },
        {
          id: (Date.now() + 2).toString(),
          title: 'Interactive Poll or Quiz',
          description: `Create an engaging poll or quiz about ${promptInput || 'your industry or product'} to boost engagement and learn more about your audience preferences.`,
          category: 'entertainment',
          tags: ['interactive', 'engagement', 'poll'],
          difficulty: 'easy',
          estimatedTime: '1-2 hours',
          isFavorite: false,
          isGenerated: true
        },
        {
          id: (Date.now() + 3).toString(),
          title: 'Myth Busting Series',
          description: `Address common misconceptions about ${promptInput || 'your industry or product'} in a series of educational posts that position you as a trusted authority.`,
          category: 'educational',
          tags: ['myths', 'education', 'authority'],
          difficulty: 'medium',
          estimatedTime: '3-4 hours',
          isFavorite: false,
          isGenerated: true
        }
      ]
      
      setIdeas([...generatedIdeas, ...ideas])
      setPromptInput('')
      setIsGenerating(false)
    }, 3000)
  }
  
  return (
    <div className="container page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Content Ideas</h1>
        <div className="flex space-x-2">
          <button 
            className="btn btn-outline"
            onClick={() => setShowPromptInput(!showPromptInput)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            Generate Ideas
          </button>
          <Link to="/create-post" className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create Post
          </Link>
        </div>
      </div>
      
      {showPromptInput && (
        <div className="card mb-6">
          <h2 className="text-lg font-bold mb-2">Generate Custom Ideas</h2>
          <p className="text-secondary mb-4">Describe what kind of content you're looking for, and our AI will generate tailored ideas for you.</p>
          
          <div className="flex">
            <input 
              type="text" 
              className="input flex-1 mr-2" 
              placeholder="E.g., Video ideas for product tutorials, Blog posts about industry trends..."
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
            />
            <button 
              className="btn btn-primary"
              onClick={generateIdeas}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="spinner-sm mr-2"></div>
                  Generating...
                </>
              ) : (
                'Generate'
              )}
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="card">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            
            <div className="mb-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search ideas..." 
                  className="input w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Categories</h3>
              <ul className="space-y-1">
                {categories.map(category => (
                  <li key={category.id}>
                    <button 
                      className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      <span>{category.name}</span>
                      <span className="category-count">{category.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Difficulty</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="difficulty" 
                    checked={selectedDifficulty === null}
                    onChange={() => handleDifficultySelect(null)}
                    className="mr-2"
                  />
                  All Levels
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="difficulty" 
                    checked={selectedDifficulty === 'easy'}
                    onChange={() => handleDifficultySelect('easy')}
                    className="mr-2"
                  />
                  Easy
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="difficulty" 
                    checked={selectedDifficulty === 'medium'}
                    onChange={() => handleDifficultySelect('medium')}
                    className="mr-2"
                  />
                  Medium
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="difficulty" 
                    checked={selectedDifficulty === 'hard'}
                    onChange={() => handleDifficultySelect('hard')}
                    className="mr-2"
                  />
                  Hard
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          {isLoading ? (
            <div className="card text-center p-8">
              <div className="spinner mx-auto"></div>
              <p className="mt-4">Loading content ideas...</p>
            </div>
          ) : filteredIdeas.length > 0 ? (
            <div className="space-y-4">
              {filteredIdeas.map(idea => (
                <div 
                  key={idea.id}
                  className={`idea-card ${idea.isGenerated ? 'generated' : ''}`}
                >
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold">{idea.title}</h3>
                    <button 
                      className={`favorite-button ${idea.isFavorite ? 'active' : ''}`}
                      onClick={() => toggleFavorite(idea.id)}
                      aria-label={idea.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={idea.isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                  
                  <p className="idea-description">{idea.description}</p>
                  
                  <div className="idea-meta">
                    <div className="idea-tags">
                      {idea.tags.map((tag, index) => (
                        <span key={index} className="idea-tag">{tag}</span>
                      ))}
                    </div>
                    
                    <div className="idea-details">
                      <span className={`difficulty difficulty-${idea.difficulty}`}>
                        {idea.difficulty.charAt(0).toUpperCase() + idea.difficulty.slice(1)}
                      </span>
                      <span className="estimated-time">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {idea.estimatedTime}
                      </span>
                    </div>
                  </div>
                  
                  <div className="idea-actions">
                    <Link to="/create-post" className="btn btn-sm btn-primary">
                      Create Post
                    </Link>
                    <button className="btn btn-sm btn-outline">
                      Save for Later
                    </button>
                  </div>
                  
                  {idea.isGenerated && (
                    <div className="idea-generated-badge">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                      AI Generated
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center p-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-tertiary">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3 className="text-lg font-medium mb-2">No ideas found</h3>
              <p className="text-secondary mb-4">Try adjusting your filters or generate new ideas</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedDifficulty(null)
                  setShowPromptInput(true)
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                Generate New Ideas
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContentIdeas
