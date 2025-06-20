import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

interface OptimalTimesChartProps {
  platforms: string[]
  dateRange: { start: Date; end: Date }
}

const OptimalTimesChart = ({ platforms, dateRange }: OptimalTimesChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  
  useEffect(() => {
    if (!chartRef.current || platforms.length === 0) return
    
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }
    
    // Generate data for each platform
    const datasets = platforms.map(platform => {
      const color = getPlatformColor(platform)
      
      // Generate random engagement data for different hours
      // In a real app, this would come from actual analytics data
      const data = Array.from({ length: 24 }, (_, hour) => {
        // Create a pattern where engagement is higher during certain hours
        // based on the platform
        let baseEngagement = 0
        
        if (platform === 'instagram' || platform === 'instagram_reels') {
          // Instagram: peaks in morning and evening
          baseEngagement = hour >= 7 && hour <= 9 ? 80 : 
                          hour >= 17 && hour <= 21 ? 90 : 50
        } else if (platform === 'facebook') {
          // Facebook: peaks mid-day and evening
          baseEngagement = hour >= 11 && hour <= 13 ? 85 : 
                          hour >= 19 && hour <= 22 ? 75 : 45
        } else if (platform === 'tiktok') {
          // TikTok: peaks in evening
          baseEngagement = hour >= 18 && hour <= 23 ? 95 : 
                          hour >= 12 && hour <= 15 ? 70 : 40
        } else if (platform === 'youtube' || platform === 'youtube_shorts') {
          // YouTube: peaks in evening
          baseEngagement = hour >= 17 && hour <= 22 ? 90 : 
                          hour >= 12 && hour <= 16 ? 65 : 35
        } else {
          // LinkedIn: peaks during business hours
          baseEngagement = hour >= 8 && hour <= 11 ? 85 : 
                          hour >= 16 && hour <= 18 ? 80 : 30
        }
        
        // Add some randomness
        return baseEngagement + Math.floor(Math.random() * 20) - 10
      })
      
      return {
        label: getPlatformName(platform),
        data,
        borderColor: color,
        backgroundColor: `${color}33`,
        tension: 0.3,
        fill: false
      }
    })
    
    // Create chart
    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: Array.from({ length: 24 }, (_, i) => {
          const hour = i % 12 || 12
          const ampm = i < 12 ? 'AM' : 'PM'
          return `${hour} ${ampm}`
        }),
        datasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              title: (items) => {
                const hour = parseInt(items[0].label.split(' ')[0])
                const ampm = items[0].label.split(' ')[1]
                const hourNum = ampm === 'PM' && hour !== 12 ? hour + 12 : hour === 12 && ampm === 'AM' ? 0 : hour
                return `${items[0].label} (${hourNum}:00)`
              },
              label: (context) => {
                const value = context.parsed.y
                return `${context.dataset.label}: ${value}% engagement`
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Hour of Day'
            }
          },
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Engagement Rate (%)'
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
          <p className="text-secondary">Select at least one platform to view optimal posting times</p>
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

function getPlatformName(platformId: string): string {
  const platforms: Record<string, string> = {
    instagram: 'Instagram',
    instagram_reels: 'Instagram Reels',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    youtube_shorts: 'YouTube Shorts',
    linkedin: 'LinkedIn'
  }
  
  return platforms[platformId] || platformId
}

export default OptimalTimesChart
