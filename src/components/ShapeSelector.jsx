import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Square, Circle, Heart, Triangle, Hexagon, Pencil, Trash, Save } from 'lucide-react'

const ShapeSelector = ({ onShapeSelect, selectedShape }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawingMode, setDrawingMode] = useState(false)
  const canvasRef = useRef(null)
  const [canvasContext, setCanvasContext] = useState(null)
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  const [customShapes, setCustomShapes] = useState([])
  
  // Predefined shapes
  const shapes = [
    { id: 'round', name: 'Round', icon: <Circle className="h-6 w-6" /> },
    { id: 'square', name: 'Square', icon: <Square className="h-6 w-6" /> },
    { id: 'heart', name: 'Heart', icon: <Heart className="h-6 w-6" /> },
    { id: 'triangle', name: 'Triangle', icon: <Triangle className="h-6 w-6" /> },
    { id: 'hexagon', name: 'Hexagon', icon: <Hexagon className="h-6 w-6" /> },
    { id: 'custom', name: 'Custom', icon: <Pencil className="h-6 w-6" /> },
  ]
  
  // Initialize canvas context
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      setCanvasContext(ctx)
      
      // Set canvas dimensions
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      
      // Clear canvas
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }, [drawingMode])
  
  // Handle window resize for canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasContext) {
        const canvas = canvasRef.current
        // Save the current drawing
        const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height)
        
        // Update canvas dimensions
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
        
        // Restore the drawing
        canvasContext.putImageData(imageData, 0, 0)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [canvasContext])
  
  // Start drawing
  const startDrawing = (e) => {
    if (!canvasContext || !drawingMode) return
    
    setIsDrawing(true)
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setStartPosition({ x, y })
    
    canvasContext.beginPath()
    canvasContext.moveTo(x, y)
    canvasContext.strokeStyle = '#000000'
    canvasContext.lineWidth = 2
    canvasContext.lineCap = 'round'
  }
  
  // Draw
  const draw = (e) => {
    if (!isDrawing || !canvasContext || !drawingMode) return
    
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    canvasContext.lineTo(x, y)
    canvasContext.stroke()
  }
  
  // Stop drawing
  const stopDrawing = () => {
    if (!canvasContext || !drawingMode) return
    
    setIsDrawing(false)
    canvasContext.closePath()
  }
  
  // Clear canvas
  const clearCanvas = () => {
    if (!canvasContext) return
    
    const canvas = canvasRef.current
    canvasContext.fillStyle = 'white'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
  }
  
  // Save custom shape
  const saveCustomShape = () => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const newCustomShape = canvas.toDataURL('image/png')
    setCustomShapes([...customShapes, newCustomShape])
    
    // Notify parent component about custom shape
    onShapeSelect('custom-' + customShapes.length)
    
    // Reset canvas
    clearCanvas()
    setDrawingMode(false)
  }
  
  // Handle shape selection
  const handleShapeSelect = (shapeId) => {
    if (shapeId === 'custom') {
      setDrawingMode(true)
    } else {
      setDrawingMode(false)
      onShapeSelect(shapeId)
    }
  }
  
  return (
    <div>
      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
        Shape
      </label>
      
      {/* Shape options */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {shapes.map((shape) => (
          <button
            key={shape.id}
            onClick={() => handleShapeSelect(shape.id)}
            className={`shape-option ${selectedShape === shape.id || (drawingMode && shape.id === 'custom') ? 'active' : ''}`}
            title={shape.name}
          >
            {shape.icon}
          </button>
        ))}
      </div>
      
      {/* Custom Shapes Gallery */}
      {customShapes.length > 0 && !drawingMode && (
        <div className="mb-4">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">Custom Shapes</p>
          <div className="flex flex-wrap gap-2">
            {customShapes.map((shape, index) => (
              <button
                key={index}
                onClick={() => onShapeSelect('custom-' + index)}
                className={`shape-option ${selectedShape === 'custom-' + index ? 'active' : ''}`}
              >
                <img src={shape} alt={`Custom Shape ${index + 1}`} className="w-8 h-8 object-contain" />
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Drawing Canvas */}
      {drawingMode && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mb-4"
        >
          <div className="bg-surface-50 dark:bg-surface-900 rounded-lg p-4">
            <p className="text-sm text-surface-700 dark:text-surface-300 mb-2">Draw Your Custom Shape</p>
            
            <canvas
              ref={canvasRef}
              className={`drawing-canvas w-full h-40 ${isDrawing ? 'drawing-canvas-active' : ''}`}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
            
            <div className="flex justify-between mt-3">
              <button
                onClick={clearCanvas}
                className="flex items-center gap-1 text-sm text-surface-600 hover:text-surface-800 dark:text-surface-400 dark:hover:text-surface-200 transition-colors"
              >
                <Trash className="h-4 w-4" />
                Clear
              </button>
              
              <button
                onClick={saveCustomShape}
                className="flex items-center gap-1 text-sm bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition-colors"
              >
                <Save className="h-4 w-4" />
                Save Shape
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ShapeSelector