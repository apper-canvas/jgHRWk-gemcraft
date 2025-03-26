import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Diamond, Sparkles } from 'lucide-react'
import MainFeature from '../components/MainFeature'

const Home = () => {
  const [showDesigner, setShowDesigner] = useState(false)
  
  return (
    <div className="min-h-screen">
      {!showDesigner ? (
        <div className="container mx-auto px-4 py-12">
          <section className="mb-16">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="lg:w-1/2">
                <motion.h1 
                  className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-surface-900 dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Design Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Dream Jewelry</span> With Precision
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl text-surface-600 dark:text-surface-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Create stunning custom jewelry pieces with our interactive 3D design platform. Select materials, gemstones, and styles to bring your vision to life.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <button 
                    onClick={() => setShowDesigner(true)}
                    className="btn btn-primary flex items-center justify-center gap-2 group"
                  >
                    Start Designing
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="btn btn-outline">
                    View Gallery
                  </button>
                </motion.div>
              </div>
              
              <motion.div 
                className="lg:w-1/2 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl animate-pulse"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1584307833174-a3bbb76ab367?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Jewelry design showcase" 
                    className="relative z-10 rounded-2xl shadow-xl w-full h-auto object-cover aspect-square"
                  />
                  
                  <motion.div 
                    className="absolute -bottom-6 -right-6 bg-white dark:bg-surface-800 p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 border border-surface-200 dark:border-surface-700"
                    initial={{ x: 20, y: 20, opacity: 0 }}
                    animate={{ x: 0, y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Diamond className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-surface-900 dark:text-white">3D Designer</p>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Interactive & Intuitive</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -top-6 -left-6 bg-white dark:bg-surface-800 p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 border border-surface-200 dark:border-surface-700"
                    initial={{ x: -20, y: -20, opacity: 0 }}
                    animate={{ x: 0, y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium text-surface-900 dark:text-white">Premium Materials</p>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Highest Quality</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
          
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-surface-900 dark:text-white">
                Craft Your Perfect Piece
              </h2>
              <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
                From elegant rings to stunning necklaces, design jewelry that tells your unique story.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Rings",
                  description: "Design engagement, wedding, or statement rings",
                  image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                },
                {
                  title: "Necklaces",
                  description: "Create pendants, chains, and statement pieces",
                  image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                },
                {
                  title: "Earrings",
                  description: "Design studs, hoops, or dangling masterpieces",
                  image: "https://images.unsplash.com/photo-1635767798638-3665a0a107fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                },
                {
                  title: "Bracelets",
                  description: "Craft bangles, cuffs, and charm bracelets",
                  image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="gem-card group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="relative overflow-hidden rounded-t-xl aspect-square">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4">
                        <h3 className="font-heading text-xl font-semibold text-white">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-xl font-semibold mb-2 text-surface-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-surface-600 dark:text-surface-400 mb-4">
                      {item.description}
                    </p>
                    <button className="text-primary dark:text-primary-light font-medium flex items-center gap-2 group/btn">
                      Explore Designs
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
          
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-surface-900 dark:text-white">
                Premium Materials
              </h2>
              <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
                Choose from a curated selection of the finest metals and gemstones.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { name: "Gold", color: "bg-secondary", border: "border-secondary-dark" },
                { name: "Silver", color: "bg-surface-300", border: "border-surface-400" },
                { name: "Platinum", color: "bg-surface-200", border: "border-surface-300" },
                { name: "Rose Gold", color: "bg-[#E8BCAB]", border: "border-[#D7A99A]" },
                { name: "White Gold", color: "bg-[#E8E8E8]", border: "border-[#D7D7D7]" },
                { name: "Titanium", color: "bg-surface-500", border: "border-surface-600" },
              ].map((material, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className={`material-swatch ${material.color} ${material.border} shadow-md mb-3 gem-shine`}></div>
                  <span className="font-medium text-surface-800 dark:text-surface-200">{material.name}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { name: "Diamond", color: "bg-gem-diamond", border: "border-white" },
                { name: "Ruby", color: "bg-gem-ruby", border: "border-gem-ruby" },
                { name: "Sapphire", color: "bg-gem-sapphire", border: "border-gem-sapphire" },
                { name: "Emerald", color: "bg-gem-emerald", border: "border-gem-emerald" },
                { name: "Amethyst", color: "bg-gem-amethyst", border: "border-gem-amethyst" },
                { name: "Topaz", color: "bg-gem-topaz", border: "border-gem-topaz" },
              ].map((gem, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div className={`material-swatch ${gem.color} ${gem.border} shadow-gem mb-3 gem-shine`}></div>
                  <span className="font-medium text-surface-800 dark:text-surface-200">{gem.name}</span>
                </motion.div>
              ))}
            </div>
          </section>
          
          <section>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-surface-900 dark:text-white">
                    Ready to Create Your Masterpiece?
                  </h2>
                  <p className="text-lg text-surface-600 dark:text-surface-300 mb-6 md:mb-0 max-w-xl">
                    Start designing your custom jewelry piece today and bring your vision to life with our interactive platform.
                  </p>
                </div>
                <button 
                  onClick={() => setShowDesigner(true)}
                  className="btn btn-primary px-8 py-3 text-lg flex items-center gap-2 group"
                >
                  Launch Designer
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <MainFeature onBack={() => setShowDesigner(false)} />
      )}
    </div>
  )
}

export default Home