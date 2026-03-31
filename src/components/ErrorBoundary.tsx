import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from './ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "An unexpected cosmic disturbance has occurred.";
      try {
        const parsedError = JSON.parse(this.state.error?.message || "");
        if (parsedError.error && parsedError.error.includes("Missing or insufficient permissions")) {
          errorMessage = "You do not have the required spiritual clearance (permissions) for this action.";
        }
      } catch (e) {
        // Not a JSON error, use default
      }

      return (
        <div className="min-h-screen bg-mystic-dark flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white/5 border border-white/10 text-center space-y-6">
            <div className="flex justify-center">
              <AlertTriangle className="w-16 h-16 text-mystic-accent animate-pulse" />
            </div>
            <h1 className="text-2xl font-serif text-white uppercase tracking-widest">System Error</h1>
            <p className="text-sm text-mystic-light/60 italic leading-relaxed">
              "{errorMessage}"
            </p>
            <Button 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => window.location.reload()}
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Reset Connection</span>
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
