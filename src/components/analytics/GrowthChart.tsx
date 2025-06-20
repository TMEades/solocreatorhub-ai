import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

interface GrowthChartProps {
  platforms: string[]
  dateRange: { start: Date; end: Date }
}

const GrowthChart = ({ platforms, dateRange }: GrowthChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  
  useEffect(() => {
    if (!chartRef.current) return
    
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }
    
    // Generate dates between start and end date
    const dates: string[] = []
    const currentDate = new Date(dateRange.start)
    while (currentDate <= dateRange.end) {
      dates.push(currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    // Generate random data for each platform
    const datasets = platforms.map(platform => {
      const color = getPlatformColor(platform)
      
      // Generate cumulative growth data
      let baseFollowers = Math.floor(Math.random() * 10000) + 1000
      const growthData = dates.map(() => {
        const growth = Math.floor(Math.random() * 50) - 10 // Can be negative
        baseFollowers += growth
        return baseFollowers
      })
      
      return {
        label: getPlatformName(platform),
        data: growthData,
        borderColor: color,
        backgroundColor: `${color}33`,
        tension: 0.3,
        fill: true
      }
    })
    
    // Create chart
    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: dates,
        datasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Followers'
            }
          },
          x: {
            ticks: {
              maxRotation: 45,
              minRotation: 45
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
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
      <canvas ref={chartRef}></canvas>
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

export default GrowthChart
