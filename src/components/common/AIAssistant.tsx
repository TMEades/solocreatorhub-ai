import { useState, useRef, useEffect } from 'react'

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const AIAssistant = ({ isOpen, onClose }: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi there! I\'m your AI assistant. I can help you create captions, suggest hashtags, and optimize your social media content. How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  const handleSendMessage = () => {
    if (!input.trim()) return
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }
    
    setMessages([...messages, userMessage])
    setInput('')
    setIsTyping(true)
    
    // Simulate AI response
    setTimeout(() => {
      let response = ''
      
      if (input.toLowerCase().includes('caption')) {
        response = 'Here\'s a caption suggestion: "Embracing the journey and loving every moment. The best is yet to come! ✨ #LifeJourney #NewBeginnings"'
      } else if (input.toLowerCase().includes('hashtag')) {
        response = 'Here are some trending hashtags for your post:\n\n#ContentCreator #SocialMediaTips #DigitalMarketing #GrowthHacking #SocialStrategy #TrendingNow #EngagementBoost'
      } else if (input.toLowerCase().includes('time') || input.toLowerCase().includes('post')) {
        response = 'Based on your audience analytics, the best times to post are:\n\n- Instagram: Weekdays between 11am-1pm and 7pm-9pm\n- Facebook: Weekdays at 9am and 1pm-3pm\n- Twitter: Weekdays at 8am and 4pm\n- LinkedIn: Weekdays at 9am and 5pm-6pm'
      } else {
        response = 'I can help you with caption suggestions, hashtag recommendations, content ideas, and posting time optimization. Just let me know what you need!'
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }
  
  if (!isOpen) return null
  
  return (
    <div className="ai-assistant-overlay">
      <div className="ai-assistant-container">
        <div className="ai-assistant-header">
          <div className="flex items-center">
            <div className="ai-assistant-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-bold">AI Assistant</h3>
              <div className="text-xs text-secondary">Online</div>
            </div>
          </div>
          <button 
            className="ai-assistant-close"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="ai-assistant-messages">
          {messages.map(message => (
            <div 
              key={message.id}
              className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <div className="message-content">
                {message.content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <div className="message-timestamp">
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message assistant-message">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="ai-assistant-suggestions">
          <button 
            className="suggestion-chip"
            onClick={() => setInput('Suggest a caption for my product launch post')}
          >
            Suggest a caption
          </button>
          <button 
            className="suggestion-chip"
            onClick={() => setInput('What are trending hashtags for tech startups?')}
          >
            Trending hashtags
          </button>
          <button 
            className="suggestion-chip"
            onClick={() => setInput('When is the best time to post on Instagram?')}
          >
            Best posting times
          </button>
          <button 
            className="suggestion-chip"
            onClick={() => setInput('Help me optimize my post for engagement')}
          >
            Optimize for engagement
          </button>
        </div>
        
        <div className="ai-assistant-input">
          <textarea 
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            className="ai-assistant-textarea"
          ></textarea>
          <button 
            className="ai-assistant-send"
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
