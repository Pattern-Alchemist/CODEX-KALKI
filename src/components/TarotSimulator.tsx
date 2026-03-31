import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Eye, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface TarotCard {
  id: string;
  name: string;
  meaning: string;
  image: string;
  arcana: 'major' | 'minor';
}

const TAROT_DECK: TarotCard[] = [
  {
    id: '0',
    name: 'The Fool',
    meaning: 'New beginnings, optimism, trust in life, leap of faith.',
    image: 'https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?w=400&h=600&fit=crop',
    arcana: 'major'
  },
  {
    id: '1',
    name: 'The Magician',
    meaning: 'Manifestation, resourcefulness, power, inspired action.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=600&fit=crop',
    arcana: 'major'
  },
  {
    id: '2',
    name: 'The High Priestess',
    meaning: 'Intuition, sacred knowledge, divine feminine, subconscious mind.',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&h=600&fit=crop',
    arcana: 'major'
  },
  {
    id: '10',
    name: 'Wheel of Fortune',
    meaning: 'Good luck, karma, life cycles, destiny, a turning point.',
    image: 'https://images.unsplash.com/photo-1534840639212-9c184e7d0596?w=400&h=600&fit=crop',
    arcana: 'major'
  },
  {
    id: '13',
    name: 'Death',
    meaning: 'Endings, change, transformation, transition.',
    image: 'https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=400&h=600&fit=crop',
    arcana: 'major'
  }
];

export default function TarotSimulator() {
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);

  const drawCard = () => {
    if (drawnCards.length >= 3) return;
    
    setIsShuffling(true);
    setTimeout(() => {
      const availableCards = TAROT_DECK.filter(c => !drawnCards.find(dc => dc.id === c.id));
      const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      setDrawnCards([...drawnCards, randomCard]);
      setIsShuffling(false);
    }, 1000);
  };

  const reset = () => {
    setDrawnCards([]);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-serif text-mystic-gold">The Three-Card Spread</h3>
          <p className="text-sm text-mystic-light/60">Past, Present, and Future insights.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={reset} disabled={drawnCards.length === 0}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button size="sm" onClick={drawCard} disabled={drawnCards.length >= 3 || isShuffling}>
            <Sparkles className="w-4 h-4 mr-2" />
            {isShuffling ? 'Shuffling...' : 'Draw Card'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {[0, 1, 2].map((index) => {
            const card = drawnCards[index];
            const label = index === 0 ? 'Past' : index === 1 ? 'Present' : 'Future';

            return (
              <div key={index} className="relative flex flex-col items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-mystic-gold/60 font-serif">{label}</span>
                
                <div className="w-full aspect-[2/3] relative perspective-1000">
                  {card ? (
                    <motion.div
                      initial={{ rotateY: 180, opacity: 0, scale: 0.8 }}
                      animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, type: 'spring' }}
                      className="w-full h-full rounded-2xl overflow-hidden border-2 border-mystic-gold/50 shadow-[0_0_30px_rgba(197,160,89,0.2)] bg-mystic-dark"
                    >
                      <img 
                        src={card.image} 
                        alt={card.name}
                        className="w-full h-full object-cover opacity-60"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-mystic-dark via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                        <h4 className="text-xl font-serif text-mystic-gold">{card.name}</h4>
                        <p className="text-xs text-mystic-light/80 leading-relaxed italic line-clamp-3">
                          {card.meaning}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="w-full h-full rounded-2xl border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center">
                      <div className="text-center space-y-2 opacity-20">
                        <Eye className="w-12 h-12 mx-auto" />
                        <span className="text-[10px] uppercase tracking-widest">Awaiting Fate</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </AnimatePresence>
      </div>

      {drawnCards.length === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-mystic-gold/5 border border-mystic-gold/20 text-center"
        >
          <p className="text-mystic-light/80 font-sans italic leading-relaxed max-w-2xl mx-auto">
            "The cards reveal a path of transformation. Your past foundations are shifting, making way for a present of inspired action that will lead to a future of karmic balance."
          </p>
          <Button variant="ghost" className="mt-4 text-mystic-gold hover:text-mystic-gold/80">
            <Info className="w-4 h-4 mr-2" />
            Deep Interpretation
          </Button>
        </motion.div>
      )}
    </div>
  );
}
