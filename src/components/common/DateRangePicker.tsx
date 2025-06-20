import { useState } from 'react'

interface DateRangePickerProps {
  startDate: Date
  endDate: Date
  onChange: (start: Date, end: Date) => void
}

const DateRangePicker = ({ startDate, endDate, onChange }: DateRangePickerProps) => {
  const [showCalendar, setShowCalendar] = useState(false)
  const [tempStart, setTempStart] = useState(startDate)
  const [tempEnd, setTempEnd] = useState(endDate)
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  const handlePresetRange = (days: number) => {
    const end = new Date()
    const start = new Date()
    start.setDate(end.getDate() - days)
    
    setTempStart(start)
    setTempEnd(end)
    onChange(start, end)
    setShowCalendar(false)
  }
  
  const handleApply = () => {
    onChange(tempStart, tempEnd)
    setShowCalendar(false)
  }
  
  return (
    <div className="relative">
      <button 
        className="btn btn-outline"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        {formatDate(startDate)} - {formatDate(endDate)}
      </button>
      
      {showCalendar && (
        <div className="absolute left-0 top-12 bg-surface shadow-md rounded p-4 z-10 w-72">
          <div className="flex justify-between mb-4">
            <h3 className="font-medium">Date Range</h3>
            <button 
              className="text-secondary"
              onClick={() => setShowCalendar(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">Start Date</label>
              <input 
                type="date" 
                className="input w-full" 
                value={tempStart.toISOString().split('T')[0]}
                onChange={(e) => setTempStart(new Date(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">End Date</label>
              <input 
                type="date" 
                className="input w-full" 
                value={tempEnd.toISOString().split('T')[0]}
                onChange={(e) => setTempEnd(new Date(e.target.value))}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Presets</h4>
            <div className="grid grid-cols-2 gap-2">
              <button 
                className="btn btn-sm btn-outline w-full"
                onClick={() => handlePresetRange(7)}
              >
                Last 7 days
              </button>
              <button 
                className="btn btn-sm btn-outline w-full"
                onClick={() => handlePresetRange(30)}
              >
                Last 30 days
              </button>
              <button 
                className="btn btn-sm btn-outline w-full"
                onClick={() => handlePresetRange(90)}
              >
                Last 90 days
              </button>
              <button 
                className="btn btn-sm btn-outline w-full"
                onClick={() => handlePresetRange(365)}
              >
                Last year
              </button>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              className="btn btn-primary"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DateRangePicker
