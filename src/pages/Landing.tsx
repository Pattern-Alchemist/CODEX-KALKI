import { motion } from 'motion/react';
import { 
  Sparkles, 
  Zap, 
  Moon, 
  Sun, 
  Compass, 
  Layers, 
  ChevronRight,
  Star,
  Shield,
  ShieldCheck,
  ZapOff,
  Menu,
  X,
  MessageSquare,
  BookOpen,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { AstroKalkiLogo } from '@/components/AstroKalkiLogo';
import { AstroKalkiFooter } from '@/components/AstroKalkiFooter';
import { cn } from '@/lib/utils';
import { useFirebase } from '@/contexts/FirebaseContext';

export default function Landing() {
  const navigate = useNavigate();
  const { signIn, user } = useFirebase();

  const handleEnter = async () => {
    if (user) {
      navigate('/dashboard');
    } else {
      await signIn();
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-mystic-dark text-white overflow-x-hidden selection:bg-mystic-gold selection:text-mystic-dark">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-mystic-dark/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <AstroKalkiLogo />
          <div className="hidden md:flex items-center gap-8">
            <a href="#doctrines" className="text-[10px] font-serif uppercase tracking-[0.3em] text-mystic-light/40 hover:text-mystic-gold transition-colors">Doctrines</a>
            <a href="#coach" className="text-[10px] font-serif uppercase tracking-[0.3em] text-mystic-light/40 hover:text-mystic-gold transition-colors">AI Coach</a>
            <a href="#pricing" className="text-[10px] font-serif uppercase tracking-[0.3em] text-mystic-light/40 hover:text-mystic-gold transition-colors">Pricing</a>
            <Button size="sm" onClick={handleEnter}>
              {user ? 'Enter Portal' : 'Sign In'}
            </Button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-48 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.1),transparent_70%)]" />
          
          {/* Animated Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mystic-purple/10 blur-[120px] rounded-full -z-10 animate-pulse" />

          <div className="container mx-auto px-6 relative z-10 text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-mystic-gold text-[10px] uppercase tracking-[0.4em] font-serif">
                <Sparkles className="w-4 h-4" />
                <span>The Age of Awakening is Here</span>
              </div>
              
              <h1 className="text-6xl md:text-9xl font-serif tracking-tighter leading-[0.85] text-white">
                Master the <span className="text-mystic-gold italic">Occult</span> <br />
                Awaken the <span className="text-mystic-accent italic">Divine</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-mystic-light/60 max-w-3xl mx-auto font-sans leading-relaxed italic">
                "Stop seeking validation in the mundane. AstroKalki is the surgical tool for your spiritual evolution. Decode ancient doctrines, master sacred geometry, and confront the truth."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6"
            >
              <Button size="lg" className="px-12 h-16 text-lg group" onClick={handleEnter}>
                {user ? 'Enter Portal' : 'Begin Your Journey'} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="px-12 h-16 text-lg border-white/10 hover:bg-white/5" onClick={() => navigate('/explorer')}>
                Explore Doctrines
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Truth Bomb Teaser */}
        <section className="py-24 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="flex justify-center">
                <AlertTriangle className="w-12 h-12 text-mystic-accent animate-pulse" />
              </div>
              <h2 className="text-3xl md:text-5xl font-serif italic text-white leading-tight">
                "If your 'awakening' doesn't offend your old self, <br className="hidden md:block" /> it's just a performance."
              </h2>
              <p className="text-[10px] uppercase tracking-[0.5em] text-mystic-light/40">The AstroKalki Signature</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="doctrines" className="py-32">
          <div className="container mx-auto px-6 space-y-24">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-serif tracking-widest uppercase">The Adept's Toolkit</h2>
              <p className="text-mystic-light/40 max-w-md mx-auto uppercase text-[10px] tracking-[0.3em]">Everything you need to navigate the esoteric dimensions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: 'Tibetan Wisdom', 
                  desc: 'Unlock the secret doctrines of the Tibetan Book of the Dead and master the bardos.', 
                  icon: BookOpen,
                  color: 'text-mystic-gold'
                },
                { 
                  title: 'Psychic Skills', 
                  desc: 'Awaken your intuition through progressive clairvoyance drills and psychic development.', 
                  icon: Eye,
                  color: 'text-mystic-accent'
                },
                { 
                  title: 'Yantra Mastery', 
                  desc: 'Harness the power of sacred geometry and Vaidika Sarpa Vidya through yantra meditation.', 
                  icon: Sparkles,
                  color: 'text-mystic-gold'
                },
              ].map((feature, idx) => (
                <div key={idx} className="p-12 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-mystic-gold/30 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <feature.icon className="w-32 h-32" />
                  </div>
                  <feature.icon className={cn("w-12 h-12 mb-8 group-hover:scale-110 transition-transform", feature.color)} />
                  <h3 className="text-2xl font-serif text-white mb-4">{feature.title}</h3>
                  <p className="text-mystic-light/60 leading-relaxed italic">"{feature.desc}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Coach Section */}
        <section id="coach" className="py-32 bg-mystic-purple/5 border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-7xl font-serif tracking-tighter text-white">The AI <br /><span className="text-mystic-gold italic">Esoteric Coach</span></h2>
                  <p className="text-xl text-mystic-light/60 leading-relaxed font-sans italic">
                    "Your personal guide through the labyrinth of occult knowledge. Our AI has internalized the most sacred texts, from the Kaalchakra to the Book of Shambhala."
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    'Ritual Generation',
                    'Symbol Analysis',
                    'Karmic Decoding',
                    'Psychic Drills'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="w-8 h-8 rounded-full bg-mystic-gold/20 flex items-center justify-center">
                        <Star className="w-4 h-4 text-mystic-gold" />
                      </div>
                      <span className="text-sm font-serif uppercase tracking-widest text-mystic-light/80">{item}</span>
                    </div>
                  ))}
                </div>
                
                <Button size="lg" className="w-full md:w-auto" onClick={() => navigate('/coach')}>Consult the Oracle</Button>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-[40px] bg-mystic-dark border border-white/10 p-10 flex flex-col gap-6 relative overflow-hidden group shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-mystic-gold/5 to-transparent" />
                  
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-mystic-accent/20 flex items-center justify-center shrink-0 border border-mystic-accent/30">
                      <Sparkles className="w-5 h-5 text-mystic-accent" />
                    </div>
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 rounded-tl-none text-sm text-mystic-light/80 leading-relaxed italic">
                      "Seeker, your current planetary alignment suggests a block in the solar plexus. I recommend the Yantra of the Inner Sun ritual."
                    </div>
                  </div>

                  <div className="flex gap-4 items-start flex-row-reverse">
                    <div className="w-10 h-10 rounded-full bg-mystic-gold/20 flex items-center justify-center shrink-0 border border-mystic-gold/30">
                      <Moon className="w-5 h-5 text-mystic-gold" />
                    </div>
                    <div className="p-6 rounded-3xl bg-mystic-gold/10 text-mystic-gold border border-mystic-gold/20 rounded-tr-none text-sm font-serif italic">
                      "How do I perform the ritual correctly?"
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-mystic-accent/20 flex items-center justify-center shrink-0 border border-mystic-accent/30">
                      <Sparkles className="w-5 h-5 text-mystic-accent" />
                    </div>
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 rounded-tl-none text-sm text-mystic-light/80 leading-relaxed italic">
                      "Preparation is key. Find a quiet space, light a single candle, and visualize the geometry of the sun..."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-32">
          <div className="container mx-auto px-6 space-y-24">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-serif tracking-widest uppercase">Choose Your Path</h2>
              <p className="text-mystic-light/40 max-w-md mx-auto uppercase text-[10px] tracking-[0.3em]">Select the level of mastery that suits your intent.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="p-16 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-10 hover:border-white/20 transition-all">
                <div className="space-y-2">
                  <h3 className="text-3xl font-serif text-white">Seeker</h3>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-mystic-light/40">Free Forever</p>
                </div>
                <div className="text-6xl font-serif text-white">$0 <span className="text-lg text-mystic-light/40">/ month</span></div>
                <ul className="space-y-6">
                  {[
                    'Basic Esoteric Modules',
                    'Daily Ritual Access',
                    '5 AI Coach Queries / Day',
                    'Community Access'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm text-mystic-light/60">
                      <ShieldCheck className="w-5 h-5 text-mystic-light/20" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full h-16 text-lg" onClick={() => navigate('/subscription')}>Join as Seeker</Button>
              </div>

              <div className="p-16 rounded-[40px] bg-mystic-gold/5 border border-mystic-gold/30 space-y-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 bg-mystic-gold text-mystic-dark text-[10px] font-serif uppercase tracking-[0.4em] rounded-bl-3xl">Most Popular</div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-serif text-mystic-gold">Adept</h3>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-mystic-light/40">Premium Mastery</p>
                </div>
                <div className="text-6xl font-serif text-white">$29 <span className="text-lg text-mystic-light/40">/ month</span></div>
                <ul className="space-y-6">
                  {[
                    'Unlimited AI Coach Access',
                    'All Premium Modules',
                    'Advanced Esoteric Tools',
                    'Priority Community Support',
                    'Offline PWA Access'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm text-mystic-light/80">
                      <Star className="w-5 h-5 text-mystic-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full h-16 text-lg shadow-[0_0_30px_rgba(197,160,89,0.2)]" onClick={() => navigate('/subscription')}>Become an Adept</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AstroKalkiFooter />
    </div>
  );
}
