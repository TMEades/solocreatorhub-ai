import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container page">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-secondary mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}

export default NotFound
