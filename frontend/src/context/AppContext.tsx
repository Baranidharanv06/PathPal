import React, { createContext, useState, useContext, ReactNode } from 'react';

// --- Define the data structures ---
type TransportMode = 'car' | 'train' | 'flight'; // 'export' has been removed.

interface User {
  username: string;
}
interface Pool {
  id: number;
  destination: string;
  origin: string;
  date: string;
  departureTime: string;
  availableSeats: number;
  postedBy: string;
  description: string;
  transportMode: TransportMode;
}
interface AppContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  pools: Pool[];
  isLoading: boolean;
  addPool: (poolData: Omit<Pool, 'id' | 'postedBy'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockPools = [
    { id: 1, destination: 'Chennai', origin: 'Katpadi Junction', date: '2025-07-30', departureTime: '7:30 PM', availableSeats: 2, postedBy: 'Mohit', description: 'Love discussing F1 and tech startups.', transportMode: 'car' },
    { id: 2, destination: 'WhiteFields', origin: 'Main Gate', date: '2025-07-30', departureTime: '8:00 PM', availableSeats: 3, postedBy: 'Maria', description: 'Hoping for a Valorant companion for a few games!', transportMode: 'train' },
    { id: 3, destination: 'VITV', origin: 'Mangalore Airport', date: '2025-07-31', departureTime: '8:15 PM', availableSeats: 1, postedBy: 'Riya', description: 'Just need a quiet ride to finish my assignment.', transportMode: 'flight' },
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [pools, setPools] = useState<Pool[]>(mockPools);
  const [isLoading, setIsLoading] = useState(false);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  const addPool = (poolData: Omit<Pool, 'id' | 'postedBy'>) => {
    const newPool: Pool = {
      id: Math.random(),
      postedBy: user?.username || 'Unknown',
      ...poolData,
    };
    setPools(prevPools => [newPool, ...prevPools]);
  };

  const isAuthenticated = !!user;

  return (
    <AppContext.Provider value={{ user, login, logout, isAuthenticated, pools, isLoading, addPool }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};