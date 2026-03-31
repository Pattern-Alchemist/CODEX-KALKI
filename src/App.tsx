import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import AICoach from './pages/AICoach';
import ModuleExplorer from './pages/ModuleExplorer';
import DoctrineExplorer from './pages/DoctrineExplorer';
import Tools from './pages/Tools';
import Onboarding from './pages/Onboarding';
import Journal from './pages/Journal';
import Settings from './pages/Settings';
import Subscription from './pages/Subscription';
import { FirebaseProvider, useFirebase } from './contexts/FirebaseContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Loader2 } from 'lucide-react';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useFirebase();

  if (loading) {
    return (
      <div className="min-h-screen bg-mystic-dark flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-mystic-gold animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <FirebaseProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/coach" element={<ProtectedRoute><AICoach /></ProtectedRoute>} />
              <Route path="/modules" element={<ProtectedRoute><ModuleExplorer /></ProtectedRoute>} />
              <Route path="/explorer" element={<ProtectedRoute><DoctrineExplorer /></ProtectedRoute>} />
              <Route path="/tools" element={<ProtectedRoute><Tools /></ProtectedRoute>} />
              <Route path="/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>} />
              <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </FirebaseProvider>
    </ErrorBoundary>
  );
}





