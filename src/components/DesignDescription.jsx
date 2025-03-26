import { useState } from 'react'
import { Clipboard, CheckCheck } from 'lucide-react'

const DesignDescription = ({ 
  jewelryType, 
  metalType, 
  gemType, 
  gemSize, 
  gemCount, 
  ringSize,
  engravingText,
  selectedShape,
  price
}) => {
  const [copied, setCopied] = useState(false)

  // Generate metal description
  const getMetalDescription = () => {
    switch(metalType) {
      case 'gold': return 'lustrous 18k gold';
      case 'silver': return 'polished sterling silver';
      case 'platinum': return 'premium platinum';
      case 'rose-gold': return 'romantic rose gold';
      case 'white-gold': return 'elegant white gold';
      case 'titanium': return 'durable titanium';
      default: return 'high-quality metal';
    }
  }

  // Generate shape description
  const getShapeDescription = () => {
    if (selectedShape.startsWith('custom-')) {
      return 'custom-designed';
    }
    
    switch(selectedShape) {
      case 'round': return 'perfectly round';
      case 'square': return 'contemporary square';
      case 'heart': return 'romantic heart-shaped';
      case 'triangle': return 'geometric triangular';
      case 'hexagon': return 'distinctive hexagonal';
      default: return 'beautifully shaped';
    }
  }

  // Generate gem description
  const getGemDescription = () => {
    if (!gemType) return '';
    
    const gemDescriptions = {
      'diamond': 'brilliant and clear',
      'ruby': 'rich red',
      'sapphire': 'deep blue',
      'emerald': 'vivid green',
      'amethyst': 'purple',
      'topaz': 'golden'
    };
    
    const gemQualityDescriptions = {
      'diamond': 'exceptional clarity',
      'ruby': 'profound depth of color',
      'sapphire': 'remarkable intensity',
      'emerald': 'lush saturation',
      'amethyst': 'royal hue',
      'topaz': 'warm brilliance'
    };
    
    return `${gemDescriptions[gemType] || 'beautiful'} ${gemType} of ${gemQualityDescriptions[gemType] || 'exceptional quality'}`;
  }

  // Generate jewelry type specific description
  const getJewelrySpecificDescription = () => {
    switch(jewelryType) {
      case 'ring': 
        return `This ring features a band crafted from ${getMetalDescription()} and is available in size ${ringSize}. ` + 
               (gemType ? `The ${getShapeDescription()} ${gemType}${gemCount > 1 ? 's are' : ' is'} meticulously set to showcase ${gemCount > 1 ? 'their' : 'its'} ${getGemDescription()}.` : 
               `The ${getShapeDescription()} design offers a timeless appeal.`);
              
      case 'necklace':
        return `This necklace features a delicate chain crafted from ${getMetalDescription()}. ` + 
               (gemType ? `The ${getShapeDescription()} ${gemType} pendant${gemCount > 1 ? ' and accents are' : ' is'} carefully positioned to highlight ${gemCount > 1 ? 'their' : 'its'} ${getGemDescription()}.` : 
               `The ${getShapeDescription()} pendant creates an elegant focal point.`);
              
      case 'earrings':
        return `These earrings are meticulously crafted from ${getMetalDescription()}. ` + 
               (gemType ? `Each earring showcases ${gemCount > 1 ? `multiple ${getShapeDescription()} ${gemType}s` : `a ${getShapeDescription()} ${gemType}`} that ${gemCount > 1 ? 'capture' : 'captures'} the ${getGemDescription()}.` : 
               `Their ${getShapeDescription()} design offers a sophisticated finish.`);
              
      case 'bracelet':
        return `This bracelet is expertly crafted from ${getMetalDescription()}. ` + 
               (gemType ? `The ${getShapeDescription()} ${gemType}${gemCount > 1 ? 's are' : ' is'} artfully arranged to showcase ${gemCount > 1 ? 'their' : 'its'} ${getGemDescription()}.` : 
               `The ${getShapeDescription()} elements create a striking pattern along its length.`);
              
      default:
        return `This piece is expertly crafted from ${getMetalDescription()}.`;
    }
  }

  // Generate full description
  const generateFullDescription = () => {
    let description = `Exquisite ${jewelryType} crafted from ${getMetalDescription()}`;
    
    if (gemType) {
      description += ` featuring ${gemCount > 1 ? `${gemCount} ` : ''}${getShapeDescription()} ${gemType}${gemCount > 1 ? 's' : ''}`;
      description += ` (${gemSize.toFixed(1)} ct${gemCount > 1 ? ' each' : ''})`;
    } else {
      description += ` with a ${getShapeDescription()} design`;
    }
    
    description += '.\n\n';
    description += getJewelrySpecificDescription();
    
    if (engravingText) {
      description += `\n\nPersonalized with the engraving: "${engravingText}".`;
    }
    
    description += `\n\nEstimated value: $${price}.`;
    
    return description;
  }

  const fullDescription = generateFullDescription();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullDescription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-surface-50 dark:bg-surface-900 rounded-lg p-4 mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-heading text-lg font-semibold text-surface-800 dark:text-surface-200">
          Written Description
        </h3>
        <button 
          onClick={copyToClipboard}
          className="flex items-center gap-1 p-2 rounded-lg text-sm text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
          aria-label="Copy description"
        >
          {copied ? (
            <>
              <CheckCheck className="h-4 w-4 text-green-500" />
              <span className="text-green-500">Copied</span>
            </>
          ) : (
            <>
              <Clipboard className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      <div className="text-sm text-surface-700 dark:text-surface-300 whitespace-pre-line bg-white dark:bg-surface-800 p-3 rounded-md border border-surface-200 dark:border-surface-700">
        {fullDescription}
      </div>
      
      <p className="text-xs text-surface-500 dark:text-surface-400 mt-2">
        Use this description when sharing your design with jewelers or friends.
      </p>
    </div>
  )
}

export default DesignDescription