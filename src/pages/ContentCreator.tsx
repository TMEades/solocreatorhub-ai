import React, { useState } from 'react'
import { 
  Sparkles, 
  Image, 
  Type, 
  Hash, 
  Wand2, 
  Download,
  Copy,
  RefreshCw,
  Palette,
  Layout,
  Camera
} from 'lucide-react'

const ContentCreator = () => {
  const [activeTab, setActiveTab] = useState('ai-writer')
  const [contentType, setContentType] = useState('post')
  const [platform, setPlatform] = useState('instagram')
  const [tone, setTone] = useState('professional')
  const [generatedContent, setGeneratedContent] = useState('')
  const [generatedHashtags, setGeneratedHashtags] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  const tabs = [
    { id: 'ai-writer', name: 'AI Writer', icon: Wand2 },
    { id: 'visual-creator', name: 'Visual Creator', icon: Image },
    { id: 'hashtag-generator', name: 'Hashtag Generator', icon: Hash },
  ]

  const platforms = [
    { id: 'instagram', name: 'Instagram', color: 'bg-pink-500' },
    { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-600' },
    { id: 'twitter', name: 'Twitter', color: 'bg-blue-400' },
    { id: 'tiktok', name: 'TikTok', color: 'bg-black' },
  ]

  const tones = [
    'Professional', 'Casual', 'Friendly', 'Authoritative', 
    'Humorous', 'Inspirational', 'Educational', 'Conversational'
  ]

  const contentTypes = [
    'Post', 'Story', 'Carousel', 'Video Script', 'Bio', 'Caption'
  ]

  const generateContent = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation
    setTimeout(() => {
      const sampleContent = {
        instagram: {
          post: "🌟 Just discovered an amazing productivity hack that's been a game-changer for my daily routine! \n\nSwipe to see the 3 simple steps that helped me reclaim 2 hours of my day. What's your favorite productivity tip? Drop it in the comments! 👇\n\n#ProductivityHacks #TimeManagement #WorkLifeBalance #Entrepreneur #Success #Motivation #Tips #LifeHacks #Productivity #Focus",
          story: "Quick productivity tip! ⚡\n\nTry the 2-minute rule:\nIf it takes less than 2 minutes, do it now!\n\nSwipe up for more tips 👆",
          carousel: "Slide 1: 🎯 5 Productivity Hacks That Actually Work\n\nSlide 2: ⏰ Time blocking - Schedule specific times for tasks\n\nSlide 3: 📱 Digital detox - Turn off notifications during focus time\n\nSlide 4: 🎵 Background music - Find your focus playlist\n\nSlide 5: ✅ The 2-minute rule - Do it now if it's quick\n\nSlide 6: 🧘 Take breaks - Your brain needs rest to perform"
        },
        linkedin: {
          post: "After 5 years of remote work, I've learned that productivity isn't about working more hours—it's about working smarter.\n\nHere are 3 strategies that transformed my workflow:\n\n1️⃣ Time blocking: I schedule specific hours for deep work, meetings, and admin tasks\n2️⃣ The 2-minute rule: If something takes less than 2 minutes, I do it immediately\n3️⃣ Digital boundaries: I turn off notifications during focus sessions\n\nThe result? I'm completing 40% more meaningful work while maintaining better work-life balance.\n\nWhat productivity strategies have worked best for you?\n\n#RemoteWork #Productivity #WorkLifeBalance #ProfessionalDevelopment"
        },
        twitter: {
          post: "Productivity isn't about doing more.\n\nIt's about doing what matters.\n\n3 game-changing habits:\n• Time blocking\n• 2-minute rule  \n• Digital boundaries\n\nSmall changes, big results. 🚀\n\n#ProductivityTips #WorkSmart"
        }
      }

      const hashtags = [
        '#ProductivityHacks', '#TimeManagement', '#WorkLifeBalance', 
        '#Entrepreneur', '#Success', '#Motivation', '#Tips', '#LifeHacks',
        '#Productivity', '#Focus', '#RemoteWork', '#WorkSmart'
      ]

      setGeneratedContent(sampleContent[platform]?.[contentType.toLowerCase()] || sampleContent.instagram.post)
      setGeneratedHashtags(hashtags.slice(0, 8))
      setIsGenerating(false)
    }, 2000)
  }

  const visualTemplates = [
    {
      id: 1,
      name: 'Quote Card',
      preview: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      category: 'Quote'
    },
    {
      id: 2,
      name: 'Tips Carousel',
      preview: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      category: 'Educational'
    },
    {
      id: 3,
      name: 'Behind the Scenes',
      preview: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      category: 'Personal'
    },
    {
      id: 4,
      name: 'Product Showcase',
      preview: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      category: 'Business'
    },
    {
      id: 5,
      name: 'Minimalist Design',
      preview: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      category: 'Design'
    },
    {
      id: 6,
      name: 'Statistics Post',
      preview: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      category: 'Data'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Sparkles className="w-8 h-8 mr-3 text-purple-500" />
            AI Content Creator
          </h1>
          <p className="mt-2 text-gray-600">Create engaging content with AI-powered tools</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* AI Writer Tab */}
      {activeTab === 'ai-writer' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="card space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Content Settings</h3>
              
              <div className="form-group">
                <label className="form-label">Platform</label>
                <div className="grid grid-cols-2 gap-2">
                  {platforms.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        platform === p.id
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${p.color} mx-auto mb-1`}></div>
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Content Type</label>
                <select 
                  value={contentType} 
                  onChange={(e) => setContentType(e.target.value)}
                  className="form-input"
                >
                  {contentTypes.map((type) => (
                    <option key={type} value={type.toLowerCase()}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Tone</label>
                <select 
                  value={tone} 
                  onChange={(e) => setTone(e.target.value)}
                  className="form-input"
                >
                  {tones.map((t) => (
                    <option key={t} value={t.toLowerCase()}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Topic/Keywords</label>
                <textarea 
                  className="form-textarea"
                  placeholder="Enter your topic, keywords, or main message..."
                  rows={3}
                />
              </div>

              <button 
                onClick={generateContent}
                disabled={isGenerating}
                className="btn btn-primary w-full"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Generate Content
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Generated Content</h3>
                <div className="flex space-x-2">
                  <button className="btn btn-secondary">
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button className="btn btn-secondary">
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </button>
                </div>
              </div>

              {generatedContent ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Caption</span>
                      <span className="text-xs text-gray-500">{generatedContent.length} characters</span>
                    </div>
                    <textarea 
                      value={generatedContent}
                      onChange={(e) => setGeneratedContent(e.target.value)}
                      className="w-full bg-transparent border-none resize-none focus:outline-none"
                      rows={8}
                    />
                  </div>

                  {generatedHashtags.length > 0 && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-700">Suggested Hashtags</span>
                        <button className="text-xs text-blue-600 hover:text-blue-700">Add all</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {generatedHashtags.map((hashtag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-md cursor-pointer hover:bg-blue-200"
                          >
                            {hashtag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3">
                    <button className="btn btn-secondary">Save as Draft</button>
                    <button className="btn btn-primary">Schedule Post</button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Type className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Generated content will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Visual Creator Tab */}
      {activeTab === 'visual-creator' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Choose a Template</h3>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button className="btn btn-secondary">
                <Camera className="w-4 h-4" />
                Upload Image
              </button>
              <button className="btn btn-primary">
                <Palette className="w-4 h-4" />
                Custom Design
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visualTemplates.map((template) => (
              <div key={template.id} className="card card-hover cursor-pointer group">
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img 
                    src={template.preview} 
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{template.name}</h4>
                    <p className="text-sm text-gray-500">{template.category}</p>
                  </div>
                  <button className="btn btn-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <Layout className="w-4 h-4" />
                    Use
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hashtag Generator Tab */}
      {activeTab === 'hashtag-generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Hashtags</h3>
            
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Describe your content</label>
                <textarea 
                  className="form-textarea"
                  placeholder="e.g., productivity tips for entrepreneurs, morning routine, workspace setup..."
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Industry/Niche</label>
                <select className="form-input">
                  <option>Select industry</option>
                  <option>Business & Entrepreneurship</option>
                  <option>Lifestyle & Wellness</option>
                  <option>Technology</option>
                  <option>Fashion & Beauty</option>
                  <option>Food & Cooking</option>
                  <option>Travel</option>
                  <option>Fitness & Health</option>
                  <option>Education</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Target Platform</label>
                <div className="grid grid-cols-2 gap-2">
                  {platforms.map((p) => (
                    <button
                      key={p.id}
                      className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                        platform === p.id
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <button className="btn btn-primary w-full">
                <Hash className="w-4 h-4" />
                Generate Hashtags
              </button>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Generated Hashtags</h3>
              <button className="btn btn-secondary">
                <Copy className="w-4 h-4" />
                Copy All
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">High Volume (1M+ posts)</h4>
                <div className="flex flex-wrap gap-2">
                  {['#productivity', '#entrepreneur', '#success', '#motivation'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Medium Volume (100K-1M posts)</h4>
                <div className="flex flex-wrap gap-2">
                  {['#productivityhacks', '#worklifebalance', '#timemanagement', '#focus'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Low Volume (10K-100K posts)</h4>
                <div className="flex flex-wrap gap-2">
                  {['#solopreneur', '#productivitytips', '#worksmarter', '#dailyhabits'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Total hashtags: 12</span>
                  <span>Estimated reach: 2.3M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentCreator
