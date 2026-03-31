import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  Compass,
  PenTool,
  Star,
  Network
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
  { icon: Network, label: 'Explorer', path: '/explorer' },
  { icon: BookOpen, label: 'Modules', path: '/modules' },
  { icon: MessageSquare, label: 'Coach', path: '/coach' },
  { icon: Star, label: 'Pro', path: '/subscription' },
  { icon: Settings, label: 'Profile', path: '/settings' },
];

export function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-mystic-dark/80 backdrop-blur-3xl border-t border-white/5 px-4 h-20 flex items-center justify-between pb-safe">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => cn(
            "bottom-nav-item",
            isActive && "active"
          )}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
