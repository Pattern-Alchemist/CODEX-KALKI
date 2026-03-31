import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Infinity, 
  RotateCcw, 
  History, 
  Settings2, 
  CheckCircle2,
  Trophy,
  Zap
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { cn } from '@/lib/utils';

interface MantraSession {
  id: string;
  name: string;
  count: number;
  timestamp: number;
}

const MANTRAS = [
  { name: 'Om Namah Shivaya', target: 108 },
  { name: 'Gayatri Mantra', target: 24 },
  { name: 'Om Mani Padme Hum', target: 108 },
  { name: 'Soham', target: 54 },
];

export function MantraCounter() {
  const [count, setCount] = useState(0);
  const [selectedMantra, setSelectedMantra] = useState(MANTRAS[0]);
  const [history, setHistory] = useState<MantraSession[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const increment = () => {
    setCount(prev => prev + 1);
    // Haptic feedback (if available)
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const reset = () => {
    if (count > 0) {
      const newSession: MantraSession = {
        id: Date.now().toString(),
        name: selectedMantra.name,
        count,
        timestamp: Date.now(),
      };
      setHistory(prev => [newSession, ...prev].slice(0, 10));
    }
    setCount(0);
  };

  const progress = (count / selectedMantra.target) * 100;

  return (
    <Card className="p-8 md:p-12 text-center space-y-12 bg-mystic-dark/40 border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
        <motion.div 
          className="h-full bg-mystic-gold"
          initial={{ width: '0%' }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-serif tracking-widest text-mystic-gold uppercase">Mantra Counter</h2>
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs text-mystic-light/40 uppercase tracking-widest">{selectedMantra.name}</span>
          <span className="text-[10px] text-mystic-gold/40">•</span>
          <span className="text-[10px] text-mystic-gold/40 uppercase tracking-widest">Target: {selectedMantra.target}</span>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={increment}
          className="w-64 h-64 rounded-full border-2 border-mystic-gold/20 flex flex-col items-center justify-center gap-2 relative group hover:border-mystic-gold/40 transition-all duration-500 shadow-[0_0_50px_rgba(212,175,55,0.05)] hover:shadow-[0_0_50px_rgba(212,175,55,0.1)]"
        >
          <div className="absolute inset-4 rounded-full border border-white/5 group-hover:border-mystic-gold/10 transition-all" />
          <span className="text-8xl font-serif text-white tracking-tighter">{count}</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-mystic-light/30 group-hover:text-mystic-gold/50 transition-colors">Tap to Count</span>
          
          {count >= selectedMantra.target && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-4 -right-4 bg-mystic-gold text-mystic-dark p-2 rounded-full shadow-lg"
            >
              <CheckCircle2 className="w-6 h-6" />
            </motion.div>
          )}
        </motion.button>
      </div>

      <div className="flex items-center justify-center gap-6">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full w-12 h-12"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings2 className="w-5 h-5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full w-12 h-12"
          onClick={() => setShowHistory(!showHistory)}
        >
          <History className="w-5 h-5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full w-12 h-12"
          onClick={reset}
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {MANTRAS.map(m => (
              <button
                key={m.name}
                onClick={() => { setSelectedMantra(m); setCount(0); setShowSettings(false); }}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all",
                  selectedMantra.name === m.name 
                    ? "bg-mystic-gold/10 border-mystic-gold/30 text-mystic-gold" 
                    : "bg-white/5 border-transparent text-mystic-light/40 hover:bg-white/10"
                )}
              >
                <div className="text-xs font-serif uppercase tracking-widest mb-1">{m.name}</div>
                <div className="text-[10px] opacity-50">Target: {m.target}</div>
              </button>
            ))}
          </motion.div>
        )}

        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-8 border-t border-white/5 space-y-4"
          >
            <h3 className="text-xs font-serif uppercase tracking-widest text-mystic-light/40 text-left">Recent Sessions</h3>
            <div className="space-y-2">
              {history.map(session => (
                <div key={session.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-mystic-gold/10 flex items-center justify-center">
                      <Infinity className="w-4 h-4 text-mystic-gold" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-medium text-mystic-light">{session.name}</div>
                      <div className="text-[10px] text-mystic-light/30">{new Date(session.timestamp).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-serif text-mystic-gold">{session.count}</span>
                    <Trophy className="w-3 h-3 text-mystic-gold/30" />
                  </div>
                </div>
              ))}
              {history.length === 0 && (
                <div className="text-center py-4 text-[10px] uppercase tracking-widest text-mystic-light/20">No sessions recorded yet.</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
