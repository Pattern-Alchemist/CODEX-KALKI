export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'seeker' | 'adept' | 'admin';
  subscriptionStatus: 'free' | 'premium';
  onboardingCompleted: boolean;
  astrologyAffinity?: string;
  psychicAffinity?: string;
  karmaPoints: number;
  currentPath?: string;
  goals?: string[];
  interests?: string[];
  level?: 'novice' | 'adept' | 'master';
  createdAt: number;
}

export interface Module {
  id: string;
  title: string;
  category: 'breathwork' | 'tantra' | 'astrology' | 'psychic' | 'yantra' | 'ritual' | 'doctrine';
  tradition?: string;
  level: 'novice' | 'adept' | 'master';
  intent?: string;
  tags: string[];
  shortSummary: string;
  description: string;
  warnings?: string[];
  prerequisites?: string[];
  duration?: string;
  isPremium: boolean;
  status: 'published' | 'draft' | 'restricted';
  source?: string;
  content?: ModuleContent[];
}

export interface ModuleContent {
  type: 'text' | 'step' | 'timer' | 'warning' | 'image';
  value: string | StepContent | TimerContent;
}

export interface StepContent {
  title: string;
  description: string;
}

export interface TimerContent {
  label: string;
  duration: number; // seconds
  type: 'inhale' | 'hold' | 'exhale' | 'pause';
}

export interface UserProgress {
  uid: string;
  moduleId: string;
  status: 'not-started' | 'in-progress' | 'completed';
  completedAt?: number;
  lastAccessedAt: number;
}

export interface Ritual {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  duration: number; // in minutes
  category: string;
}

export interface TarotCard {
  name: string;
  arcana: 'major' | 'minor';
  meaning: string;
  reversedMeaning: string;
  image: string;
}
