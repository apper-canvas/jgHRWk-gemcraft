/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9D4EDD', // Rich purple
          light: '#C77DFF',
          dark: '#7B2CBF'
        },
        secondary: {
          DEFAULT: '#F2C94C', // Gold
          light: '#F9E29F',
          dark: '#E0B63D'
        },
        accent: '#5EEAD4', // Turquoise
        surface: {
          50: '#f8fafc',   // Lightest
          100: '#f1f5f9',
          200: '#e2e8f0', 
          300: '#cbd5e1',
          400: '#94a3b8',  
          500: '#64748b',  
          600: '#475569',  
          700: '#334155',  
          800: '#1e293b',  
          900: '#0f172a'   // Darkest
        },
        gem: {
          ruby: '#E63946',
          sapphire: '#1D3557',
          emerald: '#2A9D8F',
          diamond: '#F1FAEE',
          amethyst: '#9D4EDD',
          topaz: '#F2C94C'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Cormorant Garamond', 'serif'],
        display: ['Cormorant Garamond', 'serif']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)',
        'gem': '0 0 15px rgba(157, 78, 221, 0.5), inset 0 0 8px rgba(157, 78, 221, 0.3)',
        'gold': '0 0 10px rgba(242, 201, 76, 0.5), inset 0 0 5px rgba(242, 201, 76, 0.3)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        'gem': '0.5rem 1.5rem 0.5rem 1.5rem'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        'gem-texture': 'url("/textures/gem-texture.png")'
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite'
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },
  plugins: [],
  darkMode: 'class',
}