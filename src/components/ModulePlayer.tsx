import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle,
  Info,
  Clock,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Module, ModuleContent } from '@/types';
import { cn } from '@/lib/utils';

interface ModulePlayerProps {
  module: Module;
  onClose: () => void;
}

export function ModulePlayer({ module, onClose }: ModulePlayerProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentContent = module.content[currentStepIdx];

  useEffect(() => {
    if (currentContent?.type === 'timer' && typeof currentContent.value !== 'string' && 'duration' in currentContent.value) {
      setTimeLeft(currentContent.value.duration);
      setTimerActive(false);
    }
  }, [currentStepIdx, currentContent]);

  useEffect(() => {
    let interval: any;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      // Optional: Sound notification
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleNext = () => {
    if (currentStepIdx < module.content.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    setCurrentStepIdx(prev => Math.max(0, prev - 1));
  };

  if (isCompleted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[100] bg-mystic-dark flex items-center justify-center p-6"
      >
        <div className="max-w-md w-full text-center space-y-8">
          <div className="w-24 h-24 rounded-full bg-mystic-gold/20 flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(197,160,89,0.3)]">
            <CheckCircle className="w-12 h-12 text-mystic-gold" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-serif text-white uppercase tracking-widest">Ritual Complete</h2>
            <p className="text-mystic-light/60 italic">You have absorbed the essence of {module.title}. Your karma points have increased.</p>
          </div>
          <Button className="w-full py-6" onClick={onClose}>Return to Explorer</Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[100] bg-mystic-dark flex flex-col"
    >
      {/* Header */}
      <header className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-mystic-light/60" />
          </button>
          <div className="hidden md:block">
            <h1 className="text-sm font-serif text-mystic-gold uppercase tracking-widest">{module.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-mystic-light/30 uppercase tracking-widest">{module.category}</span>
              <span className="text-[10px] text-mystic-light/10">•</span>
              <span className="text-[10px] text-mystic-light/30 uppercase tracking-widest">Step {currentStepIdx + 1} of {module.content.length}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-1 w-32 md:w-64 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-mystic-gold shadow-[0_0_10px_rgba(197,160,89,0.5)]"
              animate={{ width: `${((currentStepIdx + 1) / module.content.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center p-6 md:p-12">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIdx}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {currentContent.type === 'text' && typeof currentContent.value === 'string' && (
                <div className="space-y-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto">
                    <Info className="w-8 h-8 text-mystic-gold/40" />
                  </div>
                  <p className="text-xl md:text-2xl font-serif text-mystic-light leading-relaxed">
                    {currentContent.value}
                  </p>
                </div>
              )}

              {currentContent.type === 'warning' && typeof currentContent.value === 'string' && (
                <Card className="p-8 bg-red-500/5 border-red-500/20 text-center space-y-4">
                  <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
                  <h3 className="text-xl font-serif text-red-500 uppercase tracking-widest">Sacred Warning</h3>
                  <p className="text-mystic-light/60 italic">{currentContent.value}</p>
                </Card>
              )}

              {currentContent.type === 'step' && typeof currentContent.value !== 'string' && 'title' in currentContent.value && (
                <div className="space-y-8 text-center">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-mystic-gold">Instruction</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-white tracking-wide">{currentContent.value.title}</h2>
                  </div>
                  <Card className="p-8 bg-white/5 border-white/10">
                    <p className="text-lg md:text-xl text-mystic-light/80 leading-relaxed italic">
                      "{currentContent.value.description}"
                    </p>
                  </Card>
                </div>
              )}

              {currentContent.type === 'timer' && typeof currentContent.value !== 'string' && 'label' in currentContent.value && (
                <div className="space-y-12 text-center">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-mystic-gold">{'type' in currentContent.value ? currentContent.value.type : 'Timer'}</span>
                    <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tighter">{currentContent.value.label}</h2>
                  </div>
                  
                  <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
                    <svg className="w-full h-full -rotate-90">
                      <circle 
                        cx="50%" cy="50%" r="48%" 
                        className="fill-none stroke-white/5 stroke-[4]"
                      />
                      <motion.circle 
                        cx="50%" cy="50%" r="48%" 
                        className="fill-none stroke-mystic-gold stroke-[4]"
                        strokeDasharray="100 100"
                        animate={{ strokeDashoffset: 100 - (timeLeft / (('duration' in currentContent.value ? currentContent.value.duration : 1) || 1)) * 100 }}
                        transition={{ duration: 1, ease: 'linear' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl md:text-7xl font-mono text-white">{timeLeft}s</span>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setTimerActive(!timerActive)}
                      className="w-32"
                    >
                      {timerActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {timerActive ? 'Pause' : 'Start'}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        const val = currentContent.value;
                        if (typeof val !== 'string' && 'duration' in val) {
                          setTimeLeft(val.duration || 0);
                        }
                      }}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Controls */}
      <footer className="p-6 border-t border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          disabled={currentStepIdx === 0}
          className="text-mystic-light/40"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {module.content.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                i === currentStepIdx ? "bg-mystic-gold w-4" : "bg-white/10"
              )}
            />
          ))}
        </div>

        <Button 
          onClick={handleNext}
          className="px-8"
        >
          {currentStepIdx === module.content.length - 1 ? 'Finish' : 'Next'}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </footer>
    </motion.div>
  );
}
