import { useState } from 'react'

export interface RecurrenceSettings {
  enabled: boolean
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom'
  interval: number
  weekdays?: number[] // 0 = Sunday, 1 = Monday, etc.
  monthDay?: number // 1-31
  endDate?: string
  endAfterOccurrences?: number
  endType: 'never' | 'after' | 'on'
}

interface RecurrenceSelectorProps {
  value: RecurrenceSettings
  onChange: (settings: RecurrenceSettings) => void
}

const RecurrenceSelector = ({ value, onChange }: RecurrenceSelectorProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  const handleToggle = () => {
    onChange({
      ...value,
      enabled: !value.enabled
    })
  }
  
  const handleFrequencyChange = (frequency: RecurrenceSettings['frequency']) => {
    const newSettings = { ...value, frequency }
    
    // Set sensible defaults based on frequency
    if (frequency === 'daily') {
      newSettings.interval = 1
      newSettings.weekdays = undefined
      newSettings.monthDay = undefined
    } else if (frequency === 'weekly') {
      newSettings.interval = 1
      newSettings.weekdays = [new Date().getDay()] // Current day of week
      newSettings.monthDay = undefined
    } else if (frequency === 'monthly') {
      newSettings.interval = 1
      newSettings.weekdays = undefined
      newSettings.monthDay = new Date().getDate() // Current day of month
    }
    
    onChange(newSettings)
  }
  
  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interval = parseInt(e.target.value)
    if (interval > 0) {
      onChange({
        ...value,
        interval
      })
    }
  }
  
  const handleWeekdayToggle = (day: number) => {
    const weekdays = [...(value.weekdays || [])]
    const index = weekdays.indexOf(day)
    
    if (index >= 0) {
      weekdays.splice(index, 1)
    } else {
      weekdays.push(day)
    }
    
    onChange({
      ...value,
      weekdays: weekdays.sort()
    })
  }
  
  const handleMonthDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...value,
      monthDay: parseInt(e.target.value)
    })
  }
  
  const handleEndTypeChange = (endType: RecurrenceSettings['endType']) => {
    onChange({
      ...value,
      endType
    })
  }
  
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      endDate: e.target.value
    })
  }
  
  const handleOccurrencesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const occurrences = parseInt(e.target.value)
    if (occurrences > 0) {
      onChange({
        ...value,
        endAfterOccurrences: occurrences
      })
    }
  }
  
  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="enable-recurrence"
          checked={value.enabled}
          onChange={handleToggle}
          className="mr-2"
        />
        <label htmlFor="enable-recurrence" className="form-label mb-0">
          Make this a recurring post
        </label>
      </div>
      
      {value.enabled && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group mb-0">
              <label className="form-label">Frequency</label>
              <select
                className="form-input"
                value={value.frequency}
                onChange={(e) => handleFrequencyChange(e.target.value as RecurrenceSettings['frequency'])}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            
            <div className="form-group mb-0">
              <label className="form-label">Repeat every</label>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={value.interval}
                  onChange={handleIntervalChange}
                  className="form-input w-20 mr-2"
                />
                <span>
                  {value.frequency === 'daily' && 'day(s)'}
                  {value.frequency === 'weekly' && 'week(s)'}
                  {value.frequency === 'monthly' && 'month(s)'}
                  {value.frequency === 'custom' && 'custom period(s)'}
                </span>
              </div>
            </div>
          </div>
          
          {value.frequency === 'weekly' && (
            <div className="form-group">
              <label className="form-label">On these days</label>
              <div className="flex flex-wrap gap-2">
                {weekdayNames.map((name, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`btn btn-sm ${
                      value.weekdays?.includes(index) ? 'btn-primary' : 'btn-outline'
                    }`}
                    onClick={() => handleWeekdayToggle(index)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {value.frequency === 'monthly' && (
            <div className="form-group">
              <label className="form-label">On day of month</label>
              <select
                className="form-input"
                value={value.monthDay}
                onChange={handleMonthDayChange}
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div className="form-group">
            <button
              type="button"
              className="text-primary text-sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? 'Hide advanced options' : 'Show advanced options'}
            </button>
          </div>
          
          {showAdvanced && (
            <div className="form-group border-t pt-4">
              <label className="form-label">End</label>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="end-never"
                    name="end-type"
                    checked={value.endType === 'never'}
                    onChange={() => handleEndTypeChange('never')}
                    className="mr-2"
                  />
                  <label htmlFor="end-never">Never</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="end-after"
                    name="end-type"
                    checked={value.endType === 'after'}
                    onChange={() => handleEndTypeChange('after')}
                    className="mr-2"
                  />
                  <label htmlFor="end-after" className="mr-2">After</label>
                  <input
                    type="number"
                    min="1"
                    value={value.endAfterOccurrences || 10}
                    onChange={handleOccurrencesChange}
                    disabled={value.endType !== 'after'}
                    className="form-input w-20 mr-2"
                  />
                  <span>occurrences</span>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="end-on"
                    name="end-type"
                    checked={value.endType === 'on'}
                    onChange={() => handleEndTypeChange('on')}
                    className="mr-2"
                  />
                  <label htmlFor="end-on" className="mr-2">On</label>
                  <input
                    type="date"
                    value={value.endDate || ''}
                    onChange={handleEndDateChange}
                    disabled={value.endType !== 'on'}
                    className="form-input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className="text-sm text-secondary mt-2">
            <p>
              {getRecurrenceSummary(value)}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

function getRecurrenceSummary(settings: RecurrenceSettings): string {
  if (!settings.enabled) return ''
  
  const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  
  let summary = 'This post will be published '
  
  if (settings.frequency === 'daily') {
    if (settings.interval === 1) {
      summary += 'every day'
    } else {
      summary += `every ${settings.interval} days`
    }
  } else if (settings.frequency === 'weekly') {
    if (settings.interval === 1) {
      summary += 'every week'
    } else {
      summary += `every ${settings.interval} weeks`
    }
    
    if (settings.weekdays && settings.weekdays.length > 0) {
      const dayNames = settings.weekdays.map(day => weekdayNames[day])
      if (dayNames.length === 1) {
        summary += ` on ${dayNames[0]}`
      } else if (dayNames.length === 2) {
        summary += ` on ${dayNames[0]} and ${dayNames[1]}`
      } else {
        const lastDay = dayNames.pop()
        summary += ` on ${dayNames.join(', ')}, and ${lastDay}`
      }
    }
  } else if (settings.frequency === 'monthly') {
    if (settings.interval === 1) {
      summary += 'every month'
    } else {
      summary += `every ${settings.interval} months`
    }
    
    if (settings.monthDay) {
      summary += ` on day ${settings.monthDay}`
    }
  } else {
    summary += 'on a custom schedule'
  }
  
  if (settings.endType === 'after' && settings.endAfterOccurrences) {
    summary += `, ending after ${settings.endAfterOccurrences} occurrences`
  } else if (settings.endType === 'on' && settings.endDate) {
    const endDate = new Date(settings.endDate)
    summary += `, ending on ${endDate.toLocaleDateString()}`
  }
  
  return summary
}

export default RecurrenceSelector
