import React, { useState } from 'react'
import { 
  PenTool, 
  Image, 
  Hash, 
  Send, 
  Save, 
  Sparkles,
  Instagram,
  Twitter,
  Linkedin,
  Video
} from 'lucide-react'

const ContentCreator: React.FC = () => {
  const [content, setContent] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram'])
  const [contentType, setContentType] = useState('post')
  const [hashtags, setHashtags] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-400' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-blue-400' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
    { id: 'tiktok', name: 'TikTok', icon: Video, color: 'text-red-400' },
  ]

  const contentTypes = [
    { id: 'post', name: 'Social Post', description: 'Regular social media post' },
    { id: 'story', name: 'Story', description: 'Short-form story content' },
    { id: 'reel', name: 'Reel/Video', description: 'Video content for reels' },
    { id: 'carousel', name: 'Carousel', description: 'Multi-image post' },
  ]

  const aiPrompts = [
    'Write a motivational Monday post',
    'Create a product showcase post',
    'Generate behind-the-scenes content',
    'Write a customer testimonial post',
    'Create educational content about [topic]',
    'Generate a seasonal promotion post',
  ]

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    )
  }

  const generateAIContent = async (prompt: string) => {
    setIsGenerating(true)
    // Simulate AI content generation
    setTimeout(() => {
      const sampleContent = `🌟 ${prompt.replace('Write a ', '').replace('Create a ', '').replace('Generate ', '')}

Here's some AI-generated content that would be perfect for your social media strategy. This content is designed to engage your audience and drive meaningful interactions.

Key points:
✨ Engaging and authentic
🎯 Targeted to your audience
📈 Optimized for engagement

What do you think? Ready to share this with your followers?

#SocialMedia #ContentCreation #AI #Marketing #Engagement`
      
      setContent(sampleContent)
      setIsGenerating(false)
    }, 2000)
  }

  const handleSave = () => {
    // Save as draft logic
    console.log('Saving draft...')
  }

  const handlePublish = () => {
    // Publish logic
    console.log('Publishing content...')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <PenTool size={32} />
          AI Content Creator
        </h1>
        <p className="text-white/70">
          Create engaging content with AI assistance for all your social platforms
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Creation Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content Type Selection */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Content Type</h3>
            <div className="grid grid-cols-2 gap-3">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setContentType(type.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    contentType === type.id
                      ? 'border-blue-400 bg-blue-400/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="text-white font-medium">{type.name}</div>
                  <div className="text-white/60 text-sm">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Prompt Suggestions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles size={20} />
              AI Content Ideas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {aiPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => generateAIContent(prompt)}
                  disabled={isGenerating}
                  className="p-3 text-left bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-all disabled:opacity-50"
                >
                  <span className="text-white text-sm">{prompt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Editor */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Content</h3>
            <div className="space-y-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={isGenerating ? "AI is generating content..." : "Write your content here or use AI suggestions above..."}
                disabled={isGenerating}
                className="input-field h-64 resize-none"
              />
              
              {isGenerating && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                  <span className="ml-3 text-white/70">Generating content...</span>
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    placeholder="Add hashtags..."
                    className="input-field"
                  />
                </div>
                <button className="btn-secondary flex items-center gap-2">
                  <Hash size={16} />
                  Generate Tags
                </button>
              </div>
            </div>
          </div>

          {/* Media Upload */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Image size={20} />
              Media
            </h3>
            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-colors cursor-pointer">
              <Image className="mx-auto mb-4 text-white/40" size={48} />
              <p className="text-white/70 mb-2">Drop images or videos here</p>
              <p className="text-white/50 text-sm">or click to browse</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Platform Selection */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Platforms</h3>
            <div className="space-y-3">
              {platforms.map((platform) => {
                const Icon = platform.icon
                const isSelected = selectedPlatforms.includes(platform.id)
                return (
                  <button
                    key={platform.id}
                    onClick={() => handlePlatformToggle(platform.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      isSelected
                        ? 'border-blue-400 bg-blue-400/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <Icon className={platform.color} size={20} />
                    <span className="text-white">{platform.name}</span>
                    {isSelected && (
                      <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full"></div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content Preview */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
            <div className="bg-white/5 rounded-lg p-4 min-h-[200px]">
              {content ? (
                <div className="text-white/80 text-sm whitespace-pre-wrap">
                  {content}
                </div>
              ) : (
                <div className="text-white/40 text-center py-8">
                  Content preview will appear here
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handlePublish}
              disabled={!content.trim()}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send size={16} />
              Publish Now
            </button>
            <button
              onClick={handleSave}
              disabled={!content.trim()}
              className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save size={16} />
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentCreator
