import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download, RefreshCw, Sparkles } from 'lucide-react';

export function YantraGenerator() {
  const [seed, setSeed] = useState(Math.random());
  const [complexity, setComplexity] = useState(3);

  const generateYantra = () => {
    setSeed(Math.random());
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sacred Yantra Generator</CardTitle>
            <CardDescription>Generate sacred geometry for meditation based on Vaidika Sarpa Vidya.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={generateYantra} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            <span>Regenerate</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8 py-12">
        <div className="relative w-64 h-64 md:w-96 md:h-96">
          <svg viewBox="0 0 100 100" className="w-full h-full text-mystic-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]">
            {/* Outer Square */}
            <rect x="5" y="5" width="90" height="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="8" y="8" width="84" height="84" fill="none" stroke="currentColor" strokeWidth="0.5" />
            
            {/* T-Shapes (Doors) */}
            <path d="M45 5 L45 0 L55 0 L55 5" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M45 95 L45 100 L55 100 L55 95" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M5 45 L0 45 L0 55 L5 55" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M95 45 L100 45 L100 55 L95 55" fill="none" stroke="currentColor" strokeWidth="0.5" />

            {/* Circles */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.2" />

            {/* Petals */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.path
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                d={`M50 50 L${50 + 35 * Math.cos((i * 45 * Math.PI) / 180)} ${50 + 35 * Math.sin((i * 45 * Math.PI) / 180)}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
            ))}

            {/* Triangles */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              d="M50 20 L80 70 L20 70 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
              d="M50 80 L80 30 L20 30 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />

            {/* Bindu (Center Point) */}
            <circle cx="50" cy="50" r="1.5" fill="currentColor">
              <animate attributeName="r" values="1.5;2.5;1.5" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full rounded-full border border-mystic-gold/10 animate-ping opacity-20" />
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Export SVG</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Meditate Now</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
