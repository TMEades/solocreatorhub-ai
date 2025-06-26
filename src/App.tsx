import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ContentCreator from './pages/ContentCreator'
import Scheduler from './pages/Scheduler'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/content" element={<ContentCreator />} />
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}

export default App
