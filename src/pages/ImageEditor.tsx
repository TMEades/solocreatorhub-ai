import { useState, useRef, useEffect } from 'react'

interface EditorTool {
  id: string
  name: string
  icon: JSX.Element
}

interface FilterOption {
  id: string
  name: string
  value: string
  preview: string
}

interface TextStyle {
  id: string
  name: string
}

const ImageEditor = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [textInput, setTextInput] = useState('')
  const [textColor, setTextColor] = useState('#ffffff')
  const [textSize, setTextSize] = useState(24)
  const [selectedTextStyle, setSelectedTextStyle] = useState<string>('normal')
  const [cropAspectRatio, setCropAspectRatio] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const tools: EditorTool[] = [
    {
      id: 'crop',
      name: 'Crop',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2v14a2 2 0 0 0 2 2h14"></path>
          <path d="M18 22V8a2 2 0 0 0-2-2H2"></path>
        </svg>
      )
    },
    {
      id: 'adjust',
      name: 'Adjust',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      )
    },
    {
      id: 'filter',
      name: 'Filter',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
      )
    },
    {
      id: 'text',
      name: 'Text',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 7 4 4 20 4 20 7"></polyline>
          <line x1="9" y1="20" x2="15" y2="20"></line>
          <line x1="12" y1="4" x2="12" y2="20"></line>
        </svg>
      )
    },
    {
      id: 'draw',
      name: 'Draw',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
      )
    }
  ]
  
  const filters: FilterOption[] = [
    { id: 'none', name: 'None', value: 'none', preview: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'grayscale', name: 'B&W', value: 'grayscale(100%)', preview: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'sepia', name: 'Sepia', value: 'sepia(100%)', preview: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'vintage', name: 'Vintage', value: 'sepia(50%) hue-rotate(-30deg) saturate(140%)', preview: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'warm', name: 'Warm', value: 'saturate(150%) hue-rotate(10deg)', preview: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'cool', name: 'Cool', value: 'saturate(120%) hue-rotate(-10deg)', preview: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'dramatic', name: 'Dramatic', value: 'contrast(150%) brightness(90%)', preview: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 'fade', name: 'Fade', value: 'brightness(110%) saturate(80%) contrast(90%)', preview: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
  ]
  
  const textStyles: TextStyle[] = [
    { id: 'normal', name: 'Normal' },
    { id: 'bold', name: 'Bold' },
    { id: 'italic', name: 'Italic' },
    { id: 'shadow', name: 'Shadow' }
  ]
  
  useEffect(() => {
    // Set a default image for demo purposes
    setSelectedImage('https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
    setPreviewImage('https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
    
    // Initialize history with the default image
    setHistory(['https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'])
    setHistoryIndex(0)
  }, [])
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setSelectedImage(imageUrl)
        setPreviewImage(imageUrl)
        
        // Add to history
        const newHistory = [...history.slice(0, historyIndex + 1), imageUrl]
        setHistory(newHistory)
        setHistoryIndex(newHistory.length - 1)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleToolClick = (toolId: string) => {
    setActiveTool(activeTool === toolId ? null : toolId)
  }
  
  const handleFilterChange = (filterId: string) => {
    setSelectedFilter(filterId)
    
    // Apply filter to preview image
    if (selectedImage) {
      const filter = filters.find(f => f.id === filterId)
      if (filter) {
        applyFilter(filter.value)
      }
    }
  }
  
  const applyFilter = (filterValue: string) => {
    if (!canvasRef.current || !selectedImage) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      
      ctx.filter = filterValue
      ctx.drawImage(img, 0, 0, img.width, img.height)
      
      const newImageUrl = canvas.toDataURL('image/jpeg')
      setPreviewImage(newImageUrl)
      
      // Add to history
      const newHistory = [...history.slice(0, historyIndex + 1), newImageUrl]
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
    img.src = selectedImage
  }
  
  const applyAdjustments = () => {
    if (!canvasRef.current || !selectedImage) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
      ctx.drawImage(img, 0, 0, img.width, img.height)
      
      const newImageUrl = canvas.toDataURL('image/jpeg')
      setPreviewImage(newImageUrl)
      
      // Add to history
      const newHistory = [...history.slice(0, historyIndex + 1), newImageUrl]
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
    img.src = selectedImage
  }
  
  const applyText = () => {
    if (!canvasRef.current || !selectedImage || !textInput.trim()) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      
      // Draw the current image
      ctx.drawImage(img, 0, 0, img.width, img.height)
      
      // Set text style
      ctx.fillStyle = textColor
      let fontStyle = ''
      if (selectedTextStyle === 'bold') {
        fontStyle = 'bold '
      } else if (selectedTextStyle === 'italic') {
        fontStyle = 'italic '
      }
      ctx.font = `${fontStyle}${textSize}px Arial`
      ctx.textAlign = 'center'
      
      // Add text
      const x = canvas.width / 2
      const y = canvas.height / 2
      
      if (selectedTextStyle === 'shadow') {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
        ctx.shadowBlur = 5
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2
      }
      
      ctx.fillText(textInput, x, y)
      
      // Reset shadow
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      
      const newImageUrl = canvas.toDataURL('image/jpeg')
      setPreviewImage(newImageUrl)
      
      // Add to history
      const newHistory = [...history.slice(0, historyIndex + 1), newImageUrl]
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
      
      // Reset text input
      setTextInput('')
    }
    img.src = previewImage || selectedImage
  }
  
  const handleCrop = () => {
    // In a real app, this would implement cropping functionality
    alert('Crop functionality would be implemented here')
    setActiveTool(null)
  }
  
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setPreviewImage(history[historyIndex - 1])
    }
  }
  
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setPreviewImage(history[historyIndex + 1])
    }
  }
  
  const handleSave = () => {
    if (!previewImage) return
    
    setIsLoading(true)
    
    // Simulate saving process
    setTimeout(() => {
      // In a real app, this would save the image to server or download it
      const link = document.createElement('a')
      link.href = previewImage
      link.download = 'edited-image.jpg'
      link.click()
      
      setIsLoading(false)
    }, 1500)
  }
  
  const handleReset = () => {
    if (selectedImage) {
      setPreviewImage(selectedImage)
      setBrightness(100)
      setContrast(100)
      setSaturation(100)
      setSelectedFilter(null)
      
      // Reset history to just the original image
      setHistory([selectedImage])
      setHistoryIndex(0)
    }
  }
  
  return (
    <div className="container page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Image Editor</h1>
        <div className="flex space-x-2">
          <button 
            className="btn btn-outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Upload Image
          </button>
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange}
          />
          
          <button 
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isLoading || !previewImage}
          >
            {isLoading ? (
              <>
                <div className="spinner-sm mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                Save Image
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="card">
            <h2 className="text-lg font-bold mb-4">Tools</h2>
            
            <div className="grid grid-cols-3 gap-2 mb-6">
              {tools.map(tool => (
                <button 
                  key={tool.id}
                  className={`tool-button ${activeTool === tool.id ? 'active' : ''}`}
                  onClick={() => handleToolClick(tool.id)}
                  disabled={!selectedImage}
                >
                  <div className="tool-icon">{tool.icon}</div>
                  <div className="tool-name">{tool.name}</div>
                </button>
              ))}
            </div>
            
            <div className="flex space-x-2 mb-6">
              <button 
                className="btn btn-sm btn-outline flex-1"
                onClick={handleUndo}
                disabled={historyIndex <= 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 14 4 9 9 4"></polyline>
                  <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
                </svg>
              </button>
              <button 
                className="btn btn-sm btn-outline flex-1"
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 14 20 9 15 4"></polyline>
                  <path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>
                </svg>
              </button>
              <button 
                className="btn btn-sm btn-outline flex-1"
                onClick={handleReset}
                disabled={!selectedImage}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 2v6h6"></path>
                  <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
                  <path d="M21 22v-6h-6"></path>
                  <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
                </svg>
              </button>
            </div>
            
            {activeTool === 'crop' && (
              <div className="tool-panel">
                <h3 className="font-medium mb-2">Crop Options</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="aspectRatio" 
                        checked={cropAspectRatio === null}
                        onChange={() => setCropAspectRatio(null)}
                        className="mr-2"
                      />
                      Free
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="aspectRatio" 
                        checked={cropAspectRatio === '1:1'}
                        onChange={() => setCropAspectRatio('1:1')}
                        className="mr-2"
                      />
                      1:1
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="aspectRatio" 
                        checked={cropAspectRatio === '4:3'}
                        onChange={() => setCropAspectRatio('4:3')}
                        className="mr-2"
                      />
                      4:3
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="aspectRatio" 
                        checked={cropAspectRatio === '16:9'}
                        onChange={() => setCropAspectRatio('16:9')}
                        className="mr-2"
                      />
                      16:9
                    </label>
                  </div>
                </div>
                <button 
                  className="btn btn-primary w-full"
                  onClick={handleCrop}
                >
                  Apply Crop
                </button>
              </div>
            )}
            
            {activeTool === 'adjust' && (
              <div className="tool-panel">
                <h3 className="font-medium mb-2">Adjustments</h3>
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <label>Brightness</label>
                      <span>{brightness}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="200" 
                      value={brightness}
                      onChange={(e) => setBrightness(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <label>Contrast</label>
                      <span>{contrast}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="200" 
                      value={contrast}
                      onChange={(e) => setContrast(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <label>Saturation</label>
                      <span>{saturation}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="200" 
                      value={saturation}
                      onChange={(e) => setSaturation(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                <button 
                  className="btn btn-primary w-full"
                  onClick={applyAdjustments}
                >
                  Apply Adjustments
                </button>
              </div>
            )}
            
            {activeTool === 'filter' && (
              <div className="tool-panel">
                <h3 className="font-medium mb-2">Filters</h3>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {filters.map(filter => (
                    <div 
                      key={filter.id}
                      className={`filter-option ${selectedFilter === filter.id ? 'selected' : ''}`}
                      onClick={() => handleFilterChange(filter.id)}
                    >
                      <div 
                        className="filter-preview" 
                        style={{ 
                          backgroundImage: `url(${filter.preview})`,
                          filter: filter.value !== 'none' ? filter.value : 'none'
                        }}
                      ></div>
                      <div className="filter-name">{filter.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTool === 'text' && (
              <div className="tool-panel">
                <h3 className="font-medium mb-2">Add Text</h3>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block mb-1">Text</label>
                    <input 
                      type="text" 
                      className="input w-full" 
                      placeholder="Enter text..."
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Color</label>
                    <input 
                      type="color" 
                      className="w-full h-10" 
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Size</label>
                    <input 
                      type="range" 
                      min="12" 
                      max="72" 
                      value={textSize}
                      onChange={(e) => setTextSize(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-right text-sm">{textSize}px</div>
                  </div>
                  <div>
                    <label className="block mb-1">Style</label>
                    <div className="grid grid-cols-2 gap-2">
                      {textStyles.map(style => (
                        <button 
                          key={style.id}
                          className={`btn btn-sm ${selectedTextStyle === style.id ? 'btn-primary' : 'btn-outline'}`}
                          onClick={() => setSelectedTextStyle(style.id)}
                        >
                          {style.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <button 
                  className="btn btn-primary w-full"
                  onClick={applyText}
                  disabled={!textInput.trim()}
                >
                  Add Text
                </button>
              </div>
            )}
            
            {activeTool === 'draw' && (
              <div className="tool-panel">
                <h3 className="font-medium mb-2">Draw</h3>
                <div className="text-center py-4">
                  <p className="text-secondary mb-2">Drawing tools would be implemented here</p>
                  <p className="text-sm">Features would include brush size, color, opacity, and eraser</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="card">
            <div className="editor-container">
              {previewImage ? (
                <div className="editor-canvas-container">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="editor-preview"
                  />
                </div>
              ) : (
                <div className="editor-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-tertiary">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <h3 className="text-lg font-medium mb-2">No image selected</h3>
                  <p className="text-secondary mb-4">Upload an image to start editing</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Upload Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  )
}

export default ImageEditor
