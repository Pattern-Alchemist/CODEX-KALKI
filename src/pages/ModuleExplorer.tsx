import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  Zap, 
  Moon, 
  Shield, 
  Search, 
  Filter, 
  Lock, 
  ChevronRight,
  Eye,
  Flame,
  Wind,
  Trophy,
  Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ModulePlayer } from '@/components/ModulePlayer';
import { cn } from '@/lib/utils';
import { MODULES } from '@/data/modules';
import { Module } from '@/types';

const categories = ['All', 'breathwork', 'tantra', 'doctrine', 'ritual'];

export default function ModuleExplorer() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const filteredModules = MODULES.filter(m => 
    (activeCategory === 'All' || m.category === activeCategory) &&
    (m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     m.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
     m.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const getIcon = (category: string) => {
    switch (category) {
      case 'breathwork': return Wind;
      case 'tantra': return Flame;
      case 'doctrine': return BookOpen;
      case 'ritual': return Sparkles;
      default: return Moon;
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-serif tracking-widest text-mystic-gold">Esoteric Modules</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mystic-light/30" />
              <input 
                type="text" 
                placeholder="Search doctrines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full px-10 py-2 text-sm focus:outline-none focus:border-mystic-gold/50 transition-all w-64"
              />
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-serif uppercase tracking-widest transition-all",
                activeCategory === cat 
                  ? "bg-mystic-gold text-mystic-dark" 
                  : "bg-white/5 text-mystic-light/50 hover:bg-white/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredModules.map((module) => (
            <motion.div
              layout
              key={module.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full flex flex-col group relative overflow-hidden border-white/5 hover:border-mystic-gold/30 transition-all duration-500">
                {module.isPremium && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-mystic-gold/20 text-mystic-gold p-1.5 rounded-full backdrop-blur-md border border-mystic-gold/30">
                      <Lock className="w-4 h-4" />
                    </div>
                  </div>
                )}
                <CardHeader>
                  <div className={cn(
                    "w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                    module.isPremium ? "text-mystic-gold" : "text-mystic-accent"
                  )}>
                    {(() => {
                      const Icon = getIcon(module.category);
                      return <Icon className="w-6 h-6" />;
                    })()}
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-mystic-light/40">{module.category}</span>
                    <span className="text-[10px] text-mystic-light/20">•</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-mystic-gold/60">{module.level}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-white transition-colors">{module.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-2">{module.shortSummary}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {module.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-mystic-light/30 border border-white/5">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[10px] text-mystic-light/30">
                    <Clock className="w-3 h-3" />
                    <span>{module.duration}</span>
                  </div>
                  <Button 
                    className="flex-1 group/btn" 
                    variant={module.isPremium ? 'outline' : 'primary'}
                    onClick={() => setSelectedModule(module)}
                  >
                    {module.isPremium ? 'Unlock' : 'Start'}
                    <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-24 space-y-4">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto">
            <Search className="w-10 h-10 text-mystic-light/20" />
          </div>
          <h3 className="text-xl font-serif text-mystic-light/40">No doctrines found in the void.</h3>
          <Button variant="outline" onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}>Clear Filters</Button>
        </div>
      )}

      <AnimatePresence>
        {selectedModule && (
          <ModulePlayer 
            module={selectedModule} 
            onClose={() => setSelectedModule(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

