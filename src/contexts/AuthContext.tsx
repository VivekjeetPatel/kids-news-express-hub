
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ReaderProfile } from '@/types/ReaderProfile';
import { getReaderByUsername } from '@/data/readers';

interface AuthContextType {
  currentUser: ReaderProfile | null;
  isLoggedIn: boolean;
  login: (username: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<ReaderProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved login on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('flyingbus_username');
    if (savedUsername) {
      const user = getReaderByUsername(savedUsername);
      if (user) {
        setCurrentUser(user);
      } else {
        // Clear invalid saved data
        localStorage.removeItem('flyingbus_username');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string): Promise<boolean> => {
    // For demo purposes, we're using mock data instead of real auth
    // In a real app, this would call an API endpoint
    const user = getReaderByUsername(username);
    
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('flyingbus_username', username);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('flyingbus_username');
  };

  const value = {
    currentUser,
    isLoggedIn: !!currentUser,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
