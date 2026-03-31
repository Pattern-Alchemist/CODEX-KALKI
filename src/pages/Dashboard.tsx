import { motion } from 'motion/react';
import { 
  Zap, 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  ChevronRight, 
  Activity,
  Trophy,
  Star,
  History,
  TrendingUp,
  AlertTriangle,
  Globe,
  Clock,
  FileText,
  Shield,
  Flame,
  ArrowUpRight,
  PenTool,
  Moon
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { DailyRitual } from '@/components/DailyRitual';
import { cn } from '@/lib/utils';
import { useFirebase } from '@/contexts/FirebaseContext';
import { MODULES } from '@/data/modules';

const TRUTH_BOMBS = [
  "Your spirituality is just another ego-trip if you're still seeking validation.",
  "Meditation isn't an escape from reality; it's a direct confrontation with your own bullshit.",
  "If your 'awakening' doesn't offend your old self, it's just a performance.",
  "The universe doesn't owe you a miracle. It owes you the truth you're too scared to hear.",
  "You're not 'lost'; you're just refusing to look at the map you already have."
];

export default function Dashboard() {
  const { user, userProfile } = useFirebase();
  const truthBomb = TRUTH_BOMBS[Math.floor(Math.random() * TRUTH_BOMBS.length)];

  // Find recommended modules based on user path
  const recommendedModules = MODULES.filter(m => 
    m.category.toLowerCase() === (userProfile?.currentPath?.toLowerCase() || 'tantra')
  ).slice(0, 2);

  const stats = [
    { label: 'Mastery Level', value: userProfile?.level || '3', icon: Trophy, color: 'text-mystic-gold' },
    { label: 'Practice Streak', value: '12 Days', icon: Flame, color: 'text-orange-500' },
    { label: 'Karma Points', value: userProfile?.karmaPoints || '420', icon: Star, color: 'text-mystic-accent' },
    { label: 'Rituals Done', value: '24', icon: Sparkles, color: 'text-blue-400' },
  ];

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif tracking-widest text-white uppercase">
            {userProfile?.displayName || 'Adept'} <span className="text-mystic-gold">Portal</span>
          </h1>
          <p className="text-xs uppercase tracking-[0.4em] text-mystic-light/40 font-mono">
            System Status: <span className="text-green-500">Synchronized</span> | Level: {userProfile?.level || 'Novice'}
          </p>
        </div>
        <div className="flex items-center gap-6 bg-white/5 p-4 rounded-2xl border border-white/10">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-mystic-light/40">Current Path</span>
            <span className="text-sm font-serif text-mystic-gold">{userProfile?.currentPath || 'Tantric Alchemy'}</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-mystic-gold/20 flex items-center justify-center border-2 border-mystic-gold/50 shadow-[0_0_20px_rgba(197,160,89,0.3)]">
            <Star className="w-6 h-6 text-mystic-gold" />
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 bg-mystic-dark/40 border-white/5 hover:border-mystic-gold/20 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg bg-white/5", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-mystic-light/10 group-hover:text-mystic-gold/40 transition-colors" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-mystic-light/30">{stat.label}</p>
              <p className="text-2xl font-serif text-white">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Truth Bomb Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-8 rounded-3xl bg-mystic-accent/10 border border-mystic-accent/30 overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <AlertTriangle className="w-24 h-24 text-mystic-accent" />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 text-mystic-accent text-[10px] uppercase tracking-[0.3em] font-serif">
                <Zap className="w-4 h-4" />
                <span>Truth Bomb</span>
              </div>
              <p className="text-2xl font-serif text-white leading-tight italic">
                "{truthBomb}"
              </p>
              <p className="text-[10px] text-mystic-light/40 uppercase tracking-widest">
                — AstroKalki Signature
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DailyRitual />
            
            <Card className="bg-white/5 border-white/10 flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-mystic-purple" />
                  <CardTitle className="text-lg">Cosmic Alignment</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-xs text-mystic-light/60 uppercase tracking-widest">Sun in Aries</span>
                  <span className="text-xs text-mystic-gold">Exalted</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-xs text-mystic-light/60 uppercase tracking-widest">Moon Phase</span>
                  <span className="text-xs text-mystic-accent">Waxing Gibbous</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-xs text-mystic-light/60 uppercase tracking-widest">Mercury</span>
                  <span className="text-xs text-red-400">Retrograde</span>
                </div>
              </CardContent>
              <CardFooter>
                <span className="text-[10px] text-mystic-light/20 uppercase tracking-widest">Next Shift: 14h 22m</span>
              </CardFooter>
            </Card>
          </div>

          {/* Premium Reports Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif tracking-widest text-mystic-gold uppercase">Premium Insights</h2>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-mystic-gold fill-mystic-gold" />
                <span className="text-[10px] uppercase tracking-widest text-mystic-gold font-bold">Adept Tier</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-mystic-gold/5 border-mystic-gold/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <FileText className="w-24 h-24" />
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-mystic-gold/20 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-mystic-gold" />
                  </div>
                  <h3 className="text-lg font-serif text-white">Monthly Karmic Report</h3>
                  <p className="text-xs text-mystic-light/60 leading-relaxed">A deep dive into your astrological transits and karmic cycles for the next 30 days.</p>
                  <Button variant="outline" size="sm" className="border-mystic-gold/30 text-mystic-gold hover:bg-mystic-gold hover:text-mystic-dark">Download PDF</Button>
                </div>
              </Card>
              <Card className="p-6 bg-mystic-accent/5 border-mystic-accent/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Sparkles className="w-24 h-24" />
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-mystic-accent/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-mystic-accent" />
                  </div>
                  <h3 className="text-lg font-serif text-white">Esoteric DNA Analysis</h3>
                  <p className="text-xs text-mystic-light/60 leading-relaxed">Your spiritual lineage and latent psychic predispositions mapped out.</p>
                  <Button variant="outline" size="sm" className="border-mystic-accent/30 text-mystic-accent hover:bg-mystic-accent hover:text-white">View Report</Button>
                </div>
              </Card>
            </div>
          </section>

          <Card className="bg-mystic-purple/5 border-mystic-accent/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-mystic-accent" />
                  <CardTitle className="text-lg">Mastery Progress</CardTitle>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-mystic-light/40">Level 14 Adept</span>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs uppercase tracking-widest">
                    <span className="text-mystic-light/60">Psychic Awakening</span>
                    <span className="text-mystic-accent">65%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      className="h-full bg-mystic-accent"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs uppercase tracking-widest">
                    <span className="text-mystic-light/60">Tibetan Doctrines</span>
                    <span className="text-mystic-gold">30%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '30%' }}
                      className="h-full bg-mystic-gold"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-around border-l border-white/5 pl-8">
                <div className="text-center">
                  <div className="text-2xl font-serif text-white">12</div>
                  <div className="text-[8px] uppercase tracking-widest text-mystic-light/40">Rituals Done</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-serif text-white">4</div>
                  <div className="text-[8px] uppercase tracking-widest text-mystic-light/40">Active Modules</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-serif text-white">{userProfile?.karmaPoints || 0}</div>
                  <div className="text-[8px] uppercase tracking-widest text-mystic-light/40">Karma Points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-mystic-dark border-mystic-gold/20 shadow-[0_0_50px_rgba(197,160,89,0.05)]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-mystic-gold" />
                <CardTitle className="text-lg">Esoteric AI Coach</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-mystic-light/60 leading-relaxed italic">
                "Seeker, your current planetary alignment suggests a block in the solar plexus. I recommend the Yantra of the Inner Sun ritual."
              </p>
              <Link to="/coach">
                <Button className="w-full">Consult the Oracle</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-serif uppercase tracking-widest text-mystic-light/40">Practice Log</h3>
                <Clock className="w-4 h-4 text-mystic-light/20" />
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(28)].map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "aspect-square rounded-sm border border-white/5",
                      i < 12 ? "bg-mystic-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]" : "bg-white/5"
                    )} 
                  />
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="text-center">
                  <p className="text-lg font-serif text-white">12</p>
                  <p className="text-[8px] uppercase tracking-widest text-mystic-light/30">Day Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-serif text-white">85%</p>
                  <p className="text-[8px] uppercase tracking-widest text-mystic-light/30">Consistency</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-serif text-white">4.2h</p>
                  <p className="text-[8px] uppercase tracking-widest text-mystic-light/30">Time Spent</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-mystic-light/40" />
                <CardTitle className="text-lg">Recommended</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recommendedModules.map((module, idx) => (
                <Link key={idx} to={`/modules?id=${module.id}`} className="block p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-mystic-gold/30 transition-all group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[8px] uppercase tracking-widest text-mystic-gold/60">{module.category}</span>
                        <span className="text-[8px] uppercase tracking-widest text-mystic-light/20">•</span>
                        <span className="text-[8px] uppercase tracking-widest text-mystic-light/40">{module.level}</span>
                      </div>
                      <div className="text-sm font-serif text-white">{module.title}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-mystic-light/20 group-hover:text-mystic-gold transition-all" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


