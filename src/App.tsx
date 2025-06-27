import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import ContentCreator from './pages/ContentCreator'
import MediaLibrary from './pages/MediaLibrary'
import Scheduler from './pages/Scheduler'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/content" element={
            <ProtectedRoute>
              <Layout>
                <ContentCreator />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/media" element={
            <ProtectedRoute>
              <Layout>
                <MediaLibrary />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/scheduler" element={
            <ProtectedRoute>
              <Layout>
                <Scheduler />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Layout>
                <Analytics />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  )
}

export default App
