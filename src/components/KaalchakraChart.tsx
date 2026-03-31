import { motion } from 'motion/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Moon, Star, Zap } from 'lucide-react';

export function KaalchakraChart() {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-mystic-gold/20 animate-[spin_60s_linear_infinite]" />
      
      {/* Zodiac Symbols (Placeholders) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-full flex items-start justify-center"
          style={{ transform: `rotate(${i * 30}deg)` }}
        >
          <div className="mt-4 text-mystic-gold/40 font-serif text-xs tracking-widest">
            {['ARI', 'TAU', 'GEM', 'CAN', 'LEO', 'VIR', 'LIB', 'SCO', 'SAG', 'CAP', 'AQU', 'PIS'][i]}
          </div>
        </div>
      ))}

      {/* Inner Geometry */}
      <div className="relative w-[70%] h-[70%] flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full text-mystic-gold/60">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          
          {/* Spoke Lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="50" y1="50"
              x2={50 + 48 * Math.cos((i * 45 * Math.PI) / 180)}
              y2={50 + 48 * Math.sin((i * 45 * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="0.2"
            />
          ))}

          {/* Central Star */}
          <motion.path
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            d="M50 15 L60 40 L85 40 L65 55 L75 80 L50 65 L25 80 L35 55 L15 40 L40 40 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="origin-center"
          />
        </svg>

        {/* Planets (Placeholders) */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-full h-full"
        >
          <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-4 h-4 rounded-full bg-mystic-gold shadow-[0_0_10px_rgba(197,160,89,0.5)] flex items-center justify-center">
            <Star className="w-2 h-2 text-mystic-dark" />
          </div>
          <div className="absolute bottom-[30%] right-[20%] w-3 h-3 rounded-full bg-mystic-accent shadow-[0_0_10px_rgba(126,87,194,0.5)] flex items-center justify-center">
            <Moon className="w-2 h-2 text-white" />
          </div>
        </motion.div>
      </div>

      {/* Center Bindu */}
      <div className="absolute w-4 h-4 rounded-full bg-mystic-gold flex items-center justify-center animate-pulse">
        <Zap className="w-2 h-2 text-mystic-dark" />
      </div>
    </div>
  );
}
