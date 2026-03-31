import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, User, Bot, Loader2, Moon, Zap, Compass, Quote, ExternalLink, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { geminiService } from '@/services/geminiService';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useFirebase } from '@/contexts/FirebaseContext';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { MODULES } from '@/data/modules';

interface Message {
  role: 'user' | 'model';
  text: string;
  sources?: string[];
}

export default function AICoach() {
  const { user } = useFirebase();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Greetings, seeker. I am the AstroKalki AI Coach. What uncomfortable truths shall we explore today? I can guide your rituals, decode your astrology, or help you awaken your psychic potential." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'users', user.uid, 'coach_history'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const history = snapshot.docs.map(doc => doc.data() as Message);
      if (history.length > 0) {
        setMessages(history);
      }
    }, (error) => {
      console.error("Firestore Error: ", error);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !user) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    const findRelevantContext = (queryText: string) => {
      const keywords = queryText.toLowerCase().split(' ');
      const relevantModules = MODULES.filter(m => 
        keywords.some(k => 
          m.title.toLowerCase().includes(k) || 
          m.tags.some(t => t.toLowerCase().includes(k)) ||
          m.shortSummary.toLowerCase().includes(k)
        )
      ).slice(0, 3);

      if (relevantModules.length === 0) return { context: '', sources: [] };

      const context = relevantModules.map(m => 
        `MODULE: ${m.title}\nSUMMARY: ${m.shortSummary}\nCONTENT: ${m.description}\nSOURCE: ${m.source}`
      ).join('\n\n');

      const sources = relevantModules.map(m => m.title);

      return { context, sources };
    };

    try {
      // Save user message to Firestore
      await addDoc(collection(db, 'users', user.uid, 'coach_history'), {
        userId: user.uid,
        role: 'user',
        text: userMessage,
        timestamp: serverTimestamp()
      });

      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const { context, sources } = findRelevantContext(userMessage);
      const response = await geminiService.chat(userMessage, history, context);
      const modelResponse = response || "The void remains silent. Try again.";

      // Save model response to Firestore
      await addDoc(collection(db, 'users', user.uid, 'coach_history'), {
        userId: user.uid,
        role: 'model',
        text: modelResponse,
        sources: sources.length > 0 ? sources : null,
        timestamp: serverTimestamp()
      });

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to the esoteric realms. Check your connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-mystic-accent/20 flex items-center justify-center shadow-[0_0_20px_rgba(126,87,194,0.3)]">
            <Sparkles className="w-6 h-6 text-mystic-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-serif tracking-widest text-mystic-gold">AI Esoteric Coach</h1>
            <p className="text-xs text-mystic-light/50 uppercase tracking-widest">Powered by Gemini & Ancient Wisdom</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Moon className="w-4 h-4" />
            <span>Ritual Guide</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Psychic Drill</span>
          </Button>
        </div>
      </header>

      <div className="flex-1 mystic-glass overflow-hidden flex flex-col">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4 max-w-[85%]",
                  m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  m.role === 'user' ? "bg-mystic-gold/20" : "bg-mystic-accent/20"
                )}>
                  {m.role === 'user' ? <User className="w-4 h-4 text-mystic-gold" /> : <Bot className="w-4 h-4 text-mystic-accent" />}
                </div>
                <div className={cn(
                  "p-4 rounded-2xl font-sans text-sm leading-relaxed",
                  m.role === 'user' 
                    ? "bg-mystic-gold/10 text-mystic-gold rounded-tr-none border border-mystic-gold/20" 
                    : "bg-white/5 text-mystic-light/90 rounded-tl-none border border-white/10"
                )}>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown>
                      {m.text}
                    </ReactMarkdown>
                  </div>
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-2">
                      <span className="text-[9px] uppercase tracking-widest text-mystic-light/30 flex items-center gap-1">
                        <BookOpen className="w-2.5 h-2.5" />
                        Sources:
                      </span>
                      {m.sources.map(source => (
                        <span key={source} className="text-[9px] px-2 py-0.5 rounded-full bg-mystic-accent/10 text-mystic-accent border border-mystic-accent/20">
                          {source}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex gap-4 mr-auto max-w-[85%] animate-pulse">
              <div className="w-8 h-8 rounded-full bg-mystic-accent/20 flex items-center justify-center shrink-0">
                <Loader2 className="w-4 h-4 text-mystic-accent animate-spin" />
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-mystic-accent/50 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-mystic-accent/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-mystic-accent/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-black/20">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your karmic path, a ritual, or a dream..."
              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 pr-14 focus:outline-none focus:border-mystic-gold/50 transition-all font-sans text-sm"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-mystic-gold text-mystic-dark flex items-center justify-center hover:bg-mystic-accent hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-center gap-6 text-[10px] uppercase tracking-[0.2em] text-mystic-light/30">
            <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Rituals</span>
            <span className="flex items-center gap-1"><Moon className="w-3 h-3" /> Astrology</span>
            <span className="flex items-center gap-1"><Compass className="w-3 h-3" /> Yantras</span>
          </div>
        </div>
      </div>
    </div>
  );
}
