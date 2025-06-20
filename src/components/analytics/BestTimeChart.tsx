import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

interface BestTimeChartProps {
  platforms: string[]
  dateRange: { start: Date; end: Date }
}

const BestTimeChart = ({ platforms, dateRange }: BestTimeChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  
  useEffect(() => {
    if (!chartRef.current || platforms.length === 0) return
    
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }
    
    // Hours of the day
    const hours = Array.from({ length: 24 }, (_, i) => {
      const hour = i % 12 || 12
      const ampm = i < 12 ? 'AM' : 'PM'
      return `${hour}${ampm}`
    })
    
    // Days of the week
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    
    // Generate heatmap data for the selected platform (use first one)
    const platform = platforms[0]
    
    // Generate random engagement data for each day and hour
    const data = days.map(() => 
      hours.map(() => Math.floor(Math.random() * 100))
    ).flat()
    
    // Create chart
    chartInstance.current = new Chart(chartRef.current, {
      type: 'heatmap',
      data: {
        labels: {
          x: hours,
          y: days
        },
        datasets: [{
          label: 'Engagement',
          data: data.map((value, i) => ({
            x: i % 24,
            y: Math.floor(i / 24),
            v: value
          })),
          backgroundColor: ({ raw }: any) => {
            const value = raw?.v || 0
            const color = getPlatformColor(platform)
            const alpha = Math.max(0.1, Math.min(0.9, value / 100))
            return `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`
          }
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: (items) => {
                const item = items[0]
                const day = days[item.parsed.y]
                const hour = hours[item.parsed.x]
                return `${day} at ${hour}`
              },
              label: (item) => {
                const value = item.raw as any
                return `Engagement: ${value.v}`
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Hour of Day'
            },
            ticks: {
              maxRotation: 90,
              minRotation: 90
            }
          },
          y: {
            title: {
              display: true,
              text: 'Day of Week'
            }
          }
        }
      }
    })
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [platforms, dateRange])
  
  return (
    <div className="w-full h-64">
      {platforms.length > 0 ? (
        <canvas ref={chartRef}></canvas>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-secondary">Select at least one platform to view best posting times</p>
        </div>
      )}
    </div>
  )
}

function getPlatformColor(platformId: string): string {
  const colors: Record<string, string> = {
    instagram: '#E1306C',
    instagram_reels: '#E1306C',
    facebook: '#4267B2',
    tiktok: '#000000',
    youtube: '#FF0000',
    youtube_shorts: '#FF0000',
    linkedin: '#0077B5'
  }
  
  return colors[platformId] || '#6B7280'
}

export default BestTimeChart
