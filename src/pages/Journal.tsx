import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PenLine, 
  Trash2, 
  Plus, 
  Calendar, 
  Search, 
  Filter, 
  Sparkles, 
  Moon, 
  Zap,
  ChevronRight,
  Trophy,
  Flame,
  Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useFirebase } from '@/contexts/FirebaseContext';
import { db } from '@/firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: any;
}

export default function Journal() {
  const { user, userProfile } = useFirebase();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Meditation');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'journal'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newEntries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JournalEntry[];
      setEntries(newEntries);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching journal:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addEntry = async () => {
    if (!user || !newTitle.trim() || !newContent.trim()) return;
    try {
      await addDoc(collection(db, 'journal'), {
        userId: user.uid,
        title: newTitle,
        content: newContent,
        category: newCategory,
        createdAt: serverTimestamp()
      });
      setIsAdding(false);
      setNewTitle('');
      setNewContent('');
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'journal', id));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-serif tracking-widest text-mystic-gold">Spiritual Journal</h1>
          <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>New Entry</span>
          </Button>
        </div>
        <p className="text-mystic-light/60 font-sans tracking-wide">Document your journey through the esoteric realms.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-mystic-gold/5 border-mystic-gold/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-mystic-gold/10 flex items-center justify-center text-mystic-gold">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-mystic-light/40">Current Streak</p>
            <p className="text-2xl font-serif text-white">{userProfile?.streak || 0} Days</p>
          </div>
        </Card>
        <Card className="p-6 bg-mystic-accent/5 border-mystic-accent/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-mystic-accent/10 flex items-center justify-center text-mystic-accent">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-mystic-light/40">Rituals Done</p>
            <p className="text-2xl font-serif text-white">{userProfile?.ritualsCompleted || 0}</p>
          </div>
        </Card>
        <Card className="p-6 bg-white/5 border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-mystic-light">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-mystic-light/40">Journal Entries</p>
            <p className="text-2xl font-serif text-white">{entries.length}</p>
          </div>
        </Card>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-8 space-y-6 border-mystic-gold/30 bg-mystic-gold/5">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Entry Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xl font-serif text-white focus:outline-none focus:border-mystic-gold/50"
                />
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-mystic-light/60 focus:outline-none focus:border-mystic-gold/50"
                >
                  <option value="Meditation">Meditation</option>
                  <option value="Dream">Dream</option>
                  <option value="Ritual">Ritual</option>
                  <option value="Insight">Insight</option>
                </select>
                <textarea
                  placeholder="Describe your experience..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 h-48 text-mystic-light/80 focus:outline-none focus:border-mystic-gold/50 font-sans leading-relaxed"
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button onClick={addEntry}>Save Entry</Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-6">
        {entries.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="group hover:border-mystic-gold/30 transition-all">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-mystic-gold/60">{entry.category}</span>
                    <span className="text-[10px] text-mystic-light/20">•</span>
                    <span className="text-[10px] text-mystic-light/40 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {entry.createdAt?.toDate ? format(entry.createdAt.toDate(), 'MMM d, yyyy') : 'Just now'}
                    </span>
                  </div>
                  <CardTitle className="text-2xl">{entry.title}</CardTitle>
                </div>
                <button 
                  onClick={() => deleteEntry(entry.id)}
                  className="text-mystic-light/20 hover:text-red-400 transition-colors p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </CardHeader>
              <CardContent>
                <p className="text-mystic-light/70 leading-relaxed font-sans italic">
                  "{entry.content}"
                </p>
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                  Edit Entry <ChevronRight className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {entries.length === 0 && !isAdding && (
        <div className="text-center py-24 space-y-4">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto">
            <PenLine className="w-10 h-10 text-mystic-light/20" />
          </div>
          <h3 className="text-xl font-serif text-mystic-light/40">The pages of your journey are empty.</h3>
          <Button onClick={() => setIsAdding(true)}>Write Your First Entry</Button>
        </div>
      )}
    </div>
  );
}
