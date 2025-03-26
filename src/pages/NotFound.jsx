import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Diamond } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative z-10 h-24 w-24 rounded-full bg-white dark:bg-surface-800 shadow-xl flex items-center justify-center border border-surface-200 dark:border-surface-700">
              <Diamond className="h-12 w-12 text-primary" />
            </div>
          </div>
        </div>
        
        <h1 className="font-heading text-6xl font-bold mb-4 text-surface-900 dark:text-white">404</h1>
        <h2 className="font-heading text-2xl font-semibold mb-4 text-surface-800 dark:text-surface-200">Page Not Found</h2>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        
        <Link 
          to="/" 
          className="btn btn-primary inline-flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="mt-12">
          <div className="flex justify-center gap-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <motion.div 
                key={index}
                className="h-2 w-2 rounded-full bg-primary/30 dark:bg-primary/20"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound