import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Book, 
  Star, 
  ChevronRight, 
  Layers, 
  Zap, 
  Globe, 
  Compass,
  ArrowLeft
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MODULES } from '@/data/modules';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const TRADITIONS = [
  { id: 'all', name: 'All Traditions', icon: Globe },
  { id: 'tantra', name: 'Tantric Alchemy', icon: Zap },
  { id: 'vedic', name: 'Vedic Sciences', icon: Star },
  { id: 'western', name: 'Western Esotericism', icon: Compass },
  { id: 'tibetan', name: 'Tibetan Buddhism', icon: Layers },
  { id: 'psychic', name: 'Psychic Arts', icon: Book },
];

export default function DoctrineExplorer() {
  const [selectedTradition, setSelectedTradition] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  const filteredModules = MODULES.filter(m => {
    const matchesTradition = selectedTradition === 'all' || m.category.toLowerCase() === selectedTradition;
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTradition && matchesSearch;
  });

  return (
    <div className="space-y-10 pb-20">
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-mystic-gold text-[10px] uppercase tracking-[0.4em] font-mono">
          <Compass className="w-4 h-4" />
          <span>Doctrine Library</span>
        </div>
        <h1 className="text-4xl font-serif tracking-widest text-white uppercase">
          The <span className="text-mystic-gold">Great Archive</span>
        </h1>
        <p className="text-mystic-light/60 max-w-2xl font-serif italic text-lg">
          "Knowledge without practice is a burden; practice without knowledge is a trap. Explore the ancient maps of the soul."
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 space-y-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mystic-light/30" />
            <input 
              type="text"
              placeholder="Search doctrines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-mystic-gold/50 transition-colors"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-widest text-mystic-light/40 font-bold">Traditions</h3>
            <div className="space-y-1">
              {TRADITIONS.map((tradition) => (
                <button
                  key={tradition.id}
                  onClick={() => setSelectedTradition(tradition.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all group",
                    selectedTradition === tradition.id 
                      ? "bg-mystic-gold text-mystic-dark font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)]" 
                      : "text-mystic-light/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <tradition.icon className={cn(
                    "w-4 h-4",
                    selectedTradition === tradition.id ? "text-mystic-dark" : "text-mystic-light/20 group-hover:text-mystic-gold"
                  )} />
                  {tradition.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Grid */}
        <div className="flex-1 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredModules.map((module) => (
                <motion.div
                  key={module.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onMouseEnter={() => setHoveredModule(module.id)}
                  onMouseLeave={() => setHoveredModule(null)}
                  className="group"
                >
                  <Link to={`/modules?id=${module.id}`}>
                    <Card className="h-full bg-mystic-dark/40 border-white/5 hover:border-mystic-gold/30 transition-all cursor-pointer overflow-hidden relative">
                      {/* Background Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-mystic-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <CardHeader className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[8px] uppercase tracking-widest text-mystic-gold px-2 py-1 bg-mystic-gold/10 rounded-full">
                            {module.category}
                          </span>
                          {module.premium && (
                            <Star className="w-3 h-3 text-mystic-gold fill-mystic-gold" />
                          )}
                        </div>
                        <CardTitle className="text-xl font-serif text-white group-hover:text-mystic-gold transition-colors">
                          {module.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="relative z-10 space-y-4">
                        <p className="text-xs text-mystic-light/60 line-clamp-3 leading-relaxed italic">
                          "{module.description}"
                        </p>
                        
                        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                          <div className="flex flex-col">
                            <span className="text-[8px] uppercase tracking-widest text-mystic-light/30">Level</span>
                            <span className="text-[10px] text-white font-mono">{module.level}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[8px] uppercase tracking-widest text-mystic-light/30">Duration</span>
                            <span className="text-[10px] text-white font-mono">{module.duration}</span>
                          </div>
                        </div>
                      </CardContent>

                      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
                        <motion.div 
                          className="h-full bg-mystic-gold"
                          initial={{ width: 0 }}
                          animate={{ width: hoveredModule === module.id ? '100%' : '0%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredModules.length === 0 && (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-mystic-light/20" />
              </div>
              <p className="text-mystic-light/40 font-serif italic">No doctrines found in this tradition matching your search.</p>
              <Button variant="ghost" onClick={() => { setSelectedTradition('all'); setSearchQuery(''); }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
