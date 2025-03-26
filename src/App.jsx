import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Sun, Moon, Diamond, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-800/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Diamond className="h-6 w-6 text-primary" />
            <span className="font-heading text-2xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              GemCraft
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="font-medium text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
              Design Studio
            </a>
            <a href="#" className="font-medium text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
              Gallery
            </a>
            <a href="#" className="font-medium text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
              Materials
            </a>
            <a href="#" className="font-medium text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
              About
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5 text-secondary" />
                  ) : (
                    <Moon className="h-5 w-5 text-primary" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
            
            <button
              className="hidden md:block px-4 py-2 rounded-full bg-primary hover:bg-primary-dark text-white font-medium transition-colors shadow-soft"
            >
              Sign In
            </button>
            
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-surface-600 dark:text-surface-300" />
              ) : (
                <Menu className="h-5 w-5 text-surface-600 dark:text-surface-300" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <a href="#" className="py-2 font-medium text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
                  Design Studio
                </a>
                <a href="#" className="py-2 font-medium text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
                  Gallery
                </a>
                <a href="#" className="py-2 font-medium text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
                  Materials
                </a>
                <a href="#" className="py-2 font-medium text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
                  About
                </a>
                <button
                  className="w-full py-2 rounded-full bg-primary hover:bg-primary-dark text-white font-medium transition-colors shadow-soft"
                >
                  Sign In
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="bg-surface-100 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Diamond className="h-5 w-5 text-primary" />
                <span className="font-heading text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  GemCraft
                </span>
              </div>
              <p className="text-surface-600 dark:text-surface-400 text-sm">
                Create beautiful, custom jewelry pieces with our interactive design platform.
              </p>
            </div>
            
            <div>
              <h3 className="font-heading text-lg font-semibold mb-4 text-surface-800 dark:text-surface-200">Features</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors">3D Designer</a></li>
                <li><a href="#" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors">Material Library</a></li>
                <li><a href="#" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors">Saved Designs</a></li>
                <li><a href="#" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors">Custom Orders</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading text-lg font-semibold mb-4 text-surface-800 dark:text-surface-200">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors">About Us</a></li>
                <li><a href="#" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors">Careers</a></li>
                <li><a href="#" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors">Blog</a></li>
                <li><a href="#" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading text-lg font-semibold mb-4 text-surface-800 dark:text-surface-200">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-surface-500 dark:text-surface-400 text-sm">
              © {new Date().getFullYear()} GemCraft. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-surface-500 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-surface-500 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-surface-500 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App