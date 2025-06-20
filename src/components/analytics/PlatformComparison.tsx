import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

interface PlatformComparisonProps {
  platforms: string[]
  dateRange: { start: Date; end: Date }
}

const PlatformComparison = ({ platforms, dateRange }: PlatformComparisonProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  
  useEffect(() => {
    if (!chartRef.current || platforms.length === 0) return
    
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }
    
    // Metrics to compare
    const metrics = ['Engagement Rate', 'Reach', 'Follower Growth', 'Post Frequency', 'Avg. Comments']
    
    // Generate random data for each platform
    const datasets = platforms.map(platform => {
      const color = getPlatformColor(platform)
      return {
        label: getPlatformName(platform),
        data: metrics.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: `${color}66`,
        borderColor: color,
        borderWidth: 1
      }
    })
    
    // Create chart
    chartInstance.current = new Chart(chartRef.current, {
      type: 'radar',
      data: {
        labels: metrics,
        datasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20
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
    <div className="w-full" style={{ height: '400px' }}>
      {platforms.length > 0 ? (
        <canvas ref={chartRef}></canvas>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-secondary">Select at least one platform to compare metrics</p>
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

export default PlatformComparison
