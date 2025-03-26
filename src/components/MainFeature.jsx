import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, Minus, RotateCcw, Save, Download, Settings, X, Check, ChevronDown, ChevronUp } from 'lucide-react'
import ShapeSelector from './ShapeSelector'
import DesignDescription from './DesignDescription'

const MainFeature = ({ onBack }) => {
  // State for jewelry customization
  const [jewelryType, setJewelryType] = useState('ring')
  const [metalType, setMetalType] = useState('gold')
  const [gemType, setGemType] = useState(null) // Default to no gemstone
  const [gemSize, setGemSize] = useState(1)
  const [gemCount, setGemCount] = useState(1)
  const [ringSize, setRingSize] = useState(7)
  const [engravingText, setEngravingText] = useState('')
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)
  const [viewAngle, setViewAngle] = useState(0)
  const [savedDesigns, setSavedDesigns] = useState([])
  const [currentDesignName, setCurrentDesignName] = useState('')
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showSavedDesigns, setShowSavedDesigns] = useState(false)
  const [selectedShape, setSelectedShape] = useState('round')
  const [customShapes, setCustomShapes] = useState({})
  
  // Rotate the view
  useEffect(() => {
    const interval = setInterval(() => {
      setViewAngle(prev => (prev + 1) % 360)
    }, 100)
    
    return () => clearInterval(interval)
  }, [])
  
  // Calculate price based on selections
  const calculatePrice = () => {
    let basePrice = 0
    
    // Base price by jewelry type
    switch(jewelryType) {
      case 'ring': basePrice = 200; break;
      case 'necklace': basePrice = 300; break;
      case 'earrings': basePrice = 250; break;
      case 'bracelet': basePrice = 350; break;
      default: basePrice = 200;
    }
    
    // Metal type multiplier
    const metalMultiplier = {
      'gold': 1.5,
      'silver': 1,
      'platinum': 2,
      'rose-gold': 1.7,
      'white-gold': 1.6,
      'titanium': 1.3
    }
    
    // Calculate base metal price
    let price = basePrice * metalMultiplier[metalType];
    
    // Add gem price if gemstone is selected
    if (gemType) {
      // Gem type multiplier
      const gemMultiplier = {
        'diamond': 3,
        'ruby': 2.5,
        'sapphire': 2.2,
        'emerald': 2.7,
        'amethyst': 1.5,
        'topaz': 1.3
      }
      
      // Apply gem multiplier to the price
      price = price * (1 + (gemMultiplier[gemType] * gemSize * 0.5)) * (1 + (gemCount * 0.2));
    }
    
    return price.toFixed(2)
  }
  
  // Save current design
  const saveDesign = () => {
    if (!currentDesignName.trim()) return
    
    const newDesign = {
      id: Date.now().toString(),
      name: currentDesignName,
      type: jewelryType,
      metal: metalType,
      gem: gemType,
      gemSize: gemType ? gemSize : 0,
      gemCount: gemType ? gemCount : 0,
      ringSize,
      engraving: engravingText,
      shape: selectedShape,
      price: calculatePrice(),
      date: new Date().toISOString()
    }
    
    // Save custom shape data if using custom shape
    if (selectedShape.startsWith('custom-')) {
      newDesign.customShapeData = customShapes[selectedShape]
    }
    
    setSavedDesigns(prev => [...prev, newDesign])
    setShowSaveModal(false)
    setCurrentDesignName('')
  }
  
  // Load a saved design
  const loadDesign = (design) => {
    setJewelryType(design.type)
    setMetalType(design.metal)
    setGemType(design.gem)
    setGemSize(design.gemSize)
    setGemCount(design.gemCount)
    setRingSize(design.ringSize)
    setEngravingText(design.engraving)
    setSelectedShape(design.shape || 'round')
    
    // Load custom shape data if available
    if (design.customShapeData && design.shape.startsWith('custom-')) {
      setCustomShapes(prev => ({
        ...prev,
        [design.shape]: design.customShapeData
      }))
    }
    
    setShowSavedDesigns(false)
  }
  
  // Delete a saved design
  const deleteDesign = (id) => {
    setSavedDesigns(prev => prev.filter(design => design.id !== id))
  }
  
  // Reset to defaults
  const resetDesign = () => {
    setJewelryType('ring')
    setMetalType('gold')
    setGemType(null) // Reset to no gemstone
    setGemSize(1)
    setGemCount(1)
    setRingSize(7)
    setEngravingText('')
    setSelectedShape('round')
  }
  
  // Get metal color class
  const getMetalColorClass = () => {
    switch(metalType) {
      case 'gold': return 'bg-secondary';
      case 'silver': return 'bg-surface-300';
      case 'platinum': return 'bg-surface-200';
      case 'rose-gold': return 'bg-[#E8BCAB]';
      case 'white-gold': return 'bg-[#E8E8E8]';
      case 'titanium': return 'bg-surface-500';
      default: return 'bg-secondary';
    }
  }
  
  // Get gem color class
  const getGemColorClass = () => {
    if (!gemType) return 'bg-transparent';
    
    switch(gemType) {
      case 'diamond': return 'bg-white';
      case 'ruby': return 'bg-gem-ruby';
      case 'sapphire': return 'bg-gem-sapphire';
      case 'emerald': return 'bg-gem-emerald';
      case 'amethyst': return 'bg-gem-amethyst';
      case 'topaz': return 'bg-gem-topaz';
      default: return 'bg-white';
    }
  }

  // Handle shape selection
  const handleShapeSelect = (shapeId) => {
    setSelectedShape(shapeId)
    
    // Store custom shape data if it's a new custom shape
    if (shapeId.startsWith('custom-') && !customShapes[shapeId]) {
      const canvas = document.querySelector('canvas')
      if (canvas) {
        setCustomShapes(prev => ({
          ...prev,
          [shapeId]: canvas.toDataURL('image/png')
        }))
      }
    }
  }
  
  // Get shape style and clip path based on selected shape
  const getShapeStyle = (shape) => {
    switch(shape) {
      case 'round': 
        return { borderRadius: '50%' };
      case 'square': 
        return { borderRadius: '0' };
      case 'triangle': 
        return { 
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          transform: 'rotate(0deg)'
        };
      case 'hexagon': 
        return { 
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
        };
      case 'heart': 
        return { 
          clipPath: 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")'
        };
      default: 
        return { borderRadius: '50%' };
    }
  }
  
  // Render gem or metal only
  const renderGemOrMetal = (gemSize, gemType, shapeStyle, customShape) => {
    if (!gemType) {
      // No gemstone selected - render metal only in chosen shape
      return (
        <div 
          className={`h-full w-full ${getMetalColorClass()} shadow-md`}
          style={shapeStyle}
        >
          {selectedShape.startsWith('custom-') && customShapes[selectedShape] && (
            <div 
              className={`h-full w-full ${getMetalColorClass()} shadow-md overflow-hidden`}
              style={{ maskImage: `url(${customShapes[selectedShape]})`, maskSize: 'contain', WebkitMaskImage: `url(${customShapes[selectedShape]})`, WebkitMaskSize: 'contain' }}
            />
          )}
        </div>
      );
    }
    
    // With gemstone
    return (
      <div 
        className={`h-full w-full ${getGemColorClass()} shadow-gem gem-shine`}
        style={shapeStyle}
      >
        {selectedShape.startsWith('custom-') && customShapes[selectedShape] && (
          <img 
            src={customShapes[selectedShape]} 
            alt="Custom Shape" 
            className="w-full h-full object-contain"
          />
        )}
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </button>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowSavedDesigns(true)}
            className="px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
          >
            My Designs
          </button>
          
          <button 
            onClick={() => setShowSaveModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white transition-colors"
          >
            <Save className="h-4 w-4" />
            Save Design
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left panel - Design controls */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card dark:shadow-none border border-surface-200 dark:border-surface-700 p-6">
            <h2 className="font-heading text-2xl font-semibold mb-6 text-surface-900 dark:text-white">Design Your Jewelry</h2>
            
            <div className="space-y-6">
              {/* Jewelry Type */}
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Jewelry Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['ring', 'necklace', 'earrings', 'bracelet'].map(type => (
                    <button
                      key={type}
                      onClick={() => setJewelryType(type)}
                      className={`px-4 py-2 rounded-lg border ${
                        jewelryType === type 
                          ? 'border-primary bg-primary/10 text-primary dark:border-primary-light dark:bg-primary-dark/20 dark:text-primary-light' 
                          : 'border-surface-300 dark:border-surface-600 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                      } transition-colors capitalize`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Shape Selector */}
              <ShapeSelector onShapeSelect={handleShapeSelect} selectedShape={selectedShape} />
              
              {/* Metal Type */}
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Metal
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'gold', label: 'Gold' },
                    { id: 'silver', label: 'Silver' },
                    { id: 'platinum', label: 'Platinum' },
                    { id: 'rose-gold', label: 'Rose Gold' },
                    { id: 'white-gold', label: 'White Gold' },
                    { id: 'titanium', label: 'Titanium' }
                  ].map(metal => (
                    <button
                      key={metal.id}
                      onClick={() => setMetalType(metal.id)}
                      className={`relative px-4 py-2 rounded-lg border ${
                        metalType === metal.id 
                          ? 'border-primary bg-primary/10 text-primary dark:border-primary-light dark:bg-primary-dark/20 dark:text-primary-light' 
                          : 'border-surface-300 dark:border-surface-600 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                      } transition-colors text-sm`}
                    >
                      {metalType === metal.id && (
                        <motion.div
                          className="absolute -top-1 -right-1 h-3 w-3 bg-primary dark:bg-primary-light rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                      {metal.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Gemstone */}
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Gemstone (Optional)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: null, label: 'No Gemstone' },
                    { id: 'diamond', label: 'Diamond' },
                    { id: 'ruby', label: 'Ruby' },
                    { id: 'sapphire', label: 'Sapphire' },
                    { id: 'emerald', label: 'Emerald' },
                    { id: 'amethyst', label: 'Amethyst' },
                    { id: 'topaz', label: 'Topaz' }
                  ].map(gem => (
                    <button
                      key={gem.id ?? 'none'}
                      onClick={() => setGemType(gem.id)}
                      className={`relative px-4 py-2 rounded-lg border ${
                        (gemType === gem.id) || (gemType === null && gem.id === null)
                          ? 'border-primary bg-primary/10 text-primary dark:border-primary-light dark:bg-primary-dark/20 dark:text-primary-light' 
                          : 'border-surface-300 dark:border-surface-600 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                      } transition-colors text-sm`}
                    >
                      {((gemType === gem.id) || (gemType === null && gem.id === null)) && (
                        <motion.div
                          className="absolute -top-1 -right-1 h-3 w-3 bg-primary dark:bg-primary-light rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                      {gem.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Gem Size - Only show if gemstone is selected */}
              {gemType && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                      Gem Size
                    </label>
                    <span className="text-sm text-surface-500 dark:text-surface-400">
                      {gemSize.toFixed(1)} ct
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setGemSize(prev => Math.max(0.5, prev - 0.1))}
                      className="p-1 rounded-full bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                      disabled={gemSize <= 0.5}
                    >
                      <Minus className="h-4 w-4 text-surface-600 dark:text-surface-400" />
                    </button>
                    
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={gemSize}
                      onChange={(e) => setGemSize(parseFloat(e.target.value))}
                      className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary dark:[&::-webkit-slider-thumb]:bg-primary-light"
                    />
                    
                    <button 
                      onClick={() => setGemSize(prev => Math.min(3, prev + 0.1))}
                      className="p-1 rounded-full bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                      disabled={gemSize >= 3}
                    >
                      <Plus className="h-4 w-4 text-surface-600 dark:text-surface-400" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Gem Count - Only show if gemstone is selected */}
              {gemType && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                      Number of Gems
                    </label>
                    <span className="text-sm text-surface-500 dark:text-surface-400">
                      {gemCount}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setGemCount(prev => Math.max(1, prev - 1))}
                      className="p-1 rounded-full bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                      disabled={gemCount <= 1}
                    >
                      <Minus className="h-4 w-4 text-surface-600 dark:text-surface-400" />
                    </button>
                    
                    <input
                      type="range"
                      min="1"
                      max="7"
                      step="1"
                      value={gemCount}
                      onChange={(e) => setGemCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary dark:[&::-webkit-slider-thumb]:bg-primary-light"
                    />
                    
                    <button 
                      onClick={() => setGemCount(prev => Math.min(7, prev + 1))}
                      className="p-1 rounded-full bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                      disabled={gemCount >= 7}
                    >
                      <Plus className="h-4 w-4 text-surface-600 dark:text-surface-400" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Ring Size (only for rings) */}
              {jewelryType === 'ring' && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                      Ring Size
                    </label>
                    <span className="text-sm text-surface-500 dark:text-surface-400">
                      {ringSize}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setRingSize(prev => Math.max(4, prev - 0.5))}
                      className="p-1 rounded-full bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                      disabled={ringSize <= 4}
                    >
                      <Minus className="h-4 w-4 text-surface-600 dark:text-surface-400" />
                    </button>
                    
                    <input
                      type="range"
                      min="4"
                      max="13"
                      step="0.5"
                      value={ringSize}
                      onChange={(e) => setRingSize(parseFloat(e.target.value))}
                      className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary dark:[&::-webkit-slider-thumb]:bg-primary-light"
                    />
                    
                    <button 
                      onClick={() => setRingSize(prev => Math.min(13, prev + 0.5))}
                      className="p-1 rounded-full bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                      disabled={ringSize >= 13}
                    >
                      <Plus className="h-4 w-4 text-surface-600 dark:text-surface-400" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Engraving */}
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Engraving
                </label>
                <input
                  type="text"
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  placeholder="Add your personal message..."
                  maxLength={20}
                  className="input-field"
                />
                <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">
                  {20 - engravingText.length} characters remaining
                </p>
              </div>
              
              {/* Advanced Settings Toggle */}
              <div>
                <button
                  onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                  className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Advanced Settings</span>
                  </div>
                  {showAdvancedSettings ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                
                <AnimatePresence>
                  {showAdvancedSettings && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-4">
                        {/* Additional settings would go here */}
                        <p className="text-sm text-surface-500 dark:text-surface-400">
                          Advanced settings are not available in this preview version.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Reset Button */}
              <div>
                <button
                  onClick={resetDesign}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Center panel - 3D Visualization */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-surface-100 to-white dark:from-surface-800 dark:to-surface-900 rounded-xl shadow-card dark:shadow-none border border-surface-200 dark:border-surface-700 p-6 h-full flex flex-col">
            <h2 className="font-heading text-2xl font-semibold mb-6 text-surface-900 dark:text-white text-center">Preview</h2>
            
            <div className="flex-grow flex items-center justify-center">
              <div className="relative w-64 h-64">
                {/* Simulated 3D jewelry preview */}
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transform: `rotateY(${viewAngle}deg)` }}
                >
                  {jewelryType === 'ring' && (
                    <div className="relative">
                      {/* Ring band */}
                      <div className={`h-40 w-40 rounded-full border-[12px] ${getMetalColorClass()} shadow-xl transform rotate-45`}></div>
                      
                      {/* Gems */}
                      {gemType && gemCount > 1 && Array.from({ length: gemCount }).map((_, index) => {
                        const angle = (360 / gemCount) * index
                        const radius = 20 - gemSize * 2 // Adjust for gem size
                        const x = radius * Math.cos((angle * Math.PI) / 180)
                        const y = radius * Math.sin((angle * Math.PI) / 180)
                        
                        // Get shape style for the gem
                        const shapeStyle = getShapeStyle(selectedShape)
                        
                        return (
                          <div 
                            key={index}
                            className={`absolute ${getMetalColorClass()} shadow-xl`}
                            style={{
                              height: `${gemSize * 10}px`,
                              width: `${gemSize * 10}px`,
                              top: `calc(50% - ${gemSize * 5}px + ${y}px)`,
                              left: `calc(50% - ${gemSize * 5}px + ${x}px)`,
                              ...shapeStyle
                            }}
                          >
                            {renderGemOrMetal(gemSize, gemType, shapeStyle, customShapes[selectedShape])}
                          </div>
                        )
                      })}
                      
                      {/* Center gem for single gem or metal-only jewelry */}
                      <div 
                        className={`absolute top-1/2 left-1/2 ${getMetalColorClass()} shadow-xl`}
                        style={{
                          height: `${gemSize * 14}px`,
                          width: `${gemSize * 14}px`,
                          transform: 'translate(-50%, -50%)',
                          zIndex: 10,
                          ...getShapeStyle(selectedShape)
                        }}
                      >
                        {renderGemOrMetal(gemSize, gemType, getShapeStyle(selectedShape), customShapes[selectedShape])}
                      </div>
                      
                      {/* Engraving */}
                      {engravingText && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 text-center">
                          <p className="text-xs text-surface-500 dark:text-surface-400 italic">
                            "{engravingText}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {jewelryType === 'necklace' && (
                    <div className="relative">
                      {/* Chain */}
                      <div className={`h-48 w-48 rounded-full border-[3px] border-dashed ${getMetalColorClass()} opacity-80`}></div>
                      
                      {/* Pendant */}
                      <div 
                        className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 ${getMetalColorClass()} shadow-xl`}
                        style={{
                          height: `${gemSize * 8 + 10}px`,
                          width: `${gemSize * 8 + 10}px`,
                          ...getShapeStyle(selectedShape)
                        }}
                      >
                        {renderGemOrMetal(gemSize, gemType, getShapeStyle(selectedShape), customShapes[selectedShape])}
                      </div>
                      
                      {/* Additional gems */}
                      {gemType && gemCount > 1 && Array.from({ length: gemCount - 1 }).map((_, index) => {
                        const angle = (180 / (gemCount - 1)) * index + 180
                        const radius = 24 // Chain radius
                        const x = radius * Math.cos((angle * Math.PI) / 180)
                        const y = radius * Math.sin((angle * Math.PI) / 180)
                        
                        return (
                          <div 
                            key={index}
                            className={`absolute ${getMetalColorClass()} shadow-xl`}
                            style={{
                              height: `${gemSize * 4 + 4}px`,
                              width: `${gemSize * 4 + 4}px`,
                              top: `calc(50% - ${(gemSize * 4 + 4) / 2}px + ${y}px)`,
                              left: `calc(50% - ${(gemSize * 4 + 4) / 2}px + ${x}px)`,
                              ...getShapeStyle(selectedShape)
                            }}
                          >
                            {renderGemOrMetal(gemSize, gemType, getShapeStyle(selectedShape), customShapes[selectedShape])}
                          </div>
                        )
                      })}
                    </div>
                  )}
                  
                  {jewelryType === 'earrings' && (
                    <div className="flex gap-8">
                      {/* Left earring */}
                      <div className="relative">
                        <div className={`h-6 w-1 ${getMetalColorClass()} rounded-full mx-auto mb-1`}></div>
                        <div 
                          className={`${getMetalColorClass()} shadow-xl`}
                          style={{
                            height: `${gemSize * 10 + 6}px`,
                            width: `${gemSize * 10 + 6}px`,
                            ...getShapeStyle(selectedShape)
                          }}
                        >
                          {renderGemOrMetal(gemSize, gemType, getShapeStyle(selectedShape), customShapes[selectedShape])}
                        </div>
                        
                        {/* Additional gems */}
                        {gemType && gemCount > 1 && Array.from({ length: Math.min(3, gemCount - 1) }).map((_, index) => {
                          return (
                            <div 
                              key={index}
                              className={`absolute bottom-0 ${getMetalColorClass()} shadow-xl`}
                              style={{
                                height: `${gemSize * 5 + 2}px`,
                                width: `${gemSize * 5 + 2}px`,
                                transform: `translateY(${(index + 1) * 8}px)`,
                                ...getShapeStyle(selectedShape)
                              }}
                            >
                              {renderGemOrMetal(gemSize, gemType, getShapeStyle(selectedShape), customShapes[selectedShape])}
                            </div>
                          )
                        })}
                      </div>
                      
                      {/* Right earring */}
                      <div className="relative">
                        <div className={`h-6 w-1 ${getMetalColorClass()} rounded-full mx-auto mb-1`}></div>
                        <div 
                          className={`${getMetalColorClass()} shadow-xl`}
                          style={{
                            height: `${gemSize * 10 + 6}px`,
                            width: `${gemSize * 10 + 6}px`,
                            ...getShapeStyle(selectedShape)
                          }}
                        >
                          {renderGemOrMetal(gemSize, gemType, getShapeStyle(selectedShape), customShapes[selectedShape])}
                        </div>
                        
                        {/* Additional gems */}
                        {gemType && gemCount > 1 && Array.from({ length: Math.min(3, gemCount - 1) }).map((_, index) => {
                          return (
                            <div 
                              key={index}
                              className={`absolute bottom-0 ${getMetalColorClass()} shadow-xl`}
                              style={{
                                height: `${gemSize * 5 + 2}px`,
                                width: `${gemSize * 5 + 2}px`,
                                transform: `translateY(${(index + 1) * 8}px)`,
                                ...getShapeStyle(selectedShape)
                              }}
                            >
                              {renderGemOrMetal(gemSize, gemType, getShapeStyle(selectedShape), customShapes[selectedShape])}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  
                  {jewelryType === 'bracelet' && (
                    <div className="relative">
                      {/* Bracelet band */}
                      <div className={`h-40 w-56 rounded-full border-[8px] ${getMetalColorClass()} shadow-xl transform rotate-[30deg]`}></div>
                      
                      {/* Gems or metal pieces */}
                      {Array.from({ length: gemCount || 1 }).map((_, index) => {
                        const angle = (220 / Math.max(1, (gemCount || 1) - 1)) * index - 110
                        const radiusX = 28
                        const radiusY = 20
                        const x = radiusX * Math.cos((angle * Math.PI) / 180)
                        const y = radiusY * Math.sin((angle * Math.PI) / 180)
                        
                        return (
                          <div 
                            key={index}
                            className={`absolute ${getMetalColorClass()} shadow-xl`}
                            style={{
                              height: `${gemSize * 6 + 4}px`,
                              width: `${gemSize * 6 + 4}px`,
                              top: `calc(50% - ${(gemSize * 6 + 4) / 2}px + ${y}px)`,
                              left: `calc(50% - ${(gemSize * 6 + 4) / 2}px + ${x}px)`,
                              zIndex: y > 0 ? 5 : 15,
                              ...getShapeStyle(selectedShape)
                            }}
                          >
                            {renderGemOrMetal(gemSize, gemType, getShapeStyle(selectedShape), customShapes[selectedShape])}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right panel - Details and Price */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card dark:shadow-none border border-surface-200 dark:border-surface-700 p-6">
            <h2 className="font-heading text-2xl font-semibold mb-6 text-surface-900 dark:text-white">Design Details</h2>
            
            <div className="space-y-6">
              <div className="bg-surface-50 dark:bg-surface-900 rounded-lg p-4">
                <h3 className="font-heading text-lg font-semibold mb-4 text-surface-800 dark:text-surface-200">Specifications</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-400">Type</span>
                    <span className="font-medium text-surface-900 dark:text-white capitalize">{jewelryType}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-400">Shape</span>
                    <span className="font-medium text-surface-900 dark:text-white capitalize">
                      {selectedShape.startsWith('custom-') ? 'Custom' : selectedShape}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-400">Metal</span>
                    <span className="font-medium text-surface-900 dark:text-white capitalize">
                      {metalType.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-400">Gemstone</span>
                    <span className="font-medium text-surface-900 dark:text-white capitalize">
                      {gemType ? gemType : 'None'}
                    </span>
                  </div>
                  
                  {gemType && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-surface-600 dark:text-surface-400">Gem Size</span>
                        <span className="font-medium text-surface-900 dark:text-white">{gemSize.toFixed(1)} ct</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-surface-600 dark:text-surface-400">Gem Count</span>
                        <span className="font-medium text-surface-900 dark:text-white">{gemCount}</span>
                      </div>
                    </>
                  )}
                  
                  {jewelryType === 'ring' && (
                    <div className="flex justify-between">
                      <span className="text-surface-600 dark:text-surface-400">Ring Size</span>
                      <span className="font-medium text-surface-900 dark:text-white">{ringSize}</span>
                    </div>
                  )}
                  
                  {engravingText && (
                    <div className="flex justify-between">
                      <span className="text-surface-600 dark:text-surface-400">Engraving</span>
                      <span className="font-medium text-surface-900 dark:text-white italic">"{engravingText}"</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Design Description Component */}
              <DesignDescription 
                jewelryType={jewelryType}
                metalType={metalType}
                gemType={gemType}
                gemSize={gemSize}
                gemCount={gemCount}
                ringSize={ringSize}
                engravingText={engravingText}
                selectedShape={selectedShape}
                price={calculatePrice()}
              />
              
              <div className="bg-primary/10 dark:bg-primary-dark/20 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-surface-800 dark:text-surface-200 font-medium">Estimated Price</span>
                  <span className="font-heading text-2xl font-bold text-primary dark:text-primary-light">
                    ${calculatePrice()}
                  </span>
                </div>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-2">
                  Final price may vary based on market fluctuations and additional customizations.
                </p>
              </div>
              
              <div className="space-y-3">
                <button className="w-full btn btn-primary py-3">
                  Request Quote
                </button>
                
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                  <Download className="h-4 w-4" />
                  Export Design
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Save Design Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowSaveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-xl font-semibold text-surface-900 dark:text-white">Save Your Design</h3>
                <button 
                  onClick={() => setShowSaveModal(false)}
                  className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <X className="h-5 w-5 text-surface-500 dark:text-surface-400" />
                </button>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Design Name
                </label>
                <input
                  type="text"
                  value={currentDesignName}
                  onChange={(e) => setCurrentDesignName(e.target.value)}
                  placeholder="My Custom Ring"
                  className="input-field"
                  autoFocus
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  onClick={saveDesign}
                  disabled={!currentDesignName.trim()}
                  className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                    currentDesignName.trim() 
                      ? 'bg-primary hover:bg-primary-dark text-white' 
                      : 'bg-surface-200 dark:bg-surface-700 text-surface-400 dark:text-surface-500 cursor-not-allowed'
                  } transition-colors`}
                >
                  <Save className="h-4 w-4" />
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Saved Designs Modal */}
      <AnimatePresence>
        {showSavedDesigns && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowSavedDesigns(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-xl max-w-2xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading text-xl font-semibold text-surface-900 dark:text-white">My Saved Designs</h3>
                <button 
                  onClick={() => setShowSavedDesigns(false)}
                  className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <X className="h-5 w-5 text-surface-500 dark:text-surface-400" />
                </button>
              </div>
              
              {savedDesigns.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-surface-500 dark:text-surface-400 mb-4">You don't have any saved designs yet.</p>
                  <button
                    onClick={() => {
                      setShowSavedDesigns(false)
                      setShowSaveModal(true)
                    }}
                    className="btn btn-primary"
                  >
                    Create Your First Design
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {savedDesigns.map((design) => (
                    <div 
                      key={design.id}
                      className="bg-surface-50 dark:bg-surface-900 rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium text-surface-900 dark:text-white mb-1">{design.name}</h4>
                        <p className="text-sm text-surface-500 dark:text-surface-400">
                          {new Date(design.date).toLocaleDateString()} • {design.type} • {design.metal.replace('-', ' ')} • {design.gem || 'No Gemstone'}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-primary dark:text-primary-light">${design.price}</span>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => loadDesign(design)}
                            className="p-2 rounded-lg bg-primary/10 dark:bg-primary-dark/20 text-primary dark:text-primary-light hover:bg-primary/20 dark:hover:bg-primary-dark/30 transition-colors"
                            title="Load Design"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={() => deleteDesign(design.id)}
                            className="p-2 rounded-lg bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                            title="Delete Design"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature