import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Wind, Settings2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { cn } from '@/lib/utils';

type BreathPhase = 'inhale' | 'hold-full' | 'exhale' | 'hold-empty';

const PRESETS = [
  { name: 'Box Breathing', inhale: 4, holdFull: 4, exhale: 4, holdEmpty: 4 },
  { name: '4-7-8 Relax', inhale: 4, holdFull: 7, exhale: 8, holdEmpty: 0 },
  { name: 'Equal Breath', inhale: 5, holdFull: 0, exhale: 5, holdEmpty: 0 },
];

export function BreathTimer() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [config, setConfig] = useState(PRESETS[0]);
  const [showSettings, setShowSettings] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Switch phase
            switch (phase) {
              case 'inhale':
                if (config.holdFull > 0) {
                  setPhase('hold-full');
                  return config.holdFull;
                }
                setPhase('exhale');
                return config.exhale;
              case 'hold-full':
                setPhase('exhale');
                return config.exhale;
              case 'exhale':
                if (config.holdEmpty > 0) {
                  setPhase('hold-empty');
                  return config.holdEmpty;
                }
                setPhase('inhale');
                return config.inhale;
              case 'hold-empty':
                setPhase('inhale');
                return config.inhale;
              default:
                return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, phase, config]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(config.inhale);
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'text-blue-400';
      case 'hold-full': return 'text-mystic-gold';
      case 'exhale': return 'text-purple-400';
      case 'hold-empty': return 'text-red-400';
    }
  };

  const getPhaseLabel = () => {
    switch (phase) {
      case 'inhale': return 'Inhale';
      case 'hold-full': return 'Hold';
      case 'exhale': return 'Exhale';
      case 'hold-empty': return 'Pause';
    }
  };

  return (
    <Card className="p-8 md:p-12 text-center space-y-12 bg-mystic-dark/40 border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
        <motion.div 
          className="h-full bg-mystic-gold"
          initial={{ width: '0%' }}
          animate={{ width: isActive ? '100%' : '0%' }}
          transition={{ duration: timeLeft, ease: 'linear' }}
          key={phase + timeLeft}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-serif tracking-widest text-mystic-gold uppercase">Breath Mastery</h2>
        <p className="text-sm text-mystic-light/40 uppercase tracking-widest">{config.name}</p>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Animated Circle */}
        <motion.div 
          className="w-64 h-64 rounded-full border-2 border-white/5 flex flex-col items-center justify-center gap-2 relative"
          animate={{
            scale: phase === 'inhale' ? 1.2 : phase === 'exhale' ? 0.8 : 1,
            borderColor: phase === 'inhale' ? 'rgba(96, 165, 250, 0.3)' : phase === 'exhale' ? 'rgba(192, 132, 252, 0.3)' : 'rgba(255, 255, 255, 0.05)'
          }}
          transition={{ duration: phase === 'inhale' ? config.inhale : config.exhale, ease: 'easeInOut' }}
        >
          <motion.span 
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("text-sm uppercase tracking-[0.3em] font-serif", getPhaseColor())}
          >
            {getPhaseLabel()}
          </motion.span>
          <span className="text-6xl font-serif text-white">{timeLeft}</span>
          
          <div className="absolute -bottom-4 flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={cn(
                "w-1.5 h-1.5 rounded-full transition-colors",
                (phase === 'inhale' && i === 0) || 
                (phase === 'hold-full' && i === 1) || 
                (phase === 'exhale' && i === 2) || 
                (phase === 'hold-empty' && i === 3)
                  ? "bg-mystic-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" 
                  : "bg-white/10"
              )} />
            ))}
          </div>
        </motion.div>
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
          className="w-20 h-20 rounded-full shadow-2xl"
          onClick={toggleTimer}
        >
          {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full w-12 h-12"
          onClick={resetTimer}
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
            className="pt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {PRESETS.map(p => (
              <button
                key={p.name}
                onClick={() => { setConfig(p); resetTimer(); setShowSettings(false); }}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all",
                  config.name === p.name 
                    ? "bg-mystic-gold/10 border-mystic-gold/30 text-mystic-gold" 
                    : "bg-white/5 border-transparent text-mystic-light/40 hover:bg-white/10"
                )}
              >
                <div className="text-xs font-serif uppercase tracking-widest mb-1">{p.name}</div>
                <div className="text-[10px] opacity-50">{p.inhale}-{p.holdFull}-{p.exhale}-{p.holdEmpty}</div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
