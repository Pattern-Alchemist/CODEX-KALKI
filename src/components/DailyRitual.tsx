import { motion } from 'motion/react';
import { Sparkles, Zap, Moon, Sun, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';

interface Ritual {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'morning' | 'evening' | 'anytime';
}

const DAILY_RITUALS: Ritual[] = [
  {
    id: '1',
    title: 'Solar Invocation',
    description: 'Face the rising sun and visualize the golden light entering your heart center. Chant the Gayatri mantra 11 times.',
    duration: '10 min',
    type: 'morning'
  },
  {
    id: '2',
    title: 'Lunar Reflection',
    description: 'Before sleep, review your day in reverse order. Dissolve any karmic knots through deep breathing.',
    duration: '15 min',
    type: 'evening'
  }
];

export function DailyRitual() {
  const ritual = DAILY_RITUALS[0]; // For demo, pick the first one

  return (
    <Card className="bg-mystic-gold/5 border-mystic-gold/30 overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        {ritual.type === 'morning' ? <Sun className="w-32 h-32" /> : <Moon className="w-32 h-32" />}
      </div>

      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-mystic-gold/20 flex items-center justify-center border border-mystic-gold/50">
              {ritual.type === 'morning' ? <Sun className="w-5 h-5 text-mystic-gold" /> : <Moon className="w-5 h-5 text-mystic-gold" />}
            </div>
            <div>
              <CardTitle className="text-xl">Daily Ritual</CardTitle>
              <CardDescription className="text-xs uppercase tracking-widest">{ritual.type} Practice</CardDescription>
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-mystic-light/40 font-serif">{ritual.duration}</div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <h4 className="text-lg font-serif text-white">{ritual.title}</h4>
        <p className="text-sm text-mystic-light/70 leading-relaxed italic">
          "{ritual.description}"
        </p>
      </CardContent>

      <CardFooter>
        <Button className="w-full flex items-center gap-2 group">
          <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Complete Ritual</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
