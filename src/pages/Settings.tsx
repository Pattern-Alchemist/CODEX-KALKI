import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Moon, 
  ChevronRight, 
  Star,
  Zap,
  Sparkles
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

import { useFirebase } from '@/contexts/FirebaseContext';

export default function Settings() {
  const { userProfile, logout } = useFirebase();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'language', label: 'Language', icon: Globe },
  ];

  if (userProfile?.role === 'admin') {
    tabs.push({ id: 'admin', label: 'Admin CMS', icon: Sparkles });
  }

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-serif tracking-widest text-mystic-gold">Settings</h1>
        <p className="text-mystic-light/60 font-sans tracking-wide">Configure your connection to the esoteric platform.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group",
                activeTab === tab.id 
                  ? "bg-mystic-gold/10 text-mystic-gold border border-mystic-gold/20" 
                  : "text-mystic-light/60 hover:text-mystic-gold hover:bg-white/5"
              )}
            >
              <tab.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-sans font-medium tracking-wide">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="md:col-span-3 space-y-8">
          {activeTab === 'admin' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Admin CMS</CardTitle>
                  <CardDescription>Manage modules and system content.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-xl bg-mystic-gold/10 border border-mystic-gold/30">
                    <h4 className="text-mystic-gold font-serif mb-2">Content Ingestion</h4>
                    <p className="text-xs text-mystic-light/60">Upload new PDFs to process them into modules using the retrieval architecture.</p>
                    <Button className="mt-4 w-full" variant="outline">Upload PDF</Button>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-white font-serif">System Stats</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[10px] text-mystic-light/40 uppercase">Total Users</p>
                        <p className="text-xl font-serif text-white">1,234</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[10px] text-mystic-light/40 uppercase">Active Rituals</p>
                        <p className="text-xl font-serif text-white">89</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Public Profile</CardTitle>
                  <CardDescription>How you appear to the AstroKalki community.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-mystic-gold/20 flex items-center justify-center border-2 border-mystic-gold/50 shadow-[0_0_20px_rgba(197,160,89,0.3)]">
                      <User className="w-10 h-10 text-mystic-gold" />
                    </div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-mystic-light/40">Spiritual Name</label>
                      <input type="text" placeholder="Adept Seeker" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-mystic-gold/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-mystic-light/40">Email Address</label>
                      <input type="email" placeholder="seeker@example.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-mystic-gold/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-mystic-light/40">Bio / Intent</label>
                    <textarea placeholder="My intent is to master the bardos and achieve liberation..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 h-32 text-sm focus:outline-none focus:border-mystic-gold/50" />
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {activeTab === 'subscription' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <Card className="bg-mystic-gold/5 border-mystic-gold/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-mystic-gold">Adept Premium</CardTitle>
                      <CardDescription>Your current plan is active until April 30, 2026.</CardDescription>
                    </div>
                    <div className="bg-mystic-gold text-mystic-dark px-3 py-1 rounded-full text-[10px] font-serif uppercase tracking-widest">Active</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 text-mystic-light/80">
                    <Star className="w-4 h-4 text-mystic-gold" />
                    <span>Unlimited AI Coach Queries</span>
                  </div>
                  <div className="flex items-center gap-3 text-mystic-light/80">
                    <Sparkles className="w-4 h-4 text-mystic-gold" />
                    <span>All Esoteric Modules Unlocked</span>
                  </div>
                  <div className="flex items-center gap-3 text-mystic-light/80">
                    <Zap className="w-4 h-4 text-mystic-gold" />
                    <span>Personalized Daily Rituals</span>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="outline" className="text-red-400 border-red-400/30 hover:bg-red-400/10">Cancel Subscription</Button>
                  <Button variant="outline">Manage Billing</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your saved payment information.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 rounded bg-white/10 flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-mystic-light/40" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">•••• •••• •••• 4242</div>
                        <div className="text-xs text-mystic-light/40">Expires 12/28</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Remove</Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Add New Method</Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {activeTab === 'language' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Language & Region</CardTitle>
                  <CardDescription>Choose your preferred language for the esoteric teachings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-mystic-light/40">Primary Language</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-mystic-gold/50">
                      <option value="en">English (Universal)</option>
                      <option value="hi">Hindi (हिन्दी)</option>
                      <option value="sa">Sanskrit (संस्कृतम्)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-mystic-purple/20 border border-mystic-accent/30">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-mystic-accent" />
                      <div>
                        <div className="text-sm font-medium">Multilingual AI Coach</div>
                        <div className="text-xs text-mystic-light/40">The AI coach can respond in your chosen language.</div>
                      </div>
                    </div>
                    <div className="w-12 h-6 rounded-full bg-mystic-accent relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
