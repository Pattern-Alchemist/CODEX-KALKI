import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Compass, 
  Moon, 
  Wind,
  Infinity
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { YantraGenerator } from '@/components/YantraGenerator';
import { KaalchakraChart } from '@/components/KaalchakraChart';
import TarotSimulator from '@/components/TarotSimulator';
import { BreathTimer } from '@/components/BreathTimer';
import { MantraCounter } from '@/components/MantraCounter';
import { cn } from '@/lib/utils';

export default function Tools() {
  const [activeTool, setActiveTool] = useState<'yantra' | 'tarot' | 'astrology' | 'breath' | 'mantra'>('yantra');

  return (
    <div className="space-y-12">
      <header className="flex flex-col gap-4">
        <h1 className="text-4xl font-serif tracking-widest text-mystic-gold uppercase">Esoteric Tools</h1>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'yantra', label: 'Yantra Generator', icon: Sparkles },
            { id: 'tarot', label: 'Tarot Simulator', icon: Compass },
            { id: 'astrology', label: 'Kaalchakra Chart', icon: Moon },
            { id: 'breath', label: 'Breath Timer', icon: Wind },
            { id: 'mantra', label: 'Mantra Counter', icon: Infinity },
          ].map(tool => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id as any)}
              className={cn(
                "px-6 py-2 rounded-full text-[10px] font-serif uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap border",
                activeTool === tool.id 
                  ? "bg-mystic-gold text-mystic-dark border-mystic-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]" 
                  : "bg-white/5 text-mystic-light/50 border-transparent hover:bg-white/10 hover:text-mystic-light"
              )}
            >
              <tool.icon className="w-3.5 h-3.5" />
              {tool.label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {activeTool === 'yantra' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <YantraGenerator />
          </motion.div>
        )}

        {activeTool === 'tarot' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-8 md:p-12 bg-mystic-dark/40 border-white/5">
              <TarotSimulator />
            </Card>
          </motion.div>
        )}

        {activeTool === 'astrology' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-12"
          >
            <Card className="p-12 text-center space-y-8 overflow-hidden relative bg-mystic-dark/40 border-white/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-mystic-gold/5 blur-[100px] -z-10" />
              <div className="space-y-4">
                <CardTitle className="text-3xl font-serif tracking-widest text-mystic-gold uppercase">Kaalchakra Astrology Chart</CardTitle>
                <CardDescription className="text-lg text-mystic-light/60">Your karmic path visualized through the wheel of time.</CardDescription>
              </div>
              
              <KaalchakraChart />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-xl mx-auto mt-12">
                <input type="date" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-mystic-gold/50" />
                <input type="time" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-mystic-gold/50" />
                <input type="text" placeholder="Birth City" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-mystic-gold/50" />
              </div>
              <Button className="px-12 h-12 text-sm uppercase tracking-widest">Calculate My Chart</Button>
            </Card>
          </motion.div>
        )}

        {activeTool === 'breath' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <BreathTimer />
          </motion.div>
        )}

        {activeTool === 'mantra' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <MantraCounter />
          </motion.div>
        )}
      </div>
    </div>
  );
}

