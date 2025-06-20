import { useState } from 'react'

interface ExportReportButtonProps {
  dateRange: { start: Date; end: Date }
  platforms: string[]
}

const ExportReportButton = ({ dateRange, platforms }: ExportReportButtonProps) => {
  const [isExporting, setIsExporting] = useState(false)
  const [showExportOptions, setShowExportOptions] = useState(false)
  
  const handleExport = (format: 'pdf' | 'csv' | 'excel') => {
    setIsExporting(true)
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      setShowExportOptions(false)
      
      // In a real app, this would generate and download the report
      alert(`Report exported as ${format.toUpperCase()}`)
    }, 2000)
  }
  
  return (
    <div className="relative">
      <button 
        className="btn btn-primary"
        onClick={() => setShowExportOptions(!showExportOptions)}
        disabled={isExporting}
      >
        {isExporting ? (
          <>
            <div className="spinner-sm mr-2"></div>
            Exporting...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export Report
          </>
        )}
      </button>
      
      {showExportOptions && (
        <div className="absolute right-0 top-12 bg-surface shadow-md rounded p-2 z-10 w-48">
          <button 
            className="w-full text-left p-2 text-sm hover:bg-background rounded flex items-center"
            onClick={() => handleExport('pdf')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-red-500">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            PDF
          </button>
          <button 
            className="w-full text-left p-2 text-sm hover:bg-background rounded flex items-center"
            onClick={() => handleExport('csv')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            CSV
          </button>
          <button 
            className="w-full text-left p-2 text-sm hover:bg-background rounded flex items-center"
            onClick={() => handleExport('excel')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-500">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Excel
          </button>
        </div>
      )}
    </div>
  )
}

export default ExportReportButton
