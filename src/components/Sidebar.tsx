import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  LogOut,
  Compass,
  PenTool,
  Star,
  Network
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AstroKalkiLogo } from './AstroKalkiLogo';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Network, label: 'Explorer', path: '/explorer' },
  { icon: BookOpen, label: 'Modules', path: '/modules' },
  { icon: MessageSquare, label: 'AI Coach', path: '/coach' },
  { icon: Compass, label: 'Tools', path: '/tools' },
  { icon: PenTool, label: 'Journal', path: '/journal' },
  { icon: Star, label: 'Premium', path: '/subscription' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

import { useFirebase } from '@/contexts/FirebaseContext';

export function Sidebar() {
  const { logout } = useFirebase();

  return (
    <aside className="hidden lg:flex w-72 h-screen bg-mystic-dark/80 backdrop-blur-3xl border-r border-white/5 flex-col p-8 fixed left-0 top-0 z-50">
      <div className="mb-12">
        <AstroKalkiLogo />
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-500 group border border-transparent",
              isActive 
                ? "bg-mystic-gold/10 text-mystic-gold border-mystic-gold/20 shadow-[0_0_30px_rgba(197,160,89,0.1)]" 
                : "text-mystic-light/40 hover:text-mystic-gold hover:bg-white/5"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("w-5 h-5 transition-all duration-500", isActive ? "scale-110" : "group-hover:scale-110")} />
                <span className="font-sans font-medium tracking-[0.2em] text-[10px] uppercase">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="pt-8 border-t border-white/5 mt-auto">
        <button 
          onClick={logout}
          className="flex items-center gap-4 px-4 py-3 text-mystic-light/20 hover:text-mystic-accent transition-all duration-300 w-full group"
        >
          <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="font-sans font-medium text-[10px] uppercase tracking-[0.2em]">Log Out</span>
        </button>
      </div>
    </aside>
  );
}

