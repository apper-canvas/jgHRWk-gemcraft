import { useState, useEffect } from 'react'
import { X, Check, AlertTriangle, Zap, Search, Sparkles, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const DesignByDescription = ({ 
  onClose, 
  onApplyDesign,
  currentDesign
}) => {
  const [description, setDescription] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [parsedParameters, setParsedParameters] = useState(null)
  const [showExamples, setShowExamples] = useState(false)

  // Example prompts to help users
  const examplePrompts = [
    "A gold engagement ring with a 1 carat round diamond",
    "Silver earrings with small sapphires in a triangle shape",
    "A rose gold necklace with a heart pendant and small diamonds",
    "Platinum wedding band with custom engraving 'Forever Yours'",
    "A white gold bracelet with alternating emeralds and diamonds",
    "A minimalist titanium ring with no gemstones"
  ]

  // Parse the user description to extract design parameters
  const parseDescription = () => {
    setIsProcessing(true)
    
    // Simulating processing time
    setTimeout(() => {
      // Simple rule-based parsing (in a real app, this would be more sophisticated)
      const parameters = {
        jewelryType: extractJewelryType(),
        metalType: extractMetalType(),
        gemType: extractGemType(),
        gemSize: extractGemSize(),
        gemCount: extractGemCount(),
        shape: extractShape(),
        ringSize: extractRingSize(),
        engraving: extractEngraving(),
        confidence: {}
      }
      
      // Set confidence levels for each parameter
      parameters.confidence = {
        jewelryType: calculateConfidence(parameters.jewelryType, 0.8),
        metalType: calculateConfidence(parameters.metalType, 0.7),
        gemType: calculateConfidence(parameters.gemType, 0.6),
        gemSize: calculateConfidence(parameters.gemSize, 0.5),
        gemCount: calculateConfidence(parameters.gemCount, 0.5),
        shape: calculateConfidence(parameters.shape, 0.5),
        ringSize: calculateConfidence(parameters.ringSize, 0.4),
        engraving: calculateConfidence(parameters.engraving, 0.9)
      }
      
      setParsedParameters(parameters)
      setIsProcessing(false)
    }, 1500)
  }
  
  // Helper functions to extract parameters from the description text
  
  const extractJewelryType = () => {
    const text = description.toLowerCase()
    
    if (text.includes('ring')) return 'ring'
    if (text.includes('necklace') || text.includes('pendant')) return 'necklace'
    if (text.includes('earring')) return 'earrings'
    if (text.includes('bracelet')) return 'bracelet'
    
    // Default to current value or ring if none specified
    return currentDesign.jewelryType || 'ring'
  }
  
  const extractMetalType = () => {
    const text = description.toLowerCase()
    
    if (text.includes('gold') && text.includes('rose')) return 'rose-gold'
    if (text.includes('gold') && text.includes('white')) return 'white-gold'
    if (text.includes('gold')) return 'gold'
    if (text.includes('silver')) return 'silver'
    if (text.includes('platinum')) return 'platinum'
    if (text.includes('titanium')) return 'titanium'
    
    // Default to current value or gold if none specified
    return currentDesign.metalType || 'gold'
  }
  
  const extractGemType = () => {
    const text = description.toLowerCase()
    
    if (text.includes('diamond')) return 'diamond'
    if (text.includes('ruby')) return 'ruby'
    if (text.includes('sapphire')) return 'sapphire'
    if (text.includes('emerald')) return 'emerald'
    if (text.includes('amethyst')) return 'amethyst'
    if (text.includes('topaz')) return 'topaz'
    
    if (text.includes('no gem') || 
        text.includes('without gem') || 
        text.includes('no stone') || 
        text.includes('gemless')) {
      return null
    }
    
    // Default to current value or null if none specified
    return currentDesign.gemType || null
  }
  
  const extractGemSize = () => {
    const text = description.toLowerCase()
    let size = currentDesign.gemSize || 1
    
    // Look for sizes like "1 carat", "0.5ct", "2-carat", etc.
    const caratMatches = text.match(/(\d+(?:\.\d+)?)\s*(?:-|\s)?(?:carat|ct)/i)
    if (caratMatches && caratMatches[1]) {
      size = parseFloat(caratMatches[1])
      // Ensure the size is within bounds
      if (size < 0.5) size = 0.5
      if (size > 3) size = 3
    } else {
      // Look for descriptive sizes
      if (text.includes('small') || text.includes('tiny')) size = 0.5
      if (text.includes('medium')) size = 1.5
      if (text.includes('large') || text.includes('big')) size = 2.5
    }
    
    return size
  }
  
  const extractGemCount = () => {
    const text = description.toLowerCase()
    let count = currentDesign.gemCount || 1
    
    // Look for explicit counts like "3 diamonds", "five sapphires"
    const numberWords = {
      'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 
      'six': 6, 'seven': 7, 'single': 1, 'couple': 2, 'pair': 2,
      'few': 3, 'several': 4, 'many': 5
    }
    
    // Try numeric values first
    const numMatches = text.match(/(\d+)\s+(?:gem|stone|diamond|ruby|sapphire|emerald|amethyst|topaz)/i)
    if (numMatches && numMatches[1]) {
      count = parseInt(numMatches[1])
      // Ensure count is within bounds
      if (count < 1) count = 1
      if (count > 7) count = 7
      return count
    }
    
    // Try word values
    for (const [word, value] of Object.entries(numberWords)) {
      if (text.includes(word)) {
        count = value
        break
      }
    }
    
    // Infer multiple from plurals
    if (!numMatches && 
        (text.includes('diamonds') || 
         text.includes('rubies') || 
         text.includes('sapphires') || 
         text.includes('emeralds') || 
         text.includes('gems') || 
         text.includes('stones'))) {
      count = Math.max(2, count)
    }
    
    // Multiple if using words like "alternating", "surrounding", "cluster"
    if (text.includes('alternating') || 
        text.includes('surrounding') || 
        text.includes('cluster') || 
        text.includes('multiple')) {
      count = Math.max(3, count)
    }
    
    return count
  }
  
  const extractShape = () => {
    const text = description.toLowerCase()
    
    if (text.includes('round')) return 'round'
    if (text.includes('square')) return 'square'
    if (text.includes('triangle') || text.includes('triangular')) return 'triangle'
    if (text.includes('heart') || text.includes('heart-shaped')) return 'heart'
    if (text.includes('hexagon')) return 'hexagon'
    if (text.includes('custom shape') || text.includes('custom design') || text.includes('unique shape')) {
      // Return a custom shape ID - in a real implementation, you might
      // want to generate a unique ID or handle custom shapes differently
      return 'custom-1'
    }
    
    // Default to current value or round if none specified
    return currentDesign.selectedShape || 'round'
  }
  
  const extractRingSize = () => {
    const text = description.toLowerCase()
    let size = currentDesign.ringSize || 7
    
    // Look for sizes like "size 6", "ring size 7", etc.
    const sizeMatches = text.match(/(?:ring\s+)?size\s+(\d+(?:\.\d+)?)/i)
    if (sizeMatches && sizeMatches[1]) {
      size = parseFloat(sizeMatches[1])
      // Ensure the size is within bounds
      if (size < 4) size = 4
      if (size > 13) size = 13
    }
    
    return size
  }
  
  const extractEngraving = () => {
    const text = description
    
    // Look for text within quotes that might be intended as engraving
    const quotesMatch = text.match(/["']([^"']+)["']/i)
    if (quotesMatch && quotesMatch[1]) {
      // Limit engraving to 20 characters
      return quotesMatch[1].substring(0, 20)
    }
    
    // Look for text after phrases like "engraved with", "saying", "that says", etc.
    const engravingPhrases = [
      /engrav(?:e|ed|ing)(?:\s+with)?\s+([^,.]+)/i,
      /saying\s+([^,.]+)/i,
      /that\s+says\s+([^,.]+)/i,
      /inscrib(?:e|ed|ing)(?:\s+with)?\s+([^,.]+)/i,
      /text\s+(?:saying|reading)?\s+([^,.]+)/i
    ]
    
    for (const phrase of engravingPhrases) {
      const match = text.match(phrase)
      if (match && match[1]) {
        return match[1].trim().substring(0, 20)
      }
    }
    
    // Default to current value or empty if none specified
    return currentDesign.engravingText || ''
  }
  
  // Calculate confidence level with some random variation to simulate AI uncertainty
  const calculateConfidence = (value, baseConfidence) => {
    if (value === null || value === undefined || 
        (typeof value === 'string' && value.trim() === '')) {
      return 0
    }
    
    // Add some randomness to confidence level
    const randomVariation = (Math.random() * 0.3) - 0.15
    let confidence = baseConfidence + randomVariation
    
    // Ensure confidence is within bounds
    if (confidence < 0) confidence = 0
    if (confidence > 1) confidence = 1
    
    return confidence
  }
  
  // Apply the parsed parameters to create the design
  const applyDesign = () => {
    if (!parsedParameters) return
    
    const design = {
      jewelryType: parsedParameters.jewelryType,
      metalType: parsedParameters.metalType,
      gemType: parsedParameters.gemType,
      gemSize: parsedParameters.gemSize,
      gemCount: parsedParameters.gemCount,
      ringSize: parsedParameters.ringSize,
      selectedShape: parsedParameters.shape,
      engravingText: parsedParameters.engraving
    }
    
    onApplyDesign(design)
    onClose()
  }
  
  // Apply an example prompt
  const applyExample = (example) => {
    setDescription(example)
    setShowExamples(false)
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-surface-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-xl font-semibold text-surface-900 dark:text-white">
              Design by Description
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
          >
            <X className="h-5 w-5 text-surface-500 dark:text-surface-400" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Describe your ideal jewelry design
            </label>
            <div className="relative">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="E.g., A gold ring with a round 1-carat diamond and 'Forever' engraved inside"
                className="input-field min-h-[120px] resize-y"
                autoFocus
              />
              <div className="absolute bottom-2 right-2 flex gap-1">
                <button
                  onClick={() => setShowExamples(!showExamples)}
                  className="p-1.5 rounded-full bg-surface-100 dark:bg-surface-700 text-surface-500 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                  title="View example prompts"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
            <AnimatePresence>
              {showExamples && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden mt-2"
                >
                  <div className="bg-surface-50 dark:bg-surface-700/50 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Example Prompts
                    </h4>
                    <div className="grid gap-2">
                      {examplePrompts.map((example, index) => (
                        <button
                          key={index}
                          onClick={() => applyExample(example)}
                          className="text-left text-sm p-2 rounded-md hover:bg-surface-100 dark:hover:bg-surface-600 text-surface-600 dark:text-surface-300 transition-colors"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-surface-600 dark:text-surface-400">
              <span className="inline-flex items-center gap-1">
                <Zap className="h-4 w-4 text-primary" />
                Tell us what you want, and we'll create it
              </span>
            </p>
            <button
              onClick={parseDescription}
              disabled={isProcessing || !description.trim()}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                description.trim() && !isProcessing
                  ? 'bg-primary hover:bg-primary-dark text-white'
                  : 'bg-surface-200 dark:bg-surface-700 text-surface-400 dark:text-surface-500 cursor-not-allowed'
              } transition-colors`}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Processing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Analyze
                </>
              )}
            </button>
          </div>
          
          {parsedParameters && (
            <div className="bg-surface-50 dark:bg-surface-900 rounded-lg p-4 mt-4">
              <h3 className="font-medium text-surface-800 dark:text-surface-200 mb-3">
                Recognized Parameters
              </h3>
              
              <div className="space-y-3">
                {/* Jewelry Type */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-surface-600 dark:text-surface-400">Jewelry Type</span>
                    <ConfidenceBadge confidence={parsedParameters.confidence.jewelryType} />
                  </div>
                  <span className="font-medium text-surface-900 dark:text-white capitalize">
                    {parsedParameters.jewelryType}
                  </span>
                </div>
                
                {/* Metal Type */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-surface-600 dark:text-surface-400">Metal</span>
                    <ConfidenceBadge confidence={parsedParameters.confidence.metalType} />
                  </div>
                  <span className="font-medium text-surface-900 dark:text-white capitalize">
                    {parsedParameters.metalType.replace('-', ' ')}
                  </span>
                </div>
                
                {/* Gemstone */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-surface-600 dark:text-surface-400">Gemstone</span>
                    <ConfidenceBadge confidence={parsedParameters.confidence.gemType} />
                  </div>
                  <span className="font-medium text-surface-900 dark:text-white capitalize">
                    {parsedParameters.gemType || 'None'}
                  </span>
                </div>
                
                {/* Gem Size (only if gemstone is selected) */}
                {parsedParameters.gemType && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-surface-600 dark:text-surface-400">Gem Size</span>
                      <ConfidenceBadge confidence={parsedParameters.confidence.gemSize} />
                    </div>
                    <span className="font-medium text-surface-900 dark:text-white">
                      {parsedParameters.gemSize.toFixed(1)} ct
                    </span>
                  </div>
                )}
                
                {/* Gem Count (only if gemstone is selected) */}
                {parsedParameters.gemType && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-surface-600 dark:text-surface-400">Gem Count</span>
                      <ConfidenceBadge confidence={parsedParameters.confidence.gemCount} />
                    </div>
                    <span className="font-medium text-surface-900 dark:text-white">
                      {parsedParameters.gemCount}
                    </span>
                  </div>
                )}
                
                {/* Shape */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-surface-600 dark:text-surface-400">Shape</span>
                    <ConfidenceBadge confidence={parsedParameters.confidence.shape} />
                  </div>
                  <span className="font-medium text-surface-900 dark:text-white capitalize">
                    {parsedParameters.shape.startsWith('custom-') ? 'Custom' : parsedParameters.shape}
                  </span>
                </div>
                
                {/* Ring Size (only for rings) */}
                {parsedParameters.jewelryType === 'ring' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-surface-600 dark:text-surface-400">Ring Size</span>
                      <ConfidenceBadge confidence={parsedParameters.confidence.ringSize} />
                    </div>
                    <span className="font-medium text-surface-900 dark:text-white">
                      {parsedParameters.ringSize}
                    </span>
                  </div>
                )}
                
                {/* Engraving */}
                {parsedParameters.engraving && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-surface-600 dark:text-surface-400">Engraving</span>
                      <ConfidenceBadge confidence={parsedParameters.confidence.engraving} />
                    </div>
                    <span className="font-medium text-surface-900 dark:text-white italic">
                      "{parsedParameters.engraving}"
                    </span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 px-3 py-2 bg-primary/10 dark:bg-primary-dark/20 rounded-lg flex items-center gap-2 text-sm text-surface-700 dark:text-surface-300">
                <AlertTriangle className="h-4 w-4 text-primary" />
                <span>
                  These parameters are automatically detected. You can adjust them after creating the design.
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-surface-200 dark:border-surface-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={applyDesign}
            disabled={!parsedParameters}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              parsedParameters
                ? 'bg-primary hover:bg-primary-dark text-white'
                : 'bg-surface-200 dark:bg-surface-700 text-surface-400 dark:text-surface-500 cursor-not-allowed'
            } transition-colors`}
          >
            <Check className="h-4 w-4" />
            Create Design
          </button>
        </div>
      </div>
    </div>
  )
}

// Helper component to show confidence level
const ConfidenceBadge = ({ confidence }) => {
  let bgColor = 'bg-red-100 dark:bg-red-900/30'
  let textColor = 'text-red-600 dark:text-red-400'
  
  if (confidence >= 0.7) {
    bgColor = 'bg-green-100 dark:bg-green-900/30'
    textColor = 'text-green-600 dark:text-green-400'
  } else if (confidence >= 0.4) {
    bgColor = 'bg-yellow-100 dark:bg-yellow-900/30'
    textColor = 'text-yellow-600 dark:text-yellow-400'
  }
  
  return (
    <span className={`text-xs ${bgColor} ${textColor} px-1.5 py-0.5 rounded-full`}>
      {Math.round(confidence * 100)}%
    </span>
  )
}

export default DesignByDescription