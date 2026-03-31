import { motion } from 'motion/react';
import { Sparkles, Zap, Moon, Sun } from 'lucide-react';

export function AstroKalkiLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full border border-mystic-gold/30 flex items-center justify-center"
        >
          <div className="w-8 h-8 rounded-full border border-mystic-gold/50 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-mystic-gold" />
          </div>
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1"
        >
          <Zap className="w-3 h-3 text-mystic-accent fill-mystic-accent" />
        </motion.div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-serif tracking-[0.2em] text-white leading-none">ASTRO<span className="text-mystic-gold">KALKI</span></span>
        <span className="text-[8px] uppercase tracking-[0.4em] text-mystic-light/40 mt-1">Occult Mastery</span>
      </div>
    </div>
  );
}
