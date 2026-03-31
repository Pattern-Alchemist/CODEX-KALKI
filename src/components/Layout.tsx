import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { AuraBackground } from './AuraBackground';

export function Layout() {
  return (
    <div className="flex min-h-screen bg-mystic-dark text-mystic-light font-sans overflow-x-hidden">
      <AuraBackground />
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-6 md:p-12 relative z-10 pb-32 lg:pb-12">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
