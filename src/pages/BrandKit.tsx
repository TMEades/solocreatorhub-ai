import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface ColorPalette {
  id: string
  name: string
  colors: string[]
  isPrimary: boolean
}

interface Font {
  id: string
  name: string
  family: string
  category: 'heading' | 'body' | 'accent'
  weights: string[]
  isPrimary: boolean
}

interface Logo {
  id: string
  name: string
  url: string
  type: 'primary' | 'secondary' | 'mark' | 'wordmark'
  background: 'light' | 'dark' | 'transparent'
  fileType: 'svg' | 'png' | 'jpg'
}

interface WatermarkSetting {
  id: string
  name: string
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  opacity: number
  size: number
  padding: number
  isDefault: boolean
}

const BrandKit = () => {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'logos' | 'watermarks'>('colors')
  const [colorPalettes, setColorPalettes] = useState<ColorPalette[]>([])
  const [fonts, setFonts] = useState<Font[]>([])
  const [logos, setLogos] = useState<Logo[]>([])
  const [watermarkSettings, setWatermarkSettings] = useState<WatermarkSetting[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLogo, setSelectedLogo] = useState<Logo | null>(null)
  const [selectedWatermark, setSelectedWatermark] = useState<WatermarkSetting | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isWatermarking, setIsWatermarking] = useState(false)
  const [watermarkedImage, setWatermarkedImage] = useState<string | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    // Simulate loading brand kit data
    setIsLoading(true)
    
    setTimeout(() => {
      const mockColorPalettes: ColorPalette[] = [
        {
          id: '1',
          name: 'Primary Brand Colors',
          colors: ['#3B82F6', '#1E40AF', '#DBEAFE', '#1E293B', '#F8FAFC'],
          isPrimary: true
        },
        {
          id: '2',
          name: 'Secondary Palette',
          colors: ['#10B981', '#059669', '#D1FAE5', '#6366F1', '#F43F5E'],
          isPrimary: false
        },
        {
          id: '3',
          name: 'Neutral Tones',
          colors: ['#0F172A', '#334155', '#64748B', '#CBD5E1', '#F1F5F9'],
          isPrimary: false
        }
      ]
      
      const mockFonts: Font[] = [
        {
          id: '1',
          name: 'Primary Heading',
          family: 'Montserrat',
          category: 'heading',
          weights: ['600', '700', '800'],
          isPrimary: true
        },
        {
          id: '2',
          name: 'Body Text',
          family: 'Inter',
          category: 'body',
          weights: ['400', '500', '600'],
          isPrimary: true
        },
        {
          id: '3',
          name: 'Accent Font',
          family: 'Playfair Display',
          category: 'accent',
          weights: ['700', '900'],
          isPrimary: false
        }
      ]
      
      const mockLogos: Logo[] = [
        {
          id: '1',
          name: 'Primary Logo',
          url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          type: 'primary',
          background: 'light',
          fileType: 'svg'
        },
        {
          id: '2',
          name: 'Dark Background Logo',
          url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          type: 'primary',
          background: 'dark',
          fileType: 'svg'
        },
        {
          id: '3',
          name: 'Logo Mark',
          url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          type: 'mark',
          background: 'transparent',
          fileType: 'png'
        },
        {
          id: '4',
          name: 'Wordmark',
          url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          type: 'wordmark',
          background: 'transparent',
          fileType: 'svg'
        }
      ]
      
      const mockWatermarkSettings: WatermarkSetting[] = [
        {
          id: '1',
          name: 'Default Corner Watermark',
          position: 'bottom-right',
          opacity: 0.7,
          size: 20,
          padding: 15,
          isDefault: true
        },
        {
          id: '2',
          name: 'Subtle Center Watermark',
          position: 'center',
          opacity: 0.3,
          size: 40,
          padding: 0,
          isDefault: false
        },
        {
          id: '3',
          name: 'Top Left Small',
          position: 'top-left',
          opacity: 0.8,
          size: 15,
          padding: 10,
          isDefault: false
        }
      ]
      
      setColorPalettes(mockColorPalettes)
      setFonts(mockFonts)
      setLogos(mockLogos)
      setWatermarkSettings(mockWatermarkSettings)
      
      // Set default selected logo and watermark
      setSelectedLogo(mockLogos[0])
      setSelectedWatermark(mockWatermarkSettings[0])
      
      setIsLoading(false)
    }, 1500)
  }, [])
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setPreviewImage(imageUrl)
        setWatermarkedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const applyWatermark = () => {
    if (!previewImage || !selectedLogo || !selectedWatermark || !canvasRef.current) return
    
    setIsWatermarking(true)
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const mainImage = new Image()
    mainImage.crossOrigin = 'anonymous'
    mainImage.onload = () => {
      canvas.width = mainImage.width
      canvas.height = mainImage.height
      
      // Draw the main image
      ctx.drawImage(mainImage, 0, 0, mainImage.width, mainImage.height)
      
      // Load and draw the watermark
      const watermarkImage = new Image()
      watermarkImage.crossOrigin = 'anonymous'
      watermarkImage.onload = () => {
        // Calculate watermark size based on main image dimensions
        const watermarkSize = Math.min(mainImage.width, mainImage.height) * (selectedWatermark.size / 100)
        const aspectRatio = watermarkImage.width / watermarkImage.height
        const watermarkWidth = watermarkSize * aspectRatio
        const watermarkHeight = watermarkSize
        
        // Set opacity
        ctx.globalAlpha = selectedWatermark.opacity
        
        // Calculate position
        let x = 0
        let y = 0
        const padding = selectedWatermark.padding
        
        switch (selectedWatermark.position) {
          case 'top-left':
            x = padding
            y = padding
            break
          case 'top-right':
            x = mainImage.width - watermarkWidth - padding
            y = padding
            break
          case 'bottom-left':
            x = padding
            y = mainImage.height - watermarkHeight - padding
            break
          case 'bottom-right':
            x = mainImage.width - watermarkWidth - padding
            y = mainImage.height - watermarkHeight - padding
            break
          case 'center':
            x = (mainImage.width - watermarkWidth) / 2
            y = (mainImage.height - watermarkHeight) / 2
            break
        }
        
        // Draw the watermark
        ctx.drawImage(watermarkImage, x, y, watermarkWidth, watermarkHeight)
        
        // Reset opacity
        ctx.globalAlpha = 1.0
        
        // Convert canvas to image
        const watermarkedImageUrl = canvas.toDataURL('image/jpeg')
        setWatermarkedImage(watermarkedImageUrl)
        setIsWatermarking(false)
      }
      watermarkImage.src = selectedLogo.url
    }
    mainImage.src = previewImage
  }
  
  const downloadWatermarkedImage = () => {
    if (!watermarkedImage) return
    
    const link = document.createElement('a')
    link.href = watermarkedImage
    link.download = 'watermarked-image.jpg'
    link.click()
  }
  
  const setPrimaryColorPalette = (paletteId: string) => {
    setColorPalettes(colorPalettes.map(palette => ({
      ...palette,
      isPrimary: palette.id === paletteId
    })))
  }
  
  const setPrimaryFont = (fontId: string, category: 'heading' | 'body' | 'accent') => {
    setFonts(fonts.map(font => ({
      ...font,
      isPrimary: font.category === category ? font.id === fontId : font.isPrimary
    })))
  }
  
  const setDefaultWatermark = (watermarkId: string) => {
    setWatermarkSettings(watermarkSettings.map(setting => ({
      ...setting,
      isDefault: setting.id === watermarkId
    })))
    
    const selected = watermarkSettings.find(setting => setting.id === watermarkId)
    if (selected) {
      setSelectedWatermark(selected)
    }
  }
  
  const getPositionName = (position: string): string => {
    switch (position) {
      case 'top-left': return 'Top Left'
      case 'top-right': return 'Top Right'
      case 'bottom-left': return 'Bottom Left'
      case 'bottom-right': return 'Bottom Right'
      case 'center': return 'Center'
      default: return position
    }
  }
  
  return (
    <div className="container page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Brand Kit</h1>
        <div className="flex space-x-2">
          <button className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Upload Assets
          </button>
          <button className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Save Changes
          </button>
        </div>
      </div>
      
      <div className="tabs mb-6">
        <button 
          className={`tab ${activeTab === 'colors' ? 'active' : ''}`}
          onClick={() => setActiveTab('colors')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <circle cx="13.5" cy="6.5" r="2.5"></circle>
            <circle cx="17.5" cy="10.5" r="2.5"></circle>
            <circle cx="8.5" cy="7.5" r="2.5"></circle>
            <circle cx="6.5" cy="12.5" r="2.5"></circle>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
          </svg>
          Colors
        </button>
        <button 
          className={`tab ${activeTab === 'typography' ? 'active' : ''}`}
          onClick={() => setActiveTab('typography')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <polyline points="4 7 4 4 20 4 20 7"></polyline>
            <line x1="9" y1="20" x2="15" y2="20"></line>
            <line x1="12" y1="4" x2="12" y2="20"></line>
          </svg>
          Typography
        </button>
        <button 
          className={`tab ${activeTab === 'logos' ? 'active' : ''}`}
          onClick={() => setActiveTab('logos')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          Logos
        </button>
        <button 
          className={`tab ${activeTab === 'watermarks' ? 'active' : ''}`}
          onClick={() => setActiveTab('watermarks')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
            <line x1="16" y1="8" x2="2" y2="22"></line>
            <line x1="17.5" y1="15" x2="9" y2="15"></line>
          </svg>
          Watermarks
        </button>
      </div>
      
      {isLoading ? (
        <div className="card text-center p-8">
          <div className="spinner mx-auto"></div>
          <p className="mt-4">Loading brand kit...</p>
        </div>
      ) : (
        <>
          {activeTab === 'colors' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="card">
                  <h2 className="text-lg font-bold mb-4">Color Palettes</h2>
                  
                  <div className="space-y-6">
                    {colorPalettes.map(palette => (
                      <div key={palette.id} className="color-palette">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{palette.name}</h3>
                          <div className="flex items-center">
                            {palette.isPrimary && (
                              <span className="primary-badge">Primary</span>
                            )}
                            <button 
                              className="btn btn-sm btn-outline ml-2"
                              onClick={() => setPrimaryColorPalette(palette.id)}
                              disabled={palette.isPrimary}
                            >
                              Set as Primary
                            </button>
                          </div>
                        </div>
                        
                        <div className="color-swatches">
                          {palette.colors.map((color, index) => (
                            <div key={index} className="color-swatch">
                              <div 
                                className="color-preview" 
                                style={{ backgroundColor: color }}
                              ></div>
                              <div className="color-code">{color}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="btn btn-outline w-full mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add New Palette
                  </button>
                </div>
              </div>
              
              <div>
                <div className="card">
                  <h2 className="text-lg font-bold mb-4">Color Usage Guidelines</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Primary Colors</h3>
                      <p className="text-secondary">Use primary colors for main brand elements, CTAs, and important UI components. Maintain consistent usage across all platforms.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Secondary Colors</h3>
                      <p className="text-secondary">Secondary colors should complement primary colors and be used for accents, backgrounds, and supporting elements.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Neutral Tones</h3>
                      <p className="text-secondary">Use neutral colors for text, backgrounds, and to create balance in your designs. They provide contrast and improve readability.</p>
                    </div>
                    
                    <div className="color-examples">
                      <div className="color-example">
                        <div className="example-label">Button Example</div>
                        <div className="example-preview">
                          <button className="example-button primary">Primary Button</button>
                          <button className="example-button secondary">Secondary</button>
                        </div>
                      </div>
                      
                      <div className="color-example">
                        <div className="example-label">Text Example</div>
                        <div className="example-preview">
                          <p className="example-text-primary">Primary Text Color</p>
                          <p className="example-text-secondary">Secondary Text Color</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card mt-6">
                  <h2 className="text-lg font-bold mb-4">Export Options</h2>
                  
                  <div className="space-y-2">
                    <button className="btn btn-outline w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Export as CSS Variables
                    </button>
                    <button className="btn btn-outline w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Export as SCSS Variables
                    </button>
                    <button className="btn btn-outline w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Export as Tailwind Config
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'typography' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="card">
                  <h2 className="text-lg font-bold mb-4">Font Families</h2>
                  
                  <div className="space-y-6">
                    {fonts.map(font => (
                      <div key={font.id} className="font-item">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{font.name}</h3>
                          <div className="flex items-center">
                            {font.isPrimary && (
                              <span className="primary-badge">Primary</span>
                            )}
                            <button 
                              className="btn btn-sm btn-outline ml-2"
                              onClick={() => setPrimaryFont(font.id, font.category)}
                              disabled={font.isPrimary}
                            >
                              Set as Primary
                            </button>
                          </div>
                        </div>
                        
                        <div className="font-details">
                          <div className="font-info">
                            <div>Family: <span className="font-medium">{font.family}</span></div>
                            <div>Category: <span className="font-medium">{font.category.charAt(0).toUpperCase() + font.category.slice(1)}</span></div>
                            <div>Weights: <span className="font-medium">{font.weights.join(', ')}</span></div>
                          </div>
                          
                          <div className="font-preview" style={{ fontFamily: font.family }}>
                            <div className="preview-heading">Aa</div>
                            <div className="preview-text">The quick brown fox jumps over the lazy dog</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="btn btn-outline w-full mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add New Font
                  </button>
                </div>
              </div>
              
              <div>
                <div className="card">
                  <h2 className="text-lg font-bold mb-4">Typography Guidelines</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Headings</h3>
                      <div className="typography-examples">
                        <div className="typography-example">
                          <div className="example-label">H1</div>
                          <div className="example-preview">
                            <h1 className="example-h1">Main Heading</h1>
                          </div>
                          <div className="example-specs">32px / 700 / 1.2</div>
                        </div>
                        
                        <div className="typography-example">
                          <div className="example-label">H2</div>
                          <div className="example-preview">
                            <h2 className="example-h2">Section Heading</h2>
                          </div>
                          <div className="example-specs">24px / 600 / 1.3</div>
                        </div>
                        
                        <div className="typography-example">
                          <div className="example-label">H3</div>
                          <div className="example-preview">
                            <h3 className="example-h3">Subsection Heading</h3>
                          </div>
                          <div className="example-specs">20px / 600 / 1.4</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Body Text</h3>
                      <div className="typography-examples">
                        <div className="typography-example">
                          <div className="example-label">Body</div>
                          <div className="example-preview">
                            <p className="example-body">This is the standard body text used for most content. It should be highly readable across all devices and screen sizes.</p>
                          </div>
                          <div className="example-specs">16px / 400 / 1.5</div>
                        </div>
                        
                        <div className="typography-example">
                          <div className="example-label">Small</div>
                          <div className="example-preview">
                            <p className="example-small">Small text for captions, footnotes, and secondary information.</p>
                          </div>
                          <div className="example-specs">14px / 400 / 1.5</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Special Text</h3>
                      <div className="typography-examples">
                        <div className="typography-example">
                          <div className="example-label">Quote</div>
                          <div className="example-preview">
                            <blockquote className="example-quote">
                              "A memorable quote or testimonial that stands out from the rest of the content."
                            </blockquote>
                          </div>
                          <div className="example-specs">18px / 500 / 1.4 / Italic</div>
                        </div>
                        
                        <div className="typography-example">
                          <div className="example-label">Button</div>
                          <div className="example-preview">
                            <button className="example-button-text">Button Text</button>
                          </div>
                          <div className="example-specs">16px / 600 / 1.2</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card mt-6">
                  <h2 className="text-lg font-bold mb-4">Export Options</h2>
                  
                  <div className="space-y-2">
                    <button className="btn btn-outline w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Export as CSS
                    </button>
                    <button className="btn btn-outline w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Export Font Files
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'logos' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="card">
                  <h2 className="text-lg font-bold mb-4">Logo Assets</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {logos.map(logo => (
                      <div 
                        key={logo.id}
                        className={`logo-card ${selectedLogo?.id === logo.id ? 'selected' : ''}`}
                        onClick={() => setSelectedLogo(logo)}
                      >
                        <div className={`logo-preview ${logo.background}`}>
                          <img src={logo.url} alt={logo.name} />
                        </div>
                        <div className="logo-info">
                          <h3 className="logo-name">{logo.name}</h3>
                          <div className="logo-meta">
                            <span className="logo-type">{logo.type.charAt(0).toUpperCase() + logo.type.slice(1)}</span>
                            <span className="logo-format">{logo.fileType.toUpperCase()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="btn btn-outline w-full mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Upload New Logo
                  </button>
                </div>
              </div>
              
              <div>
                <div className="card">
                  <h2 className="text-lg font-bold mb-4">Logo Usage Guidelines</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Clear Space</h3>
                      <p className="text-secondary">Always maintain a minimum clear space around the logo equal to the height of the logo mark.</p>
                      <div className="guideline-image mt-2">
                        <div className="clear-space-example">
                          <div className="clear-space-box">
                            <div className="clear-space-logo"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Minimum Size</h3>
                      <p className="text-secondary">Do not use the logo smaller than 30px in height for digital applications or 0.5 inches for print.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Incorrect Usage</h3>
                      <ul className="list-disc list-inside text-secondary space-y-1">
                        <li>Do not stretch or distort the logo</li>
                        <li>Do not change the logo colors</li>
                        <li>Do not place the logo on busy backgrounds</li>
                        <li>Do not add effects like shadows or outlines</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="card mt-6">
                  <h2 className="text-lg font-bold mb-4">Download Options</h2>
                  
                  <div className="space-y-2">
                    <button className="btn btn-outline w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Download All Logos (ZIP)
                    </button>
                    <button className="btn btn-outline w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Download Brand Guidelines (PDF)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'watermarks' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="card">
                  <h2 className="text-lg font-bold mb-4">Watermark Settings</h2>
                  
                  <div className="space-y-4">
                    {watermarkSettings.map(setting => (
                      <div 
                        key={setting.id}
                        className={`watermark-setting ${selectedWatermark?.id === setting.id ? 'selected' : ''}`}
                        onClick={() => setSelectedWatermark(setting)}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{setting.name}</h3>
                          <div className="flex items-center">
                            {setting.isDefault && (
                              <span className="default-badge">Default</span>
                            )}
                            <button 
                              className="btn btn-sm btn-outline ml-2"
                              onClick={(e) => {
                                e.stopPropagation()
                                setDefaultWatermark(setting.id)
                              }}
                              disabled={setting.isDefault}
                            >
                              Set Default
                            </button>
                          </div>
                        </div>
                        
                        <div className="watermark-details">
                          <div className="watermark-info">
                            <div>Position: <span className="font-medium">{getPositionName(setting.position)}</span></div>
                            <div>Opacity: <span className="font-medium">{setting.opacity * 100}%</span></div>
                            <div>Size: <span className="font-medium">{setting.size}%</span></div>
                            <div>Padding: <span className="font-medium">{setting.padding}px</span></div>
                          </div>
                          
                          <div className="watermark-preview">
                            <div className={`watermark-position ${setting.position}`}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="btn btn-outline w-full mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add New Setting
                  </button>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="card">
                  <h2 className="text-lg font-bold mb-4">Watermark Tool</h2>
                  
                  <div className="watermark-tool">
                    <div className="tool-section">
                      <h3 className="font-medium mb-2">1. Select Image</h3>
                      <div className="flex">
                        <button 
                          className="btn btn-outline flex-1 mr-2"
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
                      </div>
                    </div>
                    
                    <div className="tool-section">
                      <h3 className="font-medium mb-2">2. Preview & Apply</h3>
                      
                      {previewImage ? (
                        <div className="watermark-preview-container">
                          <div className="preview-image-container">
                            {watermarkedImage ? (
                              <img src={watermarkedImage} alt="Watermarked" className="preview-image" />
                            ) : (
                              <img src={previewImage} alt="Preview" className="preview-image" />
                            )}
                          </div>
                          
                          <div className="preview-controls">
                            <div className="flex space-x-2">
                              <button 
                                className="btn btn-primary flex-1"
                                onClick={applyWatermark}
                                disabled={isWatermarking || !selectedLogo || !selectedWatermark}
                              >
                                {isWatermarking ? (
                                  <>
                                    <div className="spinner-sm mr-2"></div>
                                    Applying...
                                  </>
                                ) : (
                                  <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                                      <line x1="16" y1="8" x2="2" y2="22"></line>
                                      <line x1="17.5" y1="15" x2="9" y2="15"></line>
                                    </svg>
                                    Apply Watermark
                                  </>
                                )}
                              </button>
                              
                              {watermarkedImage && (
                                <button 
                                  className="btn btn-outline"
                                  onClick={downloadWatermarkedImage}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                  </svg>
                                  Download
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="upload-placeholder">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-tertiary">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                          <p className="text-secondary mb-4">Upload an image to apply watermark</p>
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
                    
                    <div className="tool-section">
                      <h3 className="font-medium mb-2">3. Batch Processing</h3>
                      <p className="text-secondary mb-2">Need to watermark multiple images at once?</p>
                      <button className="btn btn-outline w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        Open Batch Processor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  )
}

export default BrandKit
