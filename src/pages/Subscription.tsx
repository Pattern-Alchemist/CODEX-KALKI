import { motion } from 'motion/react';
import { Check, Zap, Star, Shield, Sparkles, Flame } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const plans = [
  {
    id: 'free',
    name: 'Seeker',
    price: '₹0',
    description: 'Begin your journey into the esoteric.',
    features: [
      'Access to Basic Modules',
      'Daily Truth Bomb',
      'Limited AI Coach Access',
      'Basic Journaling'
    ],
    cta: 'Current Plan',
    variant: 'outline'
  },
  {
    id: 'pro',
    name: 'Adept',
    price: '₹499',
    period: '/month',
    description: 'Deepen your practice with advanced tools.',
    features: [
      'All Basic & Advanced Modules',
      'Unlimited AI Coach Access',
      'Ritual Tracker & Streaks',
      'Early Access to New Content',
      'Priority Support'
    ],
    cta: 'Upgrade to Adept',
    variant: 'primary',
    popular: true
  },
  {
    id: 'master',
    name: 'Master',
    price: '₹4,999',
    period: '/year',
    description: 'Ultimate mastery for the dedicated practitioner.',
    features: [
      'Everything in Adept',
      'Exclusive Master-Only Content',
      'Personalized Learning Plans',
      'One-on-One AI Mentorship',
      'Downloadable PDF Reports',
      'AstroKalki Founder Access'
    ],
    cta: 'Become a Master',
    variant: 'primary'
  }
];

export default function Subscription() {
  return (
    <div className="space-y-12 pb-20">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-widest">Ascend Your Practice</h1>
        <p className="text-mystic-light/60 max-w-2xl mx-auto italic">
          Choose the level of mastery that aligns with your spiritual ambition. 
          Unlock the hidden doctrines and accelerate your awakening.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: plans.indexOf(plan) * 0.1 }}
          >
            <Card className={cn(
              "relative h-full flex flex-col p-8 transition-all duration-500 overflow-hidden",
              plan.popular ? "border-mystic-gold shadow-[0_0_40px_rgba(197,160,89,0.1)] bg-mystic-gold/5" : "border-white/5 bg-white/5"
            )}>
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-mystic-gold text-mystic-dark text-[10px] font-bold uppercase tracking-widest px-4 py-1 rotate-45 translate-x-4 translate-y-2">
                    Popular
                  </div>
                </div>
              )}

              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <h3 className="text-sm font-serif text-mystic-gold uppercase tracking-widest">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-serif text-white">{plan.price}</span>
                    {plan.period && <span className="text-mystic-light/40 text-sm">{plan.period}</span>}
                  </div>
                  <p className="text-xs text-mystic-light/60 italic">{plan.description}</p>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-4 h-4 rounded-full bg-mystic-gold/20 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-mystic-gold" />
                      </div>
                      <span className="text-xs text-mystic-light/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <Button 
                  variant={plan.variant as any} 
                  className="w-full py-6"
                  disabled={plan.id === 'free'}
                >
                  {plan.cta}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5">
        <div className="text-center space-y-2">
          <Shield className="w-6 h-6 text-mystic-gold/40 mx-auto" />
          <p className="text-[10px] uppercase tracking-widest text-mystic-light/40">Secure Payments</p>
        </div>
        <div className="text-center space-y-2">
          <Zap className="w-6 h-6 text-mystic-gold/40 mx-auto" />
          <p className="text-[10px] uppercase tracking-widest text-mystic-light/40">Instant Access</p>
        </div>
        <div className="text-center space-y-2">
          <Star className="w-6 h-6 text-mystic-gold/40 mx-auto" />
          <p className="text-[10px] uppercase tracking-widest text-mystic-light/40">Premium Content</p>
        </div>
        <div className="text-center space-y-2">
          <Sparkles className="w-6 h-6 text-mystic-gold/40 mx-auto" />
          <p className="text-[10px] uppercase tracking-widest text-mystic-light/40">Spiritual Growth</p>
        </div>
      </div>
    </div>
  );
}
