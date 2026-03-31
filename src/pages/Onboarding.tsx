import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Moon, Eye, Zap, ChevronRight, Star, Target, Compass, Shield, Flame } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '@/contexts/FirebaseContext';
import { cn } from '@/lib/utils';

const steps = [
  {
    id: 'path',
    title: 'Choose Your Path',
    description: 'Which esoteric tradition calls to your soul?',
    options: [
      { id: 'tantra', title: 'Tantric Alchemy', description: 'Transformation through energy and desire.', icon: Flame },
      { id: 'astrology', title: 'Cosmic Astrology', description: 'Understanding the celestial blueprint.', icon: Moon },
      { id: 'psychic', title: 'Psychic Awakening', description: 'Developing inner sight and intuition.', icon: Eye },
      { id: 'occult', title: 'Occult Mastery', description: 'Mastering the hidden laws of nature.', icon: Sparkles }
    ]
  },
  {
    id: 'goals',
    title: 'Your Intentions',
    description: 'What do you seek to achieve in this portal?',
    multi: true,
    options: [
      { id: 'power', title: 'Personal Power', description: 'Manifesting will and influence.', icon: Zap },
      { id: 'peace', title: 'Inner Peace', description: 'Silence and mental clarity.', icon: Shield },
      { id: 'knowledge', title: 'Hidden Knowledge', description: 'Decoding ancient mysteries.', icon: Compass },
      { id: 'mastery', title: 'Spiritual Mastery', description: 'Ultimate liberation and siddhi.', icon: Target }
    ]
  },
  {
    id: 'level',
    title: 'Experience Level',
    description: 'Where are you on your journey?',
    options: [
      { id: 'novice', title: 'Novice Seeker', description: 'Just beginning to explore the hidden.', icon: Star },
      { id: 'adept', title: 'Adept Practitioner', description: 'Familiar with rituals and meditation.', icon: Star },
      { id: 'master', title: 'Advanced Master', description: 'Deeply experienced in esoteric arts.', icon: Star }
    ]
  }
];

export default function Onboarding() {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [selections, setSelections] = useState<any>({
    path: '',
    goals: [],
    level: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { updateProfile } = useFirebase();

  const currentStep = steps[currentStepIdx];

  const handleSelect = (optionId: string) => {
    if (currentStep.multi) {
      setSelections((prev: any) => ({
        ...prev,
        [currentStep.id]: prev[currentStep.id].includes(optionId)
          ? prev[currentStep.id].filter((id: string) => id !== optionId)
          : [...prev[currentStep.id], optionId]
      }));
    } else {
      setSelections((prev: any) => ({ ...prev, [currentStep.id]: optionId }));
      if (currentStepIdx < steps.length - 1) {
        setTimeout(() => setCurrentStepIdx(prev => prev + 1), 300);
      }
    }
  };

  const handleNext = async () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      setIsSubmitting(true);
      await updateProfile({
        currentPath: selections.path,
        goals: selections.goals,
        level: selections.level,
        onboardingCompleted: true
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-mystic-dark flex items-center justify-center p-4 md:p-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Progress Bar */}
        <div className="flex justify-between items-center gap-4 px-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-500",
                i <= currentStepIdx ? "bg-mystic-gold shadow-[0_0_10px_rgba(197,160,89,0.5)]" : "bg-white/5"
              )}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <h1 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-widest">{currentStep.title}</h1>
              <p className="text-mystic-light/40 italic">{currentStep.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentStep.options.map((option) => {
                const isSelected = currentStep.multi 
                  ? selections[currentStep.id].includes(option.id)
                  : selections[currentStep.id] === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className={cn(
                      "group relative p-6 rounded-3xl border transition-all duration-500 text-left overflow-hidden",
                      isSelected 
                        ? "bg-mystic-gold/10 border-mystic-gold shadow-[0_0_30px_rgba(197,160,89,0.1)]" 
                        : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                    )}
                  >
                    <div className="flex items-start gap-4 relative z-10">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                        isSelected ? "bg-mystic-gold text-mystic-dark" : "bg-white/5 text-mystic-light/40 group-hover:text-mystic-gold"
                      )}>
                        <option.icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className={cn(
                          "font-serif text-lg transition-colors",
                          isSelected ? "text-mystic-gold" : "text-white"
                        )}>{option.title}</h3>
                        <p className="text-xs text-mystic-light/40 leading-relaxed">{option.description}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <motion.div 
                        layoutId="selection-glow"
                        className="absolute inset-0 bg-gradient-to-br from-mystic-gold/5 to-transparent pointer-events-none"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-8">
              <button 
                onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))}
                className={cn(
                  "text-[10px] uppercase tracking-widest text-mystic-light/40 hover:text-white transition-colors",
                  currentStepIdx === 0 && "opacity-0 pointer-events-none"
                )}
              >
                Back
              </button>
              
              {(currentStep.multi || selections[currentStep.id]) && (
                <Button 
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="px-12 h-14"
                >
                  {isSubmitting ? 'Initializing...' : currentStepIdx === steps.length - 1 ? 'Begin Journey' : 'Continue'}
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
