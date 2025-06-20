import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuthStore()
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <div className="spinner"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" />
  }
  
  return <>{children}</>
}

export default ProtectedRoute
