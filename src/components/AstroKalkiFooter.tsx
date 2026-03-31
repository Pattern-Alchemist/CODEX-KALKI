import { motion } from 'motion/react';
import { Sparkles, Zap, Moon, Sun, Github, Twitter, Instagram, Mail } from 'lucide-react';
import { AstroKalkiLogo } from './AstroKalkiLogo';

export function AstroKalkiFooter() {
  return (
    <footer className="bg-mystic-dark border-t border-white/5 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="md:col-span-2 space-y-8">
            <AstroKalkiLogo />
            <p className="text-mystic-light/40 max-w-md leading-relaxed font-sans italic">
              "The stars are not just lights in the sky; they are the map of your soul. AstroKalki is your guide through the labyrinth of the esoteric."
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Instagram, Github, Mail].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-mystic-light/40 hover:text-mystic-gold hover:bg-mystic-gold/10 transition-all border border-transparent hover:border-mystic-gold/20"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.3em] text-mystic-gold font-serif">Platform</h4>
            <ul className="space-y-4">
              {['Modules', 'AI Coach', 'Tools', 'Journal'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-mystic-light/60 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.3em] text-mystic-gold font-serif">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-mystic-light/60 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] uppercase tracking-[0.4em] text-mystic-light/20">
            © 2026 ASTROKALKI OCCULT MASTERY. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-mystic-light/40">Cosmic Servers Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
