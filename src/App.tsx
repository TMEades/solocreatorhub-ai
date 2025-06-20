import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import './App.css';

// Placeholder components - in a real app, these would be imported from separate files
const Dashboard = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">SoleCreatorHub AI Dashboard</h2>
    <p className="mb-4">Welcome to your AI-powered social media management platform!</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-2">Quick Post</h3>
        <p>Create and schedule posts across multiple platforms.</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-2">Trending Hashtags</h3>
        <p>Discover trending hashtags to boost your reach.</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-2">Analytics Overview</h3>
        <p>Track your performance across all platforms.</p>
      </div>
    </div>
  </div>
);

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-[70vh]">
    <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
    <p className="mb-6">The page you're looking for doesn't exist.</p>
    <a href="/" className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors">
      Go Home
    </a>
  </div>
);

function App() {
  return (
    <div className="app min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
