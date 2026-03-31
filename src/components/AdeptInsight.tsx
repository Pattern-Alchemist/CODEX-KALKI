import { motion } from 'motion/react';
import { Sparkles, Zap, ShieldAlert, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdeptInsightProps {
  title: string;
  content: string;
  type?: 'warning' | 'insight' | 'secret';
  className?: string;
}

export function AdeptInsight({ title, content, type = 'insight', className }: AdeptInsightProps) {
  const icons = {
    warning: ShieldAlert,
    insight: Eye,
    secret: Sparkles,
  };

  const colors = {
    warning: 'text-red-400 border-red-400/20 bg-red-400/5',
    insight: 'text-mystic-gold border-mystic-gold/20 bg-mystic-gold/5',
    secret: 'text-mystic-accent border-mystic-accent/20 bg-mystic-accent/5',
  };

  const Icon = icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "p-6 rounded-2xl border backdrop-blur-sm relative overflow-hidden group",
        colors[type],
        className
      )}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="w-12 h-12" />
      </div>
      
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-5 h-5" />
        <h4 className="font-serif tracking-widest uppercase text-xs">{title}</h4>
      </div>
      
      <p className="text-sm leading-relaxed font-sans italic opacity-80">
        {content}
      </p>
      
      <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
    </motion.div>
  );
}
